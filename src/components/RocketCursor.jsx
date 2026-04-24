import { useEffect, useRef, useState } from 'react'

const RocketCursor = () => {
  const rocketRef = useRef(null)
  const trailRefs = useRef([])
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const angle = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile/touch devices
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (isMobile) return

    // Hide default cursor
    document.body.style.cursor = 'none'

    // Add cursor:none to all interactive elements
    const style = document.createElement('style')
    style.id = 'rocket-cursor-style'
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
    `
    document.head.appendChild(style)

    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      target.current = { x: -100, y: -100 }
      pos.current = { x: -100, y: -100 }
    }

    const handleMouseEnter = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
      pos.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Trail positions
    const trailPositions = Array.from({ length: 6 }, () => ({ x: -100, y: -100 }))

    // Animation loop
    let animId
    const animate = () => {
      // Smooth follow with easing
      const dx = target.current.x - pos.current.x
      const dy = target.current.y - pos.current.y
      pos.current.x += dx * 0.15
      pos.current.y += dy * 0.15

      // Calculate rotation angle based on movement direction
      const speed = Math.sqrt(dx * dx + dy * dy)
      if (speed > 1) {
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
        // Smooth angle interpolation
        let angleDiff = targetAngle - angle.current
        // Normalize angle difference to -180 to 180
        while (angleDiff > 180) angleDiff -= 360
        while (angleDiff < -180) angleDiff += 360
        angle.current += angleDiff * 0.12
      }

      // Update rocket position
      if (rocketRef.current) {
        rocketRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${angle.current}deg)`
      }

      // Update trail particles
      for (let i = trailPositions.length - 1; i > 0; i--) {
        trailPositions[i].x = trailPositions[i - 1].x
        trailPositions[i].y = trailPositions[i - 1].y
      }
      trailPositions[0].x = pos.current.x
      trailPositions[0].y = pos.current.y

      trailRefs.current.forEach((el, i) => {
        if (el) {
          const scale = 1 - (i / trailPositions.length) * 0.8
          const opacity = 0.6 - (i / trailPositions.length) * 0.55
          el.style.transform = `translate(${trailPositions[i].x}px, ${trailPositions[i].y}px) scale(${scale})`
          el.style.opacity = opacity
        }
      })

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.body.style.cursor = ''
      const cursorStyle = document.getElementById('rocket-cursor-style')
      if (cursorStyle) cursorStyle.remove()
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      {/* Trail particles (flame/smoke) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => (trailRefs.current[i] = el)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: i < 2 ? '8px' : '6px',
            height: i < 2 ? '8px' : '6px',
            marginLeft: i < 2 ? '-4px' : '-3px',
            marginTop: i < 2 ? '-4px' : '-3px',
            borderRadius: '50%',
            background: i < 2
              ? 'radial-gradient(circle, #ff8a64, #ff6040)'
              : i < 4
                ? 'radial-gradient(circle, #ffa864, #ff8a40)'
                : 'radial-gradient(circle, rgba(255,180,100,0.5), rgba(255,140,60,0.2))',
            boxShadow: i < 2
              ? '0 0 8px rgba(255,138,100,0.6), 0 0 16px rgba(255,96,64,0.3)'
              : '0 0 6px rgba(255,168,100,0.4)',
            pointerEvents: 'none',
            zIndex: 9998,
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Rocket SVG */}
      <div
        ref={rocketRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          filter: 'drop-shadow(0 0 8px rgba(138, 100, 255, 0.4))',
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginLeft: '-18px', marginTop: '-18px' }}
        >
          {/* Rocket body */}
          <defs>
            <linearGradient id="rocketBody" x1="32" y1="4" x2="32" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e8e0ff" />
              <stop offset="50%" stopColor="#c8b8ff" />
              <stop offset="100%" stopColor="#a088ee" />
            </linearGradient>
            <linearGradient id="rocketNose" x1="32" y1="2" x2="32" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff8a64" />
              <stop offset="100%" stopColor="#ff6040" />
            </linearGradient>
            <linearGradient id="rocketWindow" x1="32" y1="20" x2="32" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a8d8ff" />
              <stop offset="100%" stopColor="#64a0ff" />
            </linearGradient>
            <linearGradient id="rocketFlame" x1="32" y1="46" x2="32" y2="62" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffcc40" />
              <stop offset="40%" stopColor="#ff8a40" />
              <stop offset="100%" stopColor="#ff4040" />
            </linearGradient>
          </defs>

          {/* Left fin */}
          <path d="M18 38L12 50L22 44Z" fill="#8a64ff" opacity="0.9" />
          {/* Right fin */}
          <path d="M46 38L52 50L42 44Z" fill="#8a64ff" opacity="0.9" />

          {/* Rocket body */}
          <path d="M24 44C24 44 24 18 32 6C40 18 40 44 40 44H24Z" fill="url(#rocketBody)" />

          {/* Nose cone */}
          <path d="M28 18C28 18 30 10 32 6C34 10 36 18 36 18C36 18 34 14 32 14C30 14 28 18 28 18Z" fill="url(#rocketNose)" />

          {/* Window */}
          <circle cx="32" cy="26" r="5" fill="url(#rocketWindow)" />
          <circle cx="32" cy="26" r="5" fill="none" stroke="#e8e0ff" strokeWidth="1.2" />
          {/* Window shine */}
          <circle cx="30.5" cy="24.5" r="1.5" fill="rgba(255,255,255,0.6)" />

          {/* Body stripes */}
          <rect x="26" y="36" width="12" height="2" rx="1" fill="#8a64ff" opacity="0.4" />
          <rect x="27" y="40" width="10" height="1.5" rx="0.75" fill="#8a64ff" opacity="0.3" />

          {/* Bottom cap */}
          <path d="M24 44H40L38 46H26L24 44Z" fill="#7a54df" />

          {/* Flame */}
          <path d="M27 46L32 60L37 46" fill="url(#rocketFlame)" opacity="0.9">
            <animate
              attributeName="d"
              values="M27 46L32 60L37 46;M28 46L32 56L36 46;M27 46L32 60L37 46"
              dur="0.3s"
              repeatCount="indefinite"
            />
          </path>
          {/* Inner flame */}
          <path d="M29 46L32 54L35 46" fill="#ffee80" opacity="0.8">
            <animate
              attributeName="d"
              values="M29 46L32 54L35 46;M30 46L32 50L34 46;M29 46L32 54L35 46"
              dur="0.2s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    </>
  )
}

export default RocketCursor

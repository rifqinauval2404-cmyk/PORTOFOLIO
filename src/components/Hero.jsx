import DecryptedText from './Animations/DecryptedText'

const Hero = () => {
  const handleCTAClick = (e) => {
    e.preventDefault()
    const el = document.getElementById('pengalaman')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContactClick = (e) => {
    e.preventDefault()
    const el = document.getElementById('kontak')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" id="beranda">
      <div className="container hero__container">
        {/* Left Side: Content */}
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            UI/UX & Frontend Developer
          </div>

          <p className="hero__name">
            <DecryptedText 
              text="M. Rifqi Nauval Nibroos" 
              animateOn="view" 
              revealDirection="start" 
              speed={300}
              revealMode="word"
            />
          </p>

          <p className="hero__tagline">
            To Infinity and Beyond
          </p>

          <div className="hero__actions">
            <a href="#pengalaman" className="hero__cta" onClick={handleCTAClick}>
              Recent Projects
              <svg
                className="hero__cta-arrow"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        <div className="hero__bg-glow" />
      </div>

      <div className="hero__scroll-hint">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}

export default Hero

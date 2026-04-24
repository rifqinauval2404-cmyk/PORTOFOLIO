import { useState, useEffect } from 'react'

const navLinks = [
  { id: 'beranda', label: 'Home' },
  { id: 'tentang', label: 'About Me' },
  { id: 'pengalaman', label: 'Projects' },
  { id: 'kontak', label: 'Contact' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('beranda')

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => ({
        id: link.id,
        el: document.getElementById(link.id),
      }))

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.el) {
          const rect = section.el.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="navbar" id="navbar">
      <div className="navbar__pill">
        <div className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`navbar__link ${activeSection === link.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu navigasi"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div
        className={`navbar__overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
    </nav>
  )
}

export default Navbar

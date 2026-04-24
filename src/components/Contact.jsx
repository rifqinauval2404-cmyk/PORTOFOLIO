import { useEffect, useRef } from 'react'
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'
import TypewriterText from './Animations/TypewriterText'
import RotatingText from './Animations/RotatingText'

const contactLinks = [
  {
    id: 'email',
    label: 'Email',
    icon: <FiMail />,
    href: 'mailto:rifqi@email.com',
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: <FiGithub />,
    href: 'https://github.com/',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: <FiLinkedin />,
    href: 'https://linkedin.com/',
  },
]

const Contact = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          } else {
            entry.target.classList.remove('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    const elements = sectionRef.current?.querySelectorAll('.fade-in')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="contact section" id="kontak" ref={sectionRef}>
      <div className="container">
        <div className="contact__wrapper fade-in">
          <div className="section-label" style={{ display: 'inline-flex' }}>
            <span className="section-label__dot" />
            Kontak
          </div>
          <h2 className="contact__heading">
            Let's <RotatingText texts={['Work', 'Build']} className="rotating-text" /> Together!
          </h2>
          <p className="contact__text">
            Saya selalu terbuka untuk peluang baru, proyek kolaboratif, atau bahkan sekadar
            obrolan tentang teknologi. Jangan ragu untuk menghubungi saya — mari ciptakan
            sesuatu yang luar biasa bersama. ✨
          </p>

          <div className="contact__links">
            {contactLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="contact__link"
                target="_blank"
                rel="noopener noreferrer"
                id={`contact-${link.id}`}
              >
                <span className="contact__link-icon">{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

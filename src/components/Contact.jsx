import { useEffect, useRef } from 'react'
import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import TypewriterText from './Animations/TypewriterText'
import RotatingText from './Animations/RotatingText'

const contactLinks = [
  {
    id: 'email',
    label: 'Email',
    icon: <FaEnvelope />,
    href: 'mailto:rifqinauval2404@gmail.com',
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: <FaGithub />,
    href: 'https://github.com/rifqinauval2404-cmyk',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: <FaLinkedinIn />,
    href: 'https://www.linkedin.com/in/muhammad-rifqi-nauval-nibroos-92538a3ab/',
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


          <div className="contact__links">
            {contactLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`contact__link contact__link--${link.id}`}
                target="_blank"
                rel="noopener noreferrer"
                id={`contact-${link.id}`}
              >
                <div className="contact__link-icon">{link.icon}</div>
                <div className="contact__link-text">
                  <span>{link.subLabel}</span>
                  <span>{link.label}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

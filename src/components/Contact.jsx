import { useEffect, useRef, useState } from 'react'
import { FiMail, FiMapPin } from 'react-icons/fi'
import RotatingText from './Animations/RotatingText'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const EMAIL = 'rifqinauval2404@gmail.com'

const emptyForm = { name: '', email: '', subject: '', message: '' }

const Contact = () => {
  const sectionRef = useRef(null)
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [feedback, setFeedback] = useState('')

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

    const elements = sectionRef.current?.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return

    // Honeypot: kalau terisi, itu bot — pura-pura sukses, jangan kirim apa pun.
    if (event.target.botcheck?.value) {
      setStatus('success')
      setFeedback('Thanks! Your message is on its way.')
      return
    }

    if (!WEB3FORMS_KEY) {
      setStatus('error')
      setFeedback('Form is not configured yet. Please email me directly at ' + EMAIL + '.')
      return
    }

    setStatus('sending')
    setFeedback('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name: form.name,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setFeedback("Message sent! I'll get back to you soon.")
        setForm(emptyForm)
      } else {
        setStatus('error')
        setFeedback(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setFeedback('Network error. Please try again or email me directly.')
    }
  }

  return (
    <section className="contact section" id="kontak" ref={sectionRef}>
      <div className="container">
        <div className="contact__grid">
          {/* Left Column — Info */}
          <div className="contact__info fade-in-left">
            <div className="section-label">
              <span className="section-label__dot" />
              Kontak
            </div>
            <h2 className="contact__heading">
              Let's <RotatingText texts={['Work', 'Build']} className="rotating-text" /> Together!
            </h2>
            <p className="contact__text">
              I'm always interested in hearing about new projects and opportunities. Whether you
              have a question or just want to say hi, feel free to reach out.
            </p>

            <ul className="contact__details">
              <li className="contact__detail">
                <FiMail aria-hidden="true" />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li className="contact__detail">
                <FiMapPin aria-hidden="true" />
                <span>Bandung &amp; Tenggarong, Indonesia.</span>
              </li>
            </ul>
          </div>

          {/* Right Column — Message Form */}
          <form className="contact-form fade-in-right" onSubmit={handleSubmit}>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="contact-name">Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-form__field">
                <label htmlFor="contact-email">Email</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Honeypot — disembunyikan dari manusia, hanya bot yang mengisinya */}
            <div className="contact-form__honeypot" aria-hidden="true">
              <label htmlFor="contact-botcheck">Leave this field blank</label>
              <input type="text" id="contact-botcheck" name="botcheck" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                placeholder="What's this about?"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me more..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-form__submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {feedback && (
              <p
                className={`contact-form__feedback contact-form__feedback--${status}`}
                role="status"
                aria-live="polite"
              >
                {feedback}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

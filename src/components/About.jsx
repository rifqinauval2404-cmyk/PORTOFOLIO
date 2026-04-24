import { useEffect, useRef } from 'react'
import { FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa'

const skills = [
  'UI/UX Design', 'FrontEnd Dev', 'Figma', 'React', 'Spring Boot', 'Python', 'Ms. Office'
]

const About = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="about section" id="tentang" ref={sectionRef}>
      <div className="container">
        <div className="about__grid">
          {/* Left Column - Profile Card */}
          <div className="about__left fade-in-left">
            <div className="about__profile-card">
              <div className="profile-card__image-wrapper">


                <img
                  src="/photo_juara.jpeg"
                  alt="M. Rifqi Nauval"
                  className="profile-card__photo"
                />
                <div className="profile-card__overlay">
                  <h3 className="profile-card__name">M. Rifqi Nauval</h3>
                  <p className="profile-card__subtitle">UI/UX & Frontend Developer</p>
                </div>
              </div>

              <div className="profile-card__details">
                <div className="profile-card__detail-item">
                  21 years old — UI/UX & Frontend Developer
                </div>
                <div className="profile-card__detail-item">
                  <b>Based in</b>
                  Bandung & Tenggarong
                </div>
                <div className="profile-card__detail-item">
                  <b>S1 Informatika</b>
                  Telkom University
                  <span>2023 - Present</span>
                </div>
                <div className="profile-card__detail-item">
                  <b>IPA</b>
                  SMAN 2 Tenggarong
                  <span>2020 - 2023</span>
                </div>
              </div>

              <div className="profile-card__socials">
                <a href="https://www.instagram.com/rifqinaufll_?igsh=MWxja25qMXZ4ZWVkcg%3D%3D&utm_source=qr" className="profile-card__social-link" title="Instagram"><FaInstagram /></a>
                <a href="#" className="profile-card__social-link" title="LinkedIn"><FaLinkedinIn /></a>
                <a href="https://github.com/rifqinauval2404-cmyk" className="profile-card__social-link" title="GitHub"><FaGithub /></a>

              </div>
            </div>
          </div>

          {/* Right Column - Intro & Skills */}
          <div className="about__right fade-in-right">
            <div className="section-label">
              <span className="section-label__dot" />
              about me
            </div>
            <h2 className="section-title">
              Hi, I'm Rifqi!
            </h2>
            <p className="about__intro">
              As a student and a tech enthusiast, I spend most of my time exploring the latest innovations and learning through building. I’m driven by curiosity, always growing, and using this space to document my journey in the tech world.
            </p>
            <p className="about__intro">
              I’m a firm believer that the best growth happens through connection. Whether it's through social events or organizations, I love meeting new people and learning from diverse perspectives. Let’s connect and create something functional, impactful, and innovative together.
            </p>

            <div className="about__info-card" style={{ marginTop: '20px' }}>
              <div className="about__skills">
                {skills.map((skill) => (
                  <span key={skill} className="about__skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <a href="#kontak" className="about__cta-link" style={{ marginTop: '30px' }} onClick={(e) => {
              e.preventDefault()
              document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Hubungi Saya
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

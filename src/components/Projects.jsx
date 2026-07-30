import { useEffect, useRef } from 'react'
import TypewriterText from './Animations/TypewriterText'

const projects = [
  {
    id: 1,
    icon: '💰',
    image: '/LOGOSIPDANA.jpeg', // Adjusted to correct path
    number: '01',
    title: 'SipDana',
    description:
      'Aplikasi manajemen keuangan pribadi. Memungkinkan pemantauan pengeluaran, pengaturan anggaran, dan analisis keuangan secara real-time.',
    tags: ['Web App', 'Finance', 'Dashboard', 'Keuangan', "Analisis"],
  },
 {
    id: 6,
    icon: '💰',
    image: '/PHOTOCOFF_Logo.png', // User can replace this path
    number: '06',
    title: 'PHOTOCOFF',
    description:
      'Platform untuk Photobooth dengan gaya yang modern dan aesthetic',
    tags: ['Web App', 'Web Design', 'UX/UI', 'Desain'],
  },
  {
    id: 3,
    icon: '🧬',
    image: '/Salurin.jpeg', // User can replace this path
    number: '03',
    title: 'Salur-in',
    description:
      'Sebuah platform digital yang memfasilitasi donasi dan distribusi bantuan secara terintegrasi. Berbasis Web App, Salur-in dirancang untuk menghubungkan donatur dengan penerima bantuan secara efisien dan transparan, mencakup berbagai kanal donasi serta manajemen program bantuan.',
    tags: ['Web App', 'Web Design', 'UX/UI', 'Desain'],
  },
  {
    id: 4,
    icon: '💰',
    image: '/logo_urunan.jpeg', // User can replace this path
    number: '04',
    title: 'Urunan.ae',
    description:
      'aplikasi untuk split bill dengan mudah',
    tags: ['Web App', 'Web Design', 'UX/UI', 'Desain'],
  },
  {
    id: 5,
    icon: '💰',
    image: '/logo_DuitFam.jpeg', // User can replace this path
    number: '05',
    title: 'DuitFam',
    description:
      'Aplikasi manajemen keuangan yang dirancang khusus untuk keluarga. DuitFam memudahkan anggota keluarga dalam memantau pengeluaran bersama, dan melacak riwayat transaksi secara real-time. Dengan fitur-fitur intuitif.',
    tags: ['Web App', 'Web Design', 'UX/UI', 'Desain'],
  },
  
  {
    id: 6,
    icon: '📈',
    image: '/SMB.jpeg', // User can replace this path
    number: '02',
    title: 'Smanda Belajar',
    description:
      'Aplikasi belajar berbasis Web. Mampu memfasilitasi pembelajaran yang lebih interaktif dan menyenangkan.',
    tags: ['Web App', 'Web Design', 'UX/UI', 'Desain'],
  },
]

const Projects = () => {
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
      { threshold: 0.08 }
    )

    const elements = sectionRef.current?.querySelectorAll('.fade-in')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="proyek" ref={sectionRef}>
      <div className="container">
        {/* Project Cards */}
        <div className="projects fade-in" style={{ paddingTop: 0 }}>
          <div className="section-label">
            <span className="section-label__dot" />
            Proyek
          </div>
          <h2 className="section-title"><TypewriterText text="Work Archive" delay={80} /></h2>
          <p className="section-subtitle">
            Proyek-proyek utama yang telah saya kembangkan.
          </p>

          <div className="projects__grid">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card fade-in"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="project-card__image-container">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="project-card__img" />
                  ) : (
                    <div className="project-card__icon">{project.icon}</div>
                  )}
                </div>
                <div className="project-card__content">
                  <span className="project-card__category">{project.tags[0]}</span>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__description">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects

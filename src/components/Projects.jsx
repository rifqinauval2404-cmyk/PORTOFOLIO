import { useEffect, useRef } from 'react'

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
    id: 2,
    icon: '📈',
    image: '/SMB.jpeg', // User can replace this path
    number: '02',
    title: 'Smanda Belajar',
    description:
      'Aplikasi belajar berbasis Web. Mampu memfasilitasi pembelajaran yang lebih interaktif dan menyenangkan.',
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
]

const experience = [

  {
    role: 'Education & Documentation Coordinator',
    company: 'SMP TELKOM BANDUNG',
    period: '2026',
    description: 'Melakukan analisis komparatif performa algoritma LSTM dan SVR untuk memprediksi harga saham dengan akurasi yang optimal.',
  },
  {
    role: 'Data Entry',
    company: 'Dinas Pendidikan dan Kebudayaan',
    period: '2024',
    description: 'Mengelola administratif dan memvalidasi dokumen operasional kantor',
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
    <section className="section" id="pengalaman" ref={sectionRef}>
      <div className="container">
        {/* Experience Timeline */}
        <div className="experience fade-in" style={{ paddingTop: 0 }}>
          <div className="section-label">
            <span className="section-label__dot" />
            Experience
          </div>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            Beberapa pencapaian dan peran yang telah saya jalani selama kuliah.
          </p>

          <div className="experience__list">
            {experience.map((item, i) => (
              <div
                key={i}
                className="experience__item fade-in"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div>
                  <div className="experience__role">{item.role}</div>
                  <div className="experience__company">{item.company}</div>
                  <p className="experience__description">{item.description}</p>
                </div>
                <div className="experience__dot-col">
                  <div className="experience__dot" />
                </div>
                <div className="experience__period">{item.period}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Cards */}
        <div className="projects fade-in" style={{ paddingTop: 80 }}>
          <div className="section-label">
            <span className="section-label__dot" />
            Proyek
          </div>
          <h2 className="section-title">Work Archive</h2>
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
                  <div className="project-card__number">{project.number}</div>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__description">{project.description}</p>
                  <div className="project-card__tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-card__tag">{tag}</span>
                    ))}
                  </div>
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

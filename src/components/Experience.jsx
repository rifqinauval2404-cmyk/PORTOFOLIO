import { useEffect, useRef } from 'react'
import TypewriterText from './Animations/TypewriterText'

const professionalExperience = [
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

const organizationExperience = [
  {
    id: 1,
    role: 'Staff of Creative & Design Division',
    organization: 'Himpunan Mahasiswa Informatika (HMIF) Telkom University',
    period: '2023 - Present',
    description: 'Bertanggung jawab atas pembuatan aset visual, publikasi media sosial, dan merancang UI/UX untuk website event Himpunan. Berkolaborasi dengan tim untuk meningkatkan engagement media sosial hingga 40%.',
    tags: ['UI/UX Design', 'Branding', 'Figma'],
    size: 'large',
    color: 'purple',
    icon: '🚀',
  },
  {
    id: 2,
    role: 'Ketua Divisi Hubungan Masyarakat (Humas)',
    organization: 'OSIS SMAN 2 Tenggarong',
    period: '2021 - 2022',
    description: 'Memimpin koordinasi publikasi dan dokumentasi seluruh kegiatan sekolah. Berhasil menyelenggarakan 5+ festival seni dan olahraga tingkat kabupaten, serta menjalin kerja sama sponsor dengan pihak luar.',
    tags: ['Leadership', 'Public Speaking', 'Event Organizing'],
    size: 'tall',
    color: 'blue',
    icon: '📢',
  },
  {
    id: 3,
    role: 'Koordinator Web Developer',
    organization: 'Informatics Welcoming Party Telkom University',
    period: '2024',
    description: 'Memimpin tim pengembang untuk membuat website interaktif penyambutan mahasiswa baru Informatika Telkom University.',
    tags: ['React', 'CSS', 'Teamwork'],
    size: 'small',
    color: 'green',
    icon: '💻',
  },
  {
    id: 4,
    role: 'UI/UX & Frontend Tutor',
    organization: 'Google Developer Student Clubs (GDSC) Telkom University',
    period: '2024 - Present',
    description: 'Menjadi tutor kelas UI/UX & Web Development dasar bagi anggota GDSC, membimbing pembuatan prototype portofolio menarik.',
    tags: ['Mentoring', 'Frontend', 'Figma'],
    size: 'small',
    color: 'pink',
    icon: '🎨',
  },
  {
    id: 5,
    role: 'Staff Dokumentasi & Publikasi',
    organization: 'Pengabdian Masyarakat (Community Service) Bandung',
    period: '2024',
    description: 'Mengambil dokumentasi video/foto kegiatan pengabdian masyarakat di desa terpencil, serta mendesain media edukasi literasi digital bagi anak-anak usia sekolah dasar.',
    tags: ['Photography', 'Social Service', 'Videography'],
    size: 'wide',
    color: 'orange',
    icon: '📷',
  },
  {
    id: 6,
    role: 'Staff of Creative & Design Division',
    organization: 'Himpunan Mahasiswa Informatika (HMIF) Telkom University',
    period: '2023 - Present',
    description: 'Bertanggung jawab atas pembuatan aset visual, publikasi media sosial, dan merancang UI/UX untuk website event Himpunan. Berkolaborasi dengan tim untuk meningkatkan engagement media sosial hingga 40%.',
    tags: ['UI/UX Design', 'Branding', 'Figma'],
    size: 'large',
    color: 'purple',
    icon: '🚀',
  },
]
const Experience = () => {
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

  // Mouse spotlight hover effect logic
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--x', `${x}px`)
    card.style.setProperty('--y', `${y}px`)
  }

  return (
    <section className="section" id="pengalaman" ref={sectionRef}>
      <div className="container">
        {/* Professional Experience Section */}
        <div className="experience fade-in" style={{ paddingTop: 0 }}>
          <div className="section-label">
            <span className="section-label__dot" />
            Experience
          </div>
          <h2 className="section-title">
            <TypewriterText text="Professional Experience" delay={80} />
          </h2>
          <p className="section-subtitle">
            Beberapa pencapaian dan peran profesional yang telah saya jalani.
          </p>

          <div className="experience__list">
            {professionalExperience.map((item, i) => (
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

        {/* Organization Experience Section (Bento Grid) */}
        <div className="org-experience fade-in">
          <div className="section-label">
            <span className="section-label__dot" />
            Leadership & Activity
          </div>
          <h2 className="section-title">
            <TypewriterText text="Organization Experience" delay={80} />
          </h2>
          <p className="section-subtitle">
            Keterlibatan saya dalam organisasi kampus maupun luar kampus untuk mengasah soft skill dan kolaborasi.
          </p>

          <div className="bento-grid">
            {organizationExperience.map((item, i) => (
              <div
                key={item.id}
                className={`bento-card bento-card--${item.color} fade-in`}
                style={{ transitionDelay: `${i * 0.1}s` }}
                onMouseMove={handleMouseMove}
              >
                <div className="bento-card__header">
                  <div className="bento-card__icon-wrapper">
                    {`0${i + 1}`}
                  </div>
                  <span className="bento-card__period">{item.period}</span>
                </div>

                <div className="bento-card__body">
                  <h3 className="bento-card__role">{item.role}</h3>
                  <div className="bento-card__org">{item.organization}</div>
                  <p className="bento-card__desc">{item.description}</p>
                </div>

                <div className="bento-card__footer">
                  {item.tags.map((tag) => (
                    <span key={tag} className="bento-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience

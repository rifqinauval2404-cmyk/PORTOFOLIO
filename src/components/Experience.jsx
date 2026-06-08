import { useEffect, useRef } from 'react'
import TypewriterText from './Animations/TypewriterText'
import CircularGallery from './CircularGallery'

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
    role: 'Anggota Divisi Pengembangan Karakter',
    organization: 'Budi Pekerti ',
    period: '2024 - 2025',
    description: 'Ketua Pelaksana Webinar “Developing Strong Character for Future Leaders” (2025). Bendahara Seminar “How improve A Good Habit” (2025) ',
    size: 'large',
    color: 'purple',
    icon: '🚀',
  },
  {
    id: 2,
    role: 'Anggota Divisi Logistik',
    organization: 'Intelekta',
    period: '2025',
    description: 'Bertanggung jawab atas pengelolaan inventaris, perlengkapan, dan logistik untuk seluruh kegiatan organisasi. Mengatur jadwal peminjaman dan memastikan ketersediaan alat untuk acara sekolah dan ekstrakurikuler.',
    size: 'tall',
    color: 'blue',
    icon: '📢',
  },
  {
    id: 3,
    role: 'Anggota Divisi Sponsor dan Penggalangan dana.',
    organization: 'Investprenereur ',
    period: '2026 - Sekarang',
    description: 'Bertanggung jawab mencari pendanaan untuk kegiatan organisasi.',
    size: 'small',
    color: 'green',
    icon: '💻',
  },
  {
    id: 4,
    role: 'Anggota',
    organization: 'Fortran',
    period: '2024',
    description: 'Anggota aktif dalam kegiatan Fortran yang bergerak dalam bidang teknologi, inovasi dan pengembangan karakter.',
    size: 'small',
    color: 'pink',
    icon: '🎨',
  },
]

const galleryItems = [
  {
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    text: 'Webinar Leadership'
  },
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
    text: 'Seminar Habit'
  },
  {
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
    text: 'Divisi Logistik'
  },
  {
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop',
    text: 'Investpreneur Funding'
  },
  {
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    text: 'Fortran Tech Dev'
  },
  {
    image: '/photo_juara.jpeg',
    text: 'Achievement'
  },
  {
    image: '/pototgg.png',
    text: 'Campus Life'
  }
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


                {item.tags && item.tags.length > 0 && (
                  <div className="bento-card__footer">
                    {item.tags.map((tag) => (
                      <span key={tag} className="bento-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="gallery-section fade-in">
          <div className="section-label">
            <span className="section-label__dot" />
            Gallery
          </div>
          <h2 className="section-title">
            <TypewriterText text="Moments & Memories" delay={80} />
          </h2>
          <p className="section-subtitle">
            Kumpulan dokumentasi kegiatan organisasi dan pengalaman akademik selama masa kuliah.
          </p>
          <div className="gallery-container">
            <CircularGallery items={galleryItems} bend={3} textColor="#ffffff" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience

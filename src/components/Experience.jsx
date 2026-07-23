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
    organization: 'Budi Pekerti',
    period: '2024 - 2025',
    description: 'Ketua Pelaksana Webinar “Developing Strong Character for Future Leaders” (2025). Bendahara Seminar “How improve A Good Habit” (2025) ',
  },
  {
    id: 2,
    role: 'Anggota Divisi Logistik',
    organization: 'Intelekta',
    period: '2025',
    description: 'Bertanggung jawab atas pengelolaan inventaris, perlengkapan, dan logistik untuk seluruh kegiatan organisasi. Mengatur jadwal peminjaman dan memastikan ketersediaan alat untuk acara sekolah dan ekstrakurikuler.',
  },
  {
    id: 3,
    role: 'Anggota Divisi Sponsor dan Penggalangan dana.',
    organization: 'Investprenereur',
    period: '2026 - Sekarang',
    description: 'Bertanggung jawab mencari pendanaan untuk kegiatan organisasi.',
    live: true,
  },
  {
    id: 4,
    role: 'Anggota',
    organization: 'Fortran',
    period: '2024',
    description: 'Anggota aktif dalam kegiatan Fortran yang bergerak dalam bidang teknologi, inovasi dan pengembangan karakter.',
  },
]

const galleryItems = [
  {
    image: 'JahimDay.jpg',
    text: 'HIMA IF'
  },
  {
    image: 'Pegabdian_Masyarakat.jpg',
    text: 'Pegabdian Masyarakat'
  },
  {
    image: 'kwu.jpg',
    text: 'Kewirausahaan'
  },
  {
    image: 'Ospek.jpg',
    text: 'FORTRAN 2024 (Ospek)'
  },
  {
    image: '/Investpreneur.jpg',
    text: 'Investpreneur'
  },
  {
    image: '/KP_PLN.jpg',
    text: 'Kerja Praktek PLTGU'
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
                className="bento-card fade-in"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="bento-card__header">
                  <div className="bento-card__mono">{`0${i + 1}`}</div>
                  <span className={`bento-card__period ${item.live ? 'bento-card__period--live' : ''}`}>
                    {item.period}
                  </span>
                </div>

                <div className="bento-card__body">
                  <div className="bento-card__org">{item.organization}</div>
                  <h3 className="bento-card__role">{item.role}</h3>
                  <p className="bento-card__desc">{item.description}</p>
                </div>
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

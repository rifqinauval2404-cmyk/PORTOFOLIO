const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">RN.</div>
        <p className="footer__text">
          © {year} M. Rifqi Nauval Nibroos — to infinity and beyond
        </p>
        <div className="footer__links">
          <a href="#beranda" className="footer__link" onClick={(e) => {
            e.preventDefault()
            document.getElementById('beranda')?.scrollIntoView({ behavior: 'smooth' })
          }}>Beranda</a>
          <a href="#kontak" className="footer__link" onClick={(e) => {
            e.preventDefault()
            document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' })
          }}>Kontak</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import { FireworksBackground } from './FireworksBackground'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <FireworksBackground
        population={2}
        color={['#8a64ff', '#64a0ff', '#c084fc', '#ff8a64']}
        fireworkSpeed={{ min: 4, max: 8 }}
        fireworkSize={{ min: 2, max: 5 }}
        particleSpeed={{ min: 2, max: 7 }}
        particleSize={{ min: 1, max: 3 }}
      />
      <div className="footer__inner">

        <p className="footer__text" style={{ textAlign: 'center', margin: 'auto' }}>
          © {year} M. Rifqi Nauval Nibroos - to infinity and beyond
        </p>

      </div>
    </footer>
  )
}

export default Footer

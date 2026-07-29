import { FireworksBackground } from './FireworksBackground'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <FireworksBackground
        population={2}
        color={['#ffffff', '#cccccc', '#aaaaaa', '#dddddd']}
        fireworkSpeed={{ min: 4, max: 8 }}
        fireworkSize={{ min: 2, max: 5 }}
        particleSpeed={{ min: 2, max: 7 }}
        particleSize={{ min: 1, max: 3 }}
      />
      <div className="footer__inner">

        <p className="footer__text" style={{ textAlign: 'center', margin: 'auto' }}>
          rifqinauval2404@gmail.com - to infinity and beyond
        </p>

      </div>
    </footer>
  )
}

export default Footer

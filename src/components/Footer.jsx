import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { FireworksBackground } from './FireworksBackground'

const socials = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: <FaLinkedinIn />,
    href: 'https://www.linkedin.com/in/muhammad-rifqi-nauval-nibroos-92538a3ab/',
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: <FaGithub />,
    href: 'https://github.com/rifqinauval2404-cmyk',
  },
]

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
        <div className="footer__top">
          <div className="footer__brand">M. Rifqi Nauval N.</div>

          <div className="footer__socials">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                className={`footer__social footer__social--${social.id}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {year} M. Rifqi Nauval Nibroos. All rights reserved.
          </p>
          <p className="footer__text">rifqinauval2404@gmail.com - to infinity and beyond</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

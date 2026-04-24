import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Starfield from './components/Starfield'
import RocketCursor from './components/RocketCursor'

function App() {
  return (
    <div className="app">
      <RocketCursor />
      <Starfield />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

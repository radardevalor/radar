import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/home/Hero'
import Problem from './components/home/Problem'
import Benefits from './components/home/Benefits'
import WhatWeDoSimulator from './components/home/WhatWeDoSimulator'
import HowItWorks from './components/home/HowItWorks'
import DiagnosisTeaser from './components/home/DiagnosisTeaser'
import Results from './components/home/Results'
import ForWhom from './components/home/ForWhom'
import About from './components/home/About'
import Portfolio from './components/home/Portfolio'
import Contact from './components/home/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Benefits />
        <WhatWeDoSimulator />
        <HowItWorks />
        <DiagnosisTeaser />
        <Results />
        <ForWhom />
        <About />
        <Portfolio />
        <Contact />
      </main>
      
      <Footer />
    </>
  )
}

import { useEffect, useState, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Background3D = lazy(() => import('./components/Background3D'))

import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import ProjectsSection from './components/sections/ProjectsSection'
import JourneySection from './components/sections/JourneySection'
import ContactSection from './components/sections/ContactSection'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import CaseStudyPage from './components/CaseStudyPage'
import { getProjectBySlug } from './data/projects'

import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '/'
  })

  // Synchronize browser history and popstate events
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Smooth scroll initialization with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    window.lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateLenis)
      window.lenis = null
      lenis.destroy()
    }
  }, [currentPath])

  const navigate = (url) => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', url)
      setCurrentPath(url)
      window.scrollTo(0, 0)
    }
  }

  // Check if current route is a dedicated case study URL (/work/[slug]/)
  const workMatch = currentPath.match(/^\/work\/([a-z0-9-]+)\/?$/i)
  const caseStudySlug = workMatch ? workMatch[1] : null
  const activeCaseStudy = caseStudySlug ? getProjectBySlug(caseStudySlug) : null

  return (
    <>
      <CustomCursor />
      
      <div className="noise-overlay" style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, opacity: 0.05, mixBlendMode: 'overlay',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
      }}></div>

      {activeCaseStudy ? (
        <CaseStudyPage project={activeCaseStudy} onNavigate={navigate} />
      ) : (
        <>
          <Preloader />
          <Suspense fallback={<div className="background-3d-wrapper" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }} />}>
            <Background3D />
          </Suspense>
          <main style={{ position: 'relative', zIndex: 10 }}>
            <Navbar />
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <JourneySection />
            <ContactSection />
          </main>
        </>
      )}
    </>
  )
}

export default App

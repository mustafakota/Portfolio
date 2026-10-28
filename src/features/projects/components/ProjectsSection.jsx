import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { AnimatePresence } from 'framer-motion'
import { featuredProjects } from '../data/projectsData'
import ProjectComposition from './ProjectComposition'
import ProjectArchive from './ProjectArchive'

const ProjectModal = lazy(() => import('./ProjectModal'))

export default function ProjectsSection() {
  const sectionRef = useRef()
  const trackRef = useRef()
  const progressRef = useRef()
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      const match = path.match(/^\/work\/([^/]+)/)
      if (match) {
        const found = featuredProjects.find((p) => p.id === match[1])
        if (found) {
          setActiveProject(found)
          return
        }
      }
      setActiveProject(null)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleCloseModal = () => {
    setActiveProject(null)
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/work/')) {
      window.history.pushState(null, '', '/')
    }
  }

  useEffect(() => {
    const mm = gsap.matchMedia()

    // Desktop: Horizontal Scroll Experience
    mm.add('(min-width: 901px)', () => {
      let ctx = gsap.context(() => {
        let scrollWidth = trackRef.current.scrollWidth - window.innerWidth

        // Pin the section and translate the track horizontally
        gsap.to(trackRef.current, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: `+=${scrollWidth}`
          }
        })

        // Scrollbar progress indicator
        if (progressRef.current) {
          gsap.fromTo(
            progressRef.current,
            { x: 0 },
            {
              x: 225,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                scrub: 1,
                start: 'top top',
                end: `+=${scrollWidth}`
              }
            }
          )
        }
      }, sectionRef)

      return () => ctx.revert()
    })

    // Mobile: Standard Vertical Fallback
    mm.add('(max-width: 900px)', () => {
      let ctx = gsap.context(() => {
        const slides = gsap.utils.toArray('.project-slide')
        slides.forEach((slide, i) => {
          if (i === 0) return

          gsap.fromTo(
            slide,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: slide,
                start: 'top 85%'
              }
            }
          )
        })
      }, sectionRef)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} style={{ overflow: 'hidden', backgroundColor: 'transparent', position: 'relative' }}>
      <div ref={trackRef} className="projects-track">
        {/* Intro Slide */}
        <div className="project-slide intro-slide" style={{ position: 'relative' }}>
          {/* Massive Hollow Background Text */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100vw',
              textAlign: 'center',
              pointerEvents: 'none',
              zIndex: 0
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(8rem, 30vw, 30rem)',
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 700,
                margin: 0,
                color: 'transparent',
                WebkitTextStroke: '3px rgba(255,255,255,0.12)',
                whiteSpace: 'nowrap'
              }}
            >
              WORK
            </h2>
          </div>

          <div style={{ textAlign: 'center', padding: '0 5vw', maxWidth: '800px', position: 'relative', zIndex: 1 }}>
            <h2 className="text-section-title">Curated Exhibitions.</h2>
            <p className="text-body" style={{ margin: '0 auto' }}>
              Selected works focusing on premium interfaces, robust design systems, and digital product building.
            </p>

            {/* Scroll Indicator */}
            <div
              className="projects-scroll-indicator"
              style={{
                marginTop: '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                opacity: 0.6
              }}
            >
              <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem' }}>
                Scroll to Explore
              </span>
              <div
                style={{
                  width: '1px',
                  height: '60px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '50%',
                    backgroundColor: 'var(--text-primary)',
                    animation: 'scroll-down 2s infinite'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Featured Project Slides */}
        {featuredProjects.map((proj, i) => (
          <div key={proj.title} className="project-slide">
            <div className="project-grid">
              {/* Art-Directed Layered Window Composition (Zero Cropping, Stable Presentation) */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', order: i % 2 === 0 ? 1 : 2, width: '100%' }}>
                <ProjectComposition project={proj} onOpen={() => setActiveProject(proj)} />
              </div>

              {/* Project Content */}
              <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                <p
                  style={{
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: 'var(--text-secondary)',
                    marginBottom: '16px',
                    fontSize: '0.875rem'
                  }}
                >
                  {proj.role}
                </p>
                <h3
                  style={{
                    fontSize: 'clamp(2.75rem, 4.5vw, 4.25rem)',
                    fontFamily: "'Clash Display', sans-serif",
                    marginBottom: '24px',
                    lineHeight: 1.1
                  }}
                >
                  {proj.title}
                </h3>
                <p className="text-body" style={{ marginBottom: '40px' }}>
                  {proj.desc}
                </p>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
                  {proj.tags.map((tag) => (
                    <span key={tag} className="glass-panel" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={`/work/${proj.id}/`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                      e.preventDefault()
                      setActiveProject(proj)
                      if (typeof window !== 'undefined') {
                        window.history.pushState({ projectId: proj.id }, '', `/work/${proj.id}/`)
                      }
                    }
                  }}
                  style={{
                    display: 'inline-block',
                    padding: '16px 32px',
                    border: '1px solid var(--text-primary)',
                    color: 'var(--text-primary)',
                    borderRadius: '30px',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    background: 'transparent',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--text-primary)'
                    e.currentTarget.style.color = 'var(--bg-color)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--text-primary)'
                  }}
                  aria-label={`View ${proj.title} Case Study`}
                >
                  View Case Study
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* View All Projects / Archive Slide */}
        <ProjectArchive onSelectProject={(proj) => setActiveProject(proj)} />
      </div>

      {/* Horizontal Progress Bar (Desktop only) */}
      <div
        className="horizontal-progress"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px',
          height: '2px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          zIndex: 10
        }}
      >
        <div
          ref={progressRef}
          style={{
            width: '75px',
            height: '100%',
            backgroundColor: 'var(--text-primary)',
            borderRadius: '2px'
          }}
        />
      </div>

      {/* Full-Screen Case Study Modal */}
      <AnimatePresence>
        {activeProject && (
          <Suspense fallback={null}>
            <ProjectModal
              project={activeProject}
              onClose={handleCloseModal}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </section>
  )
}

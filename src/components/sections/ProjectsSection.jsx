import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import { Layers, ChevronDown, ChevronUp, ArrowDown, ExternalLink } from 'lucide-react'
import ProjectModal from '../ProjectModal'
import { featuredProjects, remainingProjects } from '../../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsSection() {
  const sectionRef = useRef()
  const pinWrapperRef = useRef()
  const trackRef = useRef()
  const progressRef = useRef()
  const [activeProject, setActiveProject] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const mm = gsap.matchMedia()

    // Desktop: Horizontal Scroll Hijack
    mm.add('(min-width: 901px)', () => {
      let ctx = gsap.context(() => {
        if (!trackRef.current || !pinWrapperRef.current) return

        let scrollWidth = trackRef.current.scrollWidth - window.innerWidth

        // Pin the wrapper and translate the track
        gsap.to(trackRef.current, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: `+=${scrollWidth}`,
            invalidateOnRefresh: true
          }
        })

        // Animate the premium scrollbar thumb
        if (progressRef.current) {
          gsap.fromTo(
            progressRef.current,
            { x: 0 },
            {
              x: 225,
              ease: 'none',
              scrollTrigger: {
                trigger: pinWrapperRef.current,
                scrub: 1,
                start: 'top top',
                end: `+=${scrollWidth}`,
                invalidateOnRefresh: true
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

  const toggleAllProjects = () => {
    if (!isExpanded) {
      setIsExpanded(true)
      setTimeout(() => {
        ScrollTrigger.refresh()
        const grid = document.getElementById('all-projects-grid')
        if (grid) {
          if (window.lenis) {
            window.lenis.scrollTo(grid, { offset: -40, duration: 1.2 })
          } else {
            grid.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }, 100)
    } else {
      const trigger = document.getElementById('see-all-card') || pinWrapperRef.current || sectionRef.current
      if (trigger) {
        if (window.lenis) {
          window.lenis.scrollTo(trigger, { offset: -80, duration: 0.8 })
        } else {
          trigger.scrollIntoView({ behavior: 'smooth' })
        }
      }
      setTimeout(() => {
        setIsExpanded(false)
        setTimeout(() => ScrollTrigger.refresh(), 300)
      }, 350)
    }
  }

  const scrollToGrid = () => {
    const grid = document.getElementById('all-projects-grid')
    if (grid) {
      if (window.lenis) {
        window.lenis.scrollTo(grid, { offset: -40, duration: 1 })
      } else {
        grid.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="projects" ref={sectionRef} style={{ overflow: 'visible', backgroundColor: 'transparent', position: 'relative' }}>

      {/* Horizontal Scroll Track Wrapper (Pinned on Desktop) */}
      <div ref={pinWrapperRef} className="projects-horizontal-wrapper">
        <div ref={trackRef} className="projects-track">

          {/* Intro Slide */}
          <div className="project-slide">
            <div className="hollow-bg-text">
              <h2>WORK</h2>
            </div>

            <div className="intro-slide-content">
              <div className="intro-kicker">
                <span className="project-kicker-dot" />
                <span>Curated Works</span>
              </div>
              <h2 className="intro-title">Curated Exhibitions.</h2>
              <p className="intro-desc">
                Selected works focusing on premium interfaces, robust design systems, and digital storytelling.
              </p>

              {/* Scroll Indicator */}
              <div className="intro-scroll-indicator">
                <span className="intro-scroll-text">Scroll to Explore</span>
                <div className="intro-scroll-line">
                  <div className="intro-scroll-line-bar" />
                </div>
              </div>
            </div>
          </div>

          {/* 3 Featured Projects in Exact Order: Diamond Fibre, ALUXSYSTEM, Dayora */}
          {featuredProjects.map((proj, i) => {
            const isDayora = proj.title === 'Dayora'

            return (
              <div key={proj.title} className="project-slide">
                <div className="project-grid">

                  <div className="project-media-col" style={{ order: i % 2 === 0 ? 1 : 2 }}>
                    <div className="project-mockup-container">
                      {/* Primary Browser Mockup */}
                      <div className="browser-mockup primary">
                        <div className="browser-chrome">
                          <div className="browser-controls">
                            <span className="window-dot dot-red" />
                            <span className="window-dot dot-yellow" />
                            <span className="window-dot dot-green" />
                          </div>
                          <div className="browser-address-bar">
                            <span className="address-lock">🔒</span>
                            <span className="address-text">{proj.url}</span>
                          </div>
                        </div>
                        <div className="browser-viewport">
                          <img
                            className="project-image browser-screen-img"
                            src={proj.image}
                            alt={proj.title}
                          />
                        </div>
                      </div>

                      {/* Complementary Floating Screen Mockup */}
                      {proj.image1 && (
                        <div className="browser-mockup secondary">
                          <div className="browser-chrome mini">
                            <div className="browser-controls mini">
                              <span className="window-dot dot-red mini" />
                              <span className="window-dot dot-yellow mini" />
                              <span className="window-dot dot-green mini" />
                            </div>
                            <div className="browser-address-bar mini">
                              <span className="address-text">{proj.urlSecondary}</span>
                            </div>
                          </div>
                          <div className="browser-viewport mini">
                            <img
                              className="browser-secondary-img"
                              src={proj.image1}
                              alt={`${proj.title} complementary view`}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="project-content-col" style={{ order: i % 2 === 0 ? 2 : 1 }}>
                    <div className="project-kicker">
                      <span className="project-kicker-dot" />
                      <span>{proj.role}</span>
                    </div>

                    <h3 className="project-title">
                      {proj.title}
                    </h3>

                    <p className="project-desc">
                      {proj.desc}
                    </p>

                    <div className="project-tags">
                      {proj.tags.map(tag => (
                        <span key={tag} className="project-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="project-actions">
                      <button
                        className="btn-project-primary"
                        onClick={() => setActiveProject(proj)}
                      >
                        View Case Study
                      </button>

                      {isDayora && (
                        <button
                          className="btn-project-secondary"
                          onClick={toggleAllProjects}
                        >
                          <span>{isExpanded ? 'Collapse Archive' : 'See all projects'}</span>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )
          })}

          {/* Slide 4: Dedicated See All Projects slide (After Dayora) */}
          <div className="project-slide see-all-slide">
            <div className="hollow-bg-text">
              <h2>ARCHIVE</h2>
            </div>

            <div id="see-all-card" className="see-all-card glass-panel">
              <div className="see-all-badge">
                <Layers size={14} />
                <span>Curated Archive • 3 More Works</span>
              </div>

              <h3 className="see-all-title">More Projects.</h3>

              <p className="see-all-desc">
                Explore additional mobile prototypes, subscription management systems, and interactive digital concepts.
              </p>

              <div className="see-all-btn-wrapper">
                <button
                  id="see-all-projects-btn"
                  className="primary-action-btn"
                  onClick={toggleAllProjects}
                >
                  <span>{isExpanded ? 'Collapse Archive' : 'See all projects (3)'}</span>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isExpanded && (
                  <button
                    className="secondary-scroll-btn"
                    onClick={scrollToGrid}
                  >
                    <span>Jump to Grid Below</span>
                    <ArrowDown size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Premium Scrollbar Indicator (Desktop) */}
        <div className="horizontal-progress-bar">
          <div ref={progressRef} className="horizontal-progress-thumb" />
        </div>
      </div>

      {/* Vertically scrollable grid revealed below */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="all-projects-grid"
            className="all-projects-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-container" style={{ paddingTop: '60px', paddingBottom: '100px' }}>
              {/* Header */}
              <div className="archive-header">
                <div>
                  <div className="archive-kicker">
                    <span className="dot" />
                    <span>PROJECT ARCHIVE</span>
                  </div>
                  <h2 className="archive-header-title">
                    All Archive Projects.
                  </h2>
                  <p className="archive-header-desc">
                    Additional selected works across mobile UI, systems thinking, and interactive experiences.
                  </p>
                </div>

                <button
                  onClick={toggleAllProjects}
                  className="collapse-grid-btn"
                  title="Collapse project archive"
                >
                  <span>Collapse Archive</span>
                  <ChevronUp size={16} />
                </button>
              </div>

              {/* Grid of Cards */}
              <div className="archive-grid">
                {remainingProjects.map((proj) => (
                  <div key={proj.title} className="archive-card glass-panel">
                    {/* Thumbnail */}
                    <div
                      className="archive-thumb-wrap"
                      onClick={() => setActiveProject(proj)}
                    >
                      <img
                        className="archive-project-image"
                        src={proj.image}
                        alt={proj.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          display: 'block'
                        }}
                      />
                      <div className="archive-thumb-badge">
                        {proj.device === 'mobile' ? 'Mobile App' : 'Web / SaaS'}
                      </div>
                      <div className="archive-thumb-overlay">
                        <span>View Case Study →</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="archive-card-content">
                      <span className="archive-role">{proj.role}</span>
                      <h3 className="archive-title">{proj.title}</h3>
                      <p className="archive-desc">{proj.desc}</p>

                      <div className="archive-tags">
                        {proj.tags.map(tag => (
                          <span key={tag} className="archive-tag">{tag}</span>
                        ))}
                      </div>

                      <div className="archive-card-actions">
                        <button
                          onClick={() => setActiveProject(proj)}
                          className="archive-case-study-btn"
                        >
                          View Case Study
                        </button>

                        {proj.link && proj.link !== '#' && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="archive-link-btn"
                            title="Open external project link"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Collapse Bar */}
              <div className="archive-bottom-bar">
                <button
                  onClick={toggleAllProjects}
                  className="collapse-bottom-btn"
                >
                  <span>Collapse Project Archive</span>
                  <ChevronUp size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

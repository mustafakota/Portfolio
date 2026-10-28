import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutText, experienceData } from '../data/experienceData'

gsap.registerPlugin(ScrollTrigger)

export default function JourneySection() {
  const containerRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Cinematic Word Fill Reveal
      const words = containerRef.current.querySelectorAll('.about-word')

      gsap.fromTo(
        words,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: true
          }
        }
      )
    }, containerRef)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" ref={containerRef} className="section-container journey-section">
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <p
          className="journey-tag"
          style={{
            textTransform: 'uppercase',
            letterSpacing: '4px',
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            fontSize: '0.875rem'
          }}
        >
          About
        </p>

        {/* Text Fill Effect */}
        <h2
          ref={textRef}
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontFamily: "'Clash Display', sans-serif",
            lineHeight: 1.2,
            fontWeight: 500,
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: '0.3em',
            rowGap: '0.1em'
          }}
        >
          {aboutText.split(' ').map((word, i) => (
            <span key={i} className="about-word" style={{ willChange: 'opacity' }}>
              {word}
            </span>
          ))}
        </h2>

        {/* Minimalist Journey/Experience */}
        <div className="experience-wrap" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p
            className="journey-tag"
            style={{
              textTransform: 'uppercase',
              letterSpacing: '4px',
              color: 'var(--text-secondary)',
              marginBottom: '32px',
              fontSize: '0.875rem'
            }}
          >
            Experience
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {experienceData.map((item, i) => (
              <div
                key={i}
                className="experience-item"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  padding: '32px 0',
                  gap: '24px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 500, marginBottom: '8px' }}>
                      {item.role}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{item.place}</p>
                  </div>
                  <div
                    className="experience-date-pill"
                    style={{
                      padding: '8px 16px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '30px',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {item.date}
                  </div>
                </div>

                {item.tasks && (
                  <ul
                    style={{
                      listStyleType: 'disc',
                      paddingLeft: '20px',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      margin: 0
                    }}
                  >
                    {item.tasks.map((task, idx) => (
                      <li key={idx} style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                        {task}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

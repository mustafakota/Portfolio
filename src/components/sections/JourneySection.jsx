import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const aboutText = "I am a multi-disciplinary designer focused on creating digital experiences that feel human. I blend strategic user research with premium aesthetics to craft interfaces that don't just work they resonate. My approach is rooted in empathy, iterative prototyping, and an obsessive attention to detail."

export default function JourneySection() {
  const containerRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    // Cinematic Word Fill Reveal
    const words = gsap.utils.toArray('.about-word');

    gsap.fromTo(words,
      { opacity: 0.1 },
      {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: true,
        }
      }
    )
  }, [])

  return (
    <section id="journey" ref={containerRef} className="section-container" style={{ paddingBottom: '160px', paddingTop: '160px' }}>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '0.875rem' }}>
          About
        </p>

        {/* Text Fill Effect */}
        <h2 ref={textRef} style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontFamily: "'Clash Display', sans-serif", lineHeight: 1.2, fontWeight: 500, display: 'flex', flexWrap: 'wrap', columnGap: '0.3em', rowGap: '0.1em' }}>
          {aboutText.split(' ').map((word, i) => (
            <span key={i} className="about-word" style={{ willChange: 'opacity' }}>{word}</span>
          ))}
        </h2>

        {/* Minimalist Journey/Experience */}
        <div style={{ marginTop: '160px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '60px' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--text-secondary)', marginBottom: '45px', fontSize: '0.875rem' }}>
            Experience
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* I removed the 2 parts you mentioned wanting to delete to keep it ultra-clean */}
            {[
              { role: ' Personal Projects', place: 'Freelance', date: 'Sep 2025 - Present' },
              { role: ' UI/UX Designer', place: 'Boardway India', date: 'Jan 2025 - Aug 2025' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '32px 0', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 500, marginBottom: '8px' }}>{item.role}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{item.place}</p>
                </div>
                <div style={{ padding: '8px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

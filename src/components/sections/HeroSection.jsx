import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion'

export default function HeroSection() {
  const containerRef = useRef()
  const imageRef = useRef()

  useEffect(() => {
    gsap.to('.hero-letter', {
      y: 0,
      duration: 1.5,
      stagger: 0.08,
      ease: 'expo.out',
      delay: 3.5
    })

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.05, clipPath: 'inset(100% 0 0 0)' },
      {
        opacity: 1,
        scale: 1,
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.5,
        ease: 'power3.inOut',
        delay: 4.2
      }
    )

    gsap.to('.hero-line', {
      y: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 4.5
    })
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="section-container hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '160px',
        overflow: 'hidden'
      }}
    >

      {/* Hero Composition */}
      <div
        className="hero-composition"
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '60px'
        }}
      >

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.2, ease: 'power3.out' }}
          style={{
            textTransform: 'uppercase',
            letterSpacing: '4px',
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 2vw, 1.75rem)',
            fontWeight: 700,
            marginBottom: '24px',
            position: 'relative',
            zIndex: 3,
            textAlign: 'center'
          }}
        >
          UI/UX & Product Designer
        </motion.p>

        {/* Huge Name */}
        <h1
          className="hero-title"
          style={{
            fontSize: 'clamp(5rem, 15vw, 15rem)',
            fontFamily: "'Clash Display', sans-serif",
            fontWeight: 700,
            lineHeight: 0.8,
            textTransform: 'uppercase',
            textAlign: 'center',
            color: 'var(--text-primary)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            whiteSpace: 'nowrap',
            display: 'flex',
            overflow: 'hidden',
            paddingTop: '20px'
          }}
        >
          {['M', 'U', 'S', 'T', 'A', 'F', 'A'].map((letter, i) => (
            <span
              key={i}
              className="hero-letter"
              style={{
                display: 'inline-block',
                transform: 'translateY(110%)'
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Portrait */}
        <div
          ref={imageRef}
          className="hero-image"
          style={{
            width: 'clamp(200px, 25vw, 350px)',
            height: 'clamp(300px, 35vw, 450px)',
            borderRadius: '200px 200px 20px 20px',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 2,
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            transform: 'translateY(40px)'
          }}
        >
          <img
            src="/ChatGPT Image May 7, 2026, 05_54_45 PM.png"
            alt="Mustafa Portrait"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(13,13,14,0.6), transparent)'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4.6 }}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: "'Clash Display', sans-serif",
            marginBottom: '24px',
            fontWeight: 500
          }}
        >
          <div style={{ overflow: 'hidden', paddingBottom: '10px' }}>
            <span
              className="hero-line"
              style={{
                display: 'block',
                transform: 'translateY(100%)'
              }}
            >
              Designing Digital Experiences
            </span>
          </div>

          <div style={{ overflow: 'hidden', paddingBottom: '10px' }}>
            <span
              className="hero-line"
              style={{
                display: 'block',
                transform: 'translateY(100%)',
                color: 'var(--text-secondary)',
                fontStyle: 'italic'
              }}
            >
              That Feel Human.
            </span>
          </div>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 5.2,
            ease: 'power3.out'
          }}
          className="text-body hero-description"
          style={{
            maxWidth: '600px',
            margin: '0 auto 48px',
            fontSize: '1.125rem'
          }}
        >
          UI/UX & Product Designer with a strong foundation in user
          research, wireframing, and visual design. Passionate about
          creating clean, user-centric interfaces.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 5.4,
            ease: 'power3.out'
          }}
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={() =>
              window.lenis?.scrollTo('#projects', { duration: 1.5 })
            }
            style={{
              padding: '16px 32px',
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-color)',
              borderRadius: '30px',
              fontWeight: 500,
              fontSize: '1rem',
              transition: 'transform 0.3s ease',
              cursor: 'none'
            }}
          >
            View Projects
          </button>

          <button
            onClick={() =>
              window.lenis?.scrollTo('#contact', { duration: 1.5 })
            }
            className="glass-panel"
            style={{
              padding: '16px 32px',
              color: 'var(--text-primary)',
              borderRadius: '30px',
              fontWeight: 500,
              fontSize: '1rem',
              transition: 'background 0.3s ease',
              cursor: 'none'
            }}
          >
            Contact Me
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
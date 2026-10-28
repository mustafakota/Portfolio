import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowUpRight, ArrowUp } from 'lucide-react'
import { contactData } from '../data/contactData'

export default function ContactSection() {
  const sectionRef = useRef()
  const marqueeRef = useRef()
  const buttonRef = useRef()

  useEffect(() => {
    // Infinite Marquee Animation
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 30, // Ambient feel
      repeat: -1
    })

    // Magnetic Button Physics
    const btn = buttonRef.current
    if (btn) {
      const handleMouseMove = (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' })
      }

      const handleMouseLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' })
      }

      btn.addEventListener('mousemove', handleMouseMove)
      btn.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        btn.removeEventListener('mousemove', handleMouseMove)
        btn.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-container contact-section"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden'
      }}
    >
      {/* Infinite Scrolling Marquee */}
      <div
        className="contact-marquee-wrapper"
        style={{
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div ref={marqueeRef} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: 'inline-block' }}>
              <span
                className="contact-marquee-text"
                style={{
                  fontSize: 'clamp(4rem, 10vw, 10rem)',
                  fontFamily: "'Clash Display', sans-serif",
                  fontWeight: 700,
                  lineHeight: 0.8,
                  textTransform: 'uppercase',
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                  paddingRight: '50px'
                }}
              >
                LET'S TALK <span style={{ color: 'var(--text-secondary)', WebkitTextStroke: '0' }}>—</span>
              </span>
              <span
                className="contact-marquee-text"
                style={{
                  fontSize: 'clamp(4rem, 10vw, 10rem)',
                  fontFamily: "'Clash Display', sans-serif",
                  fontWeight: 700,
                  lineHeight: 0.8,
                  textTransform: 'uppercase',
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                  paddingRight: '50px'
                }}
              >
                LET'S TALK <span style={{ color: 'var(--text-secondary)', WebkitTextStroke: '0' }}>—</span>
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Magnetic Email CTA */}
      <div
        className="contact-cta-wrap"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <p
          className="contact-prompt"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontFamily: "'Clash Display', sans-serif",
            fontWeight: 500,
            marginBottom: '8px'
          }}
        >
          {contactData.prompt}
        </p>
        <p
          className="contact-subprompt"
          style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            marginBottom: '40px'
          }}
        >
          {contactData.subprompt}
        </p>
        <a
          ref={buttonRef}
          href={`mailto:${contactData.email}?subject=${encodeURIComponent(contactData.subject)}`}
          className="contact-btn"
          style={{
            padding: '24px 64px',
            borderRadius: '100px',
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-color)',
            fontSize: '1.25rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            textDecoration: 'none',
            willChange: 'transform'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,255,255,0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {contactData.ctaLabel}
          <ArrowUpRight size={24} />
        </a>
      </div>

      {/* Footer Grid */}
      <div
        className="footer-grid"
        style={{
          marginTop: 'auto',
          display: 'grid',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          position: 'relative'
        }}
      >
        {/* Socials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '8px'
            }}
          >
            Socials
          </h4>
          {contactData.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              style={{
                fontSize: '1.125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.3s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            >
              {social.name} <ArrowUpRight size={16} />
            </a>
          ))}
        </div>

        {/* Status & Local Time */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h4
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '16px'
              }}
            >
              Status
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  boxShadow: '0 0 10px rgba(74, 222, 128, 0.5)',
                  animation: 'pulse-green 2s infinite'
                }}
              />
              <p style={{ fontSize: '1.125rem', margin: 0 }}>{contactData.status.label}</p>
            </div>
          </div>
          <div>
            <h4
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '8px'
              }}
            >
              Local Time
            </h4>
            <p style={{ fontSize: '1.125rem', margin: 0 }}>
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
            </p>
          </div>
        </div>

        {/* Copyright & Back to Top */}
        <div className="footer-copyright-col" style={{ display: 'flex', flexDirection: 'row', gap: '32px' }}>
          <div>
            <h4
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '8px'
              }}
            >
              Copyright
            </h4>
            <p style={{ fontSize: '1.125rem', margin: 0 }}>© {new Date().getFullYear()} Mustafa.</p>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', margin: 0 }}>All rights reserved.</p>
          </div>

          <button
            className="back-to-top-btn"
            onClick={() => window.lenis?.scrollTo(0, { duration: 2.0 })}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--text-primary)'
              e.currentTarget.style.color = 'var(--bg-color)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
            aria-label="Scroll back to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}

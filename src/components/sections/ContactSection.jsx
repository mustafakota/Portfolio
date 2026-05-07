import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowUpRight, ArrowUp } from 'lucide-react'

export default function ContactSection() {
  const sectionRef = useRef()
  const marqueeRef = useRef()
  const buttonRef = useRef()

  useEffect(() => {
    // Infinite Marquee Animation
    // Moves the container left by exactly half its width, then instantly resets
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 30, // Slowed down significantly for ambient feel
      repeat: -1
    })

    // Magnetic Button Physics
    const btn = buttonRef.current;
    if (btn) {
      const handleMouseMove = (e) => {
        const rect = btn.getBoundingClientRect();
        // Calculate distance from center of the button
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Magnetically pull the button towards the cursor
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
      };

      const handleMouseLeave = () => {
        // Snap back into place with a subtle elastic bounce
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
      };

      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      }
    }
  }, [])

  return (
    <section id="contact" ref={sectionRef} style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingTop: '120px', paddingBottom: '40px', paddingLeft: '5vw', paddingRight: '5vw', overflow: 'hidden' }}>

      {/* Infinite Scrolling Marquee */}
      <div style={{ width: '100vw', marginLeft: '-5vw', overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
        <div ref={marqueeRef} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {/* We repeat the block twice so the -50% shift creates a seamless infinite loop */}
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: 'inline-block' }}>
              <span style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', fontFamily: "'Clash Display', sans-serif", fontWeight: 700, lineHeight: 0.8, textTransform: 'uppercase', color: 'transparent', WebkitTextStroke: '1px var(--text-secondary)', paddingRight: '50px' }}>
                LET'S TALK <span style={{ color: 'var(--text-secondary)', WebkitTextStroke: '0' }}>—</span>
              </span>
              <span style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', fontFamily: "'Clash Display', sans-serif", fontWeight: 700, lineHeight: 0.8, textTransform: 'uppercase', color: 'transparent', WebkitTextStroke: '1px var(--text-secondary)', paddingRight: '50px' }}>
                LET'S TALK <span style={{ color: 'var(--text-secondary)', WebkitTextStroke: '0' }}>—</span>
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Magnetic Email Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px', marginBottom: '80px' }}>
        <a
          ref={buttonRef}
          href="mailto:mustafakota88@gmail.com?subject=Project Inquiry"
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
            willChange: 'transform' // optimize performance for the physics
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,255,255,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Contact Me
          <ArrowUpRight size={24} />
        </a>
      </div>

      {/* Premium Footer Grid */}
      <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '60px', position: 'relative' }}>

        {/* Socials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Socials</h4>
          <a href="https://www.linkedin.com/in/mustafa-kota/" style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.3s', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-secondary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}>LinkedIn <ArrowUpRight size={16} /></a>
          <a href="https://www.instagram.com/ux.by.mustafa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.3s', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-secondary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}>Instagram <ArrowUpRight size={16} /></a>
        </div>

        {/* Status & Local Time */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Status</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80', boxShadow: '0 0 10px rgba(74, 222, 128, 0.5)', animation: 'pulse-green 2s infinite' }} />
              <p style={{ fontSize: '1.125rem', margin: 0 }}>Available for freelance</p>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Local Time</h4>
            <p style={{ fontSize: '1.125rem', margin: 0 }}>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</p>
          </div>
        </div>

        {/* Copyright & Back to Top */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '32px' }}>
          <div>
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Copyright</h4>
            <p style={{ fontSize: '1.125rem', margin: 0 }}>© {new Date().getFullYear()} Mustafa.</p>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', margin: 0 }}>All rights reserved.</p>
          </div>

          <button
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
              flexShrink: 0,
              marginLeft: '80px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--text-primary)';
              e.currentTarget.style.color = 'var(--bg-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            <ArrowUp size={20} />
          </button>
        </div>

      </div>
    </section>
  )
}

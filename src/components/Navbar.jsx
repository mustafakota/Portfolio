import { motion } from 'framer-motion'

export default function Navbar() {
  const handleScroll = (e, targetId) => {
    e.preventDefault()
    if (window.lenis) {
      window.lenis.scrollTo(targetId, { duration: 1.5 })
    } else {
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'power3.out', delay: 0.5 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100, padding: '24px 7vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <div style={{ fontSize: '1.5rem', fontFamily: "'Clash Display', sans-serif", fontWeight: 600, color: 'var(--text-primary)' }}>
        <a
          href="#home"
          onClick={(e) => handleScroll(e, '#home')}
          style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
        >
          Mustafa.
        </a>
      </div>

      <nav className="glass-panel" style={{ padding: '12px 32px', display: 'flex', gap: '32px' }}>
        <a href="#projects" onClick={(e) => handleScroll(e, '#projects')} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', transition: 'color 0.3s ease' }} onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'} onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}>Work</a>
        <a href="#about" onClick={(e) => handleScroll(e, '#about')} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', transition: 'color 0.3s ease' }} onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'} onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}>About</a>
        <a href="#journey" onClick={(e) => handleScroll(e, '#journey')} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', transition: 'color 0.3s ease' }} onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'} onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}>Journey</a>
        <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', transition: 'color 0.3s ease' }} onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'} onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}>Contact</a>
      </nav>
    </motion.header>
  )
}

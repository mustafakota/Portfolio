import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navigationData } from '../../data/navigationData'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = (e, targetId) => {
    e.preventDefault()
    setMenuOpen(false)

    if (window.lenis) {
      window.lenis.scrollTo(targetId, { duration: 1.5 })
    } else {
      document.querySelector(targetId)?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.header
      className="nav-header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'power3.out', delay: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        padding: '24px 7vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {/* Brand Logo */}
      <a
        href="#home"
        className="nav-logo"
        onClick={(e) => handleScroll(e, '#home')}
        style={{
          color: 'var(--text-primary)',
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontFamily: "'Clash Display', sans-serif",
          fontWeight: 600,
          zIndex: 101
        }}
      >
        {navigationData.logoText}
      </a>

      {/* Desktop Navigation Pill */}
      <nav
        className="glass-panel desktop-nav"
        style={{
          padding: '12px 32px',
          display: 'flex',
          gap: '32px'
        }}
        aria-label="Primary Navigation"
      >
        {navigationData.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleScroll(e, link.href)}
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              textDecoration: 'none'
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right Controls: Resume & Mobile Hamburger */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}
      >
        <a
          className="resume-btn"
          href={navigationData.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '10px 20px',
            borderRadius: '999px',
            background: 'white',
            color: 'black',
            fontSize: '0.875rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'opacity 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Resume
        </a>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            zIndex: 102
          }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Slide-down Navigation Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass-panel"
            style={{
              position: 'fixed',
              top: '72px',
              left: '5vw',
              right: '5vw',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              zIndex: 99,
              background: 'rgba(15, 15, 18, 0.96)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px'
            }}
            aria-label="Mobile Navigation"
          >
            {navigationData.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  padding: '8px 0'
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

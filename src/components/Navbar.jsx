import { motion } from 'framer-motion'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
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

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'power3.out', delay: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        padding: window.innerWidth <= 400 ? '18px 20px' : '24px 7vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {/* Logo */}
      <a
        href="#home"
        onClick={(e) => handleScroll(e, '#home')}
        style={{
          color: 'var(--text-primary)',
          textDecoration: 'none',
          fontSize: window.innerWidth <= 400 ? '1.2rem' : '1.5rem',
          fontFamily: "'Clash Display', sans-serif",
          fontWeight: 600,
          zIndex: 101
        }}
      >
        Mustafa.
      </a>

      {/* Desktop Nav */}
      <nav
        className="glass-panel desktop-nav"
        style={{
          padding: '12px 32px',
          display: 'flex',
          gap: '32px'
        }}
      >
        <a
          href="#projects"
          onClick={(e) => handleScroll(e, '#projects')}
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            textDecoration: 'none'
          }}
        >
          Work
        </a>

        <a
          href="#about"
          onClick={(e) => handleScroll(e, '#about')}
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            textDecoration: 'none'
          }}
        >
          About
        </a>

        <a
          href="#journey"
          onClick={(e) => handleScroll(e, '#journey')}
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            textDecoration: 'none'
          }}
        >
          Journey
        </a>

        <a
          href="#contact"
          onClick={(e) => handleScroll(e, '#contact')}
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            textDecoration: 'none'
          }}
        >
          Contact
        </a>
      </nav>

      {/* Right Side */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}
      >
        {/* Resume */}
        <a
          className="resume-btn"
          href="https://drive.google.com/file/d/1jg0Z7N0qVFPGq99sc09LgSnahF-CD-cI/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: window.innerWidth <= 400 ? '8px 14px' : '10px 20px',
            borderRadius: '999px',
            background: 'white',
            color: 'black',
            fontSize: window.innerWidth <= 400 ? '0.7rem' : '0.875rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap'
          }}
        >
          Resume
        </a>

        {/* Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{

            backdropFilter: 'blur(20px)',

            padding: '10px',
            borderRadius: '999px',
            color: 'white',
            cursor: 'pointer',

          }}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: '80px',
            right: '20px',
            width: '180px',
            padding: '20px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            zIndex: 100
          }}
        >
          <a
            href="#projects"
            onClick={(e) => handleScroll(e, '#projects')}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            Work
          </a>

          <a
            href="#about"
            onClick={(e) => handleScroll(e, '#about')}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            About
          </a>

          <a
            href="#journey"
            onClick={(e) => handleScroll(e, '#journey')}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            Journey
          </a>

          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            Contact
          </a>
        </div>
      )}
    </motion.header>
  )
}
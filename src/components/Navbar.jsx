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
      className="navbar-header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'power3.out', delay: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {/* Logo */}
      <a
        href="#home"
        className="navbar-logo"
        onClick={(e) => handleScroll(e, '#home')}
        style={{
          color: 'var(--text-primary)',
          textDecoration: 'none',
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
        className="navbar-actions"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        {/* Resume */}
        <a
          className="resume-btn"
          href="https://drive.google.com/file/d/1jExP9RF2EDszj4kvk0AQ7DP8c-PFoMRA/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>

        {/* Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="glass-panel mobile-menu-dropdown"
        >
          <a
            className="mobile-menu-link"
            href="#projects"
            onClick={(e) => handleScroll(e, '#projects')}
          >
            Work
          </a>

          <a
            className="mobile-menu-link"
            href="#about"
            onClick={(e) => handleScroll(e, '#about')}
          >
            About
          </a>

          <a
            className="mobile-menu-link"
            href="#journey"
            onClick={(e) => handleScroll(e, '#journey')}
          >
            Journey
          </a>

          <a
            className="mobile-menu-link"
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
          >
            Contact
          </a>
        </div>
      )}
    </motion.header>
  )
}
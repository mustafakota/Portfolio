import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    // Prevent background scrolling while allowing data-lenis-prevent to work natively on the modal
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  if (!project) return null

  const heroAlt = project.composition?.primary?.alt || `${project.title} - Interface Overview`
  const img1Alt = project.composition?.secondary?.alt || `${project.title} - Workflow and Details View`
  const img2Alt = `${project.title} - Features and Specifications`

  return (
    <motion.div
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      exit={{ y: '100vh' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      data-lenis-prevent="true"
      className="no-scrollbar"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999999,
        backgroundColor: 'var(--bg-color)',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="modal-close-btn"
        style={{
          position: 'fixed',
          top: '80px',
          right: '40px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          color: 'var(--bg-color)',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="Close Case Study"
      >
        <X size={24} />
      </button>

      {/* Hero Image */}
      <div className="modal-hero-wrap" style={{ width: '100%', height: '75vh', position: 'relative', flexShrink: 0 }}>
        <img
          src={project.image}
          alt={heroAlt}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#111' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-color), transparent)' }} />
      </div>

      {/* Content Details */}
      <div className="modal-content-wrap" style={{ padding: '0 5vw 80px', marginTop: '-60px', position: 'relative', zIndex: 2 }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.875rem' }}>
          {project.role}
        </p>
        <h2 id="modal-project-title" className="modal-title" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontFamily: "'Clash Display', sans-serif", marginBottom: '32px', lineHeight: 1 }}>
          {project.title}
        </h2>

        <div className="modal-overview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', marginTop: '40px' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontFamily: "'Clash Display', sans-serif", marginBottom: '16px' }}>Overview</h3>
            <p className="text-body" style={{ fontSize: '1.125rem', marginBottom: '32px' }}>{project.desc}</p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-cta-btn"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--bg-color)',
                  borderRadius: '30px',
                  fontWeight: 500,
                  transition: 'transform 0.3s ease',
                  fontSize: '1rem',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              >
                {project.id === 'aluxsystem' ? 'Launch Production App ↗' : project.id === 'diamond-fibre' ? 'Visit Live Website ↗' : 'View Prototype / File ↗'}
              </a>

              {['aluxsystem', 'diamond-fibre', 'dayora', 'unroll'].includes(project.id) && (
                <a
                  href={`/work/${project.id}/`}
                  className="modal-cta-btn glass-panel"
                  style={{
                    display: 'inline-block',
                    padding: '16px 28px',
                    color: 'var(--text-primary)',
                    borderRadius: '30px',
                    fontWeight: 500,
                    transition: 'transform 0.3s ease',
                    fontSize: '1rem',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                >
                  Standalone Page ↗
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', fontFamily: "'Clash Display', sans-serif", marginBottom: '16px' }}>Technologies & Tools</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {project.tags.map((tag) => (
                <span key={tag} className="glass-panel" style={{ padding: '10px 20px', fontSize: '0.875rem', borderRadius: '100px' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Deep Dive Content */}
        <div className="modal-deep-dive" style={{ marginTop: '80px', paddingTop: '80px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {/* Introduction */}
          <div style={{ marginBottom: '60px' }}>
            <h3 className="modal-section-title" style={{ fontSize: '2.5rem', fontFamily: "'Clash Display', sans-serif", marginBottom: '24px' }}>
              Introduction
            </h3>
            <p className="text-body" style={{ fontSize: '1.125rem', maxWidth: '800px' }}>
              {project.intro}
            </p>
          </div>

          {/* Placeholder 1 Image */}
          <div
            className={`case-study-image ${project.device}`}
            style={{
              width: '100%',
              maxWidth: project.device === 'mobile' ? '380px' : '1000px',
              margin: '0 auto 60px auto',
              borderRadius: '24px',
              overflow: 'hidden'
            }}
          >
            <img
              src={project.image1}
              alt={img1Alt}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </div>

          {/* Goal */}
          <div style={{ marginBottom: '60px' }}>
            <h3 className="modal-section-title" style={{ fontSize: '2.5rem', fontFamily: "'Clash Display', sans-serif", marginBottom: '24px' }}>
              The Goal
            </h3>
            <p className="text-body" style={{ fontSize: '1.125rem', maxWidth: '800px' }}>
              {project.goal}
            </p>
          </div>

          {/* Placeholder 2 Image */}
          <div
            className={`case-study-image ${project.device}`}
            style={{
              width: '100%',
              maxWidth: project.device === 'mobile' ? '380px' : '1000px',
              margin: '0 auto 60px auto',
              borderRadius: '24px',
              overflow: 'hidden'
            }}
          >
            <img
              src={project.image2}
              alt={img2Alt}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </div>

          {/* Conclusion */}
          <div style={{ marginBottom: '60px' }}>
            <h3 className="modal-section-title" style={{ fontSize: '2.5rem', fontFamily: "'Clash Display', sans-serif", marginBottom: '24px' }}>
              Conclusion
            </h3>
            <p className="text-body" style={{ fontSize: '1.125rem', maxWidth: '800px' }}>
              {project.conclusion}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

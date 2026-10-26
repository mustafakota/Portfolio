import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'

export default function HtmlOverlay({ activeProject, setActiveProject }) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '40px' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)' }}>Alex.Design</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Senior UI/UX Designer</p>
        </div>
        <nav className="glass-panel" style={{ padding: '12px 24px', display: 'flex', gap: '20px' }}>
          <a href="#" style={{ fontSize: '14px', fontWeight: 500 }}>Work</a>
          <a href="#" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>About</a>
          <a href="#" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Contact</a>
        </nav>
      </header>

      {/* Main Content Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'auto' }}>
        
        {/* Left Side */}
        <div style={{ maxWidth: '400px' }}>
          <AnimatePresence mode="wait">
            {!activeProject ? (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 style={{ fontSize: '48px', lineHeight: 1.1, marginBottom: '20px' }}>
                  Crafting Digital Experiences That <span style={{ color: 'var(--accent-color)', fontStyle: 'italic' }}>Matter.</span>
                </h2>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '30px' }}>
                  Explore my curated selection of premium interfaces, ranging from fintech dashboards to high-fashion e-commerce platforms. 
                  Drag to explore the gallery, click a piece to view details.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="project-details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-panel"
                style={{ padding: '30px' }}
              >
                <button 
                  onClick={() => setActiveProject(null)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '20px', padding: 0 }}
                >
                  <ArrowLeft size={16} /> Back to Gallery
                </button>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-color)' }}>{activeProject.subtitle}</span>
                <h2 style={{ fontSize: '36px', marginTop: '8px', marginBottom: '16px' }}>{activeProject.title}</h2>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                  This project focuses on delivering a seamless user experience through intuitive navigation, clean data visualization, and a premium aesthetic tailored for the target audience.
                </p>
                <button style={{ background: 'var(--text-primary)', color: 'var(--bg-color)', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  View Case Study <ExternalLink size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Navigation Hints */}
        <div style={{ display: 'flex', gap: '10px' }}>
            <div className="glass-panel" style={{ width: '48px', height: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ArrowLeft size={20} color="var(--text-secondary)" />
            </div>
            <div className="glass-panel" style={{ width: '48px', height: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ArrowRight size={20} color="var(--text-secondary)" />
            </div>
        </div>
      </div>
    </div>
  )
}

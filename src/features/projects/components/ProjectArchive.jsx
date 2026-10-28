import { archiveProjects } from '../data/projectsData'

export default function ProjectArchive({ onSelectProject }) {
  return (
    <div className="project-slide archive-slide">
      <div
        style={{
          maxWidth: '1300px',
          width: '100%',
          padding: '0 5vw',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        {/* Archive Header */}
        <div
          className="archive-header"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div>
            <p
              style={{
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: 'var(--text-secondary)',
                marginBottom: '8px',
                fontSize: '0.875rem'
              }}
            >
              Project Archive
            </p>
            <h3 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontFamily: "'Clash Display', sans-serif", margin: 0 }}>
              More Selected Works
            </h3>
          </div>
          <p className="text-body" style={{ maxWidth: '480px', margin: 0, fontSize: '0.95rem' }}>
            Explore additional mobile prototypes, design systems, and workflow applications.
          </p>
        </div>

        {/* Archive Cards Grid */}
        <div
          className="archive-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            width: '100%'
          }}
        >
          {archiveProjects.map((proj) => {
            const isInternal = proj.id === 'unroll'
            const href = isInternal ? '/work/unroll/' : proj.link

            return (
              <a
                key={proj.title}
                href={href}
                target={isInternal ? '_self' : '_blank'}
                rel={isInternal ? undefined : 'noopener noreferrer'}
                onClick={(e) => {
                  if (isInternal && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
                    e.preventDefault()
                    onSelectProject(proj)
                    if (typeof window !== 'undefined') {
                      window.history.pushState({ projectId: proj.id }, '', '/work/unroll/')
                    }
                  } else if (!isInternal) {
                    // Let default anchor navigation open Figma link
                  }
                }}
                className="glass-panel"
                style={{
                  padding: '28px',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  minHeight: '260px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.45)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'var(--glass-border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                aria-label={`View ${proj.title} ${isInternal ? 'Case Study' : 'Prototype'}`}
              >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {proj.role}
                  </span>
                  <span style={{ fontSize: '1rem', color: 'var(--text-primary)', opacity: 0.7 }}>↗</span>
                </div>

                <h4 style={{ fontSize: '1.75rem', fontFamily: "'Clash Display', sans-serif", marginBottom: '12px' }}>
                  {proj.title}
                </h4>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                  {proj.desc}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {proj.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.75rem',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  View Case Study <span style={{ transition: 'transform 0.2s ease' }}>→</span>
                </div>
              </div>
            </a>
          )})}
        </div>
      </div>
    </div>
  )
}

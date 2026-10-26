import { useEffect } from 'react'
import { ArrowLeft, ExternalLink, ArrowRight } from 'lucide-react'
import { allProjects } from '../data/projects'

export default function CaseStudyPage({ project, onNavigate }) {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)

    // Update document title and metadata dynamically on client side
    if (project) {
      document.title = project.seoTitle || `${project.title} — Case Study | Mustafa Kota`

      const updateMeta = (selector, attribute, value) => {
        let el = document.querySelector(selector)
        if (!el) {
          el = document.createElement('meta')
          const [key, val] = selector.replace(/meta\[|\]/g, '').split('=')
          el.setAttribute(key, val.replace(/["']/g, ''))
          document.head.appendChild(el)
        }
        el.setAttribute(attribute, value)
      }

      const updateLink = (rel, href) => {
        let el = document.querySelector(`link[rel="${rel}"]`)
        if (!el) {
          el = document.createElement('link')
          el.setAttribute('rel', rel)
          document.head.appendChild(el)
        }
        el.setAttribute('href', href)
      }

      const canonicalUrl = `https://www.mustafakota.site/work/${project.slug}/`
      updateMeta('meta[name="description"]', 'content', project.seoDesc || project.desc)
      updateLink('canonical', canonicalUrl)
      updateMeta('meta[property="og:title"]', 'content', project.seoTitle || project.title)
      updateMeta('meta[property="og:description"]', 'content', project.seoDesc || project.desc)
      updateMeta('meta[property="og:url"]', 'content', canonicalUrl)
      updateMeta('meta[property="og:image"]', 'content', `https://www.mustafakota.site${project.image}`)
      updateMeta('meta[name="twitter:title"]', 'content', project.seoTitle || project.title)
      updateMeta('meta[name="twitter:description"]', 'content', project.seoDesc || project.desc)
      updateMeta('meta[name="twitter:image"]', 'content', `https://www.mustafakota.site${project.image}`)
    }
  }, [project])

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}>
        <h1 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '3rem', marginBottom: '16px' }}>Project Not Found</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>The requested case study could not be found or has moved.</p>
        <a
          href="/"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault()
              onNavigate('/')
            }
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: 'var(--text-primary)', color: 'var(--bg-color)', borderRadius: '999px', fontWeight: 600, textDecoration: 'none' }}
        >
          <ArrowLeft size={18} /> Return to Home
        </a>
      </div>
    )
  }

  // Get related / other projects for internal linking
  const relatedProjects = allProjects.filter(p => p.slug !== project.slug).slice(0, 2)

  const handleLinkClick = (e, url) => {
    if (onNavigate && url.startsWith('/')) {
      e.preventDefault()
      onNavigate(url)
    }
  }

  return (
    <div className="case-study-root" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      
      {/* Top Accessible Sticky Navigation */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          backgroundColor: 'rgba(13, 13, 14, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '16px 5vw'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '1px',
              textDecoration: 'none',
              color: 'var(--text-primary)'
            }}
          >
            MUSTAFA KOTA
          </a>

          <a
            href="/#projects"
            onClick={(e) => handleLinkClick(e, '/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.875rem',
              fontWeight: 500,
              padding: '8px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              transition: 'background 0.2s ease, transform 0.2s ease'
            }}
          >
            <ArrowLeft size={16} /> All Projects
          </a>
        </div>
      </header>

      {/* Main Semantic Article */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 5vw 120px' }}>
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '24px' }}>
          <ol style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <li>
              <a href="/" onClick={(e) => handleLinkClick(e, '/')} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</a>
            </li>
            <li>/</li>
            <li>
              <a href="/#projects" onClick={(e) => handleLinkClick(e, '/')} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Work</a>
            </li>
            <li>/</li>
            <li aria-current="page" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{project.title}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '100px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.825rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            {project.category || project.role}
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: "'Clash Display', sans-serif", fontWeight: 700, lineHeight: 1.1, marginBottom: '20px' }}>
            {project.title}
          </h1>

          <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '850px', marginBottom: '32px' }}>
            {project.desc}
          </p>

          {/* Project Meta Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', padding: '24px', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '40px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Role & Focus</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{project.role}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Timeline</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{project.timeline || '2025–2026'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Deliverables</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                {project.tags.map(t => (
                  <span key={t} style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {project.link && project.link !== '#' && (
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Live Reference</div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#ffffff', fontWeight: 600, textDecoration: 'underline' }}
                >
                  View External Resource <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Primary Showcase Image */}
        <section aria-labelledby="primary-mockup-heading" style={{ marginBottom: '64px' }}>
          <h2 id="primary-mockup-heading" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
            {project.title} Overview Interface
          </h2>
          <div
            style={{
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundColor: '#121214',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}
          >
            <img
              src={project.image}
              alt={project.imageAlt || `${project.title} Interface`}
              loading="eager"
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </div>
        </section>

        {/* Structured Narrative Content */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Section 1: Overview & Context */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontFamily: "'Clash Display', sans-serif", fontWeight: 600, marginBottom: '20px', color: 'var(--text-primary)' }}>
              1. Project Overview &amp; Context
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {project.intro}
            </p>
          </section>

          {/* Section 2: Problem & Core Challenges */}
          {project.problem && (
            <section style={{ marginBottom: '56px' }}>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontFamily: "'Clash Display', sans-serif", fontWeight: 600, marginBottom: '20px', color: 'var(--text-primary)' }}>
                2. The Problem &amp; Core Constraints
              </h2>
              <div style={{ padding: '24px 28px', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderLeft: '3px solid var(--text-primary)', marginBottom: '20px' }}>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>
                  {project.problem}
                </p>
              </div>
            </section>
          )}

          {/* Section 3: Visual Showcase 1 */}
          {project.image1 && (
            <section style={{ marginBottom: '56px' }}>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontFamily: "'Clash Display', sans-serif", fontWeight: 600, marginBottom: '20px', color: 'var(--text-primary)' }}>
                3. Design Execution &amp; Workflow Architecture
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '24px' }}>
                {project.solution || project.goal}
              </p>
              <div
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#121214',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '16px'
                }}
              >
                <img
                  src={project.image1}
                  alt={project.image1Alt || `${project.title} Detail View`}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                />
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', fontStyle: 'italic' }}>
                {project.image1Alt}
              </p>
            </section>
          )}

          {/* Section 4: Visual Showcase 2 & Features */}
          {project.image2 && (
            <section style={{ marginBottom: '56px' }}>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontFamily: "'Clash Display', sans-serif", fontWeight: 600, marginBottom: '20px', color: 'var(--text-primary)' }}>
                4. Deep Dive Screens &amp; System Details
              </h2>
              <div
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#121214',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '16px'
                }}
              >
                <img
                  src={project.image2}
                  alt={project.image2Alt || `${project.title} Deep Dive Screen`}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                />
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', fontStyle: 'italic', marginBottom: '24px' }}>
                {project.image2Alt}
              </p>
            </section>
          )}

          {/* Section 5: Conclusion & Reflections */}
          <section style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontFamily: "'Clash Display', sans-serif", fontWeight: 600, marginBottom: '20px', color: 'var(--text-primary)' }}>
              5. Outcome &amp; Key Takeaways
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {project.conclusion}
            </p>
          </section>

        </div>

        {/* Related Projects / Interlinking */}
        <section style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h2 style={{ fontSize: '1.8rem', fontFamily: "'Clash Display', sans-serif", fontWeight: 600, marginBottom: '28px' }}>
            Explore More Work
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {relatedProjects.map(rel => (
              <a
                key={rel.slug}
                href={`/work/${rel.slug}/`}
                onClick={(e) => handleLinkClick(e, `/work/${rel.slug}/`)}
                style={{
                  display: 'block',
                  padding: '24px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'border-color 0.2s ease, transform 0.2s ease'
                }}
              >
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  {rel.category || rel.role}
                </div>
                <h3 style={{ fontSize: '1.35rem', fontFamily: "'Clash Display', sans-serif", fontWeight: 600, marginBottom: '8px' }}>
                  {rel.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {rel.desc}
                </p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>
                  Read Case Study <ArrowRight size={14} />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Footer Contact CTA */}
        <section style={{ marginTop: '80px', padding: '48px', borderRadius: '24px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontFamily: "'Clash Display', sans-serif", fontWeight: 600, marginBottom: '16px' }}>
            Interested in collaborating or discussing a product design role?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            I am currently open to new product design and digital product opportunities.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:mustafakota88@gmail.com?subject=Project Inquiry"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-color)',
                borderRadius: '999px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Get in Touch
            </a>
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--text-primary)',
                borderRadius: '999px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Back to Home
            </a>
          </div>
        </section>

      </main>

    </div>
  )
}

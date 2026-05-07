import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { LayoutTemplate, Image, PenTool, Code2, Sparkles } from 'lucide-react'
import { FaFigma, FaHtml5 } from 'react-icons/fa'

export default function AboutSection() {
  const sectionRef = useRef()
  const contentRef = useRef()
  const toolsRef = useRef()

  useEffect(() => {
    // Fade in text content
    gsap.fromTo(contentRef.current.children, 
      { y: 50, opacity: 0 },
      { 
        y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    )
    
    // Animate tools cards
    gsap.fromTo(toolsRef.current.children,
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: toolsRef.current,
          start: 'top 80%',
        }
      }
    )
  }, [])

  const tools = [
    { name: 'Figma', icon: <FaFigma size={24} /> },
    { name: 'Adobe XD', icon: <LayoutTemplate size={24} /> },
    { name: 'Photoshop', icon: <Image size={24} /> },
    { name: 'Illustrator', icon: <PenTool size={24} /> },
    { name: 'HTML5/CSS3', icon: <FaHtml5 size={24} /> },
    { name: 'Generative AI', icon: <Sparkles size={24} /> }
  ]

  return (
    <section id="about" ref={sectionRef} className="section-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', width: '100%' }}>
        
        {/* Story */}
        <div ref={contentRef}>
          <h2 className="text-section-title">Design with Intention.</h2>
          <p className="text-body" style={{ marginBottom: '24px' }}>
            I am a UI/UX & Product Designer with a strong foundation in user research, wireframing, and visual design. 
            I believe in translating user needs into intuitive digital experiences through structured design processes.
          </p>
          <p className="text-body" style={{ marginBottom: '40px' }}>
            I am passionate about creating clean, user-centric interfaces and continuously improving through real-world projects. 
            My technical skills span across interaction design, usability testing, and information architecture.
          </p>
          <div style={{ borderLeft: '2px solid var(--accent-color)', paddingLeft: '24px' }}>
            <p style={{ fontSize: '1.5rem', fontFamily: "'Clash Display', sans-serif" }}>"Design is not just what it looks like and feels like. Design is how it works."</p>
          </div>
        </div>

        {/* Tools Showcase */}
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', fontFamily: "'Clash Display', sans-serif" }}>Premium Toolkit</h3>
          <div ref={toolsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {tools.map(tool => (
              <div key={tool.name} className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', transition: 'transform 0.3s ease, background 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'var(--glass-bg)' }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }}>
                  {tool.icon}
                </div>
                <span style={{ fontWeight: 500 }}>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  Layout,
  MousePointer,
  Rocket,
  Sparkles,
  Lightbulb,
  MessageSquare,
  Code
} from 'lucide-react'
import { FaFigma } from 'react-icons/fa'

export default function AboutSection() {
  const sectionRef = useRef()
  const contentRef = useRef()
  const toolsRef = useRef()

  useEffect(() => {
    gsap.fromTo(
      contentRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    )

    gsap.fromTo(
      toolsRef.current.children,
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: toolsRef.current,
          start: 'top 80%',
        }
      }
    )
  }, [])

  const tools = [
    { name: 'Product Design', icon: <Layout size={24} /> },
    { name: 'UI/UX', icon: <MousePointer size={24} /> },
    { name: 'Figma', icon: <FaFigma size={24} /> },
    { name: 'Prototyping', icon: <Rocket size={24} /> },
    { name: 'Web / HTML / CSS', icon: <Code size={24} /> },
    { name: 'AI Development', icon: <Sparkles size={24} /> },
    { name: 'Product Thinking', icon: <Lightbulb size={24} /> },
    { name: 'User Feedback', icon: <MessageSquare size={24} /> }
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div
        className="about-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          width: '100%'
        }}
      >

        {/* Story */}
        <div
          ref={contentRef}
          className="about-story"
        >
          <h2 className="text-section-title">
            Design with Intention.
          </h2>

          <p
            className="text-body"
            style={{ marginBottom: '24px' }}
          >
            I am a Product Designer who focuses on understanding
            real users and turning ideas into usable software. I
            work across UI/UX, product improvement, and digital
            product building.
          </p>

          <p
            className="text-body"
            style={{ marginBottom: '40px' }}
          >
            I believe that great design goes beyond the screen.
            My approach combines interface design, customer
            feedback, and practical implementation to build
            digital products that solve real problems.
          </p>

          <div
            style={{
              borderLeft: '2px solid var(--accent-color)',
              paddingLeft: '24px'
            }}
          >
            <p
              style={{
                fontSize: '1.5rem',
                fontFamily: "'Clash Display', sans-serif",
                lineHeight: 1.5
              }}
            >
              "Design is not just what it looks like and feels
              like. Design is how it works."
            </p>
          </div>
        </div>

        {/* Toolkit */}
        <div className="about-tools">

          <h3
            style={{
              fontSize: '1.5rem',
              marginBottom: '24px',
              fontFamily: "'Clash Display', sans-serif"
            }}
          >
            Premium Toolkit
          </h3>

          <div
            ref={toolsRef}
            className="tools-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px'
            }}
          >
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="glass-panel"
                style={{
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition:
                    'transform 0.3s ease, background 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    'translateY(-5px)'
                  e.currentTarget.style.background =
                    'rgba(255,255,255,0.06)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    'translateY(0)'
                  e.currentTarget.style.background =
                    'var(--glass-bg)'
                }}
              >
                <div
                  style={{
                    fontSize: '1.5rem',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {tool.icon}
                </div>

                <span style={{ fontWeight: 500 }}>
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
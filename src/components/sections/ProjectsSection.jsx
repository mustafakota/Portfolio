import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { AnimatePresence } from 'framer-motion'
import ProjectModal from '../ProjectModal'

const projects = [
  {
    title: 'Dayora',
    role: 'Productivity Web App',
    image: '/main ui.png',
    image1: '/analtics.png',
    image2: '/Screenshot 2026-01-13 235110.png',
    desc: 'A behavior-driven productivity app in Figma, improving task completion by 24% through user-centered design.',
    tags: ['Web App', 'Figma', 'User Research'],
    intro: 'Dayora is a behavior-driven productivity web app designed to address procrastination by focusing on emotional and visual accountability rather than traditional neutral to-do lists. The product adapts its tone, feedback, and UI states based on user behavior, productivity levels, and time of day, creating a more honest and responsive productivity experience.',
    goal: 'The goal of Dayora was to explore how behavioral UX and emotional design can influence task completion and self-discipline. Instead of reminding users what to do, the system aims to react to how users actually perform, encouraging realistic time estimation, reducing passive procrastination, and creating awareness through adaptive feedback and visual cues.',
    conclusion: 'Dayora demonstrates how design, psychology, and systems thinking can work together to influence real user behavior. Through adaptive feedback mechanisms and visual accountability, the project achieved improved task completion and time awareness during usability testing. This case study reflects my approach to designing products that are not only usable, but behaviorally effective and emotionally intentional.',
    link: 'https://drive.google.com/file/d/1gZdq8Dm-iA4WViVPK25bKnsp2vM4wLqi/view?usp=sharing',
    device: 'desktop'
  },
  {
    title: 'Unroll',
    role: 'Subscription Management',
    image: '/Unroll1 (3).png',
    image1: '/Unroll1 (2).png',
    image2: '/Unroll1 (1).png',
    desc: 'Designed a subscription tracking app using user research (50+ users) and Figma based prototyping.',
    tags: ['Mobile UI', 'Prototyping', 'Usability Testing'],
    intro: 'With the rapid growth of digital services, users today manage multiple subscriptions across entertainment, productivity, fitness, and education platforms. While these services add convenience, they often lead to forgotten trials, unnoticed renewals, and recurring charges that users struggle to track.Unroll is a subscription-tracking app concept designed to help users gain clarity, reduce financial leaks, and feel more in control of their recurring expenses through a simple, mindful, and user-centric experience.',
    goal: "The goal of Unroll was to create an intuitive and stress-free subscription management experience that helps users take control of their recurring expenses with clarity and confidence. The platform was designed to bring all subscriptions into one organized space, allowing users to easily track costs, billing cycles, and trial end dates without feeling overwhelmed. By providing timely renewal reminders and clear financial visibility, Unroll helps users avoid unexpected charges and make more informed decisions about the services they actually use and value. A key focus of the experience was maintaining user trust and privacy by eliminating the need to connect sensitive banking information, while reducing cognitive load through a clean, transparent, and user-friendly interface.",
    conclusion: 'Through user interviews, surveys, personas, and empathy mapping, this project highlighted how small recurring charges can create significant financial and mental stress over time. Unroll addresses this problem by prioritizing clarity over complexity and control over automation.This case study strengthened my understanding of user-centered problem solving, research-driven design decisions, and building digital experiences that are both functional and emotionally reassuring.',
    link: 'https://www.figma.com/proto/Gx43ZcFUbAbka9u5l60c6B/Unroll?node-id=1-12&p=f&viewport=555%2C4562%2C0.05&t=8MxToQUY9QR5OPIt-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A12&page-id=0%3A1',
    device: 'desktop'
  },
  {
    title: 'WanderEase',
    role: ' Travel App Design',
    image: '/Homw Screen (1).jpg',
    image1: '/Bora Bora.png',
    image2: '/started.png',
    desc: 'WanderEase is a travel app concept that simplifies trip planning by keeping itineraries and bookings in one place.',
    tags: ['Mobile App', 'Figma', 'Animation'],
    intro: 'To design a clean, intuitive, and modern interface that helps users plan trips seamlessly from building itineraries to managing activities all within a single app.',
    conclusion: 'Through this project, I explored how thoughtful UX can simplify complex tasks. WanderEase reflects my ability to balance usability and aesthetics, and it strengthened my skills in designing user-centered digital products.',
    link: 'https://www.figma.com/proto/Esz9kpsSWsSqbytzpI0mmo/WanderEase?node-id=6-61&p=f&viewport=533%2C216%2C0.08&t=5N9HtGRcRvd0EIF7-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3%3A14&page-id=0%3A1',
    device: 'mobile'
  },
  {
    title: 'Shoewave',
    role: 'E-Commerce App',
    image: '/Home.png',
    image1: '/home layout.png',
    image2: '/Product Detail 16.png',
    desc: 'Shoewave is an e-commerce app concept for a modern shoe brand, designed to give users a stylish and seamless shopping experience.',
    tags: ['E-commerce App', 'Figma', 'UI Design'],
    intro: 'To design a clean, minimal, and user-friendly interface that makes browsing and buying shoes simple and engaging.',
    conclusion: 'This project highlights my ability to combine modern UI trends with usability, creating an online shopping experience that feels both classy and intuitive.',
    link: 'https://www.figma.com/proto/ITPbs0djHitXeLaJbBRe0L/Shoewave?node-id=36-6&page-id=0%3A1&starting-point-node-id=7%3A9&t=QWMsiVPFri6CaTgl-1',
    device: 'mobile'
  }
]

export default function ProjectsSection() {
  const sectionRef = useRef()
  const trackRef = useRef()
  const progressRef = useRef()
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop: Horizontal Scroll Hijack
    mm.add("(min-width: 901px)", () => {
      let ctx = gsap.context(() => {
        // Calculate the total distance the track needs to slide horizontally
        // It's the total width of all slides combined, minus the width of the viewport
        let scrollWidth = trackRef.current.scrollWidth - window.innerWidth;

        // 1. Pin the section and translate the track
        const scrollTween = gsap.to(trackRef.current, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: `+=${scrollWidth}`,
          }
        });

        // 3. Animate the premium scrollbar thumb
        if (progressRef.current) {
          gsap.fromTo(progressRef.current,
            { x: 0 },
            {
              x: 225, // 300px track - 75px thumb = 225px translation
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                scrub: 1,
                start: "top top",
                end: `+=${scrollWidth}`,
              }
            }
          );
        }

        // 2. Add Horizontal Parallax to images
        const imgs = gsap.utils.toArray('.project-image');
        imgs.forEach(img => {
          gsap.to(img, {
            xPercent: 20, // Slide image slightly right as container moves left
            ease: "none",
            scrollTrigger: {
              trigger: img.closest('.project-slide'),
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true
            }
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    // Mobile: Standard Vertical Fallback
    mm.add("(max-width: 900px)", () => {
      let ctx = gsap.context(() => {
        const slides = gsap.utils.toArray('.project-slide');
        slides.forEach((slide, i) => {
          // Skip the intro text slide
          if (i === 0) return;

          gsap.fromTo(slide,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0, duration: 1, ease: 'power3.out',
              scrollTrigger: {
                trigger: slide,
                start: "top 85%"
              }
            }
          );
        });
      }, sectionRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [])

  return (
    <section id="projects" ref={sectionRef} style={{ overflow: 'hidden', backgroundColor: 'transparent', position: 'relative' }}>

      <div ref={trackRef} className="projects-track">

        {/* Intro Slide */}
        <div className="project-slide" style={{ position: 'relative' }}>

          {/* Massive Hollow Background Text */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', textAlign: 'center', pointerEvents: 'none', zIndex: 0 }}>
            <h2 style={{ fontSize: 'clamp(8rem, 30vw, 30rem)', fontFamily: "'Clash Display', sans-serif", fontWeight: 700, margin: 0, color: 'transparent', WebkitTextStroke: '3px rgba(255,255,255,0.12)', whiteSpace: 'nowrap' }}>
              WORK
            </h2>
          </div>

          <div style={{ textAlign: 'center', padding: '0 5vw', maxWidth: '800px', position: 'relative', zIndex: 1 }}>
            <h2 className="text-section-title">Curated Exhibitions.</h2>
            <p className="text-body" style={{ margin: '0 auto' }}>Selected works focusing on premium interfaces, robust design systems, and digital storytelling.</p>

            {/* Scroll Indicator */}
            <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: 0.6 }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem' }}>Scroll to Explore</span>
              <div style={{ width: '1px', height: '60px', backgroundColor: 'rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '50%', backgroundColor: 'var(--text-primary)', animation: 'scroll-down 2s infinite' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Project Slides */}
        {projects.map((proj, i) => (
          <div key={proj.title} className="project-slide">
            <div className="project-grid">

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', order: i % 2 === 0 ? 1 : 2, width: '100%' }}>
                <div style={{ width: proj.device === 'mobile' ? 'auto' : '100%', height: proj.device === 'mobile' ? '70vh' : '60vh', minHeight: '400px', aspectRatio: proj.device === 'mobile' ? '9/16' : 'auto', overflow: 'hidden', borderRadius: '24px', position: 'relative' }}>
                  <img className="project-image" src={proj.image} alt={proj.title} style={{ width: proj.device === 'mobile' ? '120%' : '120%', height: '100%', objectFit: 'cover', position: 'absolute', left: '-10%', transition: 'transform 0.5s ease' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,14,0.4), transparent)', pointerEvents: 'none' }}></div>
                </div>
              </div>

              <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                <p style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.875rem' }}>{proj.role}</p>
                <h3 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontFamily: "'Clash Display', sans-serif", marginBottom: '24px', lineHeight: 1.1 }}>{proj.title}</h3>
                <p className="text-body" style={{ marginBottom: '40px' }}>{proj.desc}</p>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
                  {proj.tags.map(tag => (
                    <span key={tag} className="glass-panel" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>{tag}</span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveProject(proj)}
                  style={{ padding: '16px 32px', border: '1px solid var(--text-primary)', color: 'var(--text-primary)', borderRadius: '30px', fontWeight: 500, transition: 'all 0.3s ease', fontSize: '1rem', cursor: 'pointer', background: 'transparent' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--bg-color)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)' }}
                >
                  View Case Study
                </button>
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Premium Scrollbar Indicator */}
      <div className="horizontal-progress" style={{ position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', zIndex: 50, borderRadius: '4px', overflow: 'hidden' }}>
        <div ref={progressRef} style={{ width: '25%', height: '100%', backgroundColor: 'var(--text-primary)', borderRadius: '4px', willChange: 'transform' }} />
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

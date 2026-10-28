import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader() {
  const containerRef = useRef()
  const topPanelRef = useRef()
  const bottomPanelRef = useRef()
  const textRef = useRef()
  const numberRef = useRef()

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    const tl = gsap.timeline()

    // Disable scroll while loading
    document.body.style.overflow = 'hidden'

    let obj = { val: 0 }

    // 1. Animate the counter directly via DOM ref for maximum 60/120 FPS and zero React render churn
    tl.to(obj, {
      val: 100,
      duration: isMobile ? 1.0 : 2.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = `${Math.round(obj.val)}%`
        }
      }
    })

    // 2. Fade out the number elegantly
    tl.to(textRef.current, {
      opacity: 0,
      y: -20, // slight float up on fade
      duration: isMobile ? 0.25 : 0.5,
      ease: 'power2.out'
    }, "-=0.15")

    // 3. Cinematic Split Screen Reveal
    tl.to([topPanelRef.current, bottomPanelRef.current], {
      yPercent: (i) => i === 0 ? -100 : 100,
      duration: isMobile ? 0.8 : 1.5,
      ease: 'expo.inOut',
      onComplete: () => {
        document.body.style.overflow = ''
        if (containerRef.current) {
          containerRef.current.style.display = 'none'
        }
      }
    }, "-=0.1")

    return () => {
      document.body.style.overflow = ''
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 999999, pointerEvents: 'all', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Curtain */}
      <div ref={topPanelRef} style={{ width: '100%', height: '50vh', backgroundColor: 'var(--bg-color)', position: 'relative' }} />
      
      {/* Bottom Curtain */}
      <div ref={bottomPanelRef} style={{ width: '100%', height: '50vh', backgroundColor: 'var(--bg-color)', position: 'relative' }} />

      {/* Floating Counter */}
      <div ref={textRef} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div ref={numberRef} style={{ fontSize: 'clamp(5rem, 15vw, 15rem)', fontFamily: "'Clash Display', sans-serif", fontWeight: 700, lineHeight: 0.8, color: 'var(--text-primary)' }}>
          0%
        </div>
      </div>
      
    </div>
  )
}

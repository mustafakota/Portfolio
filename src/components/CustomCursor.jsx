import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isTouchDevice] = useState(() => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0))
  const [prefersReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  // Motion values for non-render pointer tracking
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring transition for outer ring matching original physics (stiffness: 150, damping: 15, mass: 0.5)
  const springX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.5 })
  const springY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.5 })

  // Centering offsets: outer ring is 32px (offset by -16), inner dot is 8px (offset by -4)
  const ringX = useTransform(springX, (val) => val - 16)
  const ringY = useTransform(springY, (val) => val - 16)
  const dotX = useTransform(cursorX, (val) => val - 4)
  const dotY = useTransform(cursorY, (val) => val - 4)

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (isTouchDevice || prefersReducedMotion) {
      return
    }

    const updateMousePosition = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const checkHoverState = (e) => {
      const target = e.target
      // Check if hovering over standard interactive elements
      const isInteractive = target.closest('a, button, input, select, textarea, [data-cursor="hover"]')
      setIsHovering(!!isInteractive)
    }

    window.addEventListener('mousemove', updateMousePosition, { passive: true })
    window.addEventListener('mouseover', checkHoverState, { passive: true })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', checkHoverState)
    }
  }, [isTouchDevice, prefersReducedMotion, cursorX, cursorY])

  if (isTouchDevice || prefersReducedMotion) return null

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
        style={{
          x: ringX,
          y: ringY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999999,
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Inner Dot */}
      <motion.div
        animate={{
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1
        }}
        transition={{
          type: 'tween',
          ease: 'backOut',
          duration: 0.15
        }}
        style={{
          x: dotX,
          y: dotY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999999,
          mixBlendMode: 'difference'
        }}
      />
    </>
  )
}

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei'
import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function AbstractSculpture() {
  const groupRef = useRef()
  const autoRotateRef = useRef()
  const meshRef = useRef()
  const materialRef = useRef()
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (groupRef.current) {
        gsap.to(groupRef.current.rotation, {
          y: scrollY * 0.005,
          x: scrollY * 0.002,
          duration: 1,
          ease: 'power2.out'
        })
      }
    }
    window.addEventListener('scroll', handleScroll)

    const ctx = gsap.context(() => {
      
      // ABOUT SECTION: Move left, Wireframe, High distort
      ScrollTrigger.create({
        trigger: '#about',
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          if (materialRef.current) materialRef.current.wireframe = true;
          gsap.to(materialRef.current, { distort: 0.8, speed: 4, duration: 1.5, ease: 'power2.inOut' });
          gsap.to(groupRef.current.position, { x: -1.2, duration: 1.5, ease: 'power2.inOut' });
          gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: 'power2.inOut' });
        },
        onLeaveBack: () => {
          if (materialRef.current) materialRef.current.wireframe = false;
          gsap.to(materialRef.current, { distort: 0.2, speed: 1.5, duration: 1.5, ease: 'power2.inOut' });
          gsap.to(groupRef.current.position, { x: 1.5, duration: 1.5, ease: 'power2.inOut' });
          gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: 'power2.inOut' });
        },
        onEnterBack: () => {
          if (materialRef.current) materialRef.current.wireframe = true;
          gsap.to(materialRef.current, { distort: 0.8, speed: 4, duration: 1.5, ease: 'power2.inOut' });
          gsap.to(groupRef.current.position, { x: -1.2, duration: 1.5, ease: 'power2.inOut' });
          gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: 'power2.inOut' });
        }
      });

      // PROJECTS SECTION: Move right, Smooth solid, Big
      ScrollTrigger.create({
        trigger: '#projects',
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          if (materialRef.current) materialRef.current.wireframe = false;
          gsap.to(materialRef.current, { distort: 0.1, speed: 1, duration: 1.5, ease: 'power2.inOut' });
          gsap.to(groupRef.current.position, { x: 1.5, duration: 1.5, ease: 'power2.inOut' });
          gsap.to(meshRef.current.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 1.5, ease: 'power2.inOut' });
        },
        onLeaveBack: () => {
          if (materialRef.current) materialRef.current.wireframe = true;
          gsap.to(materialRef.current, { distort: 0.8, speed: 4, duration: 1.5, ease: 'power2.inOut' });
          gsap.to(groupRef.current.position, { x: -1.2, duration: 1.5, ease: 'power2.inOut' });
          gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: 'power2.inOut' });
        }
      });

    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      ctx.revert()
    }
  }, [])

  useFrame((state, delta) => {
    if (autoRotateRef.current) {
      // Constant auto-rotation so it never sits still
      autoRotateRef.current.rotation.y += delta * 0.3;
      autoRotateRef.current.rotation.x += delta * 0.15;
      autoRotateRef.current.rotation.z += delta * 0.1;
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={[1.5, 0, -2]} scale={1.2}>
        <group ref={autoRotateRef}>
          <mesh ref={meshRef}>
            <torusKnotGeometry args={[1, 0.3, 128, 32]} />
            <MeshDistortMaterial 
              ref={materialRef}
              color="#1a1a1c" 
              envMapIntensity={2} 
              clearcoat={1} 
              clearcoatRoughness={0.1} 
              metalness={0.9}
              roughness={0.1}
              distort={0.2}
              speed={1.5}
            />
          </mesh>
        </group>
      </group>
    </Float>
  )
}

export default function Background3D() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" castShadow />
          <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#555555" />
          
          <AbstractSculpture />
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}

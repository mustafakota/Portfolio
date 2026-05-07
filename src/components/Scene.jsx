import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Float, PresentationControls, Text } from '@react-three/drei'
import * as THREE from 'three'

const projects = [
  { id: 1, title: 'NovaPay', subtitle: 'Fintech Dashboard', image: '/project1.png', position: [-3.5, 0, 0], rotation: [0, 0.4, 0] },
  { id: 2, title: 'Vitality', subtitle: 'Health Tracker', image: '/project2.png', position: [0, 0, 1], rotation: [0, 0, 0] },
  { id: 3, title: 'Lumina', subtitle: 'E-Commerce Experience', image: '/project3.png', position: [3.5, 0, 0], rotation: [0, -0.4, 0] },
]

function Frame({ project, isActive, onClick }) {
  const mesh = useRef()
  const texture = useTexture(project.image)
  const [hovered, setHover] = useState(false)
  
  // Smoothly animate scale based on hover/active
  useFrame((state, delta) => {
    const targetScale = isActive ? 1.2 : hovered ? 1.05 : 1
    mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
  })

  return (
    <group position={project.position} rotation={project.rotation}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh 
          ref={mesh} 
          onClick={(e) => { e.stopPropagation(); onClick() }}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true) }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false) }}
        >
          <boxGeometry args={[2.5, 3.5, 0.1]} />
          {/* Edge material */}
          <meshStandardMaterial attach="material-0" color="#2a2a2c" roughness={0.8} />
          <meshStandardMaterial attach="material-1" color="#2a2a2c" roughness={0.8} />
          <meshStandardMaterial attach="material-2" color="#2a2a2c" roughness={0.8} />
          <meshStandardMaterial attach="material-3" color="#2a2a2c" roughness={0.8} />
          {/* Front material with image */}
          <meshStandardMaterial attach="material-4" map={texture} roughness={0.2} />
          {/* Back material */}
          <meshStandardMaterial attach="material-5" color="#1a1a1c" roughness={0.8} />
        </mesh>
        {/* Project Title Below Frame */}
        <Text
          position={[0, -2.1, 0]}
          fontSize={0.2}
          color="#f0eedc"
          anchorX="center"
          anchorY="middle"
        >
          {project.title}
        </Text>
      </Float>
    </group>
  )
}

export default function Scene({ activeProject, setActiveProject }) {
  return (
    <PresentationControls
      global
      config={{ mass: 2, tension: 500 }}
      snap={{ mass: 4, tension: 1500 }}
      rotation={[0, 0, 0]}
      polar={[-Math.PI / 6, Math.PI / 6]}
      azimuth={[-Math.PI / 4, Math.PI / 4]}
    >
      <group position={[0, 0, 0]}>
        {projects.map((proj) => (
          <Frame 
            key={proj.id} 
            project={proj} 
            isActive={activeProject?.id === proj.id}
            onClick={() => setActiveProject(proj)} 
          />
        ))}
      </group>
    </PresentationControls>
  )
}

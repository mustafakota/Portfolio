import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import Scene from './Scene'

export default function CanvasContainer({ activeProject, setActiveProject }) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          {/* Soft museum lighting */}
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#f0eedc" castShadow />
          <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#8d99ae" />
          
          <Scene activeProject={activeProject} setActiveProject={setActiveProject} />
          
          <Environment preset="city" />
          {/* Soft shadows on the floor */}
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        </Suspense>
      </Canvas>
    </div>
  )
}

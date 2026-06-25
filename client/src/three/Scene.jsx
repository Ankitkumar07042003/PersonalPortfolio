// src/three/Scene.jsx
// Main R3F Canvas wrapper

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import FloatingShapes from './FloatingShapes';
import Hero3D from './Hero3D';

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#7CAADC" />
      <pointLight position={[-10, -5, -5]} intensity={0.4} color="#F49CC4" />
      <Suspense fallback={null}>
        <Hero3D />
        <FloatingShapes />
      </Suspense>
    </Canvas>
  );
}

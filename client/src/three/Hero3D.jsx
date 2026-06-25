// src/three/Hero3D.jsx
// Central interactive 3D object in the hero section

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Hero3D() {
  const outerRef = useRef();
  const innerRef = useRef();
  const ringRef  = useRef();
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (outerRef.current) {
      outerRef.current.rotation.x = THREE.MathUtils.lerp(
        outerRef.current.rotation.x,
        pointer.y * -0.3,
        0.05
      );
      outerRef.current.rotation.y = THREE.MathUtils.lerp(
        outerRef.current.rotation.y,
        pointer.x * 0.3 + t * 0.08,
        0.05
      );
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.15;
      innerRef.current.rotation.z = t * 0.12;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + t * 0.1;
      ringRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group position={[3.5, 0.5, -1]}>
      {/* Outer icosahedron wireframe */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color="#7CAADC"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Inner solid octahedron */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#F49CC4"
          transparent
          opacity={0.22}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting torus ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.5, 0.04, 8, 60]} />
        <meshStandardMaterial
          color="#FFD372"
          transparent
          opacity={0.45}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Point light for glow */}
      <pointLight color="#7CAADC" intensity={1.2} distance={5} />
    </group>
  );
}

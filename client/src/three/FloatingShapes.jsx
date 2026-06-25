// src/three/FloatingShapes.jsx
// Animated floating geometric shapes in the background

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Shape({ position, geometry, color, speed, rotAxis }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime * speed;
    mesh.current.rotation.x += rotAxis[0] * 0.005;
    mesh.current.rotation.y += rotAxis[1] * 0.005;
    mesh.current.rotation.z += rotAxis[2] * 0.003;
    mesh.current.position.y = position[1] + Math.sin(t) * 0.4;
    mesh.current.position.x = position[0] + Math.cos(t * 0.7) * 0.2;
  });

  return (
    <mesh ref={mesh} position={position}>
      {geometry}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.12}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function FloatingShapes() {
  const shapes = [
    {
      position: [-5, 2, -3],
      geometry: <octahedronGeometry args={[1.2, 0]} />,
      color: '#FFD372',
      speed: 0.5,
      rotAxis: [1, 1, 0],
    },
    {
      position: [5, -1, -4],
      geometry: <icosahedronGeometry args={[1, 0]} />,
      color: '#F49CC4',
      speed: 0.4,
      rotAxis: [0, 1, 1],
    },
    {
      position: [-4, -3, -5],
      geometry: <tetrahedronGeometry args={[1.2, 0]} />,
      color: '#7CAADC',
      speed: 0.6,
      rotAxis: [1, 0, 1],
    },
    {
      position: [4, 3, -6],
      geometry: <dodecahedronGeometry args={[1, 0]} />,
      color: '#F15B42',
      speed: 0.35,
      rotAxis: [1, 1, 1],
    },
    {
      position: [0, -4, -4],
      geometry: <torusGeometry args={[0.8, 0.3, 6, 12]} />,
      color: '#FFD372',
      speed: 0.55,
      rotAxis: [0, 1, 0],
    },
    {
      position: [-2, 4, -7],
      geometry: <boxGeometry args={[1.2, 1.2, 1.2]} />,
      color: '#7CAADC',
      speed: 0.3,
      rotAxis: [1, 1, 0],
    },
  ];

  return (
    <>
      {shapes.map((s, i) => (
        <Shape key={i} {...s} />
      ))}
    </>
  );
}

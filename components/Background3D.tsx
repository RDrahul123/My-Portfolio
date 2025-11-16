
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Background3D: React.FC = () => {
  const ref = useRef<THREE.Points>(null!);

  const [sphere] = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const radius = 3;
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      positions.set([x, y, z], i * 3);
    }
    return [positions];
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 25;
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00c2ff"
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

export default Background3D;

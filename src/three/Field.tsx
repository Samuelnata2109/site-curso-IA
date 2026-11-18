import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
function Nodes() {
  const ref = useRef<THREE.Group>(null);
  const { nodes, edges } = useMemo(() => {
    const vertices: number[] = [];
    const links: number[] = [];
    for (let i = 0; i < 144; i++) {
      const y = 1 - (2 * (i + 0.5)) / 144;
      const a = i * 2.39996;
      const r = Math.sqrt(1 - y * y) * (1 + 0.08 * Math.sin(a * 3));
      vertices.push(1.57 * r * Math.cos(a), 1.57 * y, 1.57 * r * Math.sin(a));
    }
    for (let i = 0; i < vertices.length; i += 3) {
      for (let j = i + 3; j < vertices.length; j += 3) {
        if (
          Math.hypot(
            vertices[i] - vertices[j],
            vertices[i + 1] - vertices[j + 1],
            vertices[i + 2] - vertices[j + 2],
          ) < 0.53
        )
          links.push(...vertices.slice(i, i + 3), ...vertices.slice(j, j + 3));
      }
    }
    return {
      nodes: new Float32Array(vertices),
      edges: new Float32Array(links),
    };
  }, []);
  const positions = useMemo(
    () =>
      Float32Array.from(
        { length: 270 },
        (_, i) => Math.sin(i * 73.58 + 2) * 2.7,
      ),
    [],
  );
  useFrame(({ pointer }, dt) => {
    if (ref.current) {
      ref.current.rotation.z += dt * 0.017;
      ref.current.rotation.y = THREE.MathUtils.damp(
        ref.current.rotation.y,
        pointer.x * 0.28,
        3,
        dt,
      );
    }
  });
  return (
    <group ref={ref}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#81bff2" transparent opacity={0.14} />
      </lineSegments>
      <Points positions={nodes} stride={3}>
        <PointMaterial color="#c3e8ff" size={0.018} />
      </Points>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#99dfff"
          size={0.019}
          opacity={0.75}
          depthWrite={false}
        />
      </Points>
      <mesh rotation={[1.28, 0.15, -0.28]}>
        <torusGeometry args={[2.05, 0.002, 3, 140]} />
        <meshBasicMaterial color="#5596bd" transparent opacity={0.32} />
      </mesh>
    </group>
  );
}
export default function Field() {
  return (
    <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 6], fov: 52 }}>
      <Nodes />
    </Canvas>
  );
}

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as T from "three";
import { createCore, studioTexture } from "./coreModel";

function Model({ signal, ready }: { signal: number; ready: () => void }) {
  const { scene, gl, performance } = useThree();
  const model = useMemo(createCore, []);
  const elapsed = useRef(0),
    pulse = useRef(0),
    painted = useRef(false);
  useEffect(() => {
    if (signal) pulse.current = 1;
  }, [signal]);
  useEffect(() => {
    const texture = studioTexture();
    scene.environment = texture;
    return () => {
      scene.environment = null;
      texture.dispose();
      const materials = new Set<T.Material>();
      model.pod.traverse((child) => {
        if (child instanceof T.Mesh) {
          child.geometry.dispose();
          materials.add(child.material);
        }
      });
      materials.forEach((material) => material.dispose());
    };
  }, [gl, scene, model]);
  useFrame(({ pointer }, dt) => {
    if (!painted.current) {
      painted.current = true;
      ready();
    }
    if (dt > 0.045 && elapsed.current > 1) performance.regress();
    elapsed.current += Math.min(dt, 0.05);
    pulse.current *= Math.exp(-dt * 2.6);
    const t = elapsed.current;
    model.pod.position.y = Math.sin(t * 0.8) * 0.043 + pulse.current * 0.08;
    model.pod.rotation.y = T.MathUtils.damp(
      model.pod.rotation.y,
      -0.39 + pointer.x * 0.21,
      3,
      dt,
    );
    model.pod.rotation.x = T.MathUtils.damp(
      model.pod.rotation.x,
      0.1 - pointer.y * 0.085,
      3,
      dt,
    );
    model.rotor.rotation.z =
      -0.41 + 0.055 * Math.sin(t * 0.55) + pulse.current * 0.21;
    model.orbit.rotation.y = t * 0.12;
  });
  return (
    <>
      <primitive object={model.pod} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[-4, 5, 3]} intensity={2.5} />
      <directionalLight color="#7dbdfa" position={[2, 1, -2]} intensity={3} />
      <AdaptiveDpr />
    </>
  );
}
export default function CoreCanvas({
  signal,
  ready,
  failed,
}: {
  signal: number;
  ready: () => void;
  failed: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.4]}
      performance={{ min: 0.65 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0.27, 5.35], fov: 39 }}
      onCreated={({ gl }) =>
        gl.domElement.addEventListener("webglcontextlost", failed, {
          once: true,
        })
      }
    >
      <Model signal={signal} ready={ready} />
    </Canvas>
  );
}

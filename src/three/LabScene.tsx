import { Canvas, useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { OrthographicCamera } from "three";

type Point = [number, number, number];
const steel = "#90adbc",
  dark = "#243a48",
  ice = "#88d7ef",
  amber = "#f5a65b";

function Block({
  at,
  size,
  color = steel,
  tilt = 0,
}: {
  at: Point;
  size: Point;
  color?: string;
  tilt?: number;
}) {
  return (
    <mesh position={at} rotation={[0, 0, tilt]}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.25} />
    </mesh>
  );
}

function Drum({
  at,
  radius,
  height,
  color = steel,
}: {
  at: Point;
  radius: number;
  height: number;
  color?: string;
}) {
  return (
    <mesh position={at}>
      <cylinderGeometry args={[radius, radius, height, 20]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.44} />
    </mesh>
  );
}

function Workstation() {
  return (
    <group>
      <Block at={[0, 0.16, 0]} size={[1.5, 0.12, 0.72]} color={dark} />
      <Block at={[0, 0.54, -0.15]} size={[0.17, 0.82, 0.14]} />
      <Block at={[0, 1, -0.16]} size={[1.86, 1.06, 0.2]} />
      <Block at={[0, 1, -0.045]} size={[1.69, 0.89, 0.06]} color="#123449" />
      {[0.1, 0.28, 0.48, 0.32, 0.59, 0.42, 0.7].map((h, i) => (
        <Block
          key={i}
          at={[-0.64 + i * 0.2, 0.61 + h / 2, -0.007]}
          size={[0.11, h, 0.025]}
          color={i === 6 ? amber : ice}
        />
      ))}
      <Block at={[0, 0.23, 0.51]} size={[1.23, 0.055, 0.4]} color={steel} />
    </group>
  );
}

function RobotArm() {
  return (
    <group>
      <Drum at={[0, 0.23, 0]} radius={0.57} height={0.3} color={dark} />
      <Drum at={[0, 0.48, 0]} radius={0.39} height={0.3} />
      <Block
        at={[-0.17, 0.93, 0]}
        size={[0.31, 0.97, 0.38]}
        tilt={0.4}
        color={amber}
      />
      <Block
        at={[0.05, 1.48, 0]}
        size={[0.92, 0.25, 0.29]}
        tilt={0.3}
        color={steel}
      />
      <Block
        at={[0.57, 1.43, 0]}
        size={[0.2, 0.4, 0.25]}
        tilt={0.33}
        color={amber}
      />
      {[-0.13, 0.13].map((x) => (
        <Block
          key={x}
          at={[0.62 + x, 1.17, 0]}
          size={[0.07, 0.21, 0.22]}
          color={dark}
        />
      ))}
      {[
        [-0.34, 1.39, 0.07],
        [0.46, 1.59, 0.06],
      ].map(([x, y, z]) => (
        <group key={x} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
          <Drum at={[0, 0, 0]} radius={0.17} height={0.42} color={dark} />
        </group>
      ))}
    </group>
  );
}

function CameraRig() {
  return (
    <group rotation={[0, -0.36, 0]}>
      <Drum at={[0, 0.18, 0]} radius={0.49} height={0.16} color={dark} />
      <Block at={[0, 0.54, 0]} size={[0.14, 0.63, 0.17]} />
      <Block at={[0, 1.03, 0]} size={[0.98, 0.67, 0.64]} color={steel} />
      <group rotation={[Math.PI / 2, 0, 0]} position={[0, 1.03, 0.37]}>
        <Drum at={[0, 0, 0]} radius={0.25} height={0.26} color={dark} />
        <Drum at={[0, 0.15, 0]} radius={0.17} height={0.045} color={ice} />
      </group>
      <Block at={[-0.31, 1.25, 0.34]} size={[0.09, 0.05, 0.02]} color={amber} />
    </group>
  );
}

function Hologram() {
  return (
    <group>
      <Drum at={[0, 0.2, 0]} radius={0.7} height={0.23} color={dark} />
      <Drum at={[0, 0.34, 0]} radius={0.56} height={0.06} color={ice} />
      <mesh position={[0, 1.04, 0]} rotation={[0.2, 0.2, 0.4]}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={ice}
          flatShading
          metalness={0.35}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 1.04, 0]} rotation={[0.2, 0.2, 0.4]}>
        <icosahedronGeometry args={[0.65, 0]} />
        <meshBasicMaterial color={ice} wireframe />
      </mesh>
    </group>
  );
}

function FitCamera() {
  const { camera, size, invalidate } = useThree();
  useLayoutEffect(() => {
    const cam = camera as OrthographicCamera;
    cam.zoom = Math.min(size.width / 10.1, size.height / 6.0);
    cam.lookAt(0, 0.66, 0);
    cam.updateProjectionMatrix();
    invalidate();
  }, [camera, size, invalidate]);
  return null;
}

const stations: Point[] = [
  [-2.03, 0, -0.88],
  [0.95, 0, -0.9],
  [-1.55, 0, 1.09],
  [1.53, 0, 1.07],
];
export default function LabScene({
  selected,
  onSelect,
  onLost,
}: {
  selected: number;
  onSelect: (i: number) => void;
  onLost: () => void;
}) {
  return (
    <Canvas
      orthographic
      camera={{ position: [7, 6.3, 9], near: 0.1, far: 60 }}
      frameloop="demand"
      dpr={[1, 1.4]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", onLost, {
          once: true,
        });
      }}
    >
      <FitCamera />
      <ambientLight intensity={1.1} />
      <directionalLight position={[-3, 8, 5]} intensity={2.3} />
      <directionalLight position={[5, 4, -6]} color="#8ac3e5" intensity={2} />
      <Block at={[0, -0.25, 0]} size={[7.45, 0.42, 4.72]} color="#34556a" />
      <Block at={[0, -0.02, 0]} size={[7.55, 0.095, 4.82]} color="#628296" />
      {[-3, -2, -1, 0, 1, 2, 3].map((x) => (
        <Block
          key={x}
          at={[x, 0.036, 0]}
          size={[0.015, 0.014, 4.6]}
          color="#455f71"
        />
      ))}
      {[-2, -1, 0, 1, 2].map((z) => (
        <Block
          key={z}
          at={[0, 0.036, z]}
          size={[7.35, 0.014, 0.015]}
          color="#455f71"
        />
      ))}
      {stations.map((pos, i) => (
        <group
          position={pos}
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(i);
          }}
        >
          <Block
            at={[0, 0.07, 0]}
            size={[2.12, 0.07, 1.61]}
            color={selected === i ? amber : "#425e72"}
          />
          <Block at={[0, 0.12, 0]} size={[2.02, 0.05, 1.51]} color="#526e82" />
          {[<Workstation />, <RobotArm />, <CameraRig />, <Hologram />][i]}
        </group>
      ))}
    </Canvas>
  );
}

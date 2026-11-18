import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import { Group, MathUtils, OrthographicCamera } from "three";
import type { Mood, ObjectKind, StageObject } from "./data";
import { goal, maze, sameCell, type Cell } from "./maze";

export type SceneProps = {
  object?: StageObject;
  mood: Mood;
  position: Cell;
  path: Cell[];
  mazeMode: boolean;
  reduced: boolean;
  onObject: () => void;
  selected: boolean;
  carrying?: boolean;
  onFailure: () => void;
};
function Geometry({ kind }: { kind: ObjectKind }) {
  switch (kind) {
    case "circle":
      return <cylinderGeometry args={[0.55, 0.55, 0.16, 24]} />;
    case "triangle":
      return <cylinderGeometry args={[0.65, 0.65, 0.16, 3]} />;
    case "sphere":
      return <sphereGeometry args={[0.5, 20, 14]} />;
    case "cylinder":
      return <cylinderGeometry args={[0.4, 0.4, 0.9, 20]} />;
    case "pyramid":
      return <coneGeometry args={[0.65, 1, 4]} />;
    default:
      return <boxGeometry args={[0.8, 0.8, 0.8]} />;
  }
}
function Robot({
  mood,
  position,
  mazeMode,
  reduced,
  carrying,
}: Pick<
  SceneProps,
  "mood" | "position" | "mazeMode" | "reduced" | "carrying"
>) {
  const body = useRef<Group>(null),
    head = useRef<Group>(null),
    arm = useRef<Group>(null),
    legs = useRef<Group>(null);
  useFrame(({ clock }, dt) => {
    if (!body.current) return;
    const x = mazeMode ? position[1] - 2 : -1.4,
      z = mazeMode ? position[0] - 2 : 0.2;
    const moving =
      Math.hypot(body.current.position.x - x, body.current.position.z - z) >
      0.025;
    body.current.position.x = reduced
      ? x
      : MathUtils.damp(body.current.position.x, x, 8, dt);
    body.current.position.z = reduced
      ? z
      : MathUtils.damp(body.current.position.z, z, 8, dt);
    const t = clock.elapsedTime;
    body.current.position.y = reduced ? 0.2 : 0.2 + Math.sin(t * 2) * 0.018;
    if (head.current)
      head.current.rotation.z = reduced
        ? 0
        : mood === "confused"
          ? 0.18
          : Math.sin(t * (mood === "thinking" ? 5 : 1.6)) * 0.055;
    if (arm.current)
      arm.current.rotation.z = reduced
        ? 0
        : mood === "celebrating"
          ? -1.7 + Math.sin(t * 6) * 0.25
          : mood === "happy"
            ? -0.7
            : mood === "learning"
              ? -0.35
              : Math.sin(t * 2) * 0.07;
    if (legs.current)
      legs.current.rotation.x =
        moving && !reduced ? Math.sin(t * 15) * 0.22 : 0;
  });
  return (
    <group ref={body} scale={mazeMode ? 0.52 : 0.9} position={[-1.4, 0.2, 0.2]}>
      {carrying && (
        <mesh position={[0, 0.65, 0.48]}>
          <cylinderGeometry args={[0.23, 0.23, 0.4, 16]} />
          <meshStandardMaterial color="#6095BB" />
        </mesh>
      )}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.09, 0]}>
        <circleGeometry args={[0.55, 24]} />
        <meshBasicMaterial
          color="#071C33"
          transparent
          opacity={0.24}
          depthWrite={false}
        />
      </mesh>
      <group ref={head} position={[0, 1.3, 0]}>
        <mesh>
          <boxGeometry args={[0.8, 0.6, 0.6]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.31]}>
          <boxGeometry args={[0.65, 0.38, 0.04]} />
          <meshStandardMaterial color="#071C33" />
        </mesh>
        {[-0.19, 0.19].map((x) => (
          <mesh
            key={x}
            position={[x, 0.04, 0.34]}
            scale={[1, mood === "happy" || mood === "celebrating" ? 0.4 : 1, 1]}
          >
            <sphereGeometry args={[0.065, 12, 8]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        ))}
        <mesh
          position={[0, -0.1, 0.34]}
          rotation={[0, 0, mood === "confused" ? 0.2 : 0]}
        >
          <boxGeometry args={[0.16, 0.025, 0.015]} />
          <meshBasicMaterial color="#6095BB" />
        </mesh>
        <mesh position={[0, 0.42, 0]}>
          <sphereGeometry args={[0.075, 12, 8]} />
          <meshStandardMaterial color="#6095BB" />
        </mesh>
      </group>
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.65, 0.65, 0.45]} />
        <meshStandardMaterial color="#285A85" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.75, 0.24]}>
        <boxGeometry args={[0.27, 0.17, 0.025]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <group ref={arm} position={[0.43, 0.95, 0]}>
        <mesh position={[0, -0.18, 0]}>
          <capsuleGeometry args={[0.09, 0.35, 4, 8]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>
      <mesh position={[-0.43, 0.72, 0]}>
        <capsuleGeometry args={[0.09, 0.35, 4, 8]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <group ref={legs}>
        {[-0.2, 0.2].map((x) => (
          <mesh key={x} position={[x, 0.2, 0.03]}>
            <boxGeometry args={[0.2, 0.4, 0.4]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
function ObjectDisplay({
  object,
  selected,
  onObject,
  reduced,
}: Pick<SceneProps, "object" | "selected" | "onObject" | "reduced">) {
  const group = useRef<Group>(null);
  useFrame((_, dt) => {
    if (group.current && !reduced) group.current.rotation.y += dt * 0.3;
  });
  if (!object) return null;
  return (
    <group position={[1.2, 1, 0]}>
      <group ref={group}>
        <mesh
          rotation={
            object.kind === "circle" || object.kind === "triangle"
              ? [Math.PI / 2, 0, 0]
              : [0, Math.PI / 4, 0]
          }
          onClick={(event) => {
            event.stopPropagation();
            onObject();
          }}
          scale={selected ? 1.1 : 1}
        >
          <Geometry kind={object.kind} />
          <meshStandardMaterial
            color={object.color}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
      </group>
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.85, 0.95, 0.2, 24]} />
        <meshStandardMaterial color="#285A85" />
      </mesh>
    </group>
  );
}
function Framing({
  mazeMode,
  reduced,
}: Pick<SceneProps, "mazeMode" | "reduced">) {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    const view = camera as OrthographicCamera;
    view.zoom = Math.min(size.width / 7.7, size.height / 6.4);
    view.updateProjectionMatrix();
  }, [camera, size]);
  useFrame((_, dt) => {
    const targetY = mazeMode ? 7 : 5;
    camera.position.y = reduced
      ? targetY
      : MathUtils.damp(camera.position.y, targetY, 5, dt);
    camera.lookAt(0, 0.3, 0);
  });
  return null;
}
export default function RobotScene(props: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.35]}
      frameloop={props.reduced ? "demand" : "always"}
      orthographic
      camera={{ position: [5, 6, 7], zoom: 55, near: 0.1, far: 50 }}
      gl={{ antialias: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", props.onFailure, {
          once: true,
        });
      }}
    >
      <Framing {...props} />
      <color attach="background" args={["#071C33"]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[2, 6, 3]} intensity={2} />
      <hemisphereLight args={["#FFFFFF", "#163B63", 1]} />
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[6, 0.25, 6]} />
        <meshStandardMaterial color="#163B63" />
      </mesh>
      {props.mazeMode ? (
        maze.flatMap((row, r) =>
          row.map((wall, c) => (
            <group key={`${r}-${c}`} position={[c - 2, 0.15, r - 2]}>
              <mesh position={[0, wall ? 0.35 : 0, 0]}>
                <boxGeometry args={[0.9, wall ? 0.7 : 0.08, 0.9]} />
                <meshStandardMaterial
                  color={
                    wall
                      ? "#6095BB"
                      : sameCell([r, c], goal)
                        ? "#FFFFFF"
                        : props.path.some((cell) => sameCell(cell, [r, c]))
                          ? "#6095BB"
                          : "#285A85"
                  }
                />
              </mesh>
            </group>
          )),
        )
      ) : (
        <>
          <ObjectDisplay {...props} />
          <mesh position={[-2, 0.4, -1.8]}>
            <boxGeometry args={[0.65, 0.8, 0.45]} />
            <meshStandardMaterial color="#285A85" />
          </mesh>
          <mesh position={[-2, 0.65, -1.56]}>
            <boxGeometry args={[0.45, 0.22, 0.02]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </>
      )}
      <Robot {...props} />
    </Canvas>
  );
}

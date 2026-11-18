import * as T from "three";

// All dimensions are local to the floating pod. The equatorial gap exposes its
// internal chassis and the optical visor under the ceramic-metal shell.
export function createCore() {
  const pod = new T.Group(),
    rotor = new T.Group(),
    orbit = new T.Group();
  const steel = new T.MeshStandardMaterial({
    color: "#acbed2",
    metalness: 0.84,
    roughness: 0.24,
    side: T.DoubleSide,
  });
  const pearl = new T.MeshStandardMaterial({
    color: "#d7e6ec",
    metalness: 0.64,
    roughness: 0.22,
    side: T.DoubleSide,
  });
  const rim = new T.MeshStandardMaterial({
    color: "#657b90",
    metalness: 0.93,
    roughness: 0.19,
  });
  const dark = new T.MeshStandardMaterial({
    color: "#192735",
    metalness: 0.72,
    roughness: 0.36,
  });
  const lens = new T.MeshPhysicalMaterial({
    color: "#05121e",
    metalness: 0.22,
    roughness: 0.18,
    clearcoat: 1,
  });
  const amber = new T.MeshStandardMaterial({
    color: "#fc8c39",
    metalness: 0.56,
    roughness: 0.26,
    side: T.DoubleSide,
  });
  const cyan = new T.MeshBasicMaterial({ color: "#8ce9ff" });
  const white = new T.MeshBasicMaterial({ color: "#fff4db" });
  const mesh = (
    g: T.BufferGeometry,
    m: T.Material,
    parent: T.Object3D = pod,
  ) => {
    const o = new T.Mesh(g, m);
    parent.add(o);
    return o;
  };
  function hoop(
    radius: number,
    tube: number,
    y: number,
    material: T.Material,
    parent = pod,
  ) {
    const h = mesh(new T.TorusGeometry(radius, tube, 8, 96), material, parent);
    h.rotation.x = Math.PI / 2;
    h.position.y = y;
    return h;
  }
  function sphere(
    radius: number,
    start: number,
    end: number,
    m: T.Material,
    y = 0,
  ) {
    const s = mesh(
      new T.SphereGeometry(radius, 72, 32, 0, Math.PI * 2, start, end - start),
      m,
    );
    s.position.y = y;
    return s;
  }
  sphere(0.91, 0, Math.PI, dark);
  sphere(0.985, 1.12, 2.03, lens);
  sphere(1.02, 0.12, 1.13, pearl, 0.065);
  sphere(1.015, 2.04, Math.PI - 0.12, steel, -0.05);
  // Amber service stripe follows the shell curvature.
  const stripe = mesh(
    new T.SphereGeometry(1.025, 5, 28, 0.8, 0.094, 0.18, 0.905),
    amber,
  );
  stripe.position.y = 0.065;
  hoop(0.919, 0.024, 0.503, rim);
  hoop(0.91, 0.014, 0.47, amber);
  hoop(0.91, 0.024, -0.508, rim);
  hoop(0.89, 0.014, -0.55, dark);
  for (const y of [-0.68, -0.72])
    hoop(Math.sqrt(1 - y * y), 0.009, y - 0.062, dark);
  for (const side of [-1, 1]) {
    const socket = mesh(new T.CylinderGeometry(0.32, 0.32, 0.1, 40), dark);
    socket.rotation.z = Math.PI / 2;
    socket.position.set(side * 0.97, 0.01, 0);
    const cap = mesh(new T.CylinderGeometry(0.257, 0.257, 0.125, 40), steel);
    cap.rotation.z = Math.PI / 2;
    cap.position.set(side * 1.015, 0.01, 0);
    const hub = mesh(new T.CylinderGeometry(0.16, 0.16, 0.131, 32), amber);
    hub.rotation.z = Math.PI / 2;
    hub.position.set(side * 1.024, 0.01, 0);
    const pin = mesh(new T.CylinderGeometry(0.095, 0.095, 0.14, 24), dark);
    pin.rotation.z = Math.PI / 2;
    pin.position.set(side * 1.032, 0.01, 0);
    for (let l = 0; l < 6; l++) {
      const a = (l * Math.PI) / 3;
      const bolt = mesh(new T.SphereGeometry(0.024, 8, 6), dark);
      bolt.position.set(
        side * 1.08,
        0.01 + 0.202 * Math.cos(a),
        0.202 * Math.sin(a),
      );
    }
    // Stacked light segments read as an expressive pair of eyes.
    for (let j = -3; j <= 3; j++) {
      const led = mesh(
        new T.CapsuleGeometry(0.019, 0.105 - 0.012 * Math.abs(j), 3, 7),
        cyan,
      );
      led.rotation.z = Math.PI / 2;
      led.position.set(side * 0.273, j * 0.048 + 0.035, 0.958);
      led.rotation.y = side * 0.23;
    }
  }
  for (let i = 0; i < 20; i++) {
    const a = (i * Math.PI) / 10,
      tooth = mesh(new T.BoxGeometry(0.034, 0.075, 0.022), dark);
    tooth.position.set(0.859 * Math.sin(a), 0.601, 0.859 * Math.cos(a));
    tooth.rotation.y = a;
  }
  // A gimballed magnetic flywheel, suspended outside the outer shell.
  pod.add(rotor, orbit);
  rotor.rotation.z = -0.41;
  rotor.rotation.x = 0.12;
  hoop(1.43, 0.037, -0.33, rim, rotor);
  hoop(1.44, 0.009, -0.305, cyan, rotor);
  for (let j = 0; j < 3; j++) {
    const clamp = mesh(
      new T.TorusGeometry(1.43, 0.066, 8, 22, 0.69),
      j === 0 ? amber : steel,
      rotor,
    );
    clamp.rotation.set(Math.PI / 2, 0, j * 2.09);
    clamp.position.y = -0.33;
  }
  orbit.rotation.set(0.8, 0.08, -0.53);
  hoop(1.68, 0.008, 0, rim, orbit);
  for (const a of [0.5, 2.8, 4.4]) {
    const node = mesh(new T.SphereGeometry(0.046, 14, 8), amber, orbit);
    node.position.set(1.68 * Math.cos(a), 0, 1.68 * Math.sin(a));
  }
  const apex = mesh(new T.CylinderGeometry(0.15, 0.18, 0.065, 32), dark);
  apex.position.y = 1.073;
  const beacon = mesh(new T.CylinderGeometry(0.084, 0.1, 0.042, 32), white);
  beacon.position.y = 1.122;
  pod.rotation.set(0.1, -0.39, 0.14);
  return { pod, rotor, orbit };
}

// A compact photographic light rig encoded as a linear equirectangular map.
// Specular highlights therefore need no remote HDR asset or real-time mirrors.
export function studioTexture() {
  const width = 256,
    height = 128,
    pixels = new Uint16Array(width * height * 4);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const u = x / width,
        v = y / height;
      const box = (cx: number, cy: number, wx: number, hy: number) =>
        Math.exp(-Math.pow((u - cx) / wx, 8) - Math.pow((v - cy) / hy, 8));
      const key =
        box(0.67, 0.74, 0.095, 0.15) * 6 +
        box(0.2, 0.72, 0.053, 0.22) * 4 +
        box(0.88, 0.53, 0.026, 0.17) * 3;
      const blue = box(0.39, 0.55, 0.06, 0.25) * 2,
        base = 0.06 + 0.27 * v;
      for (const [i, c] of [
        base + key + 0.18 * blue,
        base + key + 0.58 * blue,
        base + key + blue,
        1,
      ].entries())
        pixels[4 * (y * width + x) + i] = T.DataUtils.toHalfFloat(c);
    }
  const texture = new T.DataTexture(
    pixels,
    width,
    height,
    T.RGBAFormat,
    T.HalfFloatType,
  );
  texture.mapping = T.EquirectangularReflectionMapping;
  texture.needsUpdate = true;
  return texture;
}

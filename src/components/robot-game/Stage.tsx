import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import type { SceneProps } from "./RobotScene";
import { maze, sameCell, goal } from "./maze";
const Scene = lazy(() => import("./RobotScene"));
class Boundary extends Component<
  { children: ReactNode; failed: () => void },
  { broken: boolean }
> {
  state = { broken: false };
  static getDerivedStateFromError() {
    return { broken: true };
  }
  componentDidCatch() {
    this.props.failed();
  }
  render() {
    return this.state.broken ? null : this.props.children;
  }
}
export default function Stage(
  props: Omit<SceneProps, "reduced" | "onFailure">,
) {
  const reduced = useReducedMotion(),
    host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false),
    [broken, setBroken] = useState(false),
    [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!host.current) return;
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      setBroken(true);
      return;
    }
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(host.current);
    setLoaded(true);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="teach-stage" ref={host}>
      <div className="teach-stage-bar">
        <span>GUIOMAR / ENSINE O ROBÔ</span>
        <span>{broken ? "Modo simplificado" : "Bancada 3D"}</span>
      </div>
      {loaded && visible && !broken ? (
        <Boundary failed={() => setBroken(true)}>
          <Suspense
            fallback={<p className="teach-loading">Preparando a bancada…</p>}
          >
            <Scene
              {...props}
              reduced={Boolean(reduced)}
              onFailure={() => setBroken(true)}
            />
          </Suspense>
        </Boundary>
      ) : (
        <div className="teach-fallback">
          {props.mazeMode ? (
            <div className="teach-map" aria-label="Mapa do percurso">
              {maze.flatMap((row, r) =>
                row.map((wall, c) => (
                  <span key={`${r}-${c}`} className={wall ? "wall" : ""}>
                    {sameCell(props.position, [r, c])
                      ? "Robô"
                      : sameCell(goal, [r, c])
                        ? "Saída"
                        : wall
                          ? "■"
                          : "·"}
                  </span>
                )),
              )}
            </div>
          ) : (
            <>
              <div className="teach-flat-robot" aria-hidden="true">
                ▰<br />▣
              </div>
              <button type="button" onClick={props.onObject}>
                {props.object?.caption ?? "Robô pronto para aprender"}
              </button>
            </>
          )}
        </div>
      )}
      <p className="teach-caption">
        {props.mazeMode
          ? `Robô na linha ${props.position[0] + 1}, coluna ${props.position[1] + 1}. Saída na linha 5, coluna 5.`
          : (props.object?.caption ?? "Selecione um desafio para começar.")}
      </p>
    </div>
  );
}

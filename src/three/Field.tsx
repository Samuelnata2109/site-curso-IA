import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import "./core.css";

const CoreCanvas = lazy(() => import("./CoreCanvas"));
const facts = [
  "Uma conexão ganha peso quando ajuda o modelo a acertar.",
  "Exemplos variados ajudam a reconhecer padrões novos.",
  "Um modelo também erra. Testar com exemplos inéditos revela seus limites.",
];

class CoreBoundary extends Component<
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

export default function Field() {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false),
    [broken, setBroken] = useState(false);
  const [ready, setReady] = useState(false),
    [signal, setSignal] = useState(0);
  const reduced = useReducedMotion();
  const painted = useCallback(() => setReady(true), []);
  const failed = useCallback(() => setBroken(true), []);
  useEffect(() => {
    if (!container.current || reduced || !window.WebGL2RenderingContext) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entry.isIntersecting) setReady(false);
    });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, [reduced]);
  const live = visible && !reduced && !broken;
  return (
    <div className="core-view" ref={container}>
      <button
        type="button"
        className="core-trigger"
        aria-label="Ativar núcleo de IA e descobrir como ele aprende"
        onClick={() => setSignal((n) => n + 1)}
      >
        <img
          className="core-poster"
          src={import.meta.env.BASE_URL + "art/core-pod.webp"}
          width="940"
          height="740"
          fetchPriority="high"
          alt=""
          style={{ opacity: live && ready ? 0 : 1 }}
        />
        {live && (
          <div aria-hidden="true" className="core-canvas">
            <CoreBoundary failed={failed}>
              <Suspense fallback={null}>
                <CoreCanvas signal={signal} ready={painted} failed={failed} />
              </Suspense>
            </CoreBoundary>
          </div>
        )}
        <span className="core-hint">
          <span aria-hidden="true">↳</span> Ativar núcleo
        </span>
      </button>
      <output className="core-feedback" aria-live="polite">
        {signal > 0 && facts[(signal - 1) % facts.length]}
      </output>
    </div>
  );
}

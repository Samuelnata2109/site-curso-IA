import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import "../styles/lab.css";

const Scene = lazy(() => import("../three/LabScene"));
const objects = [
  {
    name: "Estação neural",
    subject: "Como a máquina aprende?",
    text: "Durante o treino, o computador compara as previsões com exemplos conhecidos. A rede ajusta suas conexões para tentar errar menos na próxima rodada.",
  },
  {
    name: "Braço robótico",
    subject: "Como o braço acerta o alvo?",
    text: "Sensores medem a posição das juntas. O controlador usa essas medidas para ajustar o movimento até a garra alcançar o objeto.",
  },
  {
    name: "Câmera inteligente",
    subject: "O que a câmera enxerga?",
    text: "Para o computador, uma foto é uma grade de números. Um modelo treinado pode reconhecer combinações de cores e contornos para identificar objetos.",
  },
  {
    name: "Núcleo holográfico",
    subject: "Como representar uma ideia?",
    text: "Este núcleo é uma visualização. Representar dados com formas, posições e cores ajuda a investigar relações que seriam difíceis de perceber em uma tabela.",
  },
];

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Lab() {
  const [selected, select] = useState(0);
  const [visible, show] = useState(false);
  const [lost, setLost] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current || !window.WebGL2RenderingContext) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => show(inView && !motion.matches);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { rootMargin: "120px" },
    );
    observer.observe(host.current);
    motion.addEventListener("change", update);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
    };
  }, []);
  return (
    <section id="laboratorio" className="laboratory">
      <div className="wrap">
        <div className="lab-intro">
          <h2>Entre no laboratório</h2>
          <p>Escolha um instrumento na bancada e descubra o que ele faz.</p>
        </div>
        <div className="lab-panel">
          <div className="lab-view" ref={host}>
            <img
              src={import.meta.env.BASE_URL + "art/lab.webp"}
              alt="Bancada isométrica com computador, braço robótico, câmera e núcleo holográfico."
              loading="lazy"
            />
            {visible && !lost && (
              <SceneBoundary>
                <Suspense fallback={null}>
                  <div className="lab-canvas" aria-hidden="true">
                    <Scene
                      selected={selected}
                      onSelect={select}
                      onLost={() => setLost(true)}
                    />
                  </div>
                </Suspense>
              </SceneBoundary>
            )}
          </div>
          <div className="lab-console">
            <div
              className="lab-select"
              role="group"
              aria-label="Instrumentos da bancada"
            >
              {objects.map((o, i) => (
                <button
                  type="button"
                  key={o.name}
                  aria-pressed={selected === i}
                  onClick={() => select(i)}
                >
                  {o.name}
                </button>
              ))}
            </div>
            <div className="lab-result" aria-live="polite">
              <h3>{objects[selected].subject}</h3>
              <p>{objects[selected].text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

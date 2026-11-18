import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
const Field = lazy(() => import("../three/Field"));
export default function Hero() {
  const reduced = useReducedMotion(),
    ref = useRef<HTMLDivElement>(null),
    [show, set] = useState(false);
  useEffect(() => {
    if (reduced || !ref.current) return;
    const gl = document.createElement("canvas").getContext("webgl2");
    if (!gl) return;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    const observer = new IntersectionObserver(([entry]) =>
      set(entry.isIntersecting),
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reduced]);
  return (
    <section id="inicio" className="hero">
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">
            <b /> CURSO TÉCNICO · INTELIGÊNCIA ARTIFICIAL
          </span>
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            O futuro não
            <br />
            se espera.
            <br />
            <em>Se constrói.</em>
          </motion.h1>
          <p>
            Explore o universo da Inteligência Artificial e descubra como
            transformar conhecimento em soluções que impactam o mundo.
          </p>
          <div className="actions">
            <a className="primary" href="#sobre">
              Explore o curso <ArrowRight />
            </a>
            <a href="#projetos">
              Conheça os projetos <ArrowUpRight />
            </a>
          </div>
        </div>
        <div
          className="visual"
          ref={ref}
          onPointerMove={(e) => {
            if (!reduced) {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--shift",
                10 * ((e.clientX - r.left) / r.width - 0.5) + "px",
              );
            }
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}art/neural.webp`}
            alt="Núcleo neural formado por milhares de pontos azuis e órbitas interligadas"
          />
          {show && (
            <div className="field">
              <Suspense fallback={null}>
                <Field />
              </Suspense>
            </div>
          )}
          <span className="graph-label">
            <i /> FIG. 01 — NÚCLEO NEURAL
          </span>
          <span className="axis">
            +<br />│<br />+
          </span>
        </div>
        <div className="hero-foot">
          <a href="#sobre">
            <ArrowDown size={15} /> ROLE PARA EXPLORAR
          </a>
          <span>
            <MapPin size={13} /> EEEP GUIOMAR BELCHIOR AGUIAR · CARIRÉ, CE
          </span>
        </div>
      </div>
    </section>
  );
}

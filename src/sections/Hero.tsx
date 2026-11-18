import { ArrowDownRight, ArrowRight, Crosshair } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Field from "../three/Field";
export default function Hero() {
  const reduced = useReducedMotion();
  return (
    <section id="inicio" className="launch">
      <div className="wrap launch-grid">
        <motion.div
          className="launch-copy"
          initial={reduced ? false : { opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.42 }}
        >
          <p className="launch-label">
            <span /> Curso técnico em inteligência artificial
          </p>
          <h1>
            E se você pudesse
            <br />
            ensinar uma
            <br />
            <em>máquina a pensar?</em>
          </h1>
          <p className="launch-intro">
            Descubra como a Inteligência Artificial aprende, cria e transforma
            ideias em experiências incríveis.
          </p>
          <div className="launch-actions">
            <a href="#missao">
              Quero explorar <ArrowRight size={18} />
            </a>
            <a href="#sobre">
              Descobrir o curso <ArrowDownRight size={15} />
            </a>
          </div>
        </motion.div>
        <div className="launch-figure">
          <div className="instrument-title">
            <Crosshair size={13} /> NÚCLEO INTERATIVO
          </div>
          <Field />
        </div>
      </div>
      <div className="launch-strip">
        <div className="wrap">
          <span>
            <i /> EEEP GUIOMAR BELCHIOR AGUIAR
          </span>
          <span>
            CARIRÉ <b> / </b> CEARÁ
          </span>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Game from "../components/robot-game/Game";
import { missions } from "../components/robot-game/data";
import {
  emptyProgress,
  loadProgress,
  saveProgress,
} from "../components/robot-game/progress";
import type { Sample } from "../components/robot-game/learning";
import "../styles/robot-game.css";

export default function Mission() {
  const [progress, setProgress] = useState(loadProgress);
  const [active, setActive] = useState<number | null>(null);
  const [stored, setStored] = useState(true);
  const [confirmReset, setConfirmReset] = useState(false);
  const reduced = useReducedMotion();
  function complete(score: number, samples: Sample[]) {
    if (active === null) return;
    const scores = [...progress.scores];
    scores[active] = Math.max(scores[active] ?? 0, score);
    const next = { ...progress, scores, samples };
    setProgress(next);
    setStored(saveProgress(next));
  }
  function reset() {
    const next = emptyProgress();
    setProgress(next);
    setStored(saveProgress(next));
    setConfirmReset(false);
  }
  return (
    <section id="missao" className="teach-game" aria-labelledby="mission-title">
      <div className="wrap">
        <div className="teach-heading">
          <div>
            <p className="teach-label">GUIOMAR IA · AVENTURA EDUCATIVA 3D</p>
            <h2 id="mission-title">Ensine o Robô</h2>
          </div>
          <p>
            Um robô curioso. Seis habilidades para descobrir. Ensine,
            experimente e veja o que muda quando você escolhe os exemplos.
          </p>
        </div>
        {active === null ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="teach-progress">
              <span>{progress.scores.length} de 6 desafios concluídos</span>
              <progress
                aria-label="Desafios concluídos"
                max={6}
                value={progress.scores.length}
              />
              <span>
                {progress.scores.reduce((sum, n) => sum + n, 0)} / 600 pontos
              </span>
            </div>
            <div className="teach-missions">
              {missions.map((mission, index) => (
                <button
                  className="teach-mission"
                  key={mission.name}
                  disabled={index > progress.scores.length}
                  onClick={() => setActive(index)}
                >
                  <span className="teach-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{mission.name}</strong>
                  <span>
                    {index < progress.scores.length
                      ? `Concluído · melhor resultado ${progress.scores[index]}% · Repetir`
                      : index === progress.scores.length
                        ? "Disponível · Começar →"
                        : "Bloqueado · conclua o desafio anterior"}
                  </span>
                </button>
              ))}
            </div>
            {progress.scores.length === 6 && (
              <p className="teach-summary" role="status">
                Aventura concluída! Desempenho geral de{" "}
                {Math.round(progress.scores.reduce((sum, n) => sum + n, 0) / 6)}
                %. Você ensinou formas, explorou características, planejou uma
                entrega e avaliou decisões responsáveis.
              </p>
            )}
            {confirmReset ? (
              <div className="teach-reset">
                <p>Apagar o progresso e os exemplos salvos neste navegador?</p>
                <button onClick={reset}>Apagar e começar de novo</button>
                <button onClick={() => setConfirmReset(false)}>Cancelar</button>
              </div>
            ) : (
              progress.scores.length > 0 && (
                <button
                  className="teach-reset-link"
                  onClick={() => setConfirmReset(true)}
                >
                  Reiniciar toda a aventura
                </button>
              )
            )}
            <p className="teach-note">
              {stored
                ? "Seu progresso fica neste navegador. Você pode repetir os desafios concluídos para melhorar sua pontuação."
                : "O navegador bloqueou o armazenamento. Seu progresso fica disponível enquanto esta página estiver aberta."}
            </p>
          </motion.div>
        ) : (
          <Game
            key={active}
            mission={active}
            savedSamples={progress.samples}
            onComplete={complete}
            onBack={() => setActive(null)}
          />
        )}
      </div>
    </section>
  );
}

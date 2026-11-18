import { useState, type CSSProperties } from "react";
import "../styles/demos.css";

type Group = "A" | "B";
type Samples = Record<Group, number[]>;
const mean = (values: number[]) =>
  values.reduce((sum, v) => sum + v, 0) / values.length;
export default function Mission() {
  const [samples, setSamples] = useState<Samples>({ A: [], B: [] });
  const [signal, setSignal] = useState(3);
  const [feedback, setFeedback] = useState(
    "Comece registrando um sinal em cada grupo.",
  );
  const ready = samples.A.length > 0 && samples.B.length > 0;
  function train(group: Group) {
    setSamples((prev) => ({ ...prev, [group]: [...prev[group], signal] }));
    setFeedback(`Sinal de ${signal} pulsos registrado no grupo ${group}.`);
  }
  function test() {
    const dA = Math.abs(signal - mean(samples.A));
    const dB = Math.abs(signal - mean(samples.B));
    const result =
      Math.abs(dA - dB) < 1e-8
        ? "Empate: o sinal está à mesma distância das duas médias."
        : `Grupo ${dA < dB ? "A" : "B"}: a média desse grupo está mais próxima do sinal.`;
    setFeedback(`Teste com ${signal} pulsos. ${result}`);
  }
  function reset() {
    setSamples({ A: [], B: [] });
    setSignal(3);
    setFeedback("Missão reiniciada. Registre um sinal em cada grupo.");
  }
  return (
    <section
      id="missao"
      aria-labelledby="mission-title"
      className="mission demo-section"
    >
      <div className="wrap mission-layout">
        <div className="mission-intro">
          <p className="demo-label">Simulação de classificação</p>
          <h2 id="mission-title">Sua primeira missão com IA</h2>
          <p>
            Ensine a máquina a separar sinais em dois grupos. Você decide o que
            cada grupo tem em comum.
          </p>
          <ol>
            <li>Ajuste o número de pulsos.</li>
            <li>Registre exemplos diferentes em A e B.</li>
            <li>Crie outro sinal e teste a previsão.</li>
          </ol>
        </div>
        <div className="mission-panel">
          <div className="signal-head">
            <label htmlFor="pulse-count">Pulsos do sinal</label>
            <output htmlFor="pulse-count">{signal}</output>
          </div>
          <div aria-hidden="true" className="pulse-track">
            {Array.from({ length: 12 }, (_, i) => (
              <i
                key={i}
                className={i < signal ? "on" : ""}
                style={
                  {
                    "--peak":
                      24 + 22 * Math.abs(Math.sin(i * 0.9 + 0.4)) + "px",
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <input
            id="pulse-count"
            type="range"
            min={1}
            max={12}
            value={signal}
            onChange={(e) => setSignal(Number(e.target.value))}
          />
          <div className="mission-banks">
            {(["A", "B"] as const).map((group) => (
              <div key={group}>
                <button onClick={() => train(group)}>
                  + Registrar em {group}
                </button>
                <small>
                  {samples[group].length} exemplo(s)
                  {samples[group].length > 0 &&
                    " · média " +
                      mean(samples[group]).toLocaleString("pt-BR", {
                        maximumFractionDigits: 1,
                      })}
                </small>
              </div>
            ))}
          </div>
          <div className="mission-actions">
            <button disabled={!ready} onClick={test}>
              Testar sinal <span aria-hidden="true">↗</span>
            </button>
            <button onClick={reset}>Reiniciar</button>
          </div>
          <p role="status" className="mission-feedback">
            {feedback}
          </p>
        </div>
      </div>
    </section>
  );
}

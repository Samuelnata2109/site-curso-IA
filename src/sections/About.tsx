import { useState } from "react";
import "../styles/demos.css";

const lessons = [
  {
    name: "Reconhecer imagens",
    question: "Como um aplicativo reconhece uma imagem?",
    intro:
      "Uma imagem é uma grade de pixels. Compare as duas silhuetas e observe como o contorno muda.",
    choices: ["Folha", "Estrela"],
    feedback: [
      "As bordas curvas e as pontas desenham uma folha.",
      "As cinco pontas formam a silhueta de uma estrela.",
    ],
    note: "Um modelo de visão aprende pistas visuais comparando muitas imagens.",
  },
  {
    name: "Interpretar perguntas",
    question: "Como uma IA entende uma pergunta?",
    intro:
      "Troque a primeira palavra e veja como muda o tipo de resposta esperada.",
    choices: ["Onde?", "Quando?"],
    feedback: [
      "“Onde começa o curso?” pede um lugar.",
      "“Quando começa o curso?” pede um momento.",
    ],
    note: "Modelos de linguagem usam as relações entre palavras para interpretar o contexto.",
  },
  {
    name: "Encontrar padrões",
    question: "Como um sistema identifica padrões?",
    intro:
      "Escolha uma sequência. Observe os valores conhecidos e a continuação sugerida.",
    choices: ["Dobrar", "Somar três"],
    feedback: [
      "2, 4, 8… Se o valor dobra, o próximo é 16.",
      "2, 5, 8… Se somamos três, o próximo é 11.",
    ],
    note: "Várias regras podem explicar poucos exemplos. Novos dados ajudam a testar a hipótese.",
  },
];

function PixelSample({ star }: { star: boolean }) {
  const cells = [];
  for (let y = -10; y <= 10; y++) {
    for (let x = -10; x <= 10; x++) {
      const angle = Math.atan2(y, x) + Math.PI / 2;
      const radius = Math.hypot(x, y);
      const lit = star
        ? radius <=
          4.8 /
            Math.cos(
              (((angle % (Math.PI * 0.4)) + Math.PI * 0.4) % (Math.PI * 0.4)) -
                Math.PI * 0.2,
            ) +
            3 * Math.cos(5 * angle)
        : Math.abs(x + y * 0.62) <= 5.4 * Math.cos((y * Math.PI) / 18) &&
          Math.abs(y) <= 9;
      cells.push(<i key={x + "," + y} className={lit ? "lit" : ""} />);
    }
  }
  return (
    <div className="pixel-specimen" aria-hidden="true">
      {cells}
    </div>
  );
}

export default function About() {
  const [mode, setMode] = useState(0);
  const [choice, setChoice] = useState(0);
  const lesson = lessons[mode];
  return (
    <section
      id="sobre"
      className="discovery demo-section"
      aria-labelledby="discovery-title"
    >
      <div className="wrap">
        <div className="demo-heading">
          <div>
            <p className="demo-label">Descoberta guiada</p>
            <h2 id="discovery-title">Afinal, o que é IA?</h2>
          </div>
          <p>
            Alguns sistemas aprendem com exemplos. Explore três ideias que já
            fazem parte do seu dia.
          </p>
        </div>
        <div className="discovery-deck">
          <div
            className="lesson-choices"
            role="group"
            aria-label="Escolha uma demonstração"
          >
            {lessons.map((item, i) => (
              <button
                key={item.name}
                aria-pressed={mode === i}
                onClick={() => {
                  setMode(i);
                  setChoice(0);
                }}
              >
                {item.name}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div className="specimen-stage">
            {mode === 0 ? (
              <PixelSample star={choice === 1} />
            ) : mode === 1 ? (
              <div className="token-scene" aria-hidden="true">
                <strong>{choice ? "Quando" : "Onde"}</strong>
                <span>começa</span>
                <span>o curso?</span>
              </div>
            ) : (
              <div className="sequence-scene" aria-hidden="true">
                {(choice ? [2, 5, 8, 11] : [2, 4, 8, 16]).map((v) => (
                  <i key={v} style={{ height: v * 6 + 30 + "px" }}>
                    {v}
                  </i>
                ))}
              </div>
            )}
          </div>
          <div className="lesson-body">
            <h3>{lesson.question}</h3>
            <p>{lesson.intro}</p>
            <div
              className="sample-switch"
              role="group"
              aria-label="Alterar exemplo"
            >
              {lesson.choices.map((label, i) => (
                <button
                  key={label}
                  aria-pressed={choice === i}
                  onClick={() => setChoice(i)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div aria-live="polite">
              <strong>{lesson.feedback[choice]}</strong>
              <p>{lesson.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

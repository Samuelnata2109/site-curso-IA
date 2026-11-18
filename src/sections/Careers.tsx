import { useState } from "react";
const questions = [
  [
    "Gosto de tecnologia. Preciso saber programar?",
    "Você pode começar pela curiosidade. Ler um pequeno programa, testar uma mudança e observar o resultado já é uma forma de aprender.",
  ],
  [
    "Como os aplicativos fazem recomendações?",
    "Eles comparam informações, como as músicas que você ouviu. Estudar análise de dados ajuda a investigar quais sinais influenciam uma sugestão.",
  ],
  [
    "E se eu quiser inventar algo?",
    "Comece com um protótipo pequeno: por exemplo, um programa que organize imagens. Desenvolvimento de software e pesquisa combinam testes, criatividade e revisão.",
  ],
  [
    "Gosto de resolver desafios. Por onde começo?",
    "Observe uma tarefa repetitiva. Descreva suas etapas e imagine o que um sistema poderia automatizar. Depois, pense em como verificar se a solução ajudou alguém.",
  ],
];
export default function Careers() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="oportunidades" className="question-room">
      <div className="wrap">
        <div>
          <h2>Por que estudar IA?</h2>
          <p>
            Você pode chegar com perguntas. Elas já são um ponto de partida.
          </p>
        </div>
        <div>
          {questions.map(([q, a], i) => (
            <div className="question-item" key={q}>
              <h3>
                <button
                  aria-expanded={open === i}
                  aria-controls={"answer-" + i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {q}
                  <span aria-hidden="true">{open === i ? "−" : "+"}</span>
                </button>
              </h3>
              <p hidden={open !== i} id={"answer-" + i}>
                {a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

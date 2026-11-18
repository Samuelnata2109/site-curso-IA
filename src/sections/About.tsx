import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import "../styles/demos.css";

const examples = [
  {
    name: "Vídeos",
    question: "Já percebeu que alguns aplicativos recomendam vídeos parecidos com os que você gosta?",
    explanation: "Os aplicativos podem analisar os vídeos que você assiste, curte ou ignora para recomendar outros conteúdos.",
    choices: ["Games", "Música", "Esportes"],
    results: ["Um vídeo sobre criar seu próprio jogo", "Um vídeo com novos ritmos para descobrir", "Um vídeo com lances de uma partida"],
    summary: "Viu só? Sistemas de recomendação usam informações sobre suas preferências para sugerir conteúdos!",
    label: "Demonstração simplificada: a recomendação foi definida para cada categoria.",
  },
  {
    name: "Fotos",
    question: "Como um celular consegue identificar o que aparece em uma foto?",
    explanation: "Alguns sistemas de IA aprendem padrões analisando muitas imagens. Depois, usam esses padrões para reconhecer objetos em novas fotos.",
    choices: ["Gato", "Cachorro", "Bicicleta"],
    results: ["Gato identificado", "Cachorro identificado", "Bicicleta identificada"],
    summary: "Um sistema real compara padrões da foto com os exemplos que aprendeu.",
    label: "Demonstração ilustrativa: as figuras já têm respostas definidas. Não há reconhecimento real de imagens.",
  },
  {
    name: "Perguntas",
    question: "Como uma IA consegue responder quando você faz uma pergunta?",
    explanation: "Modelos de linguagem aprendem padrões a partir de grandes quantidades de textos e usam esses padrões para produzir respostas.",
    choices: ["O que é Inteligência Artificial?", "Onde encontramos IA no dia a dia?", "Preciso saber programar para começar?"],
    results: ["É uma tecnologia que ajuda computadores a reconhecer imagens, entender perguntas e encontrar padrões.", "Em recomendações de vídeos, mapas, tradutores e reconhecimento de imagens.", "Não. A curiosidade é um ótimo começo, e programar é algo que você pode aprender."],
    summary: "As respostas desta conversa foram escritas antes da sua escolha.",
    label: "Conversa de demonstração com respostas predefinidas.",
  },
] as const;

export default function About() {
  const [mode, setMode] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const example = examples[mode];
  return (
    <section id="sobre" className="discovery demo-section" aria-labelledby="discovery-title">
      <div className="wrap">
        <div className="demo-heading">
          <div><p className="demo-label">Descoberta guiada</p><h2 id="discovery-title">Afinal, o que é Inteligência Artificial?</h2></div>
          <p className="discovery-lead">Você provavelmente já usou Inteligência Artificial hoje e nem percebeu!</p>
        </div>
        <div className="discovery-intro">
          <p>Inteligência Artificial, ou IA, é uma tecnologia que permite aos computadores realizar tarefas como reconhecer imagens, entender perguntas e encontrar padrões.</p>
          <p>Alguns sistemas de IA aprendem analisando muitos exemplos. Assim, conseguem fazer previsões, recomendações ou identificar informações.</p>
        </div>
        <div className="discovery-deck">
          <div className="lesson-choices" role="group" aria-label="Escolha uma demonstração">
            {examples.map((item, index) => <button key={item.name} type="button" aria-pressed={mode === index} onClick={() => { setMode(index); setChoice(null); }}>{item.name}<span aria-hidden="true">↗</span></button>)}
          </div>
          <div className="specimen-stage" aria-hidden="true">
            {mode === 0 && <div className="recommend-scene"><span>▶</span><span>♫</span><span>◆</span></div>}
            {mode === 1 && <div className="object-scene"><span>{choice === 0 ? "🐈" : choice === 1 ? "🐕" : choice === 2 ? "🚲" : "▧"}</span><i>ANALISANDO IMAGEM</i></div>}
            {mode === 2 && <div className="chat-scene"><span>?</span><span>↳</span></div>}
          </div>
          <div className="lesson-body">
            <h3>{example.question}</h3><p>{example.explanation}</p>
            <div className="sample-switch" role="group" aria-label="Escolha um exemplo">
              {example.choices.map((label, index) => <button type="button" key={label} aria-pressed={choice === index} onClick={() => setChoice(index)}>{label}</button>)}
            </div>
            <div className="discovery-result" aria-live="polite">
              {choice === null ? <p>Escolha uma opção para ver o resultado.</p> : <motion.div key={`${mode}-${choice}`} initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .2 }}>
                {mode === 2 && <p className="chat-question">Você: {example.choices[choice]}</p>}
                <strong>{mode === 2 ? "Assistente: " : "Resultado: "}{example.results[choice]}</strong><p>{example.summary}</p>
              </motion.div>}
            </div>
            <small className="discovery-note">{example.label}</small>
          </div>
        </div>
      </div>
    </section>
  );
}

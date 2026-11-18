import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import "../styles/demos.css";

type Label = "circle" | "triangle";
type Phase = "intro" | "training" | "testing" | "result";
type Features = { roundness: number; vertices: number; color: number };
type ShapeObject = Features & { id: string; colorName: "azul" | "laranja"; truth: Label };
type Sample = { features: Features; label: Label };

const trainingObjects: ShapeObject[] = [
  { id: "train-1", truth: "circle", roundness: .98, vertices: 0, color: 0, colorName: "azul" },
  { id: "train-2", truth: "triangle", roundness: .23, vertices: 1, color: 1, colorName: "laranja" },
  { id: "train-3", truth: "circle", roundness: .9, vertices: 0, color: 1, colorName: "laranja" },
  { id: "train-4", truth: "triangle", roundness: .31, vertices: 1, color: 0, colorName: "azul" },
  { id: "train-5", truth: "circle", roundness: .94, vertices: .05, color: 0, colorName: "azul" },
  { id: "train-6", truth: "triangle", roundness: .27, vertices: .95, color: 1, colorName: "laranja" },
  { id: "train-7", truth: "circle", roundness: .87, vertices: .05, color: 1, colorName: "laranja" },
  { id: "train-8", truth: "triangle", roundness: .35, vertices: .9, color: 0, colorName: "azul" },
];

const testObjects: ShapeObject[] = [
  { id: "test-1", truth: "circle", roundness: .92, vertices: .03, color: 1, colorName: "laranja" },
  { id: "test-2", truth: "triangle", roundness: .29, vertices: .97, color: 0, colorName: "azul" },
  { id: "test-3", truth: "circle", roundness: .96, vertices: .02, color: 0, colorName: "azul" },
  { id: "test-4", truth: "triangle", roundness: .33, vertices: .92, color: 1, colorName: "laranja" },
];

const labelName = (label: Label) => label === "circle" ? "círculo" : "triângulo";

function distance(a: Features, b: Features) {
  const shape = (a.roundness - b.roundness) * 2.4;
  const vertices = (a.vertices - b.vertices) * 2.8;
  const color = (a.color - b.color) * .15;
  return Math.hypot(shape, vertices, color);
}

export function classify(samples: Sample[], object: Features): Label {
  const neighbors = samples
    .map((sample) => ({ label: sample.label, distance: distance(sample.features, object) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, Math.min(3, samples.length));
  const votes = neighbors.reduce<Record<Label, number>>((total, neighbor) => {
    total[neighbor.label] += 1 / Math.max(neighbor.distance, .001);
    return total;
  }, { circle: 0, triangle: 0 });
  return votes.circle >= votes.triangle ? "circle" : "triangle";
}

function Robot({ mood }: { mood: "waiting" | "learning" | "thinking" | "happy" | "confused" }) {
  return <div className={`mission-robot ${mood}`} aria-label={`Robô ${mood === "happy" ? "feliz" : mood === "confused" ? "confuso" : "atento"}`} role="img"><i className="robot-antenna"/><div className="robot-head"><span/><span/><b/></div><div className="robot-body"><i/><i/><i/></div></div>;
}

function Shape({ object }: { object: ShapeObject }) {
  return <div className={`mission-shape ${object.truth} ${object.colorName}`} role="img" aria-label={`${labelName(object.truth)} ${object.colorName}`} />;
}

export default function Mission() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const [trainingIndex, setTrainingIndex] = useState(0);
  const [testIndex, setTestIndex] = useState(0);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [prediction, setPrediction] = useState<Label | null>(null);
  const [thinking, setThinking] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [feedback, setFeedback] = useState("Escolha a forma que você vê.");
  const transition = reducedMotion ? { duration: 0 } : { duration: .25 };

  function train(label: Label) {
    const object = trainingObjects[trainingIndex];
    setSamples((current) => [...current, { features: object, label }]);
    setFeedback(`Exemplo ${trainingIndex + 1} registrado como ${labelName(label)}.`);
    if (trainingIndex === trainingObjects.length - 1) {
      setPhase("testing");
      setFeedback("Treinamento concluído. Agora deixe o robô tentar!");
    } else setTrainingIndex((index) => index + 1);
  }

  function analyze() {
    setThinking(true);
    setPrediction(null);
    window.setTimeout(() => {
      const guess = classify(samples, testObjects[testIndex]);
      setPrediction(guess);
      setResults((current) => [...current, guess === testObjects[testIndex].truth]);
      setThinking(false);
    }, reducedMotion ? 0 : 500);
  }

  function nextTest() {
    if (testIndex === testObjects.length - 1) setPhase("result");
    else {
      setTestIndex((index) => index + 1);
      setPrediction(null);
    }
  }

  function reset() {
    setPhase("intro"); setTrainingIndex(0); setTestIndex(0); setSamples([]);
    setPrediction(null); setThinking(false); setResults([]);
    setFeedback("Escolha a forma que você vê.");
  }

  const score = results.filter(Boolean).length;
  const mood = phase === "intro" ? "waiting" : thinking ? "thinking" : phase === "result" ? (score >= 3 ? "happy" : "confused") : prediction === null ? "learning" : prediction === testObjects[testIndex].truth ? "happy" : "confused";

  return <section id="missao" aria-labelledby="mission-title" className="mission demo-section"><div className="wrap">
    <div className="mission-heading"><div><p className="demo-label">MISSÃO 01</p><h2 id="mission-title">Treine seu robô</h2></div><p>Você consegue ensinar uma máquina a reconhecer padrões? Mostre alguns exemplos, teste o aprendizado e descubra!</p></div>
    <div className="mission-game"><aside><Robot mood={mood}/><p className="robot-message">{phase === "intro" ? "Olá! Eu ainda não sei diferenciar círculos de triângulos. Você pode me ensinar?" : phase === "training" ? "Estou guardando os exemplos que você escolher." : phase === "testing" ? thinking ? "Analisando as características…" : "Vou comparar este objeto com os seus exemplos." : score >= 3 ? "Aprendi um padrão! Missão concluída." : "Preciso de exemplos melhores para aprender."}</p></aside>
      <div className="mission-stage"><AnimatePresence mode="wait">
        {phase === "intro" && <motion.div className="mission-screen intro" key="intro" initial={reducedMotion ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={transition}><span>LABORATÓRIO DE PADRÕES</span><h3>Ensine com exemplos</h3><p>Você verá círculos e triângulos azuis ou laranjas. A forma importa mais que a cor.</p><button type="button" onClick={() => setPhase("training")}>Começar treinamento <b aria-hidden="true">→</b></button></motion.div>}
        {phase === "training" && <motion.div className="mission-screen" key={`train-${trainingIndex}`} initial={reducedMotion ? false : { opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={transition}><div className="mission-progress"><span>Treinamento</span><b>{trainingIndex + 1} / {trainingObjects.length}</b><i style={{ width: `${((trainingIndex + 1) / trainingObjects.length) * 100}%` }}/></div><Shape object={trainingObjects[trainingIndex]}/><p className="shape-question">Que forma é esta?</p><div className="shape-actions"><button type="button" onClick={() => train("circle")}>Círculo</button><button type="button" onClick={() => train("triangle")}>Triângulo</button></div><p className="mission-live" role="status">{feedback}</p></motion.div>}
        {phase === "testing" && <motion.div className="mission-screen" key={`test-${testIndex}`} initial={reducedMotion ? false : { opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={transition}><div className="mission-progress"><span>Teste do robô</span><b>{testIndex + 1} / {testObjects.length}</b><i style={{ width: `${((testIndex + 1) / testObjects.length) * 100}%` }}/></div><div className={thinking ? "shape-analyzing" : ""}><Shape object={testObjects[testIndex]}/></div>{prediction === null ? <button type="button" className="analyze-button" disabled={thinking} onClick={analyze}>{thinking ? "Analisando…" : "Analisar objeto"}</button> : <div className={`test-feedback ${prediction === testObjects[testIndex].truth ? "correct" : "wrong"}`} role="status"><strong>Eu acho que é um {labelName(prediction)}.</strong><p>{prediction === testObjects[testIndex].truth ? `Acertou! As características são parecidas com os exemplos de ${labelName(prediction)} que você mostrou.` : "Ops! Acho que preciso de exemplos melhores para aprender!"}</p><button type="button" onClick={nextTest}>{testIndex === testObjects.length - 1 ? "Ver resultado" : "Próximo teste"}</button></div>}</motion.div>}
        {phase === "result" && <motion.div className="mission-screen result" key="result" initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={transition}><span>MISSÃO CONCLUÍDA</span><h3>Você treinou seu primeiro classificador!</h3><div className="score-board"><b>{score}<small>acertos</small></b><b>{results.length - score}<small>erros</small></b><b>{Math.round((score / results.length) * 100)}%<small>de acerto</small></b></div><p>Assim como você ensinou o robô usando exemplos, muitos sistemas de IA utilizam dados para aprender padrões e fazer previsões.</p>{score < results.length && <p>Nem sempre a máquina aprende corretamente. A qualidade dos exemplos influencia o resultado!</p>}<button type="button" onClick={reset}>Treinar novamente</button></motion.div>}
      </AnimatePresence></div>
    </div>
  </div></section>;
}

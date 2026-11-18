import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  classify,
  labelName,
  testObjects,
  trainingObjects,
  type Label,
  type Sample,
} from "./learning";
import {
  colorObjects,
  dilemmas,
  missions,
  solids,
  type Mood,
  type StageObject,
} from "./data";
import {
  directions,
  findPath,
  goal,
  moveCell,
  sameCell,
  start,
  type Cell,
} from "./maze";
import Stage from "./Stage";

export default function Game({
  mission,
  savedSamples,
  onComplete,
  onBack,
}: {
  mission: number;
  savedSamples: Sample[];
  onComplete: (score: number, samples: Sample[]) => void;
  onBack: () => void;
}) {
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [step, setStep] = useState(0),
    [training, setTraining] = useState(true);
  const [samples, setSamples] = useState<Sample[]>(
    mission === 0 ? [] : savedSamples,
  );
  const [hits, setHits] = useState(0),
    [answer, setAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState(""),
    [mood, setMood] = useState<Mood>("idle");
  const [busy, setBusy] = useState(false),
    [selected, setSelected] = useState(false);
  const [position, setPosition] = useState<Cell>(start),
    [path, setPath] = useState<Cell[]>([]);
  const [moving, setMoving] = useState(false),
    [moves, setMoves] = useState(0);
  const reduced = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null),
    guard = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const info = missions[mission];
  const mazeMode =
    phase === "play" && (mission === 2 || (mission === 5 && step === 3));
  useEffect(() => {
    heading.current?.focus();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (!moving || path.length < 2) return;
    const handle = setTimeout(
      () => {
        setPosition(path[1]);
        setMoves((n) => n + 1);
        setPath(path.slice(1));
      },
      reduced ? 40 : 350,
    );
    return () => clearTimeout(handle);
  }, [moving, path, reduced]);
  useEffect(() => {
    if (mazeMode && sameCell(position, goal)) {
      setMoving(false);
      setAnswer("arrived");
      setMood("happy");
      setFeedback(
        "Chegamos à saída! Comandos orientam cada passo; BFS calcula uma rota considerando obstáculos.",
      );
    }
  }, [position, mazeMode]);

  function finish(totalHits: number) {
    const score = Math.round((totalHits / info.total) * 100);
    setHits(totalHits);
    setPhase("done");
    setMood("celebrating");
    onComplete(score, samples);
  }
  function train(label: Label) {
    if (guard.current) return;
    const item = trainingObjects[step];
    setSamples((current) => [
      ...current,
      { features: { ...item.features }, label },
    ]);
    setFeedback(
      `Exemplo ${step + 1} registrado como ${labelName(label)}. A cor não muda a forma.`,
    );
    setMood("learning");
    if (step === 7) {
      setTraining(false);
      setStep(0);
      setFeedback("Oito exemplos registrados. Teste quatro objetos novos.");
    } else setStep(step + 1);
  }
  function predict() {
    if (guard.current || answer) return;
    guard.current = true;
    setBusy(true);
    setMood("thinking");
    setFeedback("Comparando características com os exemplos ensinados…");
    const item =
      mission === 5
        ? {
            truth: "triangle" as Label,
            features: { roundness: 0.3, vertices: 0.96, color: 0 },
          }
        : testObjects[step];
    timer.current = setTimeout(
      () => {
        const predicted = classify(samples, item.features),
          correct = predicted === item.truth;
        setAnswer(predicted ?? "unknown");
        setBusy(false);
        guard.current = false;
        setMood(correct ? "happy" : "confused");
        if (correct) setHits((n) => n + 1);
        setFeedback(
          predicted
            ? `Previsão: ${labelName(predicted)}. ${correct ? "Acertou!" : "Errou desta vez."} Comparei a geometria com seus exemplos. ${correct ? "Exemplos variados ajudam a reconhecer novos objetos." : "Rótulos inadequados podem ensinar um padrão errado. Você pode treinar novamente."}`
            : "Preciso de exemplos antes de prever.",
        );
      },
      reduced ? 0 : 550,
    );
  }
  function choose(index: number) {
    if (answer) return;
    let correct = false,
      message = "";
    if (mission === 1 || (mission === 5 && step === 2)) {
      correct = index === (mission === 5 ? 0 : step % 2);
      message = correct
        ? "Grupo correto. A cor é a característica usada aqui; o formato pode variar."
        : "Este item pertence ao outro grupo. Observe a legenda da cor junto da peça.";
    } else if (mission === 3 || (mission === 5 && step === 1)) {
      correct = index === (mission === 5 ? 2 : step);
      message = correct
        ? "Identificação correta! As características ajudam a diferenciar os sólidos."
        : "Compare novamente a pista com as características do sólido. A resposta será mostrada antes de avançar.";
      message += ` Objeto: ${solids[mission === 5 ? 2 : step].name}.`;
    } else {
      const dilemma = dilemmas[mission === 5 ? 5 : step];
      correct = index === dilemma.correct;
      message = dilemma.explanations[index];
    }
    setAnswer(String(index));
    setMood(correct ? "happy" : "confused");
    setFeedback(message);
    if (correct) setHits((n) => n + 1);
  }
  function next() {
    const last =
      mission === 0
        ? 3
        : mission === 1
          ? 5
          : mission === 2
            ? 0
            : mission === 3
              ? 3
              : mission === 4
                ? 5
                : 4;
    const totalHits = mazeMode ? hits + 1 : hits;
    if (step === last) {
      finish(totalHits);
      return;
    }
    setHits(totalHits);
    setStep(step + 1);
    setAnswer(null);
    setSelected(false);
    setFeedback("");
    setMood("learning");
  }
  function move(delta: Cell) {
    if (moving || answer) return;
    const next = moveCell(position, delta);
    if (sameCell(position, next)) {
      setFeedback("Há uma parede ou o limite da plataforma nessa direção.");
      setMood("confused");
    } else {
      setPosition(next);
      setMoves((n) => n + 1);
      setMood("walking");
      setFeedback("Passo executado.");
    }
  }
  function plan() {
    const route = findPath(position, goal);
    setPath(route);
    setMoving(route.length > 1);
    setMood("walking");
    setFeedback(
      `BFS encontrou uma rota com ${route.length - 1} passos. Observe as casas destacadas.`,
    );
  }
  function restart() {
    if (timer.current) clearTimeout(timer.current);
    guard.current = false;
    setPhase("intro");
    setStep(0);
    setTraining(true);
    setSamples(mission === 0 ? [] : savedSamples);
    setHits(0);
    setAnswer(null);
    setFeedback("");
    setMood("idle");
    setBusy(false);
    setSelected(false);
    setMoving(false);
    setPosition(start);
    setPath([]);
    setMoves(0);
  }

  let object: StageObject | undefined;
  if (mission === 0) {
    const item = (training ? trainingObjects : testObjects)[step];
    object = {
      kind: item.truth,
      color: item.features.color ? "#f5a65b" : "#6095BB",
      caption: `${labelName(item.truth)} ${item.features.color ? "laranja" : "azul"}`,
    };
  }
  if (mission === 1) object = colorObjects[step];
  if (mission === 3)
    object = {
      kind: solids[step].kind,
      color: "#FFFFFF",
      caption: solids[step].hint,
    };
  if (mission === 5)
    object =
      step === 0
        ? {
            kind: "triangle",
            color: "#6095BB",
            caption: "Peça triangular azul da entrega",
          }
        : step === 1 || step === 2
          ? {
              kind: "cylinder",
              color: "#285A85",
              caption: step === 1 ? solids[2].hint : "Pacote cilíndrico azul",
            }
          : undefined;
  const colorTask = mission === 1 || (mission === 5 && step === 2);
  const solidTask = mission === 3 || (mission === 5 && step === 1);
  const decisionTask = mission === 4 || (mission === 5 && step === 4);
  const predictionTask =
    (mission === 0 && !training) || (mission === 5 && step === 0);
  const progress =
    mission === 0 && training
      ? `Exemplo ${step + 1} de 8`
      : mission === 5
        ? `Entrega · etapa ${step + 1} de 5`
        : `Atividade ${step + 1} de ${info.total}`;

  return (
    <div className="teach-play">
      <div className="teach-toolbar">
        <button onClick={onBack}>← Desafios</button>
        <h3 ref={heading} tabIndex={-1}>
          {info.name}
        </h3>
        <button onClick={restart}>Reiniciar desafio</button>
      </div>
      <div className="teach-workspace">
        <Stage
          object={phase === "intro" ? undefined : object}
          mood={mood}
          position={position}
          carrying={mission === 5 && step >= 3}
          path={path}
          mazeMode={mazeMode}
          selected={selected}
          onObject={() => {
            if (colorTask) {
              setSelected(true);
              setFeedback("Peça selecionada. Escolha o grupo de destino.");
            }
          }}
        />
        <motion.div
          className="teach-console"
          initial={reduced ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
        >
          {phase === "intro" ? (
            <>
              <p>{info.intro}</p>
              <p className="teach-note">{info.lesson}</p>
              <button
                className="teach-primary"
                onClick={() => {
                  setPhase("play");
                  setMood("learning");
                }}
              >
                Começar desafio
              </button>
            </>
          ) : phase === "done" ? (
            <>
              <p className="teach-label">DESAFIO CONCLUÍDO</p>
              <h4>{Math.round((hits / info.total) * 100)}% de acerto</h4>
              <p>
                {hits} acertos · {info.total - hits} erros
              </p>
              <p>{info.lesson}</p>
              {mission === 0 && hits < 4 && (
                <p>
                  Nem sempre a máquina aprende corretamente. A qualidade dos
                  exemplos influencia o resultado.
                </p>
              )}
              {mission === 5 && (
                <p>
                  Entrega concluída! Você combinou cinco habilidades para
                  transportar um pacote e respeitar a privacidade do
                  destinatário.
                </p>
              )}
              <button onClick={restart}>Jogar novamente</button>
              <button className="teach-primary" onClick={onBack}>
                Ver progresso
              </button>
            </>
          ) : (
            <>
              <p className="teach-label">{progress}</p>
              {mission === 0 && training && (
                <>
                  <p>Que forma você está mostrando ao robô?</p>
                  <div className="teach-buttons">
                    <button onClick={() => train("circle")}>Círculo</button>
                    <button onClick={() => train("triangle")}>Triângulo</button>
                  </div>
                </>
              )}
              {predictionTask && (
                <>
                  <p>
                    {mission === 5
                      ? "Confira a peça da entrega usando o classificador que você treinou."
                      : "Objeto novo. Observe a previsão do robô."}
                  </p>
                  <button
                    className="teach-primary"
                    disabled={busy || answer !== null}
                    onClick={predict}
                  >
                    {busy ? "Analisando…" : "Testar aprendizado"}
                  </button>
                </>
              )}
              {colorTask && (
                <>
                  <p>
                    {mission === 5
                      ? "Separe o pacote no grupo azul antes do transporte."
                      : step < 2
                        ? "Selecione a peça e escolha a caixa da mesma cor."
                        : "A forma e o tom mudaram. Agrupe pela cor."}
                  </p>
                  <button
                    disabled={answer !== null}
                    aria-pressed={selected}
                    onClick={() => setSelected(true)}
                  >
                    Selecionar peça
                  </button>
                  <div className="teach-bins">
                    <button
                      disabled={!selected || answer !== null}
                      onClick={() => choose(0)}
                    >
                      Grupo azul
                    </button>
                    <button
                      disabled={!selected || answer !== null}
                      onClick={() => choose(1)}
                    >
                      Grupo branco
                    </button>
                  </div>
                </>
              )}
              {solidTask && (
                <>
                  <p>{solids[mission === 5 ? 2 : step].hint}</p>
                  <div className="teach-buttons">
                    {solids.map((solid, index) => (
                      <button
                        key={solid.name}
                        disabled={answer !== null}
                        onClick={() => choose(index)}
                      >
                        {solid.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {decisionTask && (
                <>
                  <p>{dilemmas[mission === 5 ? 5 : step].question}</p>
                  <div className="teach-choices">
                    {dilemmas[mission === 5 ? 5 : step].options.map(
                      (option, index) => (
                        <button
                          key={option}
                          disabled={answer !== null}
                          onClick={() => choose(index)}
                        >
                          {option}
                        </button>
                      ),
                    )}
                  </div>
                </>
              )}
              {mazeMode && (
                <>
                  <p>
                    {mission === 5
                      ? "Transporte o pacote até a saída marcada em branco."
                      : "Chegue à saída, na linha 5, coluna 5."}
                  </p>
                  <div
                    className="teach-directions"
                    role="group"
                    aria-label="Controles do percurso"
                    onKeyDown={(event) => {
                      const direction = directions.find(
                        (item) => item.key === event.key,
                      );
                      if (direction) {
                        event.preventDefault();
                        move(direction.delta);
                      }
                    }}
                  >
                    {directions.map((direction) => (
                      <button
                        key={direction.name}
                        disabled={moving || answer !== null}
                        onClick={() => move(direction.delta)}
                      >
                        {direction.name}
                      </button>
                    ))}
                  </div>
                  <button disabled={moving || answer !== null} onClick={plan}>
                    Calcular caminho (BFS)
                  </button>
                  <p className="teach-note">
                    {moves} passos · Use as setas quando um controle estiver em
                    foco.
                  </p>
                </>
              )}
              <p className="teach-feedback" role="status" aria-live="polite">
                {feedback || "O robô aguarda sua escolha."}
              </p>
              {answer !== null && (
                <button className="teach-primary" onClick={next}>
                  {mission === 2 ? "Concluir percurso" : "Continuar"}
                </button>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

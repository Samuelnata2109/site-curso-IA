import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import "../styles/editorial.css";

type Area = { slug: string; title: string; cardText: string; modalTitle: string; description: string; example: string; lesson?: string };

const areas: Area[] = [
  { slug: "aprendizado", title: "Machine Learning", cardText: "Como as máquinas aprendem com exemplos.", modalTitle: "Machine Learning — Aprendendo com exemplos", description: "Machine Learning é uma área da IA em que sistemas identificam padrões a partir de dados e exemplos para realizar previsões ou classificações.", example: "Um aplicativo pode aprender quais músicas você costuma ouvir e recomendar outras parecidas.", lesson: "Quanto melhores e mais representativos forem os exemplos, maior poderá ser a qualidade das previsões." },
  { slug: "visao", title: "Visão Computacional", cardText: "Como a IA interpreta imagens.", modalTitle: "Visão Computacional — Enxergando o mundo digital", description: "É a área da IA que permite analisar imagens e vídeos para identificar objetos, pessoas ou outras informações visuais.", example: "Um sistema pode reconhecer bicicletas e carros em imagens de trânsito.", lesson: "Esta é uma demonstração ilustrativa. Ela não usa câmera nem realiza reconhecimento real." },
  { slug: "generativa", title: "IA Generativa", cardText: "Como a IA cria novos conteúdos.", modalTitle: "IA Generativa — Criando novas possibilidades", description: "É um tipo de IA capaz de gerar textos, imagens, músicas e outros conteúdos a partir de instruções.", example: "Você descreve um personagem imaginário e uma IA generativa pode produzir uma imagem com base nessa descrição." },
  { slug: "linguagem", title: "Processamento de Linguagem Natural", cardText: "Como a IA trabalha com nossas palavras.", modalTitle: "Linguagem Natural — Entendendo nossas palavras", description: "Essa área desenvolve tecnologias que analisam e produzem linguagem humana, como textos e perguntas.", example: "Assistentes virtuais podem interpretar perguntas escritas e produzir respostas.", lesson: "A conversa abaixo é uma demonstração com mensagens predefinidas." },
  { slug: "robotica", title: "Robótica e Automação", cardText: "Como máquinas executam tarefas inteligentes.", modalTitle: "Robótica e Automação — Tecnologia em movimento", description: "Robôs e sistemas automatizados podem utilizar IA para interpretar informações, tomar decisões e executar tarefas.", example: "Um robô de armazém pode usar sensores e algoritmos para identificar obstáculos e planejar seu caminho." },
  { slug: "etica", title: "Ética em IA", cardText: "Como usar tecnologia com responsabilidade.", modalTitle: "Ética em IA — Tecnologia com responsabilidade", description: "Ética em IA estuda como desenvolver e utilizar sistemas inteligentes respeitando direitos, privacidade, segurança e justiça.", example: "Antes de utilizar fotos de pessoas para treinar uma IA, é necessário considerar privacidade, consentimento e regras aplicáveis." },
];

function AreaDemo({ slug }: { slug: string }) {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  if (slug === "aprendizado") return <div className="area-demo demo-learning" aria-label="Músicas agrupadas resultam em uma nova recomendação"><span>♫ calma</span><span>♫ acústica</span><i>→</i><strong>♫ nova recomendação</strong></div>;
  if (slug === "visao") return <div className="area-demo demo-vision" aria-label="Ilustração de detecção de carro e bicicleta"><span>🚲<b>bicicleta</b></span><span>🚗<b>carro</b></span></div>;
  if (slug === "generativa") return <div className="area-demo demo-generative"><p>Instrução: “um explorador espacial curioso”</p><div aria-label="Ilustração revelada de um explorador espacial">✦<span>◉</span></div></div>;
  if (slug === "linguagem") return <div className="area-demo demo-language"><p>Como começo a estudar IA?</p><p>Comece pela curiosidade. Você aprenderá o restante passo a passo.</p></div>;
  if (slug === "robotica") return <div className="area-demo demo-robot" aria-label="Robô desviando de um obstáculo"><span>▣</span><i /><b>◆</b></div>;
  return <div className="area-demo demo-ethics"><p>Você usaria fotos pessoais sem autorização para treinar uma IA?</p><div><button type="button" aria-pressed={answer === "yes"} onClick={() => setAnswer("yes")}>Sim</button><button type="button" aria-pressed={answer === "no"} onClick={() => setAnswer("no")}>Não</button></div>{answer && <p role="status">{answer === "no" ? "Boa escolha. O consentimento protege a privacidade e os direitos das pessoas." : "Antes de usar as fotos, é preciso pedir autorização. Consentimento e privacidade devem fazer parte do projeto desde o início."}</p>}</div>;
}

export default function Areas() {
  const [selected, setSelected] = useState<Area | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  function open(area: Area, button: HTMLButtonElement) {
    origin.current = button;
    setSelected(area);
    requestAnimationFrame(() => dialog.current?.showModal());
  }
  function close() { dialog.current?.close(); }

  return <section id="areas" className="exhibit"><div className="wrap">
    <h2>Descubra os universos da Inteligência Artificial</h2>
    <p className="area-intro">A IA está presente em muito mais lugares do que você imagina. Escolha uma área e descubra como ela funciona!</p>
    <div className="area-cards">{areas.map((area, index) => <motion.button className="area-card" type="button" key={area.slug} onClick={(event) => open(area, event.currentTarget)} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: reducedMotion ? 0 : index * .04 }}>
      <img src={`${import.meta.env.BASE_URL}art/area-${area.slug}.webp`} width="760" height="340" alt="" loading="lazy" />
      <span><small>EXPLORAR ÁREA</small><strong>{area.title}</strong><em>{area.cardText}</em><b aria-hidden="true">Abrir ↗</b></span>
    </motion.button>)}</div>
  </div><dialog ref={dialog} className="area-modal" aria-labelledby="area-modal-title" aria-describedby="area-modal-description" onCancel={(event) => { event.preventDefault(); close(); }} onClose={() => { setSelected(null); origin.current?.focus(); }} onClick={(event) => { if (event.target === dialog.current) close(); }}>
    {selected && <div className="area-modal-panel"><button type="button" className="area-modal-close" onClick={close} autoFocus aria-label="Fechar detalhes da área">Fechar <span aria-hidden="true">×</span></button><p className="area-modal-label">UNIVERSO {String(areas.indexOf(selected) + 1).padStart(2, "0")}</p><h3 id="area-modal-title">{selected.modalTitle}</h3><p id="area-modal-description">{selected.description}</p><div className="area-example"><small>EXEMPLO DO DIA A DIA</small><p>{selected.example}</p></div><p className="area-demo-label">DEMONSTRAÇÃO ILUSTRATIVA</p><AreaDemo slug={selected.slug} />{selected.lesson && <p className="area-lesson">{selected.lesson}</p>}</div>}
  </dialog></section>;
}

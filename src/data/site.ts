import {
  BrainCircuit,
  Network,
  ScanEye,
  MessageSquareText,
  Sparkles,
  Scale,
} from "lucide-react";
export const nav = [
  ["inicio", "Início"],
  ["sobre", "Sobre"],
  ["areas", "Áreas de estudo"],
  ["tecnologias", "Tecnologias"],
  ["projetos", "Projetos"],
  ["oportunidades", "Oportunidades"],
];
export const school: {
  logo?: string;
  photo?: string;
  social: { name: string; url: string }[];
} = { social: [] };
export const areas = [
  {
    icon: BrainCircuit,
    title: "Machine Learning",
    text: "Modelos que aprendem padrões a partir de exemplos e fazem previsões.",
  },
  {
    icon: Network,
    title: "Redes Neurais",
    text: "Camadas de neurônios artificiais que combinam sinais para reconhecer padrões complexos.",
  },
  {
    icon: ScanEye,
    title: "Visão Computacional",
    text: "Técnicas para interpretar imagens, identificar objetos e compreender cenas.",
  },
  {
    icon: MessageSquareText,
    title: "Processamento de Linguagem Natural",
    text: "Métodos para analisar textos e aproximar a linguagem humana dos computadores.",
  },
  {
    icon: Sparkles,
    title: "IA Generativa",
    text: "Modelos que criam imagens, textos e sons a partir de padrões aprendidos.",
  },
  {
    icon: Scale,
    title: "Ética e Responsabilidade em IA",
    text: "Reflexões sobre privacidade, vieses e os impactos das decisões automatizadas.",
  },
];
export type Project = {
  title: string;
  text: string;
  detail: string;
  tools: string[];
  cover: string;
  video?: string;
  demo: boolean;
};
export const projects: Project[] = [
  {
    title: "Um olhar sobre as folhas",
    text: "Classificação visual de espécies vegetais.",
    detail:
      "Uma câmera registra a folha. Um modelo compara forma e textura para sugerir uma classificação e indicar sua incerteza.",
    tools: ["Python", "OpenCV"],
    cover: "vision",
    demo: true,
  },
  {
    title: "Palavras em contexto",
    text: "Exploração de sentimentos em pequenos textos.",
    detail:
      "Trechos de texto são transformados em representações numéricas para explorar diferenças entre opiniões positivas, negativas e ambíguas.",
    tools: ["Python", "Hugging Face"],
    cover: "language",
    demo: true,
  },
  {
    title: "Dados do clima",
    text: "Visualização de padrões de temperatura.",
    detail:
      "Séries temporais podem revelar como a temperatura varia ao longo do dia e ajudar a discutir as limitações de uma previsão.",
    tools: ["Pandas", "Jupyter Notebook"],
    cover: "data",
    demo: true,
  },
];

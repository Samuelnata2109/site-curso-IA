export const nav = [
  ["inicio", "Início"],
  ["sobre", "O curso"],
  ["missao", "Missão"],
  ["laboratorio", "Laboratório"],
  ["projetos", "Projetos"],
];
export const school: {
  logo?: string;
  photo?: string;
  description?: string;
  contact?: { label: string; url: string };
  social: { name: string; url: string }[];
} = { social: [] };

export const areas = [
  {
    slug: "aprendizado",
    title: "Machine Learning",
    text: "Se você mostra muitos exemplos de sons a um modelo, ele pode aprender padrões para reconhecer outros sons. A escolha dos exemplos muda o resultado.",
  },
  {
    slug: "visao",
    title: "Visão Computacional",
    text: "Uma imagem chega ao computador como números. Um modelo procura padrões de cor, forma e textura para reconhecer o que aparece nela.",
  },
  {
    slug: "generativa",
    title: "IA Generativa",
    text: "Ao aprender padrões em textos, imagens ou sons, modelos conseguem criar novas combinações. O resultado pede revisão: algo convincente também pode estar errado.",
  },
  {
    slug: "linguagem",
    title: "Processamento de Linguagem Natural",
    text: "Uma mesma palavra pode mudar de sentido em outra frase. Modelos usam o contexto para interpretar perguntas, traduzir textos e sugerir respostas.",
  },
  {
    slug: "robotica",
    title: "Robótica e Automação",
    text: "Sensores percebem o ambiente e programas escolhem ações. Com esses ingredientes, um braço robótico pode aprender a separar objetos por tamanho.",
  },
  {
    slug: "etica",
    title: "Ética em Inteligência Artificial",
    text: "Quem aparece nos dados? Quem ficou de fora? Investigar essas perguntas ajuda a proteger a privacidade e a identificar decisões injustas.",
  },
] as const;

export type Project = {
  title: string;
  text: string;
  detail: string;
  tools: string[];
  /** Nome do WebP em public/art, sem extensão. */
  cover: string;
  coverAlt?: string;
  video?: string;
  demo?: boolean;
};
/** A primeira obra ocupa o espaço de destaque da exposição. */
export const projects: Project[] = [];

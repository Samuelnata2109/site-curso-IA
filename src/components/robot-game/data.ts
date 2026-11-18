export type ObjectKind =
  "circle" | "triangle" | "cube" | "sphere" | "cylinder" | "pyramid";
export type Mood =
  | "idle"
  | "learning"
  | "thinking"
  | "walking"
  | "happy"
  | "confused"
  | "celebrating";
export type StageObject = { kind: ObjectKind; color: string; caption: string };
export const missions = [
  {
    name: "Ensine as Formas",
    intro:
      "Mostre oito exemplos ao robô. Depois, observe quatro previsões calculadas com o que você ensinou.",
    lesson:
      "O classificador compara geometria e cor com os três exemplos mais próximos. Rótulos incorretos também são aprendidos.",
    total: 4,
  },
  {
    name: "Ensine as Cores",
    intro:
      "Selecione a peça e envie-a ao grupo da mesma cor. A forma muda durante o desafio.",
    lesson:
      "Aqui usamos regras sobre características de cor. É uma demonstração programada, sem treinamento de Machine Learning.",
    total: 6,
  },
  {
    name: "Ensine o Caminho",
    intro:
      "Leve o robô até a saída. Use os botões, as setas com foco nos controles ou observe um caminho calculado.",
    lesson:
      "BFS explora caminhos possíveis até encontrar uma rota curta. Planejamento por busca não exige aprendizado de máquina.",
    total: 1,
  },
  {
    name: "Ensine a Reconhecer",
    intro:
      "Observe cada sólido e sua pista. Identifique quatro objetos, do mais familiar ao mais desafiador.",
    lesson:
      "Comparamos características previamente descritas. Esta atividade não faz reconhecimento de imagens por câmera.",
    total: 4,
  },
  {
    name: "Ensine a Decidir",
    intro:
      "Ajude o robô em seis situações. Leia a consequência de cada escolha antes de continuar.",
    lesson:
      "Decisões responsáveis consideram as pessoas afetadas, o contexto, os direitos e as regras aplicáveis.",
    total: 6,
  },
  {
    name: "Teste Final",
    intro:
      "Prepare uma entrega responsável. Use seu classificador para conferir uma peça, reconheça o pacote, separe sua cor e leve-o até o destino.",
    lesson:
      "Uma entrega reúne classificação, características, organização, planejamento e cuidado com as pessoas.",
    total: 5,
  },
];
export const colorObjects: StageObject[] = [
  { kind: "sphere", color: "#285A85", caption: "Esfera azul" },
  { kind: "cube", color: "#FFFFFF", caption: "Cubo branco" },
  { kind: "cylinder", color: "#6095BB", caption: "Cilindro azul" },
  { kind: "pyramid", color: "#EEF2F7", caption: "Pirâmide branca" },
  { kind: "cube", color: "#356B9A", caption: "Cubo azul" },
  { kind: "sphere", color: "#DCE7ED", caption: "Esfera branca" },
];
export const solids = [
  {
    kind: "cube" as const,
    name: "Cubo",
    hint: "Tenho seis faces quadradas e oito vértices.",
  },
  {
    kind: "sphere" as const,
    name: "Esfera",
    hint: "Minha superfície é curva e não tenho vértices.",
  },
  {
    kind: "cylinder" as const,
    name: "Cilindro",
    hint: "Tenho duas bases circulares paralelas e uma superfície lateral curva.",
  },
  {
    kind: "pyramid" as const,
    name: "Pirâmide",
    hint: "Minha base é quadrada e quatro faces triangulares se encontram no topo.",
  },
];
export const dilemmas = [
  {
    question: "Encontrei fotos pessoais para treinar um modelo. Posso usá-las?",
    options: [
      "Usar porque estão na internet",
      "Verificar autorização e finalidade",
    ],
    correct: 1,
    explanations: [
      "Estar na internet não garante autorização. Verifique direitos, finalidade e regras antes de usar, especialmente fotos de menores.",
      "Isso ajuda a proteger as pessoas. Consentimento deve ser informado, e a finalidade e as regras aplicáveis também precisam ser avaliadas.",
    ],
  },
  {
    question: "Um aplicativo pede sua senha para personalizar recomendações.",
    options: [
      "Compartilhar a senha",
      "Recusar e pedir ajuda de um responsável",
    ],
    correct: 1,
    explanations: [
      "Senhas dão acesso à conta e não devem ser entregues a um aplicativo desconhecido. Procure orientação antes de continuar.",
      "Boa decisão. Verifique a legitimidade do serviço e use somente os acessos estritamente necessários.",
    ],
  },
  {
    question: "A IA deu uma informação surpreendente para o trabalho escolar.",
    options: [
      "Conferir fontes confiáveis",
      "Copiar porque a resposta parece certa",
    ],
    correct: 0,
    explanations: [
      "Respostas convincentes podem conter erros. Compare fontes confiáveis e registre de onde veio a informação.",
      "A aparência de certeza não garante precisão. Verifique fontes antes de compartilhar ou usar a resposta.",
    ],
  },
  {
    question: "Nos testes, o sistema erra mais com um grupo de pessoas.",
    options: [
      "Ignorar porque a média é boa",
      "Investigar os dados e os impactos",
    ],
    correct: 1,
    explanations: [
      "A média pode esconder prejuízos a grupos específicos. É preciso investigar antes de usar o sistema para decisões importantes.",
      "Avaliar grupos e contextos ajuda a encontrar injustiças. Pode ser necessário melhorar dados, revisar o uso ou interromper a aplicação.",
    ],
  },
  {
    question: "Um robô quer testar uma rota perto de pessoas.",
    options: [
      "Testar em área controlada com supervisão",
      "Liberar o robô imediatamente",
    ],
    correct: 0,
    explanations: [
      "Testes controlados e supervisão reduzem riscos. Segurança precisa ser verificada antes de operar perto das pessoas.",
      "Uma falha pode machucar alguém. Primeiro use uma área controlada e uma pessoa responsável pela supervisão.",
    ],
  },
  {
    question:
      "A entrega inclui uma foto do destinatário. O robô quer publicá-la.",
    options: [
      "Pedir autorização para essa finalidade e oferecer recusa",
      "Publicar para provar que entregou",
    ],
    correct: 0,
    explanations: [
      "Combine uma finalidade clara e respeite a recusa. Uma confirmação sem foto pode ser suficiente, coletando menos dados pessoais.",
      "Uma entrega não autoriza automaticamente a publicação da foto. Combine a finalidade e prefira uma confirmação que exponha menos dados.",
    ],
  },
];

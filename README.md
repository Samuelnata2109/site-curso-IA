# Inteligência Artificial | Guiomar

Landing page do curso técnico de Inteligência Artificial da EEEP Guiomar Belchior Aguiar em Cariré, Ceará.

## Desenvolvimento

Use Node.js 24 e npm. Na raiz do projeto, execute:

```sh
npm ci
npm run dev
```

Abra o endereço informado pelo Vite. Para verificar o TypeScript, gerar os arquivos de produção em `dist/` e conferir o resultado:

```sh
npm run typecheck
npm run build
npm run preview
```

## Personalização

- **Conteúdo institucional** — Em `src/data/site.ts`, configure `school.logo`, `school.photo`, `school.description`, `school.contact` e `school.social` com arquivos autorizados e endereços oficiais. O símbolo atual identifica o site. Edite a apresentação em `src/sections/School.tsx` quando houver texto institucional aprovado.
- **Projetos** — Cadastre título, resumo, detalhes, tecnologias e capa na coleção `projects`. O campo `cover` corresponde ao nome de um WebP em `public/art/`, sem extensão. O campo opcional `video` recebe a URL de um vídeo compatível com HTML5. Use `demo: false` para trabalhos reais autorizados.
- **Layout** — As seções ficam em `src/sections/`, a navegação em `src/components/` e os estilos responsivos em `src/styles/site.css`. As fontes são hospedadas com a aplicação.
## Experiências de descoberta

O núcleo e o mascote são construídos com geometria procedural. O laboratório carrega a cena 3D sob demanda e oferece os mesmos instrumentos por botões. As imagens WebP mantêm as experiências utilizáveis com movimento reduzido ou quando WebGL está indisponível. Os materiais e fontes são locais.

A missão usa um classificador didático por proximidade à média. Os exemplos registrados em A e B definem os centros dos grupos, e o teste mede a distância do novo sinal a cada centro. Empates recebem feedback próprio. O treino existe apenas na sessão da página.

A coleção de projetos começa vazia. A primeira obra cadastrada ganha destaque. Inclua apenas projetos e mídias autorizados, com descrição de capa em `coverAlt`.

## Publicação no GitHub Pages

No GitHub, abra **Settings → Pages**. Em **Build and deployment → Source**,
selecione **GitHub Actions**. Para a primeira publicação, abra **Actions →
Publicar no GitHub Pages → Run workflow**, escolha a branch `main` e execute.
Depois disso, cada push em `main` gera e publica o conteúdo de `dist/`. O endereço
publicado aparece no ambiente `github-pages` quando o deploy termina.

O Vite usa `/site-curso-IA/` como caminho base. Abra esse caminho ao testar
com `npm run preview`. As imagens da pasta `public/art/` usam
`import.meta.env.BASE_URL` para funcionar nesse subdiretório.

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

- **Conteúdo institucional** — Em `src/data/site.ts`, configure `school.logo`, `school.photo` e `school.social` com arquivos autorizados e endereços oficiais. O símbolo atual identifica o site. Edite a apresentação em `src/sections/School.tsx` quando houver texto institucional aprovado.
- **Projetos** — Cadastre título, resumo, detalhes, tecnologias e capa na coleção `projects`. O campo `cover` corresponde ao nome de um WebP em `public/art/`, sem extensão. O campo opcional `video` recebe a URL de um vídeo compatível com HTML5. Use `demo: false` para trabalhos reais autorizados.
- **Layout** — As seções ficam em `src/sections/`, a navegação em `src/components/` e os estilos responsivos em `src/styles/site.css`. As fontes são hospedadas com a aplicação.
- **Visualização neural** — `src/three/Field.tsx` desenha partículas e conexões com React Three Fiber, Drei e Three.js. A imagem local do núcleo permanece visível durante o carregamento, em dispositivos sem WebGL 2 e com movimento reduzido.

As ferramentas e os projetos exemplificam conceitos da área. Para substituir os exemplos, reunir projetos autorizados, imagens, tecnologias e vídeos dos estudantes.

## Publicação no GitHub Pages

No GitHub, abra **Settings → Pages**. Em **Build and deployment → Source**,
selecione **GitHub Actions**. Para a primeira publicação, abra **Actions →
Publicar no GitHub Pages → Run workflow**, escolha a branch `main` e execute.
Depois disso, cada push em `main` gera e publica o conteúdo de `dist/`. O endereço
publicado aparece no ambiente `github-pages` quando o deploy termina.

O Vite usa `/site-curso-IA/` como caminho base. Abra esse caminho ao testar
com `npm run preview`. As imagens da pasta `public/art/` usam
`import.meta.env.BASE_URL` para funcionar nesse subdiretório.

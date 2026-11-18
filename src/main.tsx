import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import Header, { Brand } from "./components/Header";
import Mission from "./sections/Mission";
import Lab from "./sections/Lab";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Areas from "./sections/Areas";
import Technologies from "./sections/Technologies";
import Projects from "./sections/Projects";
import Careers from "./sections/Careers";
import School from "./sections/School";
import { nav, school } from "./data/site";
import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/space-grotesk/index.css";
import "./styles/site.css";
createRoot(document.getElementById("root")!).render(
  <MotionConfig reducedMotion="user">
    <a className="skip" href="#conteudo">
      Pular para o conteúdo
    </a>
    <Header />
    <main id="conteudo">
      <Hero />
      <Mission />
      <Areas />
      <About />
      <Lab />
      <Technologies />
      <Projects />
      <Careers />
      <School />
    </main>
    <footer>
      <div className="wrap">
        <Brand />
        <h2 className="footer-title">O futuro começa com a sua curiosidade.</h2>
        <p>EEEP Guiomar Belchior Aguiar · Cariré, Ceará</p>
        <nav aria-label="Links do rodapé">
          {nav.map(([id, t]) => (
            <a key={id} href={"#" + id}>
              {t}
            </a>
          ))}
          {school.social.map((s) => (
            <a key={s.url} href={s.url}>
              {s.name}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  </MotionConfig>,
);

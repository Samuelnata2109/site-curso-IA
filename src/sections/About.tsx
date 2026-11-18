import { Fingerprint, Waypoints } from "lucide-react";
import Section from "../components/Section";
export default function About() {
  return (
    <Section id="sobre" label="SOBRE O CURSO" title="Inteligência Artificial">
      <div className="about-grid">
        <p className="intro">
          Na EEEP Guiomar Belchior Aguiar, a formação técnica aproxima ideias,
          dados e programação para resolver problemas do mundo real.
        </p>
        <article>
          <Waypoints />
          <h3>Aprender com dados</h3>
          <p>
            A IA identifica padrões em exemplos. Na saúde, na agricultura e na
            indústria, esses padrões ajudam a interpretar imagens e orientar
            decisões.
          </p>
        </article>
        <article>
          <Fingerprint />
          <h3>Pensar com autonomia</h3>
          <p>
            Investigar um problema, criar hipóteses e avaliar resultados
            desenvolve criatividade, pensamento crítico e responsabilidade.
          </p>
        </article>
      </div>
    </Section>
  );
}

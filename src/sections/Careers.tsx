import Section from "../components/Section";
export default function Careers() {
  return (
    <Section
      id="oportunidades"
      label="CAMINHOS PROFISSIONAIS"
      title="Oportunidades"
    >
      <div className="paths">
        {[
          "Desenvolvimento de soluções com IA",
          "Análise de dados",
          "Automação inteligente",
          "Desenvolvimento de software",
          "Pesquisa e inovação tecnológica",
        ].map((t) => (
          <div key={t}>{t}</div>
        ))}
      </div>
    </Section>
  );
}

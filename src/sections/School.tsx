import Section from "../components/Section";
import { school } from "../data/site";
export default function School() {
  return (
    <Section id="guiomar" label="CARIRÉ · CEARÁ" title="Conheça a Guiomar">
      {school.photo && (
        <img src={school.photo} alt="EEEP Guiomar Belchior Aguiar" />
      )}
      <p className="intro">
        A EEEP Guiomar Belchior Aguiar é uma escola estadual de educação
        profissional de Cariré, no Ceará, onde é ofertado o curso técnico de
        Inteligência Artificial.
      </p>
    </Section>
  );
}

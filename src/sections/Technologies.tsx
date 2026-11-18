import Section from "../components/Section";
import {
  Code2,
  Layers,
  Flame,
  ChartScatter,
  Table,
  Notebook,
  Focus,
  Smile,
} from "lucide-react";
const tools = [
  ["Python", Code2],
  ["TensorFlow", Layers],
  ["PyTorch", Flame],
  ["Scikit-learn", ChartScatter],
  ["Pandas", Table],
  ["Jupyter Notebook", Notebook],
  ["OpenCV", Focus],
  ["Hugging Face", Smile],
] as const;
export default function Technologies() {
  return (
    <Section id="tecnologias" label="FERRAMENTAS" title="Tecnologias da IA">
      <p>
        Exemplos do ecossistema de Inteligência Artificial para explorar dados,
        treinar modelos e experimentar.
      </p>
      <div className="tools">
        {tools.map(([title, Icon]) => (
          <article key={title}>
            <Icon />
            {title}
          </article>
        ))}
      </div>
    </Section>
  );
}

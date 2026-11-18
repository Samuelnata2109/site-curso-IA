const groups = [
  ["Explorar dados", "Python · Pandas · Jupyter Notebook"],
  ["Treinar modelos", "Scikit-learn · TensorFlow · PyTorch"],
  ["Testar ideias", "OpenCV · Hugging Face"],
];
export default function Technologies() {
  return (
    <section id="tecnologias" className="tool-bench">
      <div className="wrap">
        <h2>Ferramentas da área</h2>
        <dl>
          {groups.map(([use, names]) => (
            <div key={use}>
              <dt>{use}</dt>
              <dd>{names}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

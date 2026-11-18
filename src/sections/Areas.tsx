import { useState } from "react";
import { areas } from "../data/site";
import "../styles/editorial.css";

export default function Areas() {
  const [chosen, setChosen] = useState(0);
  const area = areas[chosen];
  return (
    <section id="areas" className="exhibit">
      <div className="wrap">
        <h2>Áreas da Inteligência Artificial</h2>
        <div className="area-layout">
          <div
            className="area-index"
            role="group"
            aria-label="Escolha uma área"
          >
            {areas.map(({ title }, index) => (
              <button
                type="button"
                key={title}
                aria-controls="area-display"
                aria-pressed={index === chosen}
                onClick={() => setChosen(index)}
              >
                {title}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <figure id="area-display" className="area-display" aria-live="polite">
            <img
              key={area.slug}
              src={import.meta.env.BASE_URL + "art/area-" + area.slug + ".webp"}
              width={760}
              height={340}
              alt=""
              loading="lazy"
            />
            <figcaption>
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

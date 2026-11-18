import { useRef, useState } from "react";
import { projects, type Project } from "../data/site";

function EmptyExhibition() {
  return (
    <div className="exhibition-empty">
      <div className="display-plinth" aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
      <div>
        <h3>A exposição está aberta para as próximas ideias.</h3>
        <p>
          Ainda não há projetos cadastrados. Este espaço vai reunir imagens,
          vídeos e relatos de como os estudantes criaram seus trabalhos.
        </p>
        <a href="#missao">
          Experimentar a missão <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
export default function Projects() {
  const [project, setProject] = useState<Project>();
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <section id="projetos" className="project-exhibit">
      <div className="wrap">
        <h2>Projetos dos estudantes</h2>
        {projects.length === 0 ? (
          <EmptyExhibition />
        ) : (
          <div className="published-works">
            {projects.map((p) => (
              <article key={p.title}>
                <img
                  src={import.meta.env.BASE_URL + "art/" + p.cover + ".webp"}
                  alt={p.coverAlt ?? ""}
                  loading="lazy"
                />
                {p.demo && <small>Exemplo demonstrativo</small>}
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <p>{p.tools.join(" · ")}</p>
                <button
                  onClick={() => {
                    setProject(p);
                    dialog.current?.showModal();
                  }}
                >
                  Ver detalhes de {p.title}
                </button>
              </article>
            ))}
          </div>
        )}
        <dialog
          ref={dialog}
          aria-labelledby="work-title"
          onClose={() => setProject(undefined)}
        >
          {project && (
            <>
              <button autoFocus onClick={() => dialog.current?.close()}>
                Fechar
              </button>
              <h3 id="work-title">{project.title}</h3>
              <p>{project.detail}</p>
              <p>{project.tools.join(" · ")}</p>
              {project.video && (
                <video controls preload="metadata" src={project.video} />
              )}
            </>
          )}
        </dialog>
      </div>
    </section>
  );
}

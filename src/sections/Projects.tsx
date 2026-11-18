import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import Section from "../components/Section";
import { projects, type Project } from "../data/site";
export default function Projects() {
  const [project, set] = useState<Project>(),
    dialog = useRef<HTMLDialogElement>(null);
  return (
    <Section id="projetos" label="GALERIA" title="Projetos dos estudantes">
      <div className="cards">
        {projects.map((p) => (
          <article key={p.title}>
            <img
              className="cover"
              src={"/art/" + p.cover + ".webp"}
              loading="lazy"
              alt=""
            />
            {p.demo && <small>EXEMPLO DEMONSTRATIVO</small>}
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <p className="tags">{p.tools.join(" · ")}</p>
            <button
              onClick={() => {
                set(p);
                dialog.current?.showModal();
              }}
            >
              Ver detalhes <ArrowUpRight size={16} />
            </button>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        aria-labelledby="project-title"
        onClose={() => set(undefined)}
      >
        <button
          className="close"
          aria-label="Fechar detalhes"
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        {project && (
          <>
            {project.demo && <small>EXEMPLO DEMONSTRATIVO</small>}
            <h3 id="project-title">{project.title}</h3>
            <p>{project.detail}</p>
            <p className="tags">{project.tools.join(" · ")}</p>
            {project.video && <video controls src={project.video} />}
          </>
        )}
      </dialog>
    </Section>
  );
}

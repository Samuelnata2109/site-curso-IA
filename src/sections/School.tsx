import { school } from "../data/site";
export default function School() {
  return (
    <section id="guiomar" className="school-print">
      <div className="wrap">
        <div>
          {school.logo && (
            <img
              className="school-logo"
              src={school.logo}
              alt="Logotipo da escola"
            />
          )}
          <p className="school-location">CARIRÉ / CEARÁ</p>
          <h2>
            EEEP Guiomar
            <br />
            Belchior Aguiar
          </h2>
        </div>
        <div>
          {school.photo && (
            <img
              src={school.photo}
              alt="EEEP Guiomar Belchior Aguiar"
              loading="lazy"
            />
          )}
          <p>
            {school.description ??
              "Em Cariré, no Ceará, a EEEP Guiomar Belchior Aguiar oferece o curso técnico de Inteligência Artificial. Aqui, a educação profissional aproxima o estudo da tecnologia das perguntas que surgem no dia a dia."}
          </p>
          {school.contact && (
            <a href={school.contact.url}>{school.contact.label}</a>
          )}
          {school.social.map((s) => (
            <a key={s.url} href={s.url}>
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

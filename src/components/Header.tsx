import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav, school } from "../data/site";
export function Brand() {
  return (
    <a className="brand" href="#inicio">
      {school.logo ? (
        <img width="36" src={school.logo} alt="" />
      ) : (
        <span className="signal-mark" aria-hidden="true">
          <b />
          <b />
          <b />
        </span>
      )}
      <span>Guiomar</span>

      <small>IA</small>
    </a>
  );
}
export default function Header() {
  const [open, set] = useState(false),
    [active, mark] = useState("inicio"),
    [solid, tint] = useState(false);
  useEffect(() => {
    function update() {
      tint(scrollY > 20);
      mark(
        [...nav]
          .reverse()
          .find(
            ([id]) =>
              (document.getElementById(id)?.offsetTop ?? Infinity) <=
              scrollY + 150,
          )?.[0] ?? "inicio",
      );
    }
    function esc(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        set(false);
        document.querySelector<HTMLButtonElement>(".menu")?.focus();
      }
    }
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("keydown", esc);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("keydown", esc);
    };
  }, [open]);
  return (
    <header className={solid ? "solid" : ""}>
      <div className="wrap bar">
        <Brand />
        <button
          className="menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-controls="navigation"
          aria-expanded={open}
          onClick={() => set(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          aria-label="Navegação principal"
          id="navigation"
          className={open ? "opened" : ""}
        >
          {nav.map(([id, label]) => (
            <a
              key={id}
              aria-current={active === id ? "location" : undefined}
              className={active === id ? "active" : ""}
              href={"#" + id}
              onClick={() => set(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="school-link" href="#guiomar">
          A escola <ArrowUpRight size={15} />
        </a>
      </div>
    </header>
  );
}

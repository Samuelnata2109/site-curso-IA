import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
export default function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <section id={id} className="section">
      <motion.div
        className="wrap"
        initial={reduce ? false : { y: 10 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
      >
        <div className="kicker">
          <b /> {label}
        </div>
        <h2>{title}</h2>
        {children}
      </motion.div>
    </section>
  );
}

import Section from "../components/Section";
import { areas } from "../data/site";
import { motion } from "motion/react";
export default function Areas() {
  return (
    <Section id="areas" label="CONHECIMENTO" title="Áreas de estudo">
      <div className="cards">
        {areas.map(({ icon: Icon, title, text }) => (
          <motion.article
            key={title}
            whileInView={{ y: [5, 0] }}
            viewport={{ once: true }}
          >
            <Icon />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

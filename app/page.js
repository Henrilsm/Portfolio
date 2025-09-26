import Link from "next/link";
import styles from "./Home.module.css";
import { Github, Mail, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Henri Leonardo</h1>
          <p className={styles.subtitle}>
            Desenvolvedor Back-end | Apaixonado por tecnologia e inovação
          </p>
          <div className={styles.socialLinks}>
            <a
              href="https://github.com/Henrilsm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} /> GitHub
            </a>
            <a href="mailto:henrilsm@gmail.com" >
              <Mail size={20} /> Email
            </a>
          </div>
        </header>

        <section id="sobre">
          <h2>Sobre Mim</h2>
          <p>
            Sou um desenvolvedor de software backend com foco na construção de
            sistemas robustos, escaláveis . Tenho experiência com o ecossistema
            Node.js,Python e Java, incluindo tecnologias como Express e bancos
            de dados como SQL. Atualmente, estou buscando novas oportunidades
            para aplicar minhas habilidades e contribuir para projetos
            inovadores.
          </p>
        </section>

        <section id="projetos">
          <h2>Projetos</h2>
          <div className={styles.projectGrid}>
            <div className={styles.projectCard}>
              <h3>Jogo da Forca</h3>
              <p>
                Clássico jogo da forca implementado com React e Next.js,
                utilizando hooks para gerenciamento de estado e CSS Modules para
                estilização.
              </p>
              <Link href="/forca" className={styles.projectLink}>
                Ver Projeto <ArrowRight size={16} />
              </Link>
            </div>
            <div className={styles.projectCard}>
              <h3>Escalação FC</h3>
              <p>
                Site web desenvolvido para que fãs de futebol possam dar uma de
                treinador e esboçar uma escalação do seu time ou seleção
                favoritos
              </p>
              <a
                href="https://site-grupo-two.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                Ver Projeto <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section id="habilidades">
          <h2>Habilidades</h2>

          <h3 className={styles.subheading}>Técnicas</h3>
          <div className={styles.skillsGrid}>
            <span>JavaScript</span>
            <span>React</span>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>Node.js</span>
            <span>SQL</span>
            <span>CSS3</span>
            <span>HTML5</span>
            <span>Python</span>
            <span>GitHub</span>
            <span>C</span>
            <span>Java</span>
          </div>

          <h3 className={styles.subheading}>Idiomas</h3>
          <div className={styles.skillsGrid}>
            <span>Português (Nativo)</span>
            <span>Inglês (Fluente)</span>
          </div>
        </section>
      </main>
    </div>
  );
}

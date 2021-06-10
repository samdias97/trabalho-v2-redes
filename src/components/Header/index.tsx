import styles from './styles.module.scss';

export function Header() {
  return (
    <div className={styles.containerHeader}>
      <ul>
        <li><strong>Instituição:</strong> Centro Universitário Farias Brito</li>
        <li><strong>Curso:</strong> Ciência da Computação</li>
        <li><strong>Disciplina:</strong> Redes de Computadores II</li>
        <li><strong>Professor:</strong> José Belo Aragão Júnior</li>
        <li><strong>Nome:</strong> Samuel De Sousa Dias</li>
        <li><strong>Matrícula:</strong> 1620391</li>
      </ul>
      <img src="/images/fbuniLogo.png" alt="fbuni" />
    </div>
  );
}
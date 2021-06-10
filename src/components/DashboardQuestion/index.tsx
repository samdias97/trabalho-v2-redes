import { Traces } from '../Traces';
import { Header } from '../Header';

import styles from './styles.module.scss';

export function DashboardQuestion() {
  return (
    <section className={styles.containerDashboard}>
      <Header />
      <Traces />
    </section>
  );
}
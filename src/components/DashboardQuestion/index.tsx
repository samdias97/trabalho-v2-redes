import { Traces } from '../Traces';

import styles from './styles.module.scss';

export function DashboardQuestion() {
  return (
    <section className={styles.containerDashboard}>
      <Traces />
    </section>
  );
}
import Lottie from 'lottie-react-web';
import animation from './loading.json';

import styles from './styles.module.scss';

export function Loading() {
  return (
    <div className={styles.containerLoading}>
      <Lottie
        options={{
          animationData: animation,
          loop: true,
        }}
        speed={1}
        width={300}
      />
    </div>
  );
}
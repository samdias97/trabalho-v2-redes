import tracesJson from './traces.json';

import styles from './styles.module.scss';

export function Traces() {
  return (
    <div className={styles.tableTraces}>
      <table>
        <thead>
          <tr>
            <th>Teste</th>
            <th>Teste2</th>
            <th>Teste3</th>
          </tr>
        </thead>
        <tbody>
          {tracesJson.map(trace => (
            <tr key={`${trace[0]}-${trace[1]}-${trace[2]}`}>
              <td>{trace[0]}</td>
              <td>{trace[1]}</td>
              <td>{trace[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
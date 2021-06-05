import { useCallback, useState } from 'react';

import tracesJson from './traces.json';

import styles from './styles.module.scss';

export function Traces() {
  const historicoDi: number = 100;
  const historicoVi: number = 15;
  const diDelayNaRede: number[] = [];
  const diAtrasoEstimadoMedio: number[] = [];
  const viVariacaoPontual: number[] = [];
  const viVariacaoMedia: number[] = [];
  const piTempoDeExecucao: number[] = [];
  const u: number = 0.001998;

  const calcDelayNaRede = useCallback((ri: number, ti: number): number => {
    const di = ri - ti;
    diDelayNaRede.push(di);
    return di;
  }, []);

  const calcAtrasoEstimadoMedio = useCallback((historico: number, posicao: number): number => {
    const primeiroArg = 1 - u;

    if (posicao === 0) {
      const di = primeiroArg * historicoDi + u * diDelayNaRede[posicao];
      diAtrasoEstimadoMedio.push(di);
      return di;
    } else {
      const di = primeiroArg * historico + u * diDelayNaRede[posicao];
      diAtrasoEstimadoMedio.push(di);
      return di;
    }
  }, []);

  const calcVariacaoPontual = useCallback((posicao: number) => {
    const vi = Math.abs(diDelayNaRede[posicao] - diAtrasoEstimadoMedio[posicao]);
    viVariacaoPontual.push(vi);
    return vi;
  }, []);

  const calcVariacaoMedia = useCallback((historico: number, posicao: number): number => {
    const primeiroArg = 1 - u;

    if (posicao === 0) {
      const di = primeiroArg * historicoVi + u * viVariacaoPontual[posicao];
      viVariacaoMedia.push(di);
      return di;
    } else {
      const di = primeiroArg * historico + u * viVariacaoPontual[posicao];
      viVariacaoMedia.push(di);
      return di;
    }
  }, []);

  const calcTempoDeExecucao = useCallback((ti: number, posicao: number) => {
    if (posicao === 0) {
      const pi = ti + diAtrasoEstimadoMedio[posicao] + 4 * viVariacaoMedia[posicao];
      piTempoDeExecucao.push(pi);
      return pi;
    } else {
      const pi = piTempoDeExecucao[posicao - 1] + 160;
      piTempoDeExecucao.push(pi);
      return pi;
    }
  }, []);

  return (
    <div className={styles.tableTraces}>
      <table>
        <thead>
          <tr>
            <th>Pacote</th>
            <th>Tempo de recepção</th>
            <th>Tempo de emissão</th>
            <th>di (delay na rede)</th>
            <th>di^ (d estimado da rede / atraso estimado médio)</th>
            <th>vi (variação pontual / real)</th>
            <th>vi^ (variação média / desvio padrão estimado)</th>
            <th>pi (tempo de execução)</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {tracesJson.map((trace, index) => (
            <tr key={`${trace[0]}-${trace[1]}-${trace[2]}`}>
              <td>{trace[0]}</td>
              <td>{trace[1]}</td>
              <td>{trace[2]}</td>
              <td>{calcDelayNaRede(Number(trace[1]), Number(trace[2]))}</td>
              <td>{calcAtrasoEstimadoMedio(index - 1, index)}</td>
              <td>{calcVariacaoPontual(index)}</td>
              <td>{calcVariacaoMedia(index - 1, index)}</td>
              <td>{calcTempoDeExecucao(Number(trace[2]), index)}</td>
              <td>{piTempoDeExecucao[index] < trace[1] ? 'Perdeu' : 'OK'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
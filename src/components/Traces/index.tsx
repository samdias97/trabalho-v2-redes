import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// ARQUIVO TRACES CONVERTIDO PARA JSON:
import tracesJson from './traces.json';

import styles from './styles.module.scss';

export function Traces() {
  const historicoDi: number = 0; //100
  const historicoVi: number = 0; //15
  const diDelayNaRede: number[] = [];
  const diAtrasoEstimadoMedio: number[] = [];
  const viVariacaoPontual: number[] = [];
  const viVariacaoMedia: number[] = [];
  const piTempoDeExecucao: number[] = [];
  const u: number = 0.001998;
  let pacotes: number = 0;
  let intervalos: number = 0;
  let pacotesPerdidos: number = 0;
  let pacotesAproveitados: number = 0;
  let contIntervaloAtrasoEstimadoMedioIndex: number = 1;
  let contIntervaloVariacaoMediaIndex: number = 1;
  let contIntervaloTempoExecucaoIndex: number = 1;

  const calcDelayNaRede = useCallback((ri: number, ti: number, posicao: number): number | string => {
    if (tracesJson[posicao][0] !== '!') {
      const di = ri - ti;
      diDelayNaRede.push(parseFloat(di.toFixed(2)));
      return parseFloat(di.toFixed(2));
    } else {
      diDelayNaRede.push(undefined);
      return '';
    }
  }, []);

  const calcAtrasoEstimadoMedio = useCallback((historico: number, posicao: number): number | string => {
    const primeiroArg = 1 - u;

    if (posicao === 0) {
      const di = primeiroArg * historicoDi + u * diDelayNaRede[posicao];
      diAtrasoEstimadoMedio.push(parseFloat(di.toFixed(2)));

      return parseFloat(di.toFixed(2));
    } else {
      if (tracesJson[posicao][0] !== '!') {
        const di = primeiroArg * diAtrasoEstimadoMedio[historico] + u * diDelayNaRede[posicao];
        diAtrasoEstimadoMedio.push(parseFloat(di.toFixed(2)));
        contIntervaloAtrasoEstimadoMedioIndex = 1;

        return parseFloat(di.toFixed(2));
      } else {
        contIntervaloAtrasoEstimadoMedioIndex = 2;
        diAtrasoEstimadoMedio.push(undefined);

        return '';
      }
    }
  }, []);

  const calcVariacaoPontual = useCallback((posicao: number): number | string => {
    if (tracesJson[posicao][0] !== '!') {
      const vi = Math.abs(diDelayNaRede[posicao] - diAtrasoEstimadoMedio[posicao]);
      viVariacaoPontual.push(parseFloat(vi.toFixed(2)));

      return parseFloat(vi.toFixed(2));
    } else {
      viVariacaoPontual.push(undefined);

      return '';
    }
  }, []);

  const calcVariacaoMedia = useCallback((historico: number, posicao: number): number | string => {
    const primeiroArg = 1 - u;
  
    if (posicao === 0) {
      const di = primeiroArg * historicoVi + u * viVariacaoPontual[posicao];
      viVariacaoMedia.push(parseFloat(di.toFixed(2)));

      return parseFloat(di.toFixed(2));
    } else {
      if (tracesJson[posicao][0] !== '!') {
        const di = primeiroArg * viVariacaoMedia[historico] + u * viVariacaoPontual[posicao];
        viVariacaoMedia.push(parseFloat(di.toFixed(2)));
        contIntervaloVariacaoMediaIndex = 1;

        return parseFloat(di.toFixed(2));
      } else {
        contIntervaloVariacaoMediaIndex = 2;
        viVariacaoMedia.push(undefined);

        return '';
      }
    }
  }, []);

  const calcTempoDeExecucao = useCallback((ti: number, posicao: number): number | string => {
    if (tracesJson[posicao][0] !== '!') {
      if (posicao === 0 || tracesJson[posicao - 1][0] === '!') {
        const pi = ti + diAtrasoEstimadoMedio[posicao] + 4 * viVariacaoMedia[posicao];
        piTempoDeExecucao.push(parseFloat(pi.toFixed(2)));
        contIntervaloTempoExecucaoIndex = 1;

        return parseFloat(pi.toFixed(2));
      } else {
        const pi = piTempoDeExecucao[posicao - contIntervaloTempoExecucaoIndex] + 160;
        piTempoDeExecucao.push(parseFloat(pi.toFixed(2)));
        contIntervaloTempoExecucaoIndex = 1;

        return parseFloat(pi.toFixed(2));
      }
    } else {
      contIntervaloTempoExecucaoIndex = 2;
      piTempoDeExecucao.push(undefined);

      return '';
    }
  }, []);

  return (
    <>
      <div className={styles.tableTraces}>
        {/* TABELA QUE VAI RENDERIZAR OS PACOTES E AS COLUNAS REFERENTES À IMPLEMENTAÇÃO DO ALGORITMO: */}
        <table>
          <thead>
            <tr>
              <th>Pacote</th>
              <th>Tempo de recepção (timestamp)</th>
              <th>Tempo de emissão (timestamp)</th>
              <th>di (delay na rede)</th>
              <th>di^ (atraso estimado médio)</th>
              <th>vi (variação pontual)</th>
              <th>vi^ (variação média)</th>
              <th>pi (tempo de execução)</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {/* PERCORRE TODOS OS PACOTES DAS TRACES, APLICANDO OS TRATAMENTOS DOS DADOS EM CADA REGISTRO ATRAVÉS DE FUNÇÕES, 
              E RETORNA O RESULTADO DESSAS FUNÇÕES PARA SEREM LISTADOS EM TELA: */}
            {tracesJson.map((trace, index) => (
              <tr key={uuidv4()}>
                {/* INDICA 'D' PARA PACOTE E '!' PARA UM INTERVALO ENTRE RAJADAS: */}
                <td>{trace[0]}</td>

                {/* INDICA O TEMPO DE RECEPÇÃO DO PACOTE EM TIMESTAMP: */}
                <td>{trace[1]}</td>

                {/* INDICA O TEMPO DE EMISSÃO DO PACOTE EM TIMESTAMP: */}
                <td>{trace[2]}</td>

                {/* FAZ O CÁLCULO DO DELAY NA REDE, CUJA FÓRMULA É => TEMPO DE RECEPÇÃO - TEMPO DE EMISSÃO: */}
                <td>{calcDelayNaRede(Number(trace[1]), Number(trace[2]), index)}</td>

                {/* FAZ O CÁLCULO DO ATRASO ESTIMADO MÉDIO, CUJA FÓRMULA É => 
                  (1 - U) * HISTÓRICO ANTERIOR (CASO SEJA O PRIMEIRO PACOTE DE UMA NOVA RAJADA, 
                  É CONSIDERADO O HISTÓRICO DO ÚLTIMO PACOTE DA RAJADA ANTERIOR) + U * ATRASO ATUAL (QUE É O DELAY NA REDE) */}
                <td>{calcAtrasoEstimadoMedio(index - contIntervaloAtrasoEstimadoMedioIndex, index)}</td>

                {/* FAZ O CÁLCULO DA VARIAÇÃO PONTUAL/REAL, CUJA FÓRMULA É => ABS (DELAY NA REDE - ATRASO ESTIMADO MÉDIO): */}
                <td>{calcVariacaoPontual(index)}</td>

                {/* FAZ O CÁLCULO DA VARIAÇÃO MÉDIA, CUJA FÓRMULA É => 
                  (1 - U) * HISTÓRICO ANTERIOR (CASO SEJA O PRIMEIRO PACOTE DE UMA NOVA RAJADA, 
                  É CONSIDERADO O HISTÓRICO DO ÚLTIMO PACOTE DA RAJADA ANTERIOR) + U * NOVIDADE (VARIAÇÃO PONTUAL) */}
                <td>{calcVariacaoMedia(index - contIntervaloVariacaoMediaIndex, index)}</td>

                {/* FAZ O CÁLCULO DO TEMPO DE EXECUÇÃO, CUJA FÓRMULA PARA O PRIMEIRO PACOTE DA RAJADA É => 
                  TEMPO DE EMISSÃO + ATRASO ESTIMADO MÉDIO + 4 * VARIAÇÃO MÉDIA,
                  E PARA O SEGUNDO PACOTE DA RAJADA EM DIANTE É => HISTÓRICO ANTERIOR + 160 */}
                <td>{calcTempoDeExecucao(Number(trace[2]), index)}</td>

                {/* INDICA O STATUS DO PACOTE => SE O SEU TEMPO DE EXECUÇÃO FOR MENOR QUE O TEMPO DE RECEPÇÃO, 
                  O PACOTE FOI PERDIDO, SE NÃO, ELE FOI APROVEITADO */}
                <td>{trace[0] !== '!' ? piTempoDeExecucao[index] < Number(trace[1])
                  ? 'Perdeu' 
                  : 'OK' 
                  : ''}
                </td>

                <span style={{ display: 'none' }}>
                {trace[0] !== '!' ? pacotes += 1 : intervalos += 1}
                {trace[0] !== '!' ? piTempoDeExecucao[index] < Number(trace[1])
                  ? pacotesPerdidos += 1 
                  : pacotesAproveitados += 1 
                  : undefined}
                </span>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RELATÓRIO: */}
      <section className={styles.sectionResults}>
        <article><strong>Total de pacotes:</strong> {pacotes}</article>
        <article><strong>Total de intervalos:</strong> {intervalos}</article>
        <article><strong>Pacotes perdidos:</strong> {pacotesPerdidos}</article>
        <article><strong>Pacotes aproveitados:</strong> {pacotesAproveitados}</article>
      </section>
    </>
  );
}
import { useCallback, useState } from 'react';

import tracesJson from './traces.json';

import styles from './styles.module.scss';

// const tracesJson = [
//   ["D",135896589,135895949  ],
//   ["D",135896781,135896109  ],
//   ["D",135897101,135896269  ],
//   ["D",135897421,135896429  ],
//   ["D",135897389,135896589  ],
//   ["D",135897549,135896749  ],
//   ["D",135897709,135896909  ],
//   ["D",135897869,135897069  ],
//   ["D",135898029,135897229  ],
//   ["D",135898189,135897389  ],
//   ["D",135898349,135897549  ],
//   ["D",135898509,135897709  ],
//   ["D",135898669,135897869  ],
//   ["D",135898829,135898029  ],
//   ["D",135898989,135898189  ],
//   ["D",135899149,135898349  ],
//   ["D",135899309,135898509  ],
//   ["D",135899469,135898669  ],
//   ["D",135899629,135898829  ],
//   ["D",135899789,135898989  ],
//   ["D",135899949,135899149  ],
//   ["D",135900109,135899309  ],
//   ["D",135900269,135899469  ],
//   ["D",135899725,135899629  ],
//   ["D",135900045,135899789  ],
//   ["D",135900365,135899949  ],
//   ["D",135900685,135900109  ],
//   ["D",135901005,135900269  ],
//   ["D",135901325,135900429  ],
//   ["D",135901645,135900589  ],
//   ["D",135901965,135900749  ],
//   ["D",135902285,135900909  ],
//   ["D",135902349,135901069  ],
//   ["D",135902349,135901229  ],
//   ["D",135902221,135901389  ],
//   ["D",135902541,135901549  ],
//   ["D",135902861,135901709  ],
//   ["D",135903181,135901869  ],
//   ["D",135903501,135902029  ],
//   ["D",135903757,135902669  ],
//   ["D",135904077,135902829  ],
//   ["D",135903373,135902989  ],
//   ["D",135903693,135903149  ],
//   ["D",135904013,135903309  ],
//   ["D",135904333,135903469  ],
//   ["D",135904653,135903629  ],
//   ["D",135904973,135903789  ],
//   ["D",135905613,135904109  ],
//   ["D",135904909,135904269  ],
//   ["D",135905229,135904429  ],
//   ["D",135905389,135904589  ],
//   ["D",135904845,135904749  ],
//   ["D",135905485,135905069  ],
//   ["D",135905805,135905229  ],
//   ["D",135906125,135905389  ],
//   ["D",135906445,135905549  ],
//   ["D",135905741,135905709  ],
//   ["D",135906061,135905869  ],
//   ["D",135906701,135906189  ],
//   ["D",135907021,135906349  ],
//   ["D",135907341,135906509  ],
//   ["D",135907661,135906669  ],
//   ["D",135907981,135906829  ],
//   ["D",135908301,135906989  ],
//   ["D",135908621,135907149  ],
//   ["D",135907917,135907309  ],
//   ["D",135908237,135907469  ],
//   ["D",135908557,135907629  ],
//   ["D",135908877,135907789  ],
//   ["D",135909517,135908109  ],
//   ["D",135909837,135908269  ],
//   ["D",135909453,135908589  ],
//   ["D",135909773,135908749  ],
//   ["D",135909389,135909069  ],
//   ["D",135909709,135909229  ],
//   ["D",135910349,135909549  ],
//   ["D",135910669,135909709  ],
//   ["D",135910989,135909869  ],
//   ["D",135914381,135912589  ],
//   ["D",135913677,135912749  ],
//   ["D",135913997,135912909  ],
//   ["D",135914317,135913069  ],
//   ["D",135914637,135913229  ],
//   ["D",135913933,135913389  ],
//   ["D",135914253,135913549  ],
//   ["D",135914573,135913709  ],
//   ["D",135914893,135913869  ],
//   ["D",135915213,135914029  ],
//   ["D",135915533,135914189  ],
//   ["D",135915853,135914349  ],
//   ["D",135916173,135914509  ],
//   ["D",135915469,135914669  ],
//   ["D",135915789,135914829  ],
//   ["D",135916109,135914989  ],
//   ["D",135916429,135915149  ],
//   ["D",135916749,135915309  ],
//   ["D",135917069,135915469  ],
//   ["D",135916365,135915629  ],
//   ["D",135916685,135915789  ],
//   ["D",135917005,135915949  ],
//   ["D",135917325,135916109  ],
//   ["D",135917645,135916269  ],
//   ["D",135917965,135916429  ],
//   ["D",135917261,135916589  ],
//   ["D",135917581,135916749  ],
//   ["D",135917901,135916909  ],
//   ["D",135918221,135917069  ],
//   ["D",135918541,135917229  ],
//   ["D",135918861,135917389  ],
//   ["D",135918157,135917549  ],
//   ["D",135918477,135917709  ],
//   ["D",135918797,135917869  ],
//   ["D",135919117,135918029  ],
//   ["D",135919437,135918189  ],
//   ["D",135919757,135918349  ],
//   ["D",135919373,135918669  ],
//   ["D",135919693,135918829  ],
//   ["D",135920013,135918989  ],
//   ["D",135920333,135919149  ],
//   ["D",135920653,135919309  ],
//   ["D",135920973,135919469  ],
//   ["D",135921293,135919629  ],
//   ["D",135921389,135919789  ],
//   ["D",135920909,135919949  ],
//   ["D",135921229,135920109  ],
//   ["D",135921549,135920269  ],
//   ["D",135921229,135920429  ],
//   ["D",135921165,135920589  ],
//   ["D",135921485,135920749  ],
//   ["D",135921805,135920909  ],
//   ["!",null,null  ],
//   ["D",135924493,135923789  ],
//   ["D",135924813,135923949  ],
//   ["D",135925133,135924109  ],
//   ["D",135925453,135924269  ],
//   ["D",135924749,135924429  ],
//   ["D",135925069,135924589  ],
//   ["D",135925389,135924749  ],
//   ["D",135925709,135924909  ],
//   ["D",135926029,135925069  ],
//   ["D",135926349,135925229  ],
//   ["D",135926669,135925389  ],
//   ["D",135926989,135925549  ],
//   ["D",135927309,135925709  ],
//   ["D",135927629,135925869  ],
//   ["D",135926925,135926029  ],
//   ["D",135927245,135926189  ],
//   ["D",135927565,135926349  ],
//   ["D",135927885,135926509  ],
//   ["D",135928205,135926669  ],
//   ["D",135928525,135926829  ],
//   ["D",135927821,135926989  ],
//   ["D",135928141,135927149  ],
//   ["D",135928461,135927309  ],
//   ["D",135928781,135927469  ],
//   ["D",135929101,135927629  ],
//   ["D",135928397,135927789  ],
//   ["D",135928717,135927949  ],
//   ["D",135929037,135928109  ],
//   ["D",135928333,135928269  ],
//   ["D",135928653,135928429  ],
//   ["D",135928973,135928589  ],
//   ["D",135929293,135928749  ],
//   ["D",135929613,135928909  ],
//   ["D",135929933,135929069  ],
//   ["D",135930253,135929229  ],
//   ["D",135930573,135929389  ],
//   ["D",135930893,135929549  ],
//   ["D",135930989,135929709  ],
//   ["D",135930989,135929869  ],
//   ["D",135930829,135930029  ],
//   ["D",135931149,135930189  ],
//   ["D",135931469,135930349  ],
//   ["D",135931789,135930509  ],
//   ["D",135932109,135930669  ],
//   ["D",135931629,135930829  ],
//   ["D",135931725,135930989  ],
//   ["D",135932045,135931149  ],
//   ["D",135932365,135931309  ],
//   ["D",135932685,135931469  ],
//   ["D",135933005,135931629  ],
//   ["D",135932301,135931789  ],
//   ["D",135932621,135931949  ],
//   ["D",135932941,135932109  ],
//   ["D",135933261,135932269  ],
//   ["D",135932557,135932429  ],
//   ["D",135932877,135932589  ],
//   ["D",135933197,135932749  ],
//   ["D",135933517,135932909  ],
//   ["D",135933837,135933069  ],
//   ["D",135934157,135933229  ],
//   ["D",135934477,135933389  ],
//   ["D",135934797,135933549  ],
//   ["D",135935117,135933709  ],
//   ["D",135934413,135933869  ],
//   ["D",135934733,135934029  ],
//   ["D",135935693,135934509  ],
//   ["D",135936013,135934669  ],
//   ["D",135935053,135934189  ],
//   ["D",135935373,135934349  ],
//   ["D",135936333,135934829  ],
//   ["D",135935629,135934989  ],
//   ["D",135935949,135935149  ],
//   ["D",135936269,135935309  ],
//   ["D",135936589,135935469  ],
//   ["D",135936909,135935629  ],
//   ["D",135936205,135935789  ],
//   ["D",135936525,135935949  ],
//   ["D",135936845,135936109  ],
//   ["D",135937165,135936269  ],
//   ["D",135937485,135936429  ],
//   ["D",135936781,135936589  ],
//   ["D",135937101,135936749  ],
//   ["D",135937421,135936909  ],
//   ["D",135937741,135937069  ],
//   ["D",135938061,135937229  ],
//   ["D",135938381,135937389  ],
//   ["D",135938701,135937549  ],
//   ["D",135939021,135937709  ],
//   ["D",135939341,135937869  ],
//   ["D",135939661,135938029  ],
//   ["D",135938957,135938189  ],
//   ["D",135939277,135938349  ],
//   ["D",135939597,135938509  ],
//   ["D",135939917,135938669  ],
//   ["D",135939629,135938829  ],
//   ["D",135939533,135938989  ],
// ]

export function Traces() {
  const historicoDi: number = 100;
  const historicoVi: number = 15;
  const diDelayNaRede: number[] = [];
  const diAtrasoEstimadoMedio: number[] = [];
  const viVariacaoPontual: number[] = [];
  const viVariacaoMedia: number[] = [];
  const piTempoDeExecucao: number[] = [];
  const u: number = 0.001998;
  let contIntervaloAtrasoEstimadoMedioIndex = 1;
  let contIntervaloVariacaoMediaIndex = 1;
  let contIntervaloTempoExecucaoIndex = 1;

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
      if (posicao === 0) {
        const pi = ti + diAtrasoEstimadoMedio[posicao] + 4 * viVariacaoMedia[posicao];
        piTempoDeExecucao.push(parseFloat(pi.toFixed(2)));

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
              <td>{calcDelayNaRede(Number(trace[1]), Number(trace[2]), index)}</td>
              <td>{calcAtrasoEstimadoMedio(index - contIntervaloAtrasoEstimadoMedioIndex, index)}</td>
              <td>{calcVariacaoPontual(index)}</td>
              <td>{calcVariacaoMedia(index - contIntervaloVariacaoMediaIndex, index)}</td>
              <td>{calcTempoDeExecucao(Number(trace[2]), index)}</td>
              <td>{trace[0] !== '!' ? piTempoDeExecucao[index] < trace[1] ? 'Perdeu' : 'OK' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
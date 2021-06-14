<h1 align="center">
  <br>
  <img src="./assetsGithub/iconRedes.svg" alt="Samuel Dias" width="120">
  <br>
  <br>
  Samuel De Sousa Dias
</h1>

<p align="center">
  Questão única do trabalho referente à V2 da disciplina de Redes de Computadores II com o professor José Belo Aragão Júnior
</p>

<div align="center">
  <img src="./assetsGithub/images/fbuniLogo.png" alt="demo" heigth="425">
</div>

<hr />

## 🚀 Enunciado da questão

<p>Em anexo, segue um arquivo com traces gerados/coletados através da  ferramenta NeVoT Silence Detector. O formato de texto do arquivo de traces possui apenas informações relevantes para o algoritmo de ajuste de playout. É por isso que contém apenas informações sobre o tempo (timestamp):</p>

<p>D &nbsp receiver_timestamp &nbsp sender_timestamp</p>
<p>! &nbsp sender_timestamp</p>

<p>Onde “D” significa a chegada de um pacote e “!” o início de uma nova rajada de fala. Todos os traces têm 20 ms de tempo de empacotamento nos remetentes. Como os pacotes foram enviados usando codificação PCM de 8 KHz e 8 bits/amostra, 20 ms significa 160 unidades de timestamp, portanto, a cada 160 timestamps, um pacote foi enviado.
Implemente o algoritmo descrito na página 455 do livro texto da disciplina (Atraso por reprodução adaptativa) e aplique-o no arquivo de traces em anexo. Faça u= 0,001998.
Elabore um relatório descrevendo os procedimentos realizados e a taxa de pacote perdidos.</p>


<br />

## 🚀 Link de acesso à produção

https://trabalhov2redesdecomputadores2.netlify.app/

<br />


## ⚙ Observações

1º - Como a lista de traces é muito extensa, o carregamento da página tende a ser lendo. Quando executar o código ou acessar o endereço do projeto, favor aguardar até o carregamento finalizar.

2º - A lógica funcional e os comentários sobre o código estão no caminho: <code>src/components/Traces/index.tsx</code>

3º - Caso queira executar o código localmente, devem ser executados os seguintes comandos:

<label>• Para baixar as dependências do projeto:<label>
<code>yarn</code>

<label>• Para executar o projeto em localhost:<label>
<code>yarn next dev</code>

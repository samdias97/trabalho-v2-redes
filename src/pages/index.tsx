import Head from 'next/head';
import { DashboardQuestion } from '../components/DashboardQuestion';

export default function Home() {
  return (
    <>
      <Head>
        <title>Trabalho V2 - Redes de Computadores II</title>
      </Head>
      <DashboardQuestion />
    </>
  )
}

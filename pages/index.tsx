import Head from 'next/head';
import LandingPage from './landing';

export default function Home(){
  return (
    <>
      <Head>
        <title>UPI Fraud Detection Demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LandingPage />
    </>
  );
}

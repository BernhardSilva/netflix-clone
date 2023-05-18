import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) {
  //   return null; // return this null to avoid hydration errors
  // }


  return (
    // <html lang="en">
      // <Head>
      //   <meta name="viewport" content="width=device-width, initial-scale=1" />
      //   <meta name="description" content="This is Notflix, a demo app for watch some shorts, enjoy it!" />
      //   <meta name="keywords" content="Notflix, Shorts" />
      //   <meta name="author" content="Bernhard Silva" />
      //   <title>Notflix</title>
      // </Head>

      <Component {...pageProps} />
    // </html>
  )

}

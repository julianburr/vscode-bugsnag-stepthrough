import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { usePageView } from "src/utils/ga";

function MyApp({ Component, pageProps }: AppProps) {
  // Track page view events in Google Analytics
  usePageView();

  return (
    <>
      <Head>
        {/* Add Google Font incl DNS prefetch for perf improvements */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com/" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Add Google Analytics */}
      {/* See https://nextjs.org/docs/messages/next-script-for-ga */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* Main app */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

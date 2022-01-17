import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

import { usePageView } from "src/utils/ga";
import { SEO } from "src/components/seo";

function MyApp({ Component, pageProps }: AppProps) {
  // Track page view events in Google Analytics
  usePageView();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="robots" content="all" />

        <SEO />

        {/* Add Google Font incl DNS prefetch for perf improvements */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Add Google Analytics */}
      {/* See https://nextjs.org/docs/messages/next-script-for-ga */}
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
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

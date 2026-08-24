import Script from 'next/script';

// Bare-bones GA4 connection — just pageview tracking, nothing else wired
// up yet. Renders nothing if NEXT_PUBLIC_GA_MEASUREMENT_ID isn't set, so
// it's safe to leave in place before you've created a GA account.
// See the "Google Analytics" section in README.md for setup steps,
// including how to exclude your own traffic.
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}

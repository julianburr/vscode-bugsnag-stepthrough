import favicon from "src/assets/favicon.png";
import previewPng from "src/assets/images/preview.png";

export function SEO() {
  const title = "VS Code Bugsnag Stepthrough";
  const desc =
    "The VS Code extension that helps you get on top of your open issues in Bugsnag";
  const keywords = "vscode, bugsnag, extension, react";
  const preview = `${process.env.API_BASE_URL}${previewPng.src}`;

  return (
    <>
      {/* Basics */}
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta data-react-helmet="true" name="keywords" content={keywords} />

      <link rel="icon" href={favicon.src} type="image/png" />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={preview} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta property="twitter:image" content={preview} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@jburr90" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
    </>
  );
}

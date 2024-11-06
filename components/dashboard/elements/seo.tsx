import { sosmedURLs } from "@/constants/sosmed";
import Head from "next/head";
import { FC, useEffect, useState } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  image: string;
}

const Seo: FC<SEOProps> = ({ title, description, keywords, image }) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    setUrl(
      `${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ""
      }${window.location.pathname}`
    );
  }, []);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Moment" />
      <link rel="author" href={url} />
      <meta name="robots" content="index, follow" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <link rel="canonical" href={url} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph meta tags for social media */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="keywords" content="keyword1, keyword2, keyword3" />
      <link rel="apple-touch-icon" href="/icon.png" />
      <link rel="icon" href="/favicon.ico" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Moment Invitations",
          url: url,
          sameAs: [
            sosmedURLs.email,
            sosmedURLs.instagram,
            sosmedURLs.whatsapp,
            sosmedURLs.youtube,
          ],
        })}
      </script>
    </Head>
  );
};

export default Seo;

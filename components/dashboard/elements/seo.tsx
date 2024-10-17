import Head from "next/head";
import { FC } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage: string;
  ogUrl?: string;
  author?: string;
  structuredData?: object;
}

const Seo: FC<SEOProps> = ({
  title,
  description,
  keywords = "default, keywords",
  ogImage,
  ogUrl,
  author,
  structuredData,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:type" content="website" />
      {author && <meta name="author" content={author} />}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Head>
  );
};

export default Seo;

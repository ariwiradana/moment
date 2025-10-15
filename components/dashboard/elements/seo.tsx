import { sosmedURLs } from "@/constants/sosmed";
import Head from "next/head";

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: string;
  siteName?: string;
  author?: string;
  publishedTime?: string;
  updatedTime?: string;
  noIndex?: boolean;
  locale?: string;
  robots?: string;
}

export default function Seo({
  title,
  description,
  keywords,
  url,
  image = "https://res.cloudinary.com/dsbmvj2s3/image/upload/v1759919489/seo_cvsy5o.webp",
  type = "Organization",
  siteName = "Moment Invitation",
  author = "Moment Invitation",
  publishedTime,
  updatedTime,
  noIndex = false,
  locale = "id_ID",
  robots = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
}: SeoProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "Organization",
    ...(type === "article"
      ? {
          headline: title,
          description,
          image,
          author: { "@type": "Person", name: author },
          datePublished: publishedTime,
          dateModified: updatedTime || publishedTime,
          publisher: {
            "@type": "Organization",
            name: siteName,
            logo: { "@type": "ImageObject", url: image },
          },
        }
      : {
          name: siteName,
          url,
          logo: image,
          description,
          sameAs: [sosmedURLs.email, sosmedURLs.instagram, sosmedURLs.youtube],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bali",
            addressCountry: "ID",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -8.3405,
            longitude: 115.092,
          },
        }),
  };

  return (
    <Head>
      {/* Primary SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Locale */}
      <meta property="og:locale" content={locale} />

      {/* Indexing Control */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content={robots} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {updatedTime && (
        <meta property="article:modified_time" content={updatedTime} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@momentinvitation" />

      {/* Icons for iOS */}
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-touch-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/apple-touch-icon-167x167.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon-180x180.png"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content={siteName} />

      {/* Icons for Android */}
      <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
      <meta name="theme-color" content="#ffffff" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}

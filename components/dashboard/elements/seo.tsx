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
  robots?: string; // ✅ Tambahkan ini
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
  robots = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1", // ✅ Default SEO-friendly
}: SeoProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "Organization",
    ...(type === "article"
      ? {
          headline: title,
          description,
          image,
          author: {
            "@type": "Person",
            name: author,
          },
          datePublished: publishedTime,
          dateModified: updatedTime || publishedTime,
          publisher: {
            "@type": "Organization",
            name: siteName,
            logo: {
              "@type": "ImageObject",
              url: image,
            },
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
      {/* Primary */}
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
        <meta name="robots" content={robots} /> // ✅ Gunakan robots props
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

      {/* Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="theme-color" content="#ffffff" />

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}

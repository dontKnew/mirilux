import { seoConfig } from "./seo";

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}) {
  const fullTitle = title
    ? `${title} | ${seoConfig.brand}`
    : `${seoConfig.brand} | Luxury Perfumes in India`;

  const url = `${seoConfig.siteUrl}${path}`;

  return {
    // ✅ ADD THIS
    metadataBase: new URL(seoConfig.siteUrl),

    title: fullTitle,
    description,

    keywords: [seoConfig.brand, ...keywords],

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: seoConfig.brand,
      locale: seoConfig.locale,
      type: "website",
      images: [
        {
          url: seoConfig.ogImage, // can now be relative or absolute
          width: 1200,
          height: 630,
          alt: `${seoConfig.brand} Perfumes`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [seoConfig.ogImage],
    },
  };
}

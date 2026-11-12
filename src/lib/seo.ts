import type { Metadata } from "next";
import { services, site } from "@/lib/content";

export const title = "Bonafide Makeover | Bridal Makeup in Kumasi";
export const description =
  "Book bridal, traditional, and occasion makeup with Bonafide Makeover in Kumasi — near KNUST. Studio sittings and home bridal calls.";

const ogImage = {
  url: "/images/IMG_1734.jpg",
  width: 1284,
  height: 1685,
  alt: "Bonafide Makeover bridal makeup, Kumasi",
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s | Bonafide Makeover",
  },
  description,
  applicationName: site.brand,
  authors: [{ name: site.brand, url: site.url }],
  creator: site.brand,
  category: "Beauty",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "/",
    siteName: site.brand,
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BeautySalon",
      "@id": `${site.url}/#business`,
      name: site.brand,
      description,
      url: site.url,
      image: `${site.url}${ogImage.url}`,
      telephone: site.phone.replace(/\s/g, ""),
      email: site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kumasi",
        addressRegion: "Ashanti",
        addressCountry: "GH",
      },
      areaServed: {
        "@type": "City",
        name: "Kumasi",
      },
      sameAs: [site.instagramUrl],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Makeup services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            areaServed: "Kumasi",
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.brand,
      description,
      publisher: { "@id": `${site.url}/#business` },
      inLanguage: "en-GH",
    },
  ],
};

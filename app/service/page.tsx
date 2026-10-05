import React from 'react';
import { fetchSEO, MEDIA_BASE_URL } from "@/lib/api";
import type { Metadata } from 'next';
import ServiceClient from './ServiceClient';
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "en";
  const seo = await fetchSEO('services');
  const canonical = locale === "ar" ? 'https://skilltechonline.com/ar/service' : 'https://skilltechonline.com/service';
  const title = locale === "ar"
    ? "الخدمات | TV Wall Mounting & Installation Service | Skill Tech"
    : "TV Wall Mounting & Installation Service | Skill Tech";
  const description = "Professional TV wall mounting and installation services in the UAE. Skill Tech ensures safe, secure setups for homes and businesses at competitive rates.";

  const imageUrl = seo?.meta_image ? (seo.meta_image.startsWith('http') ? seo.meta_image : `${MEDIA_BASE_URL}${seo.meta_image}`) : null;

  return {
    title,
    description,
    keywords: seo?.meta_keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://skilltechonline.com/"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Service",
    "item": "https://skilltechonline.com/service"
  }]
};

export default function Service() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServiceClient />
    </>
  );
}

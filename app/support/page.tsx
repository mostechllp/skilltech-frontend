import React from 'react';
import { fetchSEO, MEDIA_BASE_URL } from "@/lib/api";
import type { Metadata } from 'next';
import SupportClient from './SupportClient';
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "en";
  const seo = await fetchSEO('support');
  const canonical = locale === "ar" ? 'https://skilltechonline.com/ar/support' : 'https://skilltechonline.com/support';
  const title = locale === "ar"
    ? "الدعم | Skill Tech Support | Expert AV Technical Assistance"
    : "Skill Tech Support | Expert AV Technical Assistance";
  const description = "Get expert AV technical support from Skill Tech. Our team provides reliable troubleshooting and assistance for all your TV mounting and installation needs.";

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
    "name": "Support",
    "item": "https://skilltechonline.com/support"
  }]
};

export default function Support() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SupportClient />
    </>
  );
}

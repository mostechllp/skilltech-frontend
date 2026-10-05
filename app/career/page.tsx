import React from 'react';
import { fetchSEO, MEDIA_BASE_URL } from "@/lib/api";
import type { Metadata } from 'next';
import CareerClient from './CareerClient';
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "en";
  const seo = await fetchSEO('career');
  const canonical = locale === "ar" ? 'https://skilltechonline.com/ar/career' : 'https://skilltechonline.com/career';
  const title = locale === "ar"
    ? "الوظائف | Skill Tech Careers | Explore Job Opportunities Now"
    : "Skill Tech Careers | Explore Job Opportunities Now";
  const description = "Explore exciting career opportunities at Skill Tech. Join our growing team of TV mounting and AV installation professionals across the UAE and beyond.";

  const imageUrl = seo?.meta_image ? (seo.meta_image.startsWith('http') ? seo.meta_image : `${MEDIA_BASE_URL}${seo.meta_image}`) : null;

  return {
    title,
    description,
    keywords: seo?.meta_keywords,
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.meta_title,
      description: seo.meta_description,
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
    "name": "career ",
    "item": "https://skilltechonline.com/career"
  }]
};

export default function Career() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CareerClient />
    </>
  );
}

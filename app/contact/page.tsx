import React from 'react';
import { fetchSEO, MEDIA_BASE_URL } from "@/lib/api";
import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "en";
  const seo = await fetchSEO('contact');
  const canonical = locale === "ar" ? 'https://skilltechonline.com/ar/contact' : 'https://skilltechonline.com/contact';
  const title = locale === "ar"
    ? "اتصل بنا | Contact Skill Tech | TV Mounting Services in UAE Today"
    : "Contact Skill Tech | TV Mounting Services in UAE Today";
  const description = "Contact Skill Tech today for professional TV mounting services across the UAE. Reach our expert team for quotes, bookings, and installation support now.";

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
    "name": "Contact",
    "item": "https://skilltechonline.com/contact"
  }]
};

export default function Contact() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContactClient />
    </>
  );
}

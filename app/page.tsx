import { fetchCategories, fetchBanners, fetchOffers, fetchProducts, fetchClients, fetchProjects, fetchSEO, MEDIA_BASE_URL } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import HomeClient from "./HomeClient";
import type { Metadata } from 'next';

import { getServerLocale } from "@/lib/locale";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const seo = await fetchSEO('home');
  const canonical = locale === "ar"
    ? 'https://skilltechonline.com/ar'
    : locale === "hi"
    ? 'https://skilltechonline.com/hi'
    : locale === "es"
    ? 'https://skilltechonline.com/es'
    : locale === "pt"
    ? 'https://skilltechonline.com/pt'
    : locale === "fr"
    ? 'https://skilltechonline.com/fr'
    : locale === "ru"
    ? 'https://skilltechonline.com/ru'
    : seo?.canonical_url || 'https://skilltechonline.com/';
  if (!seo) {
    return {
      alternates: {
        canonical,
      },
    };
  }

  const imageUrl = seo.meta_image ? (seo.meta_image.startsWith('http') ? seo.meta_image : `${MEDIA_BASE_URL}${seo.meta_image}`) : null;

  return {
    title: seo.meta_title,
    description: seo.meta_description,
    keywords: seo.meta_keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: seo.meta_title,
      description: seo.meta_description,
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

const websiteSchema = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  "name": "Skill Tech",
  "url": "https://skilltechonline.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "{search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Skill Tech",
  "image": "https://skilltechonline.com/images/logo.svg",
  "@id": "",
  "url": "https://skilltechonline.com/",
  "telephone": "+971 4 234 7770",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Office# F03 & F04, Al Awadhi Building, Opp. New California Hotel",
    "addressLocality": "Dubai",
    "postalCode": "381108",
    "addressCountry": "AE"
  }
};

export default async function Home() {
  const categories = (await fetchCategories(true).catch(() => [])) || [];
  const exploreCategories = (await fetchCategories(undefined, true).catch(() => [])) || [];
  const banners = (await fetchBanners().catch(() => [])) || [];
  const offers = (await fetchOffers().catch(() => [])) || [];
  const initialCategory = exploreCategories && exploreCategories.length > 0 ? exploreCategories[0].slug : undefined;
  const products = (await fetchProducts(true, 1, initialCategory).catch(() => ({ results: [], count: 0 }))) || { results: [], count: 0 };
  const clients = (await fetchClients().catch(() => [])) || [];
  const projects = (await fetchProjects().catch(() => [])) || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HomeClient 
        categories={categories} 
        exploreCategories={exploreCategories}
        banners={banners} 
        offers={offers} 
        // products={products} 
        clients={clients} 
        projects={projects}
        mediaBaseUrl={MEDIA_BASE_URL} 
      />
    </>
  );
}



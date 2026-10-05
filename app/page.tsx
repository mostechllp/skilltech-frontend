import { fetchCategories, fetchBanners, fetchOffers, fetchProducts, fetchClients, fetchProjects, fetchSEO, MEDIA_BASE_URL } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import HomeClient from "./HomeClient";
import type { Metadata } from 'next';

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSEO('home');
  const canonical = seo?.canonical_url || 'https://skilltechonline.com/';
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
      canonical: seo.canonical_url || 'https://skilltechonline.com/',
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
  const categories = await fetchCategories(true);
  const exploreCategories = await fetchCategories(undefined, true);
  const banners = await fetchBanners();
  const offers = await fetchOffers();
  const initialCategory = exploreCategories && exploreCategories.length > 0 ? exploreCategories[0].slug : undefined;
  const products = await fetchProducts(true, 1, initialCategory);
  const clients = await fetchClients();
  const projects = await fetchProjects();

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



import { fetchCategories, fetchBanners, fetchOffers, fetchProducts, fetchClients, fetchProjects, fetchSEO, MEDIA_BASE_URL } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import HomeClient from "./HomeClient";
import type { Metadata } from 'next';

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSEO('home');
  if (!seo) return {};

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


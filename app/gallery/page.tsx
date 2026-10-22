import React from 'react';
import { fetchSEO, MEDIA_BASE_URL } from "@/lib/api";
import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSEO('gallery');
  const title = seo?.meta_title || "Project Gallery | Skill Tech Installation Showcase UAE";
  const description = seo?.meta_description || "Browse our gallery of professional TV wall mounts, motorized stands, and commercial AV installations across UAE homes and corporate offices.";
  const canonical = seo?.canonical_url || 'https://skilltechonline.com/gallery';

  const imageUrl = seo?.meta_image ? (seo.meta_image.startsWith('http') ? seo.meta_image : `${MEDIA_BASE_URL}${seo.meta_image}`) : null;

  return {
    title,
    description,
    keywords: seo?.meta_keywords,
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

export default function Gallery() {
  return <GalleryClient />;
}


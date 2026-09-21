import React from 'react';
import type { Metadata } from 'next';
import NewsMediaClient from './NewsMediaClient';
import { fetchNewsPost, fetchSEO, MEDIA_BASE_URL } from '@/lib/api';
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "en";
  const seo = await fetchSEO('news');
  if (!seo) return {
    title: locale === "ar" ? 'الأخبار ووسائل الإعلام | Skilltech' : 'News & Media | Skilltech',
    description: 'Latest news, press releases, and media updates from Skilltech.',
    alternates: {
      canonical: locale === "ar" ? 'https://skilltechonline.com/ar/news-media' : 'https://skilltechonline.com/news-media',
    },
  };

  const imageUrl = seo.meta_image ? (seo.meta_image.startsWith('http') ? seo.meta_image : `${MEDIA_BASE_URL}${seo.meta_image}`) : null;

  const canonical = locale === "ar" ? 'https://skilltechonline.com/ar/news-media' : 'https://skilltechonline.com/news-media';

  return {
    title: locale === "ar" ? `الأخبار ووسائل الإعلام | ${seo.meta_title || "Skilltech"}` : seo.meta_title,
    description: seo.meta_description,
    keywords: seo.meta_keywords,
    alternates: {
      canonical: canonical,
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

export default async function NewsMediaPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  
  let newsData: any[] = [];
  let totalCount = 0;
  
  try {
    const response = await fetchNewsPost(currentPage);
    if (response && response.results) {
      newsData = response.results;
      totalCount = response.count;
    } else if (Array.isArray(response)) {
      newsData = response;
      totalCount = response.length;
    }
    console.log(`FETCHED NEWS DATA (Page ${currentPage}):`, newsData.length, "Total:", totalCount);
  } catch (error) {
    console.error("FAILED TO FETCH NEWS POSTS:", error);
  }

  return <NewsMediaClient newsItems={newsData} totalCount={totalCount} />;
}

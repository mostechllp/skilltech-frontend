import React from 'react';
import type { Metadata } from 'next';
import NewsMediaClient from './NewsMediaClient';
import { fetchNewsPost, fetchSEO, MEDIA_BASE_URL } from '@/lib/api';
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "en";
  const seo = await fetchSEO('news');
  const canonical = locale === "ar" ? 'https://skilltechonline.com/ar/news-media' : 'https://skilltechonline.com/news-media';
  const title = locale === "ar"
    ? "الأخبار ووسائل الإعلام | News & Media | Skill Tech Group Updates and Events UAE"
    : "News & Media | Skill Tech Group Updates and Events UAE";
  const description = "Stay updated with the latest news, media coverage, and company updates from Skill Tech, the UAE's leading TV mounting and AV installation specialists.";

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
    "name": "News and media",
    "item": "https://skilltechonline.com/news-media"
  }]
};

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <NewsMediaClient newsItems={newsData} totalCount={totalCount} />
    </>
  );
}


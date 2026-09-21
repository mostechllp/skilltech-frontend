import React from 'react';
import { fetchSEO, fetchBlogPosts, fetchPageBanner, MEDIA_BASE_URL } from "@/lib/api";
import type { Metadata } from 'next';
import BlogClient from './BlogClient';
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "en";
  const seo = await fetchSEO('blog');
  if (!seo) return {};

  const imageUrl = seo.meta_image ? (seo.meta_image.startsWith('http') ? seo.meta_image : `${MEDIA_BASE_URL}${seo.meta_image}`) : null;

  const canonical = locale === "ar" ? 'https://skilltechonline.com/ar/blog' : 'https://skilltechonline.com/blog';

  return {
    title: locale === "ar" ? `المدونة | ${seo.meta_title || "Skill Tech"}` : seo.meta_title,
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

export default async function Blog() {
    const posts = await fetchBlogPosts();
    const banner = await fetchPageBanner('blog');

    return <BlogClient posts={posts} banner={banner} />;
}

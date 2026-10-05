import React from 'react';
import { fetchSEO, fetchBlogPosts, fetchPageBanner, MEDIA_BASE_URL } from "@/lib/api";
import type { Metadata } from 'next';
import BlogClient from './BlogClient';
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "en";
  const seo = await fetchSEO('blog');
  const canonical = locale === "ar" ? 'https://skilltechonline.com/ar/blog' : 'https://skilltechonline.com/blog';
  const title = locale === "ar"
    ? "المدونة | Skill Tech Blog | TV Mounting Tips, Guides & Insights"
    : "Skill Tech Blog | TV Mounting Tips, Guides & Insights";
  const description = "Read the Skill Tech blog for expert TV mounting tips, step-by-step guides, and helpful insights to get the most from your home entertainment setup today.";

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
    "name": "Blog",
    "item": "https://skilltechonline.com/blog"
  }]
};

export default async function Blog() {
    const posts = await fetchBlogPosts();
    const banner = await fetchPageBanner('blog');

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <BlogClient posts={posts} banner={banner} />
      </>
    );
}

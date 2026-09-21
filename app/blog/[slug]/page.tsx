import { fetchBlogBySlug, fetchBlogPosts, MEDIA_BASE_URL } from "@/lib/api";
import BlogDetailClient from "./BlogDetailClient";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

import { headers } from "next/headers";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
 
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  const headersList = await headers();
  const locale = headersList.get("x-locale") || "en";

  const title = locale === "ar" && post.title_ar ? post.title_ar : post.title;
  const shortDesc = locale === "ar" && post.short_description_ar ? post.short_description_ar : post.short_description;
  const content = locale === "ar" && post.content_ar ? post.content_ar : post.content;
  const author = locale === "ar" && post.author_ar ? post.author_ar : post.author;
  const image = locale === "ar" && post.image_ar ? post.image_ar : post.image;

  const imageUrl = image ? (image.startsWith('http') ? image : `${MEDIA_BASE_URL}${image}`) : null;
 
  return {
    title: title,
    description: shortDesc || content?.substring(0, 160),
    keywords: post.tags || [],
    openGraph: {
        title: title,
        description: shortDesc || content?.substring(0, 160),
        images: imageUrl ? [imageUrl] : [],
        type: 'article',
        publishedTime: post.created_at,
        authors: author ? [author] : [],
        tags: post.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: shortDesc || content?.substring(0, 160),
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  const recentPosts = await fetchBlogPosts();

  if (!post) {
    notFound();
  }

  // Filter out current post from recent
  const related = recentPosts.filter((p: any) => p.id !== post.id).slice(0, 5);

  return <BlogDetailClient post={post} recentPosts={related} />;
}

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

  const blogSeoData: Record<string, { title: string; description: string }> = {
    "how-to-choose-the-right-tv-mount-for-your-space": {
      title: "TV Mount Detailed Selection Guide for Any Room - Skill Tech",
      description: "Use Skill Tech's detailed TV mount selection guide to pick the right fixed, tilt or full motion bracket for any room. Compare sizes, VESA and weight limits.",
    },
    "top-5-av-solutions-for-modern-workspaces": {
      title: "Top 5 Workspace AV & Display Solutions - Skill Tech",
      description: "Discover the top 5 workspace AV and display solutions from Skill Tech. Upgrade meeting rooms and offices with reliable mounts, stands and displays. Shop now.",
    },
    "ergonomic-mounts-enhance": {
      title: "Ergonomic Monitor and Laptop Mounts - Skill Tech Online",
      description: "Shop ergonomic monitor and laptop mounts from Skill Tech Online. Improve posture, free up desk space and boost productivity with adjustable, sturdy arms.",
    },
  };

  const customSeo = blogSeoData[slug];
  const finalTitle = locale === "ar" ? title : (customSeo?.title || title);
  const finalDescription = locale === "ar" ? (shortDesc || content?.substring(0, 160)) : (customSeo?.description || shortDesc || content?.substring(0, 160));
  const author = locale === "ar" && post.author_ar ? post.author_ar : post.author;
  const image = locale === "ar" && post.image_ar ? post.image_ar : post.image;

  const imageUrl = image ? (image.startsWith('http') ? image : `${MEDIA_BASE_URL}${image}`) : null;
 
  const canonical = locale === "ar" ? `https://skilltechonline.com/ar/blog/${slug}` : `https://skilltechonline.com/blog/${slug}`;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: post.tags || [],
    alternates: {
      canonical: canonical,
    },
    openGraph: {
        title: finalTitle,
        description: finalDescription,
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

  const headersList = await headers();
  const locale = headersList.get("x-locale") || "en";
  const postTitle = locale === "ar" && post.title_ar ? post.title_ar : post.title;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://skilltechonline.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://skilltechonline.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": postTitle,
        "item": `https://skilltechonline.com/blog/${slug}`
      }
    ]
  };

  // Filter out current post from recent
  const related = recentPosts.filter((p: any) => p.id !== post.id).slice(0, 5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogDetailClient post={post} recentPosts={related} />
    </>
  );
}

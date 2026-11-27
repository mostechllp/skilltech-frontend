import Link from "next/link";
import { fetchProductBySlug, fetchProductsBySubCategory, MEDIA_BASE_URL } from "@/lib/api";
import { notFound } from "next/navigation";
import ProductDetailClient from "./client";
import type { Metadata } from 'next';

import { headers } from "next/headers";

import { getServerLocale } from "@/lib/locale";

type Props = {
  params: Promise<{ categorySlug: string, subcategorySlug: string, productSlug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { productSlug } = await params;
  const product = await fetchProductBySlug(productSlug);
 
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const locale = await getServerLocale();

  const nameTrans = locale === "ar" && product.title_ar ? product.title_ar : (locale === "hi" && product.title_hi ? product.title_hi : (locale === "es" && product.title_es ? product.title_es : (locale === "pt" && product.title_pt ? product.title_pt : (locale === "fr" && product.title_fr ? product.title_fr : (locale === "ru" && (product as any).title_ru ? (product as any).title_ru : (product.title || product.name))))));
  const title = product.seo?.meta_title || nameTrans;
  
  const shortDescTrans = locale === "ar" && product.short_description_ar ? product.short_description_ar : (locale === "hi" && product.short_description_hi ? product.short_description_hi : (locale === "es" && product.short_description_es ? product.short_description_es : (locale === "pt" && product.short_description_pt ? product.short_description_pt : (locale === "fr" && product.short_description_fr ? product.short_description_fr : (locale === "ru" && (product as any).short_description_ru ? (product as any).short_description_ru : product.short_description)))));
  const descTrans = locale === "ar" && product.description_ar ? product.description_ar : (locale === "hi" && product.description_hi ? product.description_hi : (locale === "es" && product.description_es ? product.description_es : (locale === "pt" && product.description_pt ? product.description_pt : (locale === "fr" && product.description_fr ? product.description_fr : (locale === "ru" && (product as any).description_ru ? (product as any).description_ru : product.description)))));
  const description = product.seo?.meta_description || shortDescTrans || descTrans?.substring(0, 160);
  
  const imagePath = product.seo?.meta_image || product.main_image;
  const imageUrl = imagePath ? (imagePath.startsWith('http') ? imagePath : `${MEDIA_BASE_URL}${imagePath}`) : null;
  
  const tagsTrans = locale === "ar" && product.tags_ar ? product.tags_ar : (locale === "hi" && product.tags_hi ? product.tags_hi : (locale === "es" && product.tags_es ? product.tags_es : (locale === "pt" && product.tags_pt ? product.tags_pt : (locale === "fr" && product.tags_fr ? product.tags_fr : (locale === "ru" && (product as any).tags_ru ? (product as any).tags_ru : product.tags)))));
  const keywords = product.seo?.meta_keywords 
    ? product.seo.meta_keywords.split(',').map((tag: string) => tag.trim())
    : (tagsTrans ? tagsTrans.split(',').map((tag: string) => tag.trim()) : []);

  return {
    title: title,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: product.seo?.canonical_url || `https://skilltechonline.com/${product.slug_path}`,
    },
    openGraph: {
        title: title,
        description: description,
        images: imageUrl ? [imageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ categorySlug: string, subcategorySlug: string, productSlug: string }> }) {
  const { categorySlug, subcategorySlug, productSlug } = await params;
  
  const product = await fetchProductBySlug(productSlug);

  if (!product) {
      notFound();
  }

  // Use manually selected similar products if available, otherwise fallback to same subcategory
  let similarProducts = product.similar_products || [];

  if (similarProducts.length === 0) {
      // Fetch similar products from the same subcategory
      const similarProductsData = await fetchProductsBySubCategory(subcategorySlug);
      similarProducts = (similarProductsData.results || similarProductsData)
        .filter((p: any) => p.slug !== productSlug)
        .slice(0, 10);
  }

  // Transform images for the client component
  // Add main image to thumbnails list
  const images = product.images ? product.images.map((img: any) => ({
    src: `${img.image}`,
    alt: img.alt_text || `View ${product.name} - Image`
  })) : [];
  
  if (product.main_image) {
      images.unshift({
        src: `${product.main_image}`,
        alt: product.main_image_alt || product.name
      });
  }

  return (
    <>
      <ProductDetailClient
        product={product}
        images={images}
        mediaBaseUrl={MEDIA_BASE_URL}
        similarProducts={similarProducts}
        categorySlug={categorySlug}
        subcategorySlug={subcategorySlug}
      />
    </>
  );}

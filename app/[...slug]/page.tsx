import Link from "next/link";
import {
  fetchProductBySlug,
  fetchProductsBySubCategory,
  MEDIA_BASE_URL,
} from "@/lib/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "../[categorySlug]/[subcategorySlug]/_productSlug/client";
import { headers } from "next/headers";

type Props = {
  params: Promise<{
    slug:any[]
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  console.log(slug, "checkparamsd");
  const [categorySlug, subcategorySlug, productSlug] = slug;
  const product = await fetchProductBySlug(`${categorySlug}/${subcategorySlug}/${productSlug}`);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";

  const nameTrans = locale === "ar" && product.title_ar ? product.title_ar : (product.title || product.name);
  const title = product.seo?.meta_title || nameTrans;
  
  const shortDescTrans = locale === "ar" && product.short_description_ar ? product.short_description_ar : product.short_description;
  const descTrans = locale === "ar" && product.description_ar ? product.description_ar : product.description;
  const description = product.seo?.meta_description || shortDescTrans || descTrans?.substring(0, 160);

  const imagePath = product.seo?.meta_image || product.main_image;
  const imageUrl = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : `${MEDIA_BASE_URL}${imagePath}`
    : null;

  const tagsTrans = locale === "ar" && product.tags_ar ? product.tags_ar : product.tags;
  const keywords = product.seo?.meta_keywords 
    ? product.seo.meta_keywords.split(',').map((tag: string) => tag.trim())
    : (tagsTrans ? tagsTrans.split(',').map((tag: string) => tag.trim()) : []);

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      images: imageUrl ? [imageUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: any[] }>;
}) {
  const { slug } = await params;
  console.log(slug, "checkparams");
  const [categorySlug, subcategorySlug, productSlug] = slug;
  console.log(categorySlug, "checkcategoryslug");
  const product = await fetchProductBySlug(`${categorySlug}/${subcategorySlug}/${productSlug}`);

  if (!product) {
    notFound();
  }

  // Use manually selected similar products if available, otherwise fallback to same subcategory
  let similarProducts = product.similar_products || [];

  if (similarProducts.length === 0) {
    // Fetch similar products from the same subcategory
    const similarProductsData =
      await fetchProductsBySubCategory(subcategorySlug);
    similarProducts = (similarProductsData.results || similarProductsData)
      .filter((p: any) => p.slug !== productSlug)
      .slice(0, 10);
  }

  // Transform images for the client component
  // Add main image to thumbnails list
  const images = product.images
    ? product.images.map((img: any) => ({
        src: `${img.image}`,
        alt: img.alt_text || `View ${product.name} - Image`,
      }))
    : [];

  if (product.main_image) {
    images.unshift({
      src: `${product.main_image}`,
      alt: product.main_image_alt || product.name,
    });
  }

  return (
    <>
      <ProductDetailClient
        product={product}
        images={images}
        mediaBaseUrl={MEDIA_BASE_URL}
        similarProducts={similarProducts}
      />
    </>
  );
}

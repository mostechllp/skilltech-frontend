import Link from "next/link";
import {
  fetchProductBySlug,
  fetchProductsBySubCategory,
  MEDIA_BASE_URL,
} from "@/lib/api";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "../[categorySlug]/[subcategorySlug]/_productSlug/client";
import { headers } from "next/headers";
import SubCategoryView, {
  generateSubCategoryMetadata,
} from "@/components/SubCategoryView";
import { ARM_SLUGS, ARM_ALIASES } from "@/lib/armConstants";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
  searchParams?: Promise<{
    page?: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [categorySlug, subcategorySlug, segment3] = slug;

  if (categorySlug === "floor-stands") {
    const headersList = await headers();
    const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
    const prefix = locale === "ar" ? "/ar" : "";
    permanentRedirect(`${prefix}/floor-stands-cart/${slug.slice(1).join("/")}`);
  }

  if (categorySlug === "tv") {
    const headersList = await headers();
    const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
    const prefix = locale === "ar" ? "/ar" : "";
    permanentRedirect(`${prefix}/led-tv/${slug.slice(1).join("/")}`);
  }

  // Check if segment 3 is an arm filter slug
  if (slug.length === 3 && ARM_SLUGS.includes(segment3)) {
    return generateSubCategoryMetadata({
      categorySlug,
      subcategorySlug,
      armSlug: segment3,
    });
  }

  const product = await fetchProductBySlug(`${categorySlug}/${subcategorySlug}/${segment3}`);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
  const prefix = locale === "ar" ? "/ar" : "";

  const nameTrans =
    locale === "ar" && product.title_ar ? product.title_ar : product.title || product.name;
  const title = product.seo?.meta_title || nameTrans;

  const shortDescTrans =
    locale === "ar" && product.short_description_ar
      ? product.short_description_ar
      : product.short_description;
  const descTrans =
    locale === "ar" && product.description_ar ? product.description_ar : product.description;
  const description =
    product.seo?.meta_description || shortDescTrans || descTrans?.substring(0, 160);

  const imagePath = product.seo?.meta_image || product.main_image;
  const imageUrl = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : `${MEDIA_BASE_URL}${imagePath}`
    : null;

  const tagsTrans = locale === "ar" && product.tags_ar ? product.tags_ar : product.tags;
  const keywords = product.seo?.meta_keywords
    ? product.seo.meta_keywords.split(",").map((tag: string) => tag.trim())
    : tagsTrans
    ? tagsTrans.split(",").map((tag: string) => tag.trim())
    : [];

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
    alternates: {
      canonical: `https://skilltechonline.com${prefix}/${slug.join("/")}`,
    },
  };
}

export default async function CatchAllDetailPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const [categorySlug, subcategorySlug, segment3] = slug;

  if (categorySlug === "floor-stands") {
    const headersList = await headers();
    const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
    const prefix = locale === "ar" ? "/ar" : "";
    permanentRedirect(`${prefix}/floor-stands-cart/${slug.slice(1).join("/")}`);
  }

  if (categorySlug === "tv") {
    const headersList = await headers();
    const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
    const prefix = locale === "ar" ? "/ar" : "";
    permanentRedirect(`${prefix}/led-tv/${slug.slice(1).join("/")}`);
  }

  // If segment 3 is an arm alias (e.g. single -> single-arm), redirect permanently
  if (slug.length === 3 && ARM_ALIASES[segment3]) {
    const headersList = await headers();
    const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
    const prefix = locale === "ar" ? "/ar" : "";
    const canonicalArm = ARM_ALIASES[segment3];
    permanentRedirect(`${prefix}/${categorySlug}/${subcategorySlug}/${canonicalArm}`);
  }

  // If segment 3 is an arm filter slug, render the filtered subcategory page
  if (slug.length === 3 && ARM_SLUGS.includes(segment3)) {
    const resolvedSearchParams = searchParams ? await searchParams : {};
    const currentPage = Number(resolvedSearchParams?.page) || 1;
    return (
      <SubCategoryView
        categorySlug={categorySlug}
        subcategorySlug={subcategorySlug}
        armSlug={segment3}
        currentPage={currentPage}
      />
    );
  }

  // Otherwise, handle as Product Detail Page
  const product = await fetchProductBySlug(`${categorySlug}/${subcategorySlug}/${segment3}`);

  if (!product) {
    notFound();
  }

  // Use manually selected similar products if available, otherwise fallback to same subcategory
  let similarProducts = product.similar_products || [];

  if (similarProducts.length === 0) {
    // Fetch similar products from the same subcategory
    const similarProductsData = await fetchProductsBySubCategory(subcategorySlug);
    similarProducts = (similarProductsData.results || similarProductsData)
      .filter((p: any) => p.slug !== segment3)
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

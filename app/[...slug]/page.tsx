import Link from "next/link";
import {
  fetchProductBySlug,
  fetchProductsBySubCategory,
  MEDIA_BASE_URL,
} from "@/lib/api";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "../[categorySlug]/[subcategorySlug]/_productSlug/client";
import { getServerLocale } from "@/lib/locale";
import SubCategoryView, {
  generateSubCategoryMetadata,
} from "@/components/SubCategoryView";
import { ARM_SLUGS, ARM_ALIASES } from "@/lib/armConstants";
import Support, { generateMetadata as generateSupportMetadata } from "../support/page";

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
  let cleanSlug = [...slug];
  let routeLocale = "";
  if (cleanSlug[0] === "hi" || cleanSlug[0] === "ar" || cleanSlug[0] === "es" || cleanSlug[0] === "pt" || cleanSlug[0] === "fr" || cleanSlug[0] === "ru") {
    routeLocale = cleanSlug[0];
    cleanSlug = cleanSlug.slice(1);
  }

  if (cleanSlug.length >= 2 && cleanSlug[0] === "blog") {
    const prefix = routeLocale ? `/${routeLocale}` : "";
    permanentRedirect(`${prefix}/blog/${cleanSlug.slice(1).join("/")}`);
  }

  if (cleanSlug.length === 1 && cleanSlug[0] === "support") {
    return generateSupportMetadata();
  }

  const [categorySlug, subcategorySlug, segment3] = cleanSlug;

  if (categorySlug === "floor-stands") {
    const locale = await getServerLocale();
    const prefix = locale === "ar" ? "/ar" : locale === "hi" ? "/hi" : locale === "es" ? "/es" : locale === "pt" ? "/pt" : locale === "fr" ? "/fr" : locale === "ru" ? "/ru" : "";
    permanentRedirect(`${prefix}/floor-stands-cart/${cleanSlug.slice(1).join("/")}`);
  }

  if (categorySlug === "tv") {
    const locale = await getServerLocale();
    const prefix = locale === "ar" ? "/ar" : locale === "hi" ? "/hi" : locale === "es" ? "/es" : locale === "pt" ? "/pt" : locale === "fr" ? "/fr" : locale === "ru" ? "/ru" : "";
    permanentRedirect(`${prefix}/led-tv/${cleanSlug.slice(1).join("/")}`);
  }

  // Check if segment 3 is an arm filter slug
  if (cleanSlug.length === 3 && ARM_SLUGS.includes(segment3)) {
    return generateSubCategoryMetadata({
      categorySlug,
      subcategorySlug,
      armSlug: segment3,
    });
  }

  if (!segment3) {
    return { title: "Product Not Found" };
  }

  const product = await fetchProductBySlug(`${categorySlug}/${subcategorySlug}/${segment3}`);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const locale = await getServerLocale();
  const prefix = locale === "ar" ? "/ar" : locale === "hi" ? "/hi" : locale === "es" ? "/es" : locale === "pt" ? "/pt" : locale === "fr" ? "/fr" : locale === "ru" ? "/ru" : "";

  const nameTrans =
    locale === "ar" && product.title_ar
      ? product.title_ar
      : locale === "hi" && (product as any).title_hi
      ? (product as any).title_hi
      : locale === "es" && (product as any).title_es
      ? (product as any).title_es
      : locale === "pt" && (product as any).title_pt
      ? (product as any).title_pt
      : locale === "fr" && (product as any).title_fr
      ? (product as any).title_fr
      : locale === "ru" && (product as any).title_ru
      ? (product as any).title_ru
      : product.title || product.name;
  const title = product.seo?.meta_title || nameTrans;

  const shortDescTrans =
    locale === "ar" && product.short_description_ar
      ? product.short_description_ar
      : locale === "hi" && (product as any).short_description_hi
      ? (product as any).short_description_hi
      : locale === "es" && (product as any).short_description_es
      ? (product as any).short_description_es
      : locale === "pt" && (product as any).short_description_pt
      ? (product as any).short_description_pt
      : locale === "fr" && (product as any).short_description_fr
      ? (product as any).short_description_fr
      : locale === "ru" && (product as any).short_description_ru
      ? (product as any).short_description_ru
      : product.short_description;
  const descTrans =
    locale === "ar" && product.description_ar
      ? product.description_ar
      : locale === "hi" && (product as any).description_hi
      ? (product as any).description_hi
      : locale === "es" && (product as any).description_es
      ? (product as any).description_es
      : locale === "pt" && (product as any).description_pt
      ? (product as any).description_pt
      : locale === "fr" && (product as any).description_fr
      ? (product as any).description_fr
      : locale === "ru" && (product as any).description_ru
      ? (product as any).description_ru
      : product.description;
  const description =
    product.seo?.meta_description || shortDescTrans || descTrans?.substring(0, 160);

  const imagePath = product.seo?.meta_image || product.main_image;
  const imageUrl = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : `${MEDIA_BASE_URL}${imagePath}`
    : null;

  const tagsTrans =
    locale === "ar" && product.tags_ar
      ? product.tags_ar
      : locale === "hi" && (product as any).tags_hi
      ? (product as any).tags_hi
      : locale === "es" && (product as any).tags_es
      ? (product as any).tags_es
      : locale === "pt" && (product as any).tags_pt
      ? (product as any).tags_pt
      : locale === "fr" && (product as any).tags_fr
      ? (product as any).tags_fr
      : locale === "ru" && (product as any).tags_ru
      ? (product as any).tags_ru
      : product.tags;
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
  let cleanSlug = [...slug];
  let routeLocale = "";
  if (cleanSlug[0] === "hi" || cleanSlug[0] === "ar" || cleanSlug[0] === "es" || cleanSlug[0] === "pt" || cleanSlug[0] === "fr" || cleanSlug[0] === "ru") {
    routeLocale = cleanSlug[0];
    cleanSlug = cleanSlug.slice(1);
  }

  if (cleanSlug.length >= 2 && cleanSlug[0] === "blog") {
    const prefix = routeLocale ? `/${routeLocale}` : "";
    permanentRedirect(`${prefix}/blog/${cleanSlug.slice(1).join("/")}`);
  }

  if (cleanSlug.length === 1 && cleanSlug[0] === "support") {
    return <Support />;
  }

  const [categorySlug, subcategorySlug, segment3] = cleanSlug;

  if (categorySlug === "floor-stands") {
    const locale = await getServerLocale();
    const prefix = locale === "ar" ? "/ar" : locale === "hi" ? "/hi" : locale === "es" ? "/es" : locale === "pt" ? "/pt" : locale === "fr" ? "/fr" : locale === "ru" ? "/ru" : "";
    permanentRedirect(`${prefix}/floor-stands-cart/${cleanSlug.slice(1).join("/")}`);
  }

  if (categorySlug === "tv") {
    const locale = await getServerLocale();
    const prefix = locale === "ar" ? "/ar" : locale === "hi" ? "/hi" : locale === "es" ? "/es" : locale === "pt" ? "/pt" : locale === "fr" ? "/fr" : locale === "ru" ? "/ru" : "";
    permanentRedirect(`${prefix}/led-tv/${cleanSlug.slice(1).join("/")}`);
  }

  // If segment 3 is an arm alias (e.g. single -> single-arm), redirect permanently
  if (cleanSlug.length === 3 && ARM_ALIASES[segment3]) {
    const locale = await getServerLocale();
    const prefix = locale === "ar" ? "/ar" : locale === "hi" ? "/hi" : locale === "es" ? "/es" : locale === "pt" ? "/pt" : locale === "fr" ? "/fr" : locale === "ru" ? "/ru" : "";
    const canonicalArm = ARM_ALIASES[segment3];
    permanentRedirect(`${prefix}/${categorySlug}/${subcategorySlug}/${canonicalArm}`);
  }

  // If segment 3 is an arm filter slug, render the filtered subcategory page
  if (cleanSlug.length === 3 && ARM_SLUGS.includes(segment3)) {
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

  if (!segment3) {
    notFound();
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

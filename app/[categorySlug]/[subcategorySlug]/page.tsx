import React from 'react';
import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { fetchSubCategoryBySlug, fetchProductsBySubCategory, MEDIA_BASE_URL } from "@/lib/api";
import type { Metadata } from 'next';
import Pagination from "@/components/Pagination";
import Image from 'next/image';
import ProductCard from "@/components/ProductCard";
import { headers } from "next/headers";
import { translations } from "@/lib/translations";

type Params = {
  categorySlug: string;
  subcategorySlug: string;
}
type SearchParams = {
  page?: string;
  arm?: string;
}
type Props = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { categorySlug, subcategorySlug } = await params;
  const subCategory = await fetchSubCategoryBySlug(subcategorySlug);
 
  if (!subCategory) {
    return {
      title: 'SubCategory Not Found',
    };
  }

  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
  const t = (key: string) => {
    const langDict = (translations[locale] as Record<string, string>) || {};
    return langDict[key] || key;
  };

  const nameTrans = locale === "ar" && subCategory.name_ar ? subCategory.name_ar : subCategory.name;
  const title = subCategory.meta_title || nameTrans;
  const description = subCategory.meta_description || `${t("Explore Our Products")} - ${nameTrans}`;
  const keywords = subCategory.meta_keywords ? subCategory.meta_keywords.split(',').map((tag: string) => tag.trim()) : [];
  
  const imagePath = subCategory.meta_image || subCategory.image;
  const imageUrl = imagePath ? (imagePath.startsWith('http') ? imagePath : `${MEDIA_BASE_URL}${imagePath}`) : null;
  
  const canonical = locale === "ar" ? `https://skilltechonline.com/ar/${categorySlug}/${subcategorySlug}` : `https://skilltechonline.com/${categorySlug}/${subcategorySlug}`;

  return {
    title: title,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: canonical,
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

export default async function SubCategoryPage({ params, searchParams }: Props) {
  const { categorySlug, subcategorySlug } = await params;
  const { page, arm } = await searchParams;
  const currentPage = Number(page) || 1;
  
  const subCategory = await fetchSubCategoryBySlug(subcategorySlug);

  if (!subCategory) {
      notFound();
  }

  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
  const t = (key: string) => {
    const langDict = (translations[locale] as Record<string, string>) || {};
    return langDict[key] || key;
  };

  let productsData;
  try {
      productsData = await fetchProductsBySubCategory(subcategorySlug, currentPage, arm);
  } catch (error) {
      console.error("Error loading products:", error);
      productsData = { results: [], count: 0 };
  }

  const products = Array.isArray(productsData) ? productsData : (productsData.results || []);
  const count = Array.isArray(productsData) ? productsData.length : (productsData.count || 0);

  const formatSlug = (slug: string | undefined) => 
    slug ? slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "";

  return (
    <>
      <div style={{ 
          padding: "12px 20px", 
          fontSize: "16px", 
          color: "#555",
          background: "#f4f4f4",
          borderRadius: "4px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "5px"
        }}  >
        <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "5px" }}>
          <Link href="/" style={{ color: "#3351a3", textDecoration: "none" }}>{t("Home")}</Link>
          <span>{locale === "ar" ? " < " : " > "}</span>
          <Link href={`/${categorySlug}`} className="breadcrumb-link">
            {locale === "ar" && subCategory.category?.name_ar ? subCategory.category.name_ar : (subCategory.category?.name || formatSlug(categorySlug))}
          </Link>
          <span>{locale === "ar" ? " < " : " > "}</span>
          <span style={{ color: "#cc0070", fontWeight: "500" }}>{(locale === "ar" && subCategory.name_ar ? subCategory.name_ar : subCategory.name) || formatSlug(subcategorySlug)}</span>
        </div>
      </div>
      <div id="product-section" className="container product-section">

        <div className="" style={{marginBottom:"20px"}}>
            <h1 className="pb-0"  style={{fontSize:"32px"}} >{locale === "ar" && subCategory.name_ar ? subCategory.name_ar : subCategory.name}</h1>
        </div>

        {/* heading & category tabs */}
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="section-title">{t("Explore Our Products")}</h3>
        </div>

        {/* product cards */}
        <div className="row g-4">
          {products.map((product: any) => (
             <div key={product.id} className="col-lg-3 col-md-6">
                <ProductCard product={product} />
              </div>
          ))}
          
           {products.length === 0 && (
                <p>{t("No products found in this category.")}</p>
            )}

        </div>
        
        <Pagination count={count} />
      </div>
    </>
  );
}

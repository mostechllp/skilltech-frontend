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

  const subcategorySeoData: Record<string, { title: string; description: string }> = {
    "fixed-flat-wall-mounts": {
      title: "Durable Slim Fixed Flat TV Wall Mounts - Skill Tech",
      description: "Buy durable slim fixed flat TV wall mounts from Skill Tech. Ultra-low profile, strong and easy to install for a sleek, space-saving look. Order online today.",
    },
    "full-motion-single-arm": {
      title: "Full Motion Single Arm TV Wall Mounts - Skill Tech",
      description: "Shop full motion single arm TV wall mounts from Skill Tech. Swivel, tilt and extend for perfect viewing angles in any room. Strong, durable and easy to install.",
    },
    "tilt-wall-mounts": {
      title: "Adjustable Tilt TV Wall Mount Brackets - Skill Tech",
      description: "Explore adjustable tilt TV wall mount brackets from Skill Tech. Reduce glare, get the perfect viewing angle and enjoy a secure fit. Shop online at best prices.",
    },
    "full-motion-double-arm-mounts": {
      title: "Full Motion Double Arm TV Mounts - Skill Tech Online",
      description: "Shop full motion double arm TV mounts from Skill Tech Online. Heavy-duty, flexible and smooth to adjust for larger screens. Easy to install and durable.",
    },
    "articulating-monitor-arm": {
      title: "Articulating Quad Monitor Arms & Desk Mounts - Skill Tech",
      description: "Shop articulating quad monitor arms and desk mounts from Skill Tech. Build a clean multi-screen setup with adjustable, sturdy and ergonomic stands. Buy now.",
    },
  };

  const customSeo = subcategorySeoData[subcategorySlug];
  const title = locale === "ar" ? (subCategory.meta_title || nameTrans) : (customSeo?.title || subCategory.meta_title || nameTrans);
  const description = locale === "ar" ? (subCategory.meta_description || `${t("Explore Our Products")} - ${nameTrans}`) : (customSeo?.description || subCategory.meta_description || `${t("Explore Our Products")} - ${nameTrans}`);
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

  const subcategoryH1Names: Record<string, string> = {
    "fixed-flat-wall-mounts": "Fixed / Flat Wall Mounts",
    "full-motion-single-arm": "Full Motion Single Arm",
    "tilt-wall-mounts": "Tilt Wall Mounts",
    "full-motion-double-arm-mounts": "Full Motion Double Arm Mounts",
    "full-motion-double-arm-mount": "Full Motion Double Arm Mounts",
    "articulating-monitor-arm": "Articulating Monitor Arm",
  };

  const breadcrumbName = subcategoryH1Names[subcategorySlug] || (locale === "ar" && subCategory.name_ar ? subCategory.name_ar : subCategory.name);

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
        "name": breadcrumbName,
        "item": `https://skilltechonline.com/${categorySlug}/${subcategorySlug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
          <span style={{ color: "#cc0070", fontWeight: "500" }}>{(locale === "ar" && subCategory.name_ar ? subCategory.name_ar : (subcategoryH1Names[subcategorySlug] || subCategory.name)) || formatSlug(subcategorySlug)}</span>
        </div>
      </div>
      <div id="product-section" className="container product-section">

        <div className="" style={{marginBottom:"20px"}}>
            <h1 className="pb-0"  style={{fontSize:"32px"}} >{locale === "ar" && subCategory.name_ar ? subCategory.name_ar : (subcategoryH1Names[subcategorySlug] || subCategory.name)}</h1>
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

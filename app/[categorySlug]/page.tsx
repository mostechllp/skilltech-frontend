import React from 'react';
import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { fetchCategoryBySlug, fetchSubCategoriesByCategory, MEDIA_BASE_URL } from "@/lib/api";
import type { Metadata } from 'next';
import Image from 'next/image';
import { headers } from "next/headers";
import { translations } from "@/lib/translations";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ categorySlug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const categorySlug = (await params).categorySlug;
  const category = await fetchCategoryBySlug(categorySlug);
 
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
  const t = (key: string) => {
    const langDict = (translations[locale] as Record<string, string>) || {};
    return langDict[key] || key;
  };

  const nameTrans = locale === "ar" && category.name_ar ? category.name_ar : category.name;

  const categorySeoData: Record<string, { title: string; description: string }> = {
    "tv-wall-mount": {
      title: "TV Wall Mounts UAE | Fixed, Tilt & Full Motion | Skill Tech",
      description: "Shop fixed, tilt, and full-motion TV wall mounts in UAE from Skill Tech. Durable, secure options for every screen size. Fast delivery across UAE.",
    },
    "desktop-mounts": {
      title: "Monitor & Desktop Mounts | Ergonomic Arms | Skill Tech",
      description: "Upgrade your workspace with ergonomic monitor and desktop mounting arms from Skill Tech. Adjustable, space-saving solutions for home and office.",
    },
    "tv-ceiling-mounts": {
      title: "TV Ceiling Mounts | Sturdy & Space Saving | Skill Tech",
      description: "Explore sturdy, space-saving TV ceiling mounts from Skill Tech. Perfect for UAE homes and offices seeking a secure viewing setup. Buy online today.",
    },
    "motorized-mounts": {
      title: "Motorized TV Mounts & Stands | Skill Tech Electronics",
      description: "Discover motorized TV mounts and stands from Skill Tech, offering smooth, automated positioning for a modern entertainment setup. Order online.",
    },
    "projector-screens": {
      title: "Projector Screens | Wide Range of Sizes | Skill Tech",
      description: "Browse premium projector screen sizes at Skill Tech. Quality screens for home theaters, corporate offices, and presentations. Order online today.",
    },
    "laptop-tablet-stands": {
      title: "Laptop & Tablet Stands | Adjustable Mounts | Skill Tech",
      description: "Find adjustable laptop and tablet stands at Skill Tech. Designed for comfort, portability, and ergonomic support in home or office. Buy online.",
    },
    "pos-mounts": {
      title: "Heavy-Duty POS Mounts & Terminal Stands - Skill Tech",
      description: "Shop heavy-duty POS mounts and terminal stands from Skill Tech. Sturdy, adjustable and easy to install for retail counters. Buy online today.",
    },
    "video-wall-mounts": {
      title: "Video Wall Mounts & Digital Signage Stands - Skill Tech",
      description: "Explore video wall mounts and digital signage stands from Skill Tech. Strong, precise-fit solutions for malls and showrooms. Order online today.",
    },
    "ac-brackets": {
      title: "Wide Range of AC Brackets & Outdoor Unit Mounts - Skill Tech",
      description: "Find heavy-duty AC brackets and outdoor unit mounts at Skill Tech. Rust-resistant, load-tested stands for split AC units. Shop online today.",
    },
    "dvd-receiver-mounts": {
      title: "Durable Mounts for DVD, CPU & AV Receiver Set - Skill Tech",
      description: "Buy durable mounts for DVD players, CPUs and AV receivers from Skill Tech. Save space, tidy your setup and keep devices secure. Shop online today.",
    },
    "cctv-camera-brackets": {
      title: "Durable CCTV Camera Brackets & Wall Mounts - Skill Tech",
      description: "Shop durable CCTV camera brackets and wall mounts from Skill Tech. Weather-resistant, sturdy and easy to fit for homes and offices. Order online.",
    },
    "other-mounts-accessories": {
      title: "Universal Mounting Brackets & Accessories - Skill Tech",
      description: "Discover universal mounting brackets and accessories from Skill Tech. Versatile, strong and easy to install for homes and businesses. Buy online.",
    },
    "tv": {
      title: "Smart & Standard 4K Skill Tech LED TVs and Displays",
      description: "Shop smart and standard 4K Skill Tech LED TVs and displays. Sharp picture, vibrant colours and great value for home and business. Buy online today.",
    },
  };

  const customSeo = categorySeoData[categorySlug];
  const title = locale === "ar" ? (category.meta_title || nameTrans) : (customSeo?.title || category.meta_title || nameTrans);
  const description = locale === "ar" ? (category.meta_description || `${t("Explore Our Products")} - ${nameTrans}`) : (customSeo?.description || category.meta_description || `${t("Explore Our Products")} - ${nameTrans}`);
  const keywords = category.meta_keywords ? category.meta_keywords.split(',').map((tag: string) => tag.trim()) : [];
  
  const imagePath = category.meta_image || category.image;
  const imageUrl = imagePath ? (imagePath.startsWith('http') ? imagePath : `${MEDIA_BASE_URL}${imagePath}`) : null;
  
  const canonical = locale === "ar" ? `https://skilltechonline.com/ar/${categorySlug}` : `https://skilltechonline.com/${categorySlug}`;

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

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  const category = await fetchCategoryBySlug(categorySlug);
  
  if (!category) {
    notFound();
  }

  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
  const categoryH1Names: Record<string, string> = {
    "pos-mounts": "POS Mounts",
    "video-wall-mounts": "Video Wall Mounts",
    "ac-brackets": "AC Brackets",
    "dvd-receiver-mounts": "DVD / Receiver & CPU Mounts",
    "cctv-camera-brackets": "CCTV Camera Brackets",
    "other-mounts-accessories": "Other Mounts & Accessories",
    "tv": "LED TV",
  };
  const nameTrans = locale === "ar" && category.name_ar ? category.name_ar : (categoryH1Names[categorySlug] || category.name);
  const t = (key: string) => {
    const langDict = (translations[locale] as Record<string, string>) || {};
    return langDict[key] || key;
  };

  const subcategories = await fetchSubCategoriesByCategory(categorySlug);

  const categoryBreadcrumbNames: Record<string, string> = {
    "tv-wall-mount": "TV Wall Mounts",
    "desktop-mounts": "Monitor & Desktop Mounts",
    "tv-ceiling-mounts": "TV Ceiling Mounts",
    "motorized-mounts": "Motorized Mounts and Stands",
    "floor-stands-cart": "TV Floor Stands & Cart",
    "projector-mounts": "Projector Mounts",
    "projector-screens": "Projector Screens",
    "laptop-tablet-stands": "Laptop & Tablet Stands",
    "pos-mounts": "POS Mounts",
    "video-wall-mounts": "Video Wall Mounts",
    "ac-brackets": "AC Brackets",
    "dvd-receiver-mounts": "DVD / Receiver & CPU Mounts",
    "cctv-camera-brackets": "CCTV Camera Brackets",
    "other-mounts-accessories": "Other Mounts & Accessories",
    "tv": "LED TV",
  };

  const breadcrumbName = categoryBreadcrumbNames[categorySlug] || category.name;
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
        "item": `https://skilltechonline.com/${categorySlug}`
      }
    ]
  };

  const formatSlug = (slug: string | undefined) => 
    slug ? slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "";

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
        }} >
        <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "5px" }}>
          <Link href="/" className="breadcrumb-link">{t("Home")}</Link>
          <span>{locale === "ar" ? " < " : " > "}</span>
          <span style={{ color: "#cc0070", fontWeight: "500" }}>{nameTrans || formatSlug(categorySlug)}</span>
        </div>
      </div>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            {/* <h4>{t("Product Category")}</h4> */}
            <h1>{nameTrans}</h1>
            <p>{t("Explore our wide range of high-quality products designed for durability and performance.")}</p>
          </div>
          <div className="vector-image">
             {category.image && (
                <Image src={`${category.image}`} alt={nameTrans} width={450} height={450} priority sizes="(max-width: 768px) 100vw, 450px" style={{ objectFit: "cover" }} />
             ) }
          </div>
        </div>
      </section>

      <section className="category-detail-section">
        <div className="container">
          <div className="text-left">
            <button className="explore-btn-nocursor"><span className="arrow-circle"><i className="fas fa-play"></i></span>{t("Subcategories")}</button>
            <h2 className="section-title">{t("Explore ")}{nameTrans}</h2>
          </div>

          <div className="row g-4">
            {subcategories.map((sub: any) => (
              <Link
                key={sub.id}
                href={`/${categorySlug}/${sub.slug}`}
                aria-label={locale === "ar" && sub.name_ar ? sub.name_ar : sub.name}
                className="col-lg-3 col-md-6 col-6"
              >
                <div className="category-card">
                  <Image src={`${sub.image??"/images/default.png"}`} alt={locale === "ar" && sub.name_ar ? sub.name_ar : sub.name} width={400} height={300} sizes="(max-width: 575px) 50vw, (max-width: 991px) 33vw, 25vw" style={{ objectFit: "cover" }} />
                  <h3>{locale === "ar" && sub.name_ar ? sub.name_ar : sub.name}</h3>
                  <p>{sub.products_count || 0}{t(" Products")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

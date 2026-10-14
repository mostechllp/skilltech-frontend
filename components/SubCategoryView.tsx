import React from "react";
import Link from "@/components/Link";
import { notFound } from "next/navigation";
import {
  fetchSubCategoryBySlug,
  fetchProductsBySubCategory,
  MEDIA_BASE_URL,
} from "@/lib/api";
import type { Metadata } from "next";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { headers } from "next/headers";
import { translations } from "@/lib/translations";
import { ARM_NAMES } from "@/lib/armConstants";

const subcategoryH1Names: Record<string, string> = {
  "fixed-flat-wall-mounts": "Fixed / Flat Wall Mounts",
  "full-motion-single-arm": "Full Motion Single Arm",
  "tilt-wall-mounts": "Tilt Wall Mounts",
  "full-motion-double-arm-mounts": "Full Motion Double Arm Mounts",
  "full-motion-double-arm-mount": "Full Motion Double Arm Mounts",
  "articulating-monitor-arm": "Articulating Monitor Arm",
  "desktop-mount": "Desktop Mount",
  "ergonomic": "Ergonomic Monitor Arm",
  "tv-ceiling-mount": "TV Ceiling Mount",
  "motorized-tv-wall-mounts": "Motorized TV Wall Mounts",
  "motorized-tv-cart-or-trolly": "Motorized TV Cart or Trolley",
};

const ARM_BREADCRUMB_NAMES: Record<
  string,
  Record<string, { en: string; ar: string }>
> = {
  "articulating-monitor-arm": {
    "single-arm": {
      en: "Articulating Single Arm",
      ar: "ذراع شاشة متحرك - ذراع واحدة",
    },
    "double-arm": {
      en: "Articulating Double Arm",
      ar: "ذراع شاشة متحرك - ذراع مزدوج",
    },
    "triple-arm": {
      en: "Articulating Triple Arm",
      ar: "ذراع شاشة متحرك - الذراع الثلاثية",
    },
    "quad-arm": {
      en: "Articulating Quad Arm",
      ar: "ذراع شاشة متحرك - ذراع رباعية",
    },
    "six-arm": {
      en: "Articulating Six Arm",
      ar: "ذراع شاشة متحرك - ستة ذراع",
    },
  },
  ergonomic: {
    "single-arm": {
      en: "Ergonomic Single Arm",
      ar: "ذراع شاشة مريح - ذراع واحدة",
    },
    "double-arm": {
      en: "Ergonomic Double Arm",
      ar: "ذراع شاشة مريح - ذراع مزدوج",
    },
    "triple-arm": {
      en: "Ergonomic Triple Arm",
      ar: "ذراع شاشة مريح - الذراع الثلاثية",
    },
    "quad-arm": {
      en: "Ergonomic Quad Arm",
      ar: "ذراع شاشة مريح - ذراع رباعية",
    },
    workstation: {
      en: "Ergonomic Workstation",
      ar: "ذراع شاشة مريح - محطة عمل",
    },
  },
};

const armSeoData: Record<
  string,
  Record<string, { title: string; description: string }>
> = {
  "articulating-monitor-arm": {
    "single-arm": {
      title: "Single Arm Articulating Monitor Mount | SkillTech Online",
      description:
        "Shop the SkillTech single arm articulating monitor arm. Adjustable, sturdy desk mount for better ergonomics and a clutter-free workspace. Order online today.",
    },
    "double-arm": {
      title: "Double Arm Articulating Monitor Mount | SkillTech Online",
      description:
        "Shop the SkillTech double arm articulating monitor arm. Adjustable, sturdy desk mount for dual screens and a clutter-free workspace. Order online today.",
    },
    "triple-arm": {
      title: "Triple Arm Articulating Monitor Mount | SkillTech Online",
      description:
        "Shop the SkillTech triple arm articulating monitor arm. Adjustable, sturdy desk mount for three screens and a clutter-free workspace. Order online today.",
    },
    "quad-arm": {
      title: "Quad Arm Articulating Monitor Mount | SkillTech Online",
      description:
        "Shop the SkillTech quad arm articulating monitor arm. Adjustable, sturdy desk mount for four screens and a clutter-free workspace. Order online today.",
    },
    "six-arm": {
      title: "Six Arm Articulating Monitor Mount | SkillTech Online",
      description:
        "Shop the SkillTech six arm articulating monitor arm. Adjustable, heavy-duty desk mount for six screens and a clutter-free workspace. Order online today.",
    },
  },
  ergonomic: {
    "single-arm": {
      title: "Single Arm Ergonomic Monitor Mount | SkillTech Online",
      description:
        "Shop the SkillTech single arm ergonomic monitor mount. Adjustable height and tilt for better posture and a tidy, comfortable desk. Order online today.",
    },
    "double-arm": {
      title: "Double Arm Ergonomic Monitor Mount | SkillTech Online",
      description:
        "Shop the SkillTech double arm ergonomic monitor mount. Adjustable height and tilt for dual screens, better posture and a tidy desk. Order online today.",
    },
    "triple-arm": {
      title: "Triple Arm Ergonomic Monitor Mount | SkillTech Online",
      description:
        "Shop the SkillTech triple arm ergonomic monitor mount. Adjustable height and tilt for three screens, better posture and a tidy desk. Order online today.",
    },
    "quad-arm": {
      title: "Quad Arm Ergonomic Monitor Mount | SkillTech Online",
      description:
        "Shop the SkillTech quad arm ergonomic monitor mount. Adjustable height and tilt for four screens, better posture and a tidy desk. Order online today.",
    },
    workstation: {
      title: "Ergonomic Workstation Monitor Mount | SkillTech Online",
      description:
        "Shop the SkillTech ergonomic workstation monitor mount. Adjustable height and tilt for multiple screens, better posture and a tidy desk. Order online today.",
    },
  },
};

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
  "desktop-mount": {
    title: "Desktop Mounts UAE | Tabletop TV Stands | Skill Tech",
    description:
      "Buy desktop mounts in UAE with VESA support, swivel and height-adjustable designs for 23–75 inch TVs, with sturdy tabletop bases for home and office use.",
  },
  "ergonomic": {
    title: "Ergonomic Monitor Mounts for Desktop | SkillTech Online",
    description:
      "Explore SkillTech ergonomic desktop monitor mounts. Adjustable single to multi-arm setups that improve posture and comfort at work. Shop online today.",
  },
  "tv-ceiling-mount": {
    title: "TV Ceiling Mounts UAE | Heavy-Duty & Telescopic | Skill Tech",
    description:
      "Buy TV ceiling mounts in UAE with heavy-duty steel builds, adjustable height, tilt, swivel and cable management for home and commercial displays.",
  },
  "motorized-tv-wall-mounts": {
    title: "Motorized TV Wall Mounts for Home | SkillTech Online",
    description:
      "Shop SkillTech motorized TV wall mounts with remote control for smooth tilt, swivel and height adjustment. Sturdy, sleek and easy to use. Order online today",
  },
  "motorized-tv-cart-or-trolly": {
    title: "Motorized TV Carts & Electric Trolleys | Skill Tech",
    description:
      "Explore motorized TV carts with electric height adjustment, smooth mobility and durable construction for conference rooms, education and commercial AV projects.",
  },
};

const formatSlug = (slug: string | undefined) =>
  slug ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "";

export async function generateSubCategoryMetadata({
  categorySlug,
  subcategorySlug,
  armSlug,
}: {
  categorySlug: string;
  subcategorySlug: string;
  armSlug?: string;
}): Promise<Metadata> {
  const subCategory = await fetchSubCategoryBySlug(subcategorySlug);

  if (!subCategory) {
    return {
      title: "SubCategory Not Found",
    };
  }

  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
  const t = (key: string) => {
    const langDict = (translations[locale] as Record<string, string>) || {};
    return langDict[key] || key;
  };

  const nameTrans =
    (locale === "ar" && subCategory.name_ar
      ? subCategory.name_ar
      : subcategoryH1Names[subcategorySlug] || subCategory.name) ||
    formatSlug(subcategorySlug);

  let title: string;
  let description: string;
  let canonical: string;

  if (armSlug) {
    const customArmSeo = armSeoData[subcategorySlug]?.[armSlug];
    const armBreadcrumb =
      ARM_BREADCRUMB_NAMES[subcategorySlug]?.[armSlug] || ARM_NAMES[armSlug];
    const armDisplayName =
      locale === "ar"
        ? armBreadcrumb?.ar || armBreadcrumb?.en || formatSlug(armSlug)
        : armBreadcrumb?.en || formatSlug(armSlug);

    if (locale === "ar") {
      title = `${armDisplayName} | Skill Tech`;
      description = `تسوق ${armDisplayName} من Skill Tech. حامل شاشات مريح وعالي الجودة.`;
      canonical = `https://skilltechonline.com/ar/${categorySlug}/${subcategorySlug}/${armSlug}`;
    } else {
      title = customArmSeo?.title || `${armDisplayName} - Skill Tech`;
      description =
        customArmSeo?.description ||
        `Shop ${armDisplayName.toLowerCase()} from Skill Tech. High quality, durable and ergonomic desk solutions. Order online today.`;
      canonical = `https://skilltechonline.com/${categorySlug}/${subcategorySlug}/${armSlug}`;
    }
  } else {
    const customSeo = subcategorySeoData[subcategorySlug];
    title =
      locale === "ar"
        ? subCategory.meta_title || nameTrans
        : customSeo?.title || subCategory.meta_title || nameTrans;
    description =
      locale === "ar"
        ? subCategory.meta_description || `${t("Explore Our Products")} - ${nameTrans}`
        : customSeo?.description ||
          subCategory.meta_description ||
          `${t("Explore Our Products")} - ${nameTrans}`;
    canonical =
      locale === "ar"
        ? `https://skilltechonline.com/ar/${categorySlug}/${subcategorySlug}`
        : `https://skilltechonline.com/${categorySlug}/${subcategorySlug}`;
  }

  const keywords = subCategory.meta_keywords
    ? subCategory.meta_keywords.split(",").map((tag: string) => tag.trim())
    : [];

  const imagePath = subCategory.meta_image || subCategory.image;
  const imageUrl = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : `${MEDIA_BASE_URL}${imagePath}`
    : null;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

interface SubCategoryViewProps {
  categorySlug: string;
  subcategorySlug: string;
  armSlug?: string;
  currentPage?: number;
}

export default async function SubCategoryView({
  categorySlug,
  subcategorySlug,
  armSlug,
  currentPage = 1,
}: SubCategoryViewProps) {
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
    productsData = await fetchProductsBySubCategory(subcategorySlug, currentPage, armSlug);
  } catch (error) {
    console.error("Error loading products:", error);
    productsData = { results: [], count: 0 };
  }

  const products = Array.isArray(productsData) ? productsData : productsData.results || [];
  const count = Array.isArray(productsData) ? productsData.length : productsData.count || 0;

  const baseSubCategoryName =
    subcategoryH1Names[subcategorySlug] ||
    (locale === "ar" && subCategory.name_ar ? subCategory.name_ar : subCategory.name) ||
    formatSlug(subcategorySlug);

  const armBreadcrumb = armSlug
    ? ARM_BREADCRUMB_NAMES[subcategorySlug]?.[armSlug] || ARM_NAMES[armSlug]
    : null;
  const armDisplayName = armBreadcrumb
    ? locale === "ar"
      ? armBreadcrumb.ar || armBreadcrumb.en || formatSlug(armSlug)
      : armBreadcrumb.en || formatSlug(armSlug)
    : null;

  const pageTitle = armDisplayName || baseSubCategoryName;

  // Schema.org BreadcrumbList exactly as specified for SEO
  const breadcrumbElements: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }> = [
    {
      "@type": "ListItem",
      position: 1,
      name: locale === "ar" ? "الرئيسية" : "Home",
      item: locale === "ar" ? "https://skilltechonline.com/ar/" : "https://skilltechonline.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: baseSubCategoryName,
      item:
        locale === "ar"
          ? `https://skilltechonline.com/ar/${categorySlug}/${subcategorySlug}`
          : `https://skilltechonline.com/${categorySlug}/${subcategorySlug}`,
    },
  ];

  if (armSlug && armDisplayName) {
    breadcrumbElements.push({
      "@type": "ListItem",
      position: 3,
      name: armDisplayName,
      item:
        locale === "ar"
          ? `https://skilltechonline.com/ar/${categorySlug}/${subcategorySlug}/${armSlug}`
          : `https://skilltechonline.com/${categorySlug}/${subcategorySlug}/${armSlug}`,
    });
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbElements,
  };

  const canonicalUrl =
    locale === "ar"
      ? `https://skilltechonline.com/ar/${categorySlug}/${subcategorySlug}${armSlug ? `/${armSlug}` : ""}`
      : `https://skilltechonline.com/${categorySlug}/${subcategorySlug}${armSlug ? `/${armSlug}` : ""}`;

  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          color: "#555",
          background: "#f4f4f4",
          borderRadius: "4px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <div
          className="container"
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "5px" }}
        >
          <Link href="/" style={{ color: "#3351a3", textDecoration: "none" }}>
            {t("Home")}
          </Link>
          <span>{locale === "ar" ? " < " : " > "}</span>
          <Link href={`/${categorySlug}`} className="breadcrumb-link">
            {locale === "ar" && subCategory.category?.name_ar
              ? subCategory.category.name_ar
              : subCategory.category?.name || formatSlug(categorySlug)}
          </Link>
          <span>{locale === "ar" ? " < " : " > "}</span>
          {armSlug ? (
            <>
              <Link
                href={`/${categorySlug}/${subcategorySlug}`}
                className="breadcrumb-link"
              >
                {baseSubCategoryName}
              </Link>
              <span>{locale === "ar" ? " < " : " > "}</span>
              <span style={{ color: "#cc0070", fontWeight: "500" }} aria-current="page">{armDisplayName}</span>
            </>
          ) : (
            <span style={{ color: "#cc0070", fontWeight: "500" }} aria-current="page">
              {baseSubCategoryName}
            </span>
          )}
        </div>
      </nav>
      <div id="product-section" className="container product-section">
        <div className="" style={{ marginBottom: "20px" }}>
          <h1 className="pb-0" style={{ fontSize: "32px" }}>
            {pageTitle}
          </h1>
        </div>

        {/* heading & category tabs */}
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="section-title">{t("Explore Our Products")}</h2>
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

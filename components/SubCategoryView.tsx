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
  // Existing mappings
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

  // 15 requested subcategory H1 mappings
  "motorized-tv-lift": "Motorized TV Lift",
  "motorized-tv-ceiling-mounts": "Motorized TV Ceiling Mounts",
  "floor-stands": "Floor Stands",
  "tv-cart-or-trolley": "TV Cart or Trolley",
  "projector-ceiling-mounts": "Projector Ceiling Mounts",
  "projector-floor-stands": "Projector Floor Stands",
  "motorized-projector-screens": "Motorized Projector Screens",
  "projector-screen": "Projector Screen",
  "tripod-projector-screens": "Tripod Projector Screens",
  "laptop-stands": "Laptop Stands",
  "tablet-floor-stands": "Tablet Floor Stands",
  "tablet-wall-mounts": "Tablet Wall Mounts",
  "pos-stands": "POS Stands",
  "digital-signage-wall-mounts": "Digital Signage Wall Mounts",
  "video-wall-floor-stands": "Video Wall Floor Stands",
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
        "Shop single arm articulating monitor mounts from Skill Tech. Sturdy desk mount for better ergonomics and a tidy workspace. Order online today.",
    },
    "double-arm": {
      title: "Double Arm Articulating Monitor Mount | SkillTech Online",
      description:
        "Shop double arm articulating monitor mounts from Skill Tech. Adjustable, sturdy desk mount for dual screens and a tidy workspace. Buy online today.",
    },
    "triple-arm": {
      title: "Triple Arm Articulating Monitor Mount | SkillTech Online",
      description:
        "Shop triple arm articulating monitor mounts from Skill Tech. Sturdy desk mount for three screens and a comfortable workspace. Order online today.",
    },
    "quad-arm": {
      title: "Quad Arm Articulating Monitor Mount | SkillTech Online",
      description:
        "Shop quad arm articulating monitor mounts from Skill Tech. Sturdy desk mount for four screens and an organized workspace. Order online today.",
    },
    "six-arm": {
      title: "Six Arm Articulating Monitor Mount | SkillTech Online",
      description:
        "Shop six arm articulating monitor mounts from Skill Tech. Heavy-duty desk mount for multi-screen setups and organized desks. Buy online today.",
    },
  },
  ergonomic: {
    "single-arm": {
      title: "Single Arm Ergonomic Monitor Mount | SkillTech Online",
      description:
        "Shop single arm ergonomic monitor mounts from Skill Tech. Adjustable height and tilt for better posture and a tidy, clear desk. Order online today.",
    },
    "double-arm": {
      title: "Double Arm Ergonomic Monitor Mount | SkillTech Online",
      description:
        "Shop double arm ergonomic monitor mounts from Skill Tech. Adjustable height and tilt for dual screens, better posture and a tidy desk. Buy online.",
    },
    "triple-arm": {
      title: "Triple Arm Ergonomic Monitor Mount | SkillTech Online",
      description:
        "Shop triple arm ergonomic monitor mounts from Skill Tech. Adjustable height and tilt for three screens and a comfortable setup. Buy online today.",
    },
    "quad-arm": {
      title: "Quad Arm Ergonomic Monitor Mount | SkillTech Online",
      description:
        "Shop quad arm ergonomic monitor mounts from Skill Tech. Adjustable height and tilt for four screens, better posture and tidy desk. Buy online.",
    },
    workstation: {
      title: "Ergonomic Workstation Monitor Mount | SkillTech Online",
      description:
        "Shop ergonomic workstation monitor mounts from Skill Tech. Adjustable height and tilt for multiple screens and better posture. Order online today.",
    },
  },
};

const subcategorySeoData: Record<string, { title: string; description: string; canonical?: string }> = {
  // Existing mappings
  "fixed-flat-wall-mounts": {
    title: "Durable Slim Fixed Flat TV Wall Mounts - Skill Tech",
    description: "Buy slim fixed flat TV wall mounts from Skill Tech. Ultra-low profile, strong and easy to install for a sleek, space-saving look. Order online today.",
    canonical: "https://skilltechonline.com/tv-wall-mount/fixed-flat-wall-mounts",
  },
  "full-motion-single-arm": {
    title: "Full Motion Single Arm TV Wall Mounts - Skill Tech",
    description: "Shop full motion single arm TV wall mounts from Skill Tech. Swivel, tilt and extend for clear viewing angles. Durable, strong and easy to install.",
    canonical: "https://skilltechonline.com/tv-wall-mount/full-motion-single-arm",
  },
  "tilt-wall-mounts": {
    title: "Adjustable Tilt TV Wall Mount Brackets - Skill Tech",
    description: "Explore adjustable tilt TV wall mount brackets from Skill Tech. Reduce glare, get the best viewing angle and enjoy a secure fit. Shop online today.",
    canonical: "https://skilltechonline.com/tv-wall-mount/tilt-wall-mounts",
  },
  "full-motion-double-arm-mounts": {
    title: "Full Motion Double Arm TV Mounts - Skill Tech Online",
    description: "Shop full motion double arm TV mounts from Skill Tech. Heavy-duty, flexible and smooth to adjust for larger screens. Easy to install and durable.",
    canonical: "https://skilltechonline.com/tv-wall-mount/full-motion-double-arm-mounts",
  },
  "full-motion-double-arm-mount": {
    title: "Full Motion Double Arm TV Mounts - Skill Tech Online",
    description: "Shop full motion double arm TV mounts from Skill Tech. Heavy-duty, flexible and smooth to adjust for larger screens. Easy to install and durable.",
    canonical: "https://skilltechonline.com/tv-wall-mount/full-motion-double-arm-mounts",
  },
  "articulating-monitor-arm": {
    title: "Articulating Monitor Arms UAE | Desk Mounts | Skill Tech",
    description: "Shop adjustable articulating monitor arms in UAE from Skill Tech. Ergonomic desk mounts with smooth swivel and tilt for home and office. Buy online.",
    canonical: "https://skilltechonline.com/desktop-mounts/articulating-monitor-arm",
  },
  "desktop-mount": {
    title: "Desktop Mounts UAE | Tabletop TV Stands | Skill Tech",
    description: "Buy desktop mounts in UAE with VESA support, swivel and height-adjustable designs for 23–75 inch TVs. Sturdy tabletop bases for home and office.",
    canonical: "https://skilltechonline.com/desktop-mounts/desktop-mount",
  },
  "ergonomic": {
    title: "Ergonomic Monitor Mounts for Desktop | SkillTech Online",
    description: "Explore SkillTech ergonomic desktop monitor mounts. Adjustable single to multi-arm setups that improve posture and comfort at work. Shop online today.",
    canonical: "https://skilltechonline.com/desktop-mounts/ergonomic",
  },
  "tv-ceiling-mount": {
    title: "TV Ceiling Mounts UAE | Heavy-Duty & Telescopic | Skill Tech",
    description: "Buy TV ceiling mounts in UAE with heavy-duty steel builds, adjustable height, tilt, swivel and cable management for home and commercial displays.",
    canonical: "https://skilltechonline.com/tv-ceiling-mounts/tv-ceiling-mount",
  },
  "motorized-tv-wall-mounts": {
    title: "Motorized TV Wall Mounts for Home | SkillTech Online",
    description: "Shop motorized TV wall mounts with remote control for smooth tilt, swivel and height adjustment from Skill Tech. Sturdy, sleek and easy to use today.",
    canonical: "https://skilltechonline.com/motorized-mounts/motorized-tv-wall-mounts",
  },
  "motorized-tv-cart-or-trolly": {
    title: "Motorized TV Carts & Electric Trolleys | Skill Tech",
    description: "Explore motorized TV carts with electric height adjustment, smooth mobility and durable construction for conference rooms and offices. Order online.",
    canonical: "https://skilltechonline.com/motorized-mounts/motorized-tv-cart-or-trolly",
  },

  // 15 requested subcategory SEO meta titles, descriptions & canonical tags
  "motorized-tv-lift": {
    title: "Motorized TV Lift UAE | Smart & Pop-Up Models | Skill Tech",
    description: "Buy motorized TV lifts in UAE with app control, pop-up or drop-down motion, 360° swivel and support for large TVs in concealed setups. Shop online.",
    canonical: "https://skilltechonline.com/motorized-mounts/motorized-tv-lift",
  },
  "motorized-tv-ceiling-mounts": {
    title: "Motorized TV Ceiling Mounts with Remote | SkillTech Online",
    description: "Shop motorized TV ceiling mounts from Skill Tech. Remote-controlled flip-down mounts that save space for homes, offices and showrooms. Buy online.",
    canonical: "https://skilltechonline.com/motorized-mounts/motorized-tv-ceiling-mounts",
  },
  "floor-stands": {
    title: "TV Floor Stands UAE | Modern Display Stands | Skill Tech",
    description: "Shop TV floor stands in UAE at Skill Tech. Modern, sturdy display stands for homes, offices, and commercial spaces. Fast delivery across the UAE.",
    canonical: "https://skilltechonline.com/floor-stands-cart/floor-stands",
  },
  "tv-cart-or-trolley": {
    title: "TV Carts & Trolleys UAE | Mobile Display Stands | Skill Tech",
    description: "Buy TV carts and trolleys in UAE with adjustable height, heavy-duty support, smooth mobility and cable management for offices and schools. Shop online.",
    canonical: "https://skilltechonline.com/floor-stands-cart/tv-cart-or-trolley",
  },
  "projector-ceiling-mounts": {
    title: "Projector Ceiling Mounts UAE | Heavy-Duty | Skill Tech",
    description: "Buy projector ceiling mounts in UAE with heavy-duty build, adjustable tilt, swivel and cable management for home and commercial AV setups. Buy online.",
    canonical: "https://skilltechonline.com/projector-mounts/projector-ceiling-mounts",
  },
  "projector-floor-stands": {
    title: "Projector Floor Stands UAE | Mobile Trolley | Skill Tech",
    description: "Buy projector floor stands in UAE with adjustable height, sturdy support, tilting platform and mobile casters for offices and classrooms. Buy online.",
    canonical: "https://skilltechonline.com/projector-mounts/projector-floor-stands",
  },
  "motorized-projector-screens": {
    title: "Motorized Projector Screens UAE | Electric | Skill Tech",
    description: "Buy motorized projector screens in UAE with remote control, matte white fabric and wide viewing angles for home and corporate AV setups. Shop online.",
    canonical: "https://skilltechonline.com/projector-screens/motorized-projector-screens",
  },
  "projector-screen": {
    title: "Projector Screens UAE | Motorized & Tripod | Skill Tech",
    description: "Buy projector screens in UAE, including motorized, manual and tripod options with matte white fabric and wide viewing angles. Order online today.",
    canonical: "https://skilltechonline.com/projector-screens/projector-screen",
  },
  "tripod-projector-screens": {
    title: "Tripod Projector Screens UAE | Portable 120in | Skill Tech",
    description: "Buy tripod projector screens in UAE with a 120-inch 4:3 display, matte white fabric, 160° viewing angle and stable portable stand for presentations.",
    canonical: "https://skilltechonline.com/projector-screens/tripod-projector-screens",
  },
  "laptop-stands": {
    title: "Laptop Stands UAE | Ergonomic & Adjustable | Skill Tech",
    description: "Buy laptop stands in UAE with adjustable height, foldable design, 360° rotation and aluminium build for ergonomic workspaces. Order online today.",
    canonical: "https://skilltechonline.com/laptop-tablet-stands/laptop-stands",
  },
  "tablet-floor-stands": {
    title: "Adjustable Tablet Floor Stands & Holders | SkillTech Online",
    description: "Shop adjustable tablet floor stands from Skill Tech. Sturdy, height-adjustable holders for iPad and tablets for office, retail and home. Buy online.",
    canonical: "https://skilltechonline.com/laptop-tablet-stands/tablet-floor-stands",
  },
  "tablet-wall-mounts": {
    title: "Tablet & iPad Stands UAE | Secure Mounts | Skill Tech",
    description: "Explore secure tablet and iPad stands in UAE, including desk, floor, wall and kiosk mounts with adjustable viewing for office and retail. Buy online.",
    canonical: "https://skilltechonline.com/laptop-tablet-stands/tablet-wall-mounts",
  },
  "pos-stands": {
    title: "POS Stands UAE | Adjustable Payment Mounts | Skill Tech",
    description: "Buy POS stands in UAE with swivel, tilt, rotation and cable management for secure credit card terminals, monitors and organized checkout counters.",
    canonical: "https://skilltechonline.com/pos-mounts/pos-stands",
  },
  "digital-signage-wall-mounts": {
    title: "Digital Signage Wall Mounts UAE | Video Wall | Skill Tech",
    description: "Buy digital signage wall mounts in UAE with pop-out and quick-release designs, VESA compatibility and fine adjustment for professional video walls.",
    canonical: "https://skilltechonline.com/video-wall-mounts/digital-signage-wall-mounts",
  },
  "video-wall-floor-stands": {
    title: "Video Wall Floor Stands for Displays | SkillTech Online",
    description: "Explore floor standing video wall mounts with durable build, multi-display support and professional AV mounting for commercial projects. Enquire now.",
    canonical: "https://skilltechonline.com/video-wall-mounts/video-wall-floor-stands",
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
        : customSeo?.canonical || `https://skilltechonline.com/${categorySlug}/${subcategorySlug}`;
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

  const customSeo = subcategorySeoData[subcategorySlug];

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
          : customSeo?.canonical || `https://skilltechonline.com/${categorySlug}/${subcategorySlug}`,
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
      : (armSlug ? `https://skilltechonline.com/${categorySlug}/${subcategorySlug}/${armSlug}` : customSeo?.canonical || `https://skilltechonline.com/${categorySlug}/${subcategorySlug}`);

  return (
    <>
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
          <Link href="/" aria-label="Skill Tech Home" style={{ color: "#3351a3", textDecoration: "none" }}>
            {t("Home")}
          </Link>
          <span>{locale === "ar" ? " < " : " > "}</span>
          <Link
            href={`/${categorySlug}`}
            aria-label={locale === "ar" && subCategory.category?.name_ar ? subCategory.category.name_ar : subCategory.category?.name || formatSlug(categorySlug)}
            className="breadcrumb-link"
          >
            {locale === "ar" && subCategory.category?.name_ar
              ? subCategory.category.name_ar
              : subCategory.category?.name || formatSlug(categorySlug)}
          </Link>
          <span>{locale === "ar" ? " < " : " > "}</span>
          {armSlug ? (
            <>
              <Link
                href={`/${categorySlug}/${subcategorySlug}`}
                aria-label={baseSubCategoryName}
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

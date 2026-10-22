import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";
import SubCategoryView, {
  generateSubCategoryMetadata,
} from "@/components/SubCategoryView";
import { ARM_SLUGS, ARM_ALIASES } from "@/lib/armConstants";

export const dynamic = "force-dynamic";

type Params = {
  categorySlug: string;
  subcategorySlug: string;
};

type SearchParams = {
  page?: string;
  arm?: string;
};

type Props = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { categorySlug, subcategorySlug } = await params;
  const { arm } = (await searchParams) || {};
  const canonicalArm = arm ? ARM_ALIASES[arm] || arm : undefined;

  return generateSubCategoryMetadata({
    categorySlug,
    subcategorySlug,
    armSlug: canonicalArm && ARM_SLUGS.includes(canonicalArm) ? canonicalArm : undefined,
  });
}

export default async function SubCategoryPage({ params, searchParams }: Props) {
  const { categorySlug, subcategorySlug } = await params;
  const { page, arm } = (await searchParams) || {};

  // If old ?arm= query param is accessed, 301/308 redirect to clean URL path
  if (arm) {
    const canonicalArm = ARM_ALIASES[arm] || arm;
    if (ARM_SLUGS.includes(canonicalArm)) {
      const headersList = await headers();
      const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
      const prefix = locale === "ar" ? "/ar" : "";
      const pageQuery = page && Number(page) > 1 ? `?page=${page}` : "";
      permanentRedirect(
        `${prefix}/${categorySlug}/${subcategorySlug}/${canonicalArm}${pageQuery}`
      );
    }
  }

  const currentPage = Number(page) || 1;

  return (
    <SubCategoryView
      categorySlug={categorySlug}
      subcategorySlug={subcategorySlug}
      currentPage={currentPage}
    />
  );
}

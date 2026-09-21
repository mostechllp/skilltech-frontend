import React from 'react';
import Link from "@/components/Link";
import { searchProducts, MEDIA_BASE_URL } from "@/lib/api";
import type { Metadata } from 'next';
import Pagination from "@/components/Pagination";
import Image from 'next/image';
import ProductCard from "@/components/ProductCard";
import { headers } from "next/headers";
import { translations } from "@/lib/translations";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
  const t = (key: string) => {
    const langDict = (translations[locale] as Record<string, string>) || {};
    return langDict[key] || key;
  };

  return {
    title: `${t("Search Results")} - Skill Tech`,
    description: t("Search results for products."),
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
  const t = (key: string) => {
    const langDict = (translations[locale] as Record<string, string>) || {};
    return langDict[key] || key;
  };

  const { q, page } = await searchParams;
  const query = q || '';
  const currentPage = Number(page) || 1;
  
  const productsData = query ? await searchProducts(query, currentPage) : { results: [], count: 0 };
  const products = productsData.results || []; // Handle both array (if no pagination) and object
  const count = productsData.count || 0;

  // Fallback for array response if API changes back or behaves unexpectedly
  const displayedProducts = Array.isArray(productsData) ? productsData : products;
  const displayedCount = Array.isArray(productsData) ? productsData.length : count;
  console.log(productsData,'------------------checkproducts')
  return (
    <>
      <div id="product-section" className="container product-section">

        <div className="d-flex justify-content-between align-items-center">
          <h3 className="section-title">
            {t("Found ")}{displayedCount}{t(" Products")} {query && <>{t("of search results for ")} "<strong>{query}</strong>"</>}
          </h3>
        </div>

        <div className="row g-4">
          {displayedProducts.map((product: any) => (
             <div key={product.id} className="col-lg-3 col-md-6">
                <ProductCard product={product} />
              </div>
          ))}
          
           {displayedProducts.length === 0 && (
                <div className="col-12 text-center">
                    <p>{t("No products found matching ")} "{query}".</p>
                    <Link href="/category" className="btn btn-primary">{t("Browse All Categories")}</Link>
                </div>
            )}

        </div>
        
        <Pagination count={displayedCount} />
      </div>
    </>
  );
}

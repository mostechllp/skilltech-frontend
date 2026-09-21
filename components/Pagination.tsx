"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Pagination({ count, pageSize = 32 }: { count: number, pageSize?: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(count / pageSize);
  const isFirstRun = useRef(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const section = document.getElementById('product-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination d-flex justify-content-center align-items-center mt-5 gap-2">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`btn btn-outline-secondary ${currentPage <= 1 ? 'disabled' : ''}`}
        aria-disabled={currentPage <= 1}
        style={{ pointerEvents: currentPage <= 1 ? 'none' : 'auto',fontSize:"14px" }}
        scroll={false}
      >
        <i className="fas fa-chevron-left"></i> {t("Prev")}
      </Link>

      <span className="mx-3 fw-bold" style={{fontSize:"14px"}} >
        {language === "ar"
          ? `الصفحة ${currentPage} من ${totalPages}`
          : `Page ${currentPage} of ${totalPages}`
        }
      </span>

      <Link
        href={createPageURL(currentPage + 1)}
        className={`btn btn-outline-secondary fs-7 ${currentPage >= totalPages ? 'disabled' : ''}`}
        aria-disabled={currentPage >= totalPages}
        style={{ pointerEvents: currentPage >= totalPages ? 'none' : 'auto',fontSize:"14px" }}
        scroll={false}
      >
        {t("Next")} <i className="fas fa-chevron-right"></i>
      </Link>
    </div>
  );
}

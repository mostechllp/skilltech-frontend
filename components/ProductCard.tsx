"use client";

import Link from "@/components/Link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProductCard({ product }: { product: any }) {
  const { t, language } = useLanguage();
  const isEconomic = product?.show_economic;

  const displayFeatures = product.card_features || [];
  
  return (
    <Link 
      href={`/${product.slug_path}`} 
      className="product-card" 
      style={{ textDecoration: 'none', color: 'inherit'}}
    >
      {isEconomic && (
        <div className="economicdiv">
          <Image
            src="/images/economic2.png"
            alt={t("Economic Series")}
            width={150}
            height={50}
          />
        </div>
      )}
      {product.main_image ? (
        <Image
          src={`${product.main_image}`}
          alt={product?.main_image_alt || product.name}
          width={300}
          height={300}
          sizes="(max-width: 575px) 50vw, (max-width: 991px) 33vw, 25vw"
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
        />
      ) : (
        <Image
          src="/images/default.png"
          alt={product?.main_image_alt || product.name}
          width={300}
          height={300}
          sizes="(max-width: 575px) 50vw, (max-width: 991px) 33vw, 25vw"
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
        />
      )}
      <div className="product-name">{product.name}</div>
      <small>
        {language === "ar"
          ? (product.title_ar || product.short_description_ar || product.title || product.short_description)
          : (product.title || product.short_description)}
      </small>

      {displayFeatures.length > 0 && (
        <div className="product-card-specs">
          {displayFeatures.map((item: any, index: number) => {
            const label = language === "ar" && item.feature?.title_ar 
              ? item.feature.title_ar 
              : (item.feature?.title || "");
              
            const isFullWidth = item.isFullWidth || (displayFeatures.length % 2 !== 0 && index === displayFeatures.length - 1);

            return (
              <div key={item.id || index} className={`spec-item ${isFullWidth ? 'spec-item-full' : ''}`}>
                <div className="spec-text">
                  <div className="spec-label">{t(label)}</div>
                  <div className="spec-value" dir="ltr">{item.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="product-link">
        <button className="product-btn">
          <span className="arrow-circle">
            <i className="fas fa-play"></i>
          </span>
          {t("View Details")}
        </button>
      </div>
    </Link>
  );
}

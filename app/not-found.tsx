"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "@/components/Link";
import { useLanguage } from "@/lib/LanguageContext";

export default function NotFound() {
  const router = useRouter();
  const { language } = useLanguage();
  const isAr = language === "ar";

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(isAr ? "/ar" : "/");
    }
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        background: "linear-gradient(180deg, #fafafa 0%, #f0f2f5 100%)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "40px 30px",
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "110px",
            fontWeight: "800",
            lineHeight: "1",
            color: "#f10182",
            marginBottom: "15px",
            letterSpacing: "-2px",
            userSelect: "none",
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: "26px",
            fontWeight: "700",
            color: "#1a1a1a",
            marginBottom: "28px",
          }}
        >
          {isAr ? "الصفحة غير موجودة" : "Page Not Found"}
        </h1>


        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <button
            type="button"
            onClick={handleBack}
            className="btn"
            style={{
              padding: "12px 26px",
              fontSize: "15px",
              fontWeight: "600",
              color: "#333333",
              backgroundColor: "#f1f3f5",
              border: "1px solid #dee2e6",
              borderRadius: "50px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#e9ecef";
              e.currentTarget.style.borderColor = "#ced4da";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f3f5";
              e.currentTarget.style.borderColor = "#dee2e6";
            }}
          >
            <i className={`fas fa-arrow-${isAr ? "right" : "left"}`}></i>
            <span>{isAr ? "رجوع للخلف" : "Go Back"}</span>
          </button>

          <Link
            href="/"
            className="btn"
            style={{
              padding: "12px 28px",
              fontSize: "15px",
              fontWeight: "600",
              color: "#ffffff",
              backgroundColor: "#f10182",
              border: "1px solid #f10182",
              borderRadius: "50px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 14px rgba(241, 1, 130, 0.35)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#d00070";
              e.currentTarget.style.borderColor = "#d00070";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(241, 1, 130, 0.45)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f10182";
              e.currentTarget.style.borderColor = "#f10182";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(241, 1, 130, 0.35)";
            }}
          >
            <i className="fas fa-home"></i>
            <span>{isAr ? "العودة إلى الصفحة الرئيسية" : "Return to Homepage"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "@/components/Link";
import { useLanguage } from "@/lib/LanguageContext";

interface ThankYouContentProps {
  title?: string;
  message?: string;
  subMessage?: string;
  referenceNumber?: string;
}

const ThankYouContent: React.FC<ThankYouContentProps> = ({ 
  title, 
  message,
  subMessage,
  referenceNumber
}) => {
  const { t } = useLanguage();
  const [ref, setRef] = useState<string | undefined>(referenceNumber);

  useEffect(() => {
    if (!referenceNumber) {
      const storedRef = sessionStorage.getItem("thank_you_ref");
      if (storedRef) {
        setRef(storedRef);
      }
    } else {
      setRef(referenceNumber);
    }
  }, [referenceNumber]);

  const displayTitle = title ? t(title) : t("Thank You!");
  const displayMessage = message ? t(message) : t("Your submission has been received.");
  const displaySubMessage = subMessage ? t(subMessage) : t("We will get back to you shortly.");

  return (
    <div className="container" style={{ padding: "100px 0", textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ marginBottom: "30px" }}>
        <div style={{ 
          width: "80px", 
          height: "80px", 
          background: "#f10182", 
          borderRadius: "50%", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          margin: "0 auto"
        }}>
          <i className="fa fa-check" style={{ fontSize: "40px", color: "#fff" }}></i>
        </div>
      </div>
      
      <h1 style={{ color: "#3351a3", fontWeight: "700", fontSize: "36px", marginBottom: "20px" }}>{displayTitle}</h1>
      <p style={{ color: "#555", fontSize: "18px", marginBottom: "10px", maxWidth: "600px" }}>{displayMessage}</p>
      
      {ref && (
        <div style={{
          background: "#f8f9fc",
          border: "1px dashed #3351a3",
          borderRadius: "8px",
          padding: "12px 24px",
          marginBottom: "20px",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <span style={{ color: "#555", fontWeight: "500", fontSize: "16px" }}>{t("Reference Number")}:</span>
          <strong style={{ color: "#3351a3", fontSize: "18px", letterSpacing: "0.5px" }}>{ref}</strong>
        </div>
      )}

      <p style={{ color: "#777", fontSize: "16px", marginBottom: "40px" }}>{displaySubMessage}</p>
      
      <Link 
        href="/" 
        className="booknow-btn" 
        style={{ textDecoration: "none" }}
        onClick={() => sessionStorage.removeItem("thank_you_ref")}
      >
        <span className="arrow-circlebk">
          <i className="fa fa-home"></i>
        </span>
        {t("Back to Home")}
      </Link>
    </div>
  );
};

export default ThankYouContent;

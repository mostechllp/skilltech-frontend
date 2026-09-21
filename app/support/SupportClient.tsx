"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { API_BASE_URL, fetchCatalogues, fetchCertificates } from "@/lib/api";
import { useLanguage } from "@/lib/LanguageContext";

interface SupportItem {
  id: number;
  title: string;
  title_ar?: string;
  thumbnail: string;
  file: string;
}

export default function SupportClient() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("catalogue");
  const [catalogues, setCatalogues] = useState<SupportItem[]>([]);
  const [certificates, setCertificates] = useState<SupportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [catalogueData, certificateData] = await Promise.all([
          fetchCatalogues(),
          fetchCertificates(),
        ]);
        setCatalogues(catalogueData);
        setCertificates(certificateData);
      } catch (error) {
        console.error("Failed to fetch support data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleItemClick = (fileUrl: string) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };
  const CatalogueDownload = async (catalogueId: number) => {
    const url = `${API_BASE_URL}/catalogue/${catalogueId}/download-thumbnail/`;
    window.open(url, "_blank");
  };

  return (
    <>
      <section className="tabs-section ">
        <div className="container">
          {/* Tabs */}
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === "catalogue" ? "active" : ""}`}
              onClick={() => setActiveTab("catalogue")}
            >
              {t("Catalogue")}
            </button>
            <button
              className={`tab-btn ${
                activeTab === "certificate" ? "active" : ""
              }`}
              onClick={() => setActiveTab("certificate")}
            >
              {t("Certificate")}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-5">{t("Loading...")}</div>
          ) : (
            <>
              {/* Catalogue Tab Content */}
              <div
                className={`tab-content mt-0 ${
                  activeTab === "catalogue" ? "active" : ""
                }`}
                id="catalogue"
              >
                <div className="row">
                  {catalogues.length > 0 ? (
                    catalogues.map((item) => {
                      const itemTitle = language === "ar" && item.title_ar ? item.title_ar : item.title;
                      return (
                        <div className="col-md-3 col-sm-4 col-6 mb-4" key={item.id}>
                          <div
                            className="tab-card cursor-pointer"
                            style={{ cursor: "pointer" }}
                          >
                            <Image
                              src={item.thumbnail}
                              alt={itemTitle}
                              width={400}
                              height={500}
                              sizes="(max-width: 575px) 50vw, (max-width: 768px) 33vw, 25vw"
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "auto",
                              }}
                            />
                            <h4>{itemTitle}</h4>
                          <div
                            className="explore-btn"
                            onClick={async (e) => {
                              CatalogueDownload(item.id);
                            }}
                            style={{ textDecoration: "none" }}
                          >
                            <span className="arrow-circle">
                              <i className="fas fa-play"></i>
                            </span>
                            {t("Download")}
                          </div>
                        </div>
                      </div>
                    );
                  })
                  ) : (
                    <div className="col-12 text-center">
                      {t("No catalogues available.")}
                    </div>
                  )}
                </div>
              </div>

              {/* Certificate Tab Content */}
              <div
                className={`tab-content ${
                  activeTab === "certificate" ? "active" : ""
                }`}
                id="certificate"
              >
                <div className="row">
                  {certificates.length > 0 ? (
                    certificates.map((item) => {
                      const itemTitle = language === "ar" && item.title_ar ? item.title_ar : item.title;
                      return (
                        <div className="col-md-3 col-sm-6 col-6 mb-4" key={item.id}>
                          <div
                            className="tab-card"
                            style={{ cursor:"default" }}
                          >
                            <Image
                              src={item.thumbnail}
                              alt={itemTitle}
                              width={400}
                              height={500}
                              sizes="(max-width: 575px) 50vw, (max-width: 768px) 33vw, 25vw"
                              draggable={false}
                              onContextMenu={(e) => e.preventDefault()}
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "auto",
                                filter: "blur(1px)",
                                pointerEvents: "none",
                                userSelect: "none",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-12 text-center">
                      {t("No certificates available.")}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { MEDIA_BASE_URL } from "@/lib/api";
import "./NewsMediaClient.css";
import { useLanguage } from "@/lib/LanguageContext";

interface NewsItem {
  id: number;
  title: string;
  title_ar?: string;
  slug: string;
  cover_image: string;
  content: string;
  content_ar?: string;
  category?: { name: string } | string;
  published_at: string;
  video_url?: string;
}

interface NewsMediaClientProps {
  newsItems: NewsItem[];
  totalCount: number;
}

export default function NewsMediaClient({ newsItems, totalCount }: NewsMediaClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { language, t } = useLanguage();

  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const [playingId, setPlayingId] = useState<number | null>(null);

  const getImageUrl = useCallback((imagePath: string | null) => {
    if (!imagePath) return "/images/default.png";
    if (imagePath.startsWith("http")) return imagePath;
    const baseUrl = MEDIA_BASE_URL.endsWith("/") ? MEDIA_BASE_URL : `${MEDIA_BASE_URL}/`;
    if (imagePath.startsWith("/media/")) return `${baseUrl}${imagePath.substring(1)}`;
    return `${baseUrl}media/${imagePath}`;
  }, []);

  const getCategoryName = useCallback((cat: any) => {
    if (!cat) return t("News");
    if (typeof cat === "string") return cat === "News" ? t("News") : cat;
    return cat.name === "News" ? t("News") : (cat.name || t("News"));
  }, [t]);

  const getEmbedUrl = useCallback((videoUrl?: string) => {
    if (!videoUrl) return "";
    try {
      let videoId = "";
      if (videoUrl.includes("youtube.com/watch")) {
        videoId = new URL(videoUrl).searchParams.get("v") || "";
      } else if (videoUrl.includes("youtu.be/")) {
        videoId = videoUrl.split("youtu.be/")[1]?.split("?")[0];
      } else if (videoUrl.includes("youtube.com/embed/")) {
        videoId = videoUrl.split("youtube.com/embed/")[1]?.split("?")[0];
      } else if (videoUrl.includes("youtube.com/shorts/")) {
        videoId = videoUrl.split("youtube.com/shorts/")[1]?.split("?")[0];
      }
      return videoId
        ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
        : videoUrl;
    } catch {
      return videoUrl;
    }
  }, []);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setPlayingId(null);
  };

  if (newsItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3 className="section-title">{t("No news updates found.")}</h3>
      </div>
    );
  }

  return (
    <div className="news-media-page">
      <div className="container">

        {/* Section Header */}
        <div className="section-header">
          <div className="left">
            <button className="explore-btn-nocursor">
              <span className="arrow-circle">
                <i className="fas fa-play"></i>
              </span>
              {t("News & Media")}
            </button>
            <h2 className="section-title">{t("Latest Updates")}</h2>
          </div>
        </div>

        {/* News Items */}
        <div className="news-list">
          {newsItems.map((news, index) => {
            const isPlaying = playingId === news.id;
            const embedUrl = getEmbedUrl(news.video_url);

            return (
              <article key={news.id} className="news-row">

                {/* Left: Text */}
                <div className="news-row-text">
                  <div className="news-row-meta">
                    <span className="news-row-category">
                      {getCategoryName(news.category)}
                    </span>
                    <span className="news-row-dot"></span>
                    <span className="news-row-date">
                      {new Date(news.published_at).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h2 className="news-row-title">{language === "ar" && news.title_ar ? news.title_ar : news.title}</h2>

                  <div
                    className="news-content-body"
                    dangerouslySetInnerHTML={{ __html: language === "ar" && news.content_ar ? news.content_ar : news.content }}
                  />
                </div>

                {/* Right: Media */}
                <div className="news-row-media">
                  {isPlaying && news.video_url ? (
                    <iframe
                      src={embedUrl}
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={language === "ar" && news.title_ar ? news.title_ar : news.title}
                    />
                  ) : (
                    <>
                      <Image
                        src={getImageUrl(news.cover_image)}
                        alt={language === "ar" && news.title_ar ? news.title_ar : news.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        style={{ objectFit: "cover" }}
                        priority={index === 0}
                      />
                      {news.video_url && (
                        <button
                          className="play-btn-overlay"
                          onClick={() => setPlayingId(news.id)}
                          aria-label="Play video"
                        >
                          <div className="play-btn-pulse">
                            <i className="fa fa-play"></i>
                          </div>
                        </button>
                      )}
                    </>
                  )}
                </div>

              </article>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="news-pagination">
            <button
              className="pagination-btn"
              aria-label="Previous Page"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <i className="fa fa-chevron-left"></i>
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`pagination-page-btn${currentPage === i + 1 ? " active" : ""}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="pagination-btn"
              aria-label="Next Page"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <i className="fa fa-chevron-right"></i>
            </button>
          </nav>
        )}

      </div>
    </div>
  );
}
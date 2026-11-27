"use client";
import React from "react";
import Image from "next/image";
import Link from "@/components/Link";
import { useLanguage } from "@/lib/LanguageContext";

interface BlogClientProps {
    posts: any[];
    banner: any;
}

export default function BlogClient({ posts, banner }: BlogClientProps) {
  const { language, t } = useLanguage();

  return (
    <>
      <section className="blog-section">
        <div className="container">
          <div className="section-header mb-4">
            <div className="left">
              <button className="explore-btn-nocursor">
                <span className="arrow-circle">
                  <i className="fas fa-play"></i>
                </span>
                {t("Blogs")}
              </button>
              <h1 className="section-title">{t("Blogs")}</h1>
            </div>
          </div>
          <div className="row g-4">
             {posts.map((post) => {
                const title =
                  language === "ar" && post.title_ar
                    ? post.title_ar
                    : language === "hi" && post.title_hi
                    ? post.title_hi
                    : language === "es" && post.title_es
                    ? post.title_es
                    : language === "pt" && post.title_pt
                    ? post.title_pt
                    : language === "fr" && (post as any).title_fr
                    ? (post as any).title_fr
                    : language === "ru" && (post as any).title_ru
                    ? (post as any).title_ru
                    : (language === "hi" || language === "es" || language === "pt" || language === "fr" || language === "ru")
                    ? t(post.title)
                    : post.title;
                const shortDesc =
                  language === "ar" && post.short_description_ar
                    ? post.short_description_ar
                    : language === "hi" && post.short_description_hi
                    ? post.short_description_hi
                    : language === "es" && post.short_description_es
                    ? post.short_description_es
                    : language === "pt" && post.short_description_pt
                    ? post.short_description_pt
                    : language === "fr" && (post as any).short_description_fr
                    ? (post as any).short_description_fr
                    : language === "ru" && (post as any).short_description_ru
                    ? (post as any).short_description_ru
                    : (language === "hi" || language === "es" || language === "pt" || language === "fr" || language === "ru")
                    ? t(post.short_description)
                    : post.short_description;
                const image = language === "ar" && post.image_ar ? post.image_ar : post.image;

                return (
                  <div key={post.id} className="col-md-6 col-lg-4">
                      <Link
                        href={`/blog/${post.slug}`}
                        aria-label={title}
                        className="blog-card"
                        style={{textDecoration:"none"}}
                      >
                           <div className="blog-img">
                              {image ? (
                                  <Image src={image} alt={title} width={400} height={250} style={{ objectFit: "cover" }} />
                              ) : (
                                  <Image src="/images/pd1.jpg" alt="Blog Post Placeholder" width={400} height={250} style={{ objectFit: "cover" }} />
                              )}
                           </div>
                           <div className="blog-content">
                                <h3 className="blog-title">{title}</h3>
                                <p className="blog-text" title={shortDesc}>{shortDesc}</p>
                                <button className="read-more-btn mt-auto mb-0">
                                   <span className="white-circle"><i className="fas fa-play"></i></span>
                                   {t("Read More")}
                                </button>
                           </div>
                      </Link>
                  </div>
                );
             })}
             {posts.length === 0 && (
                 <p>{t("No blog posts found.")}</p>
             )}
          </div>
        </div>
      </section>

    </>
  );
}

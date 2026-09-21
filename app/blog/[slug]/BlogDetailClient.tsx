"use client";
import React from "react";
import Image from "next/image";
import Link from "@/components/Link";
import { useLanguage } from "@/lib/LanguageContext";

export default function BlogDetailClient({ post, recentPosts }: { post: any, recentPosts: any[] }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const { language, t } = useLanguage();

  const postTitle = language === "ar" && post.title_ar ? post.title_ar : post.title;
  const postAuthor = language === "ar" && post.author_ar ? post.author_ar : post.author;
  const postContent = language === "ar" && post.content_ar ? post.content_ar : post.content;
  const postImage = language === "ar" && post.image_ar ? post.image_ar : post.image;

  return (
    <>
      <div className="blog-detail-wrapper">
        <div className="container">
            <div className="row g-5">
                {/* LEFT CONTENT */}
                <div className="col-lg-8">
                    <div className="blog-detail-card">
                        <div className="detail-img blog-detail-img">
                            {postImage && (
                                <Image src={postImage} alt={postTitle} width={800} height={400} priority sizes="(max-width: 991px) 100vw, 800px" style={{ width: "100%", height: "auto", objectFit: "cover" }} />
                            ) }
                        </div>
                        
                        <div className="meta mb-3 text-muted small">
                            <span className="me-3">
                              <i className="fa fa-calendar-alt me-2 text-pink"></i>
                              {new Date(post.created_at).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span><i className="fa fa-user me-2 text-pink"  ></i>{postAuthor}</span>
                        </div>

                        <h1 className="blog-detail-title">{postTitle}</h1>

                        <div className="content blog-detail-content">
                            {postContent}
                        </div>

                        {/* TAGS */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="tags mb-4">
                                <strong className="me-2 text-blue">{t("Tags:")}</strong>
                                {post.tags.map((tag: string, i: number) => (
                                    <span key={i} className="badge bg-light text-dark me-2 border">{tag}</span>
                                ))}
                            </div>
                        )}

                        {/* SHARE */}
                        <div className="share-box d-flex align-items-center gap-3 py-3 border-top border-bottom">
                            <strong className="text-blue">{t("Share:")}</strong>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" className="social-btn facebook"><i className="fab fa-facebook-f"></i></a>
                            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${postTitle}`} target="_blank" className="social-btn twitter"><i className="fab fa-x-twitter"></i></a>
                            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`} target="_blank" className="social-btn linkedin"><i className="fab fa-linkedin-in"></i></a>
                            <a href={`https://wa.me/?text=${postTitle} ${shareUrl}`} target="_blank" className="social-btn whatsapp"><i className="fab fa-whatsapp"></i></a>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="col-lg-4">
                    <div className="sidebar blog-sidebar">
                        <h4 className="mb-4 text-blue fw-bold">{t("Recent Posts")}</h4>
                        <div className="recent-posts">
                            {recentPosts.map((recent) => {
                                const recentTitle = language === "ar" && recent.title_ar ? recent.title_ar : recent.title;
                                const recentImage = language === "ar" && recent.image_ar ? recent.image_ar : recent.image;

                                return (
                                    <Link href={`/blog/${recent.slug}`} key={recent.id} className="recent-post-item d-flex gap-3 mb-3 text-decoration-none">
                                        <div className="thumb recent-post-thumb">
                                            {recentImage &&(
                                                <Image src={recentImage} alt={recentTitle} width={80} height={80} />
                                            )}
                                        </div>
                                        <div className="info">
                                            <h6 className="recent-post-title">{recentTitle}</h6>
                                            <small className="text-muted recent-post-date">
                                              {new Date(recent.created_at).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                              })}
                                            </small>
                                        </div>
                                    </Link>
                                );
                            })}
                            {recentPosts.length === 0 && <p>{t("No recent posts.")}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface ReviewItem {
  id: number;
  name: string;
  badge: string;
  isLocalGuide?: boolean;
  date?: string;
  rating: number;
  text: string;
  initial: string;
  avatarColor: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 1,
    name: "Kelly Harrison",
    badge: "Local Guide · 15 reviews · 11 photos",
    isLocalGuide: true,
    rating: 5,
    text: "Fraz & Ashraf called in the day to inform me of the installation time. They then called nearer to the time to confirm that I was home and arrived on time. They were polite, friendly & very efficient. They were able to guide me on the best positioning of the TV & installed it within 20 minutes. They were very neat & tidied up afterwards taking away all of the rubbish. I would highly recommend them.",
    initial: "K",
    avatarColor: "#0288D1",
  },
  {
    id: 2,
    name: "Monica Mukherjee",
    badge: "8 reviews · 3 photos",
    isLocalGuide: false,
    rating: 5,
    text: "Wajid had installed the device very fast and did not make a mess at all. He was with Zeeshan his colleague and they were polite and finished all the work properly and very efficient! Good job!!",
    initial: "M",
    avatarColor: "#7B1FA2",
  },
  {
    id: 3,
    name: "Issa Makhamreh",
    badge: "Local Guide · 16 reviews · 12 photos",
    isLocalGuide: true,
    rating: 5,
    text: "The team who installed my screen today were very professional and polite. 5 stars all around! Thank you Gulab and Suhail for your support!",
    initial: "I",
    avatarColor: "#E65100",
  },
  {
    id: 4,
    name: "Futurecom Electronics",
    badge: "5 reviews · 3 photos",
    isLocalGuide: false,
    rating: 5,
    text: "Very satisfied with the TV setup. The installation was clean, precise, and completed on time. Friendly, knowledgeable, and paid attention to every detail. Highly recommend their service. Thanks to Said and Faraz...",
    initial: "F",
    avatarColor: "#2E7D32",
  },
];

export default function CustomerReviews({ reviewsUrl = "https://www.google.com/search?q=Skill+Mount+Electronics+Trading+LLC+Reviews" }: { reviewsUrl?: string }) {
  const { t } = useLanguage();

  return (
    <section className="customer-reviews-section" style={{ padding: "70px 0", background: "#f8fafc" }}>
      <div className="container">
        
        {/* HEADER AREA */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 40px auto" }}>
          <button className="explore-btn-nocursor" style={{ margin: "0 auto 15px auto" }}>
            <span className="arrow-circle">
              <i className="fas fa-play"></i>
            </span>{" "}
            {t("Customer Reviews")}
          </button>
          
          <h2 className="section-title" style={{ fontSize: "32px", fontWeight: "700", color: "#062e5c", marginBottom: "12px" }}>
            {t("What Our Customers Say")}
          </h2>

          <p style={{ color: "#64748b", fontSize: "16px", marginBottom: "25px" }}>
            {t("Real feedback from our satisfied clients across the UAE.")}
          </p>

          {/* OVERALL GOOGLE RATING SUMMARY BADGE */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
              padding: "12px 24px",
              background: "#ffffff",
              borderRadius: "50px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              border: "1px solid #e2e8f0",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span style={{ fontWeight: "700", fontSize: "20px", color: "#1e293b" }}>4.9</span>
            </div>

            <div style={{ display: "flex", gap: "3px", color: "#FBBC04", fontSize: "16px" }}>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>

            <span style={{ color: "#64748b", fontSize: "14px", fontWeight: "500" }}>
              {t("1,383+ Google Reviews")}
            </span>
          </div>
        </div>

        {/* REVIEWS GRID (2x2 on desktop, 1-col on mobile) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "45px",
          }}
        >
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                padding: "26px",
                border: "1px solid #e9ecef",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div>
                {/* Reviewer Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: review.avatarColor,
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        fontWeight: "700",
                        flexShrink: 0,
                      }}
                    >
                      {review.initial}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: "#0f172a" }}>
                        {review.name}
                      </h4>
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                        {review.badge}
                      </span>
                    </div>
                  </div>

                  {/* Google G Icon in Card */}
                  <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>

                {/* Stars and Date */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <div style={{ display: "flex", gap: "2px", color: "#FBBC04", fontSize: "14px" }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  {review.date && (
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>{review.date}</span>
                  )}
                </div>

                {/* Review Text */}
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.65",
                    color: "#334155",
                    margin: 0,
                  }}
                >
                  "{review.text}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA BUTTON: VIEW ALL REVIEWS ON GOOGLE */}
        <div style={{ textAlign: "center" }}>
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="read-more-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 28px",
              background: "#062e5c",
              color: "#ffffff",
              borderRadius: "30px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "15px",
              boxShadow: "0 4px 14px rgba(6,46,92,0.25)",
              transition: "all 0.3s ease",
            }}
          >
            <span
              style={{
                background: "#ffffff",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#062e5c",
                fontSize: "11px",
              }}
            >
              <i className="fas fa-external-link-alt"></i>
            </span>
            {t("View All Reviews on Google")}
          </a>
        </div>

      </div>
    </section>
  );
}


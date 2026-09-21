"use client";
import React from 'react';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

import { useLanguage } from "@/lib/LanguageContext";

export default function ClientsSection({ clients }: { clients: any[] }) {
  const { language, t } = useLanguage();
  if (!clients || clients.length === 0) return null;

  // Duplicate clients to ensure smooth loop if there are few items
  // We want enough items to cover slidesPerView * 2 or more for smooth infinite scroll
  const displayClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="partners-section">
      <div className="container text-center">
        <button className="explore-btn-nocursor">
          <span className="arrow-circle"><i className="fas fa-play"></i></span>
          {t("Those Who Trust Our Expertise")}
        </button>

        <h2 className="section-title">{t("Our Partners & Collaborators")}</h2>

        <div className="fading-line top mb-5"></div>
        
        <div className="partners-slider">
          <Swiper
            key={language}
            dir={language === "ar" ? "rtl" : "ltr"}
            modules={[Autoplay]}
            spaceBetween={5}
            slidesPerView={3}
            loop={true}
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
            className="clients-swiper"
          >
            {displayClients.map((client, index) => (
              <SwiperSlide key={`${client.id}-${index}`} className="d-flex justify-content-center align-items-center">
                <div className="partner-logo">
                  {client.image ? (
                    <Image 
                      src={`${client.image}`} 
                      alt={client.name} 
                      width={120} 
                      height={60} 
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <Image 
                      src="/images/clients/1.png" 
                      alt={client.name} 
                      width={120} 
                      height={60} 
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="fading-line bottom mt-5"></div>
      </div>
    </section>
  );
}
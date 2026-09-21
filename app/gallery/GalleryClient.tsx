"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "@/components/Link";
import { fetchGallery, fetchCategories, fetchPageBanner } from "@/lib/api";
import { useLanguage } from "@/lib/LanguageContext";

export default function GalleryClient() {
  const { t, language } = useLanguage();
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("");
  const [banner, setBanner] = useState<any>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [galleryData, categoriesData, bannerData] = await Promise.all([
          fetchGallery(),
          fetchCategories(),
          fetchPageBanner('gallery')
        ]);

        const validCategories = categoriesData.filter((cat: any) => 
            galleryData.some((img: any) => img.category_slug === cat.slug)
        );

        setGalleryImages(galleryData);
        setCategories(validCategories);
        setBanner(bannerData);
        
        if (validCategories.length > 0) {
            setActiveTab(validCategories[0].slug);
        }
      } catch (error) {
        console.error("Failed to load gallery data", error);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    // jQuery / Owl Carousel Logic
    let attempts = 0;
    const maxAttempts = 50;

    const initOwl = () => {
      attempts++;
      if (
        typeof window !== "undefined" &&
        window.$ &&
        window.$.fn &&
        window.$.fn.owlCarousel
      ) {
        const $ = window.$;

        // Category Slider
        var owl = $(".category-slider");
        if (owl.length) {
          if (owl.hasClass('owl-loaded')) {
            owl.trigger('destroy.owl.carousel');
            owl.removeClass('owl-loaded');
            owl.find('.owl-stage-outer').children().unwrap();
          }
          owl.owlCarousel({
            rtl: language === "ar",
            loop: categories.length > 5,
            margin: 8,
            stagePadding: 0,
            items: 6,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
            nav: false,
            dots: false,
            smartSpeed: 800,
            responsive: {
              0: { items: 3 },
              460: { items: 3 },
              576: { items: 3 },
              656: { items: 3.5 },
              768: { items: 5 },
              992: { items: 6 },
              1200: { items: 8 },
            },
          });

          $(".right-arrow").off("click").click(function () {
            owl.trigger("next.owl.carousel");
          });

          $(".left-arrow").off("click").click(function () {
            owl.trigger("prev.owl.carousel");
          });
        }
      } else if (attempts < maxAttempts) {
        setTimeout(initOwl, 100);
      }
    };

    if (categories.length > 0) {
        initOwl();
    }
  }, [categories, language]);

  const filteredImages =
    activeTab === ""
      ? []
      : galleryImages.filter((img) => img.category_slug === activeTab);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  }, []);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => 
        prev === null ? null : (prev + 1) % filteredImages.length
      );
    }
  }, [selectedImageIndex, filteredImages.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => 
        prev === null ? null : (prev - 1 + filteredImages.length) % filteredImages.length
      );
    }
  }, [selectedImageIndex, filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, closeLightbox, handleNext, handlePrev]);

  return (
    <>
      {/* Page Header */}
      {/* <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h4>{banner?.subtitle}</h4>
            <h1>{banner?.title }</h1>
            <p>{banner?.description }</p>
            <Link href={banner?.button_link || "/"} style={{ textDecoration: 'none' }}>
                <button className="explore-btn-nocursor"><span className="arrow-circle"><i className="fas fa-play"></i></span>
                {banner?.button_text }
                </button>
            </Link>
          </div>
          <div className="vector-image">
            {banner?.image&&
            <img src={banner?.image } alt="Gallery Banner" />
            }
          </div>
        </div>
      </section> */}

      <section className="categories">
        <div className="container">
            <div className="section-header">
                <div className="left">
                    <button className="explore-btn-nocursor">
                        <span className="arrow-circle"><i className="fas fa-play"></i></span>
                        {t("Gallery")}
                    </button>
                    <h2 className="section-title">{t("Browse by Category")}</h2>
                </div>
                <div className="right">
                    <button className="arrow left-arrow"><i className="fa fa-arrow-left"></i></button>
                    <button className="arrow right-arrow"><i className="fa fa-arrow-right"></i></button>
                </div>
            </div>

            {/* CATEGORY TABS - Matches Homepage Slider */}
            <div className="owl-carousel owl-theme category-slider">
                {categories.map((cat) => (
                    <div 
                        key={cat.id}
                        className={`item ${activeTab === cat.slug ? 'active' : ''}`}
                        onClick={() => setActiveTab(cat.slug)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="category-img-wrapper" style={{ position: "relative" }}>
                             <Image 
                                 src={`${cat.image??"/images/default.png"}`}  
                                 alt={language === "ar" && cat.name_ar ? cat.name_ar : cat.name} 
                                 fill
                                 sizes="(max-width: 768px) 50vw, 140px"
                                 style={{ objectFit: "cover" }}
                             />
                        </div>
                        <p>{language === "ar" && cat.name_ar ? cat.name_ar : cat.name}</p>
                    </div>
                ))}
            </div>

            {/* GALLERY GRID */}
            <div className="gallery-wrapper">
                <div className="gallery-panel active">
                    {filteredImages.map((img, index) => {
                        const imgTitle = language === "ar" && img.title_ar ? img.title_ar : img.title;
                        return (
                            <div key={img.id} className="img-box" onClick={() => openLightbox(index)}>
                                 <Image
                                     src={img.image}
                                     alt={imgTitle || "Gallery Image"}
                                     width={400}
                                     height={300}
                                     sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 33vw"
                                     style={{ objectFit: "cover", width: "100%", height: "auto" }}
                                 />
                            </div>
                        );
                    })}
                </div>
                {filteredImages.length === 0 && (
                    <div className="text-center py-5">
                        <p>{t("No images found in this category.")}</p>
                    </div>
                )}
            </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && filteredImages[selectedImageIndex] && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeLightbox}>&times;</button>
            
            <button className="nav-btn prev-btn" onClick={handlePrev}>
                <i className="fa fa-arrow-left"></i>
            </button>
            
            <div className="lightbox-image-container">
              <Image
                src={filteredImages[selectedImageIndex].image}
                alt={(language === "ar" && filteredImages[selectedImageIndex].title_ar ? filteredImages[selectedImageIndex].title_ar : filteredImages[selectedImageIndex].title) || "Gallery Image"}
                width={1200}
                height={800}
                quality={100}
                priority
              />
              <p className="lightbox-caption">
                {language === "ar" && filteredImages[selectedImageIndex].title_ar ? filteredImages[selectedImageIndex].title_ar : filteredImages[selectedImageIndex].title}
              </p>
            </div>
            
            <button className="nav-btn next-btn" onClick={handleNext}>
                <i className="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

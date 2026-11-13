"use client";
import { useEffect, useState, Fragment, useRef } from "react";
import Link from "@/components/Link";
import Image from "next/image";
import ClientsSection from "@/components/ClientsSection";
import ProductCard from "@/components/ProductCard";
import StatsSection from "@/components/StatsSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { fetchProducts } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

export default function HomeClient({
  categories,
  exploreCategories,
  banners,
  offers,
  // products,
  clients,
  projects,
  mediaBaseUrl,
}: {
  categories: any;
  exploreCategories: any;
  banners: any;
  offers: any;
  // products: any;
  clients: any;
  projects: any;
  mediaBaseUrl: string;
}) {
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    exploreCategories && exploreCategories.length > 0
      ? exploreCategories[0].slug
      : null,
  );
  const [nudgeSlider, setNudgeSlider] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 778);
  };

  handleResize(); // initial check
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

  useEffect(() => {
    if (swiperInstance && swiperInstance.navigation) {
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [filterProducts, loading, swiperInstance]);

  useEffect(() => {
    // Trigger nudge animation after a small delay
    const timer = setTimeout(() => setNudgeSlider(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Skip initial fetch since filterProducts is initialized with 'products' (all)
    // and selectedCategory is null.
    // We only want to fetch when selectedCategory actually changes from its initial state
    // OR we can just let it fetch to be safe and consistent.
    const Productsfetch = async () => {
      setLoading(true);
      try {
        const products2 = await fetchProducts(
          true,
          1,
          selectedCategory || undefined,
        );
        setFilterProducts(products2);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      } finally {
        setLoading(false);
      }
    };

    Productsfetch();
  }, [selectedCategory]);

  const displayedCategories = showAllCategories
    ? exploreCategories
    : exploreCategories?.slice(0, 7) || [];
  const hasMoreCategories = (exploreCategories?.length || 0) > 7;

  const getCategoryTitle = (cat: any) => {
    if (!cat) return "";
    if (language === "ar") return cat.name_ar || t(cat.name?.trim() || "");
    if (language === "hi") {
      const trans = t(cat.name?.trim() || "");
      if (trans && trans !== cat.name?.trim()) return trans;
      if (cat.name_hi && cat.name_hi !== cat.name) return cat.name_hi;
      return trans || cat.name_hi || cat.name;
    }
    if (language === "es") {
      const trans = t(cat.name?.trim() || "");
      if (trans && trans !== cat.name?.trim()) return trans;
      if (cat.name_es && cat.name_es !== cat.name) return cat.name_es;
      return trans || cat.name_es || cat.name;
    }
    if (language === "pt") {
      const trans = t(cat.name?.trim() || "");
      if (trans && trans !== cat.name?.trim()) return trans;
      if (cat.name_pt && cat.name_pt !== cat.name) return cat.name_pt;
      return trans || cat.name_pt || cat.name;
    }
    if (language === "fr") {
      const trans = t(cat.name?.trim() || "");
      if (trans && trans !== cat.name?.trim()) return trans;
      if (cat.name_fr && cat.name_fr !== cat.name) return cat.name_fr;
      return trans || cat.name_fr || cat.name;
    }
    if (language === "ru") {
      const trans = t(cat.name?.trim() || "");
      if (trans && trans !== cat.name?.trim()) return trans;
      if (cat.name_ru && cat.name_ru !== cat.name) return cat.name_ru;
      return trans || cat.name_ru || cat.name;
    }
    return cat.name;
  };

  const getOfferTitle = (item: any) => {
    if (!item) return "";
    if (language === "ar") return item.title_ar || t(item.title);
    if (language === "hi") {
      if (item.title_hi && item.title_hi !== item.title) return item.title_hi;
      const trans = t(item.title?.trim() || "");
      if (trans && trans !== item.title?.trim()) return trans;
      return item.title_hi || trans || item.title;
    }
    if (language === "es") {
      if (item.title_es && item.title_es !== item.title) return item.title_es;
      const trans = t(item.title?.trim() || "");
      if (trans && trans !== item.title?.trim()) return trans;
      return item.title_es || trans || item.title;
    }
    if (language === "pt") {
      if (item.title_pt && item.title_pt !== item.title) return item.title_pt;
      const trans = t(item.title?.trim() || "");
      if (trans && trans !== item.title?.trim()) return trans;
      return item.title_pt || trans || item.title;
    }
    if (language === "fr") {
      if (item.title_fr && item.title_fr !== item.title) return item.title_fr;
      const trans = t(item.title?.trim() || "");
      if (trans && trans !== item.title?.trim()) return trans;
      return item.title_fr || trans || item.title;
    }
    if (language === "ru") {
      if (item.title_ru && item.title_ru !== item.title) return item.title_ru;
      const trans = t(item.title?.trim() || "");
      if (trans && trans !== item.title?.trim()) return trans;
      return item.title_ru || trans || item.title;
    }
    return item.title;
  };

  const getOfferSubtitle = (item: any) => {
    if (!item) return "";
    if (language === "ar") return item.subtitle_ar || t(item.subtitle);
    if (language === "hi") {
      if (item.subtitle_hi && item.subtitle_hi !== item.subtitle) return item.subtitle_hi;
      const trans = t(item.subtitle?.trim() || "");
      if (trans && trans !== item.subtitle?.trim()) return trans;
      return item.subtitle_hi || trans || item.subtitle;
    }
    if (language === "es") {
      if (item.subtitle_es && item.subtitle_es !== item.subtitle) return item.subtitle_es;
      const trans = t(item.subtitle?.trim() || "");
      if (trans && trans !== item.subtitle?.trim()) return trans;
      return item.subtitle_es || trans || item.subtitle;
    }
    if (language === "pt") {
      if (item.subtitle_pt && item.subtitle_pt !== item.subtitle) return item.subtitle_pt;
      const trans = t(item.subtitle?.trim() || "");
      if (trans && trans !== item.subtitle?.trim()) return trans;
      return item.subtitle_pt || trans || item.subtitle;
    }
    if (language === "fr") {
      if (item.subtitle_fr && item.subtitle_fr !== item.subtitle) return item.subtitle_fr;
      const trans = t(item.subtitle?.trim() || "");
      if (trans && trans !== item.subtitle?.trim()) return trans;
      return item.subtitle_fr || trans || item.subtitle;
    }
    if (language === "ru") {
      if (item.subtitle_ru && item.subtitle_ru !== item.subtitle) return item.subtitle_ru;
      const trans = t(item.subtitle?.trim() || "");
      if (trans && trans !== item.subtitle?.trim()) return trans;
      return item.subtitle_ru || trans || item.subtitle;
    }
    return item.subtitle;
  };

  const getOfferButtonText = (item: any) => {
    if (!item) return t("Explore");
    if (language === "ar") return item.button_text_ar || t(item.button_text || "Explore");
    if (language === "hi") {
      if (item.button_text_hi && item.button_text_hi !== item.button_text) return item.button_text_hi;
      const trans = t((item.button_text || "Explore").trim());
      if (trans && trans !== item.button_text) return trans;
      return item.button_text_hi || trans || t("Explore");
    }
    if (language === "es") {
      if (item.button_text_es && item.button_text_es !== item.button_text) return item.button_text_es;
      const trans = t((item.button_text || "Explore").trim());
      if (trans && trans !== item.button_text) return trans;
      return item.button_text_es || trans || t("Explore");
    }
    if (language === "pt") {
      if (item.button_text_pt && item.button_text_pt !== item.button_text) return item.button_text_pt;
      const trans = t((item.button_text || "Explore").trim());
      if (trans && trans !== item.button_text) return trans;
      return item.button_text_pt || trans || t("Explore");
    }
    if (language === "fr") {
      if (item.button_text_fr && item.button_text_fr !== item.button_text) return item.button_text_fr;
      const trans = t((item.button_text || "Explore").trim());
      if (trans && trans !== item.button_text) return trans;
      return item.button_text_fr || trans || t("Explore");
    }
    if (language === "ru") {
      if (item.button_text_ru && item.button_text_ru !== item.button_text) return item.button_text_ru;
      const trans = t((item.button_text || "Explore").trim());
      if (trans && trans !== item.button_text) return trans;
      return item.button_text_ru || trans || t("Explore");
    }
    return item.button_text || "Explore";
  };

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
            stagePadding: 2,
            items: 6,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
            nav: false,
            dots: false,
            smartSpeed: 800,
            responsive: {
              0: { items: 3 },
              576: { items: 3 },
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

        // Project Carousel
        var projectOwl = $(".project-carousel");
        if (projectOwl.length) {
          if (projectOwl.hasClass('owl-loaded')) {
            projectOwl.trigger('destroy.owl.carousel');
            projectOwl.removeClass('owl-loaded');
            projectOwl.find('.owl-stage-outer').children().unwrap();
          }
          projectOwl.owlCarousel({
            rtl: language === "ar",
            loop: true,
            margin: 20,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 800,
            autoplayHoverPause: true,
            responsive: {
              0: { items: 1 },
              768: { items: 2 },
              992: { items: 3 },
            },
          });

          $(".customNext").off("click").click(function () {
            projectOwl.trigger("next.owl.carousel", [600]);
          });

          $(".customPrev").off("click").click(function () {
            projectOwl.trigger("prev.owl.carousel", [600]);
          });
        }
      } else if (attempts < maxAttempts) {
        setTimeout(initOwl, 100);
      }
    };

    initOwl();
  }, [categories, projects, language]);

  return (
    <>
      <h1 className="visually-hidden">
        {t("Skill Tech - Professional TV Mounts & Audio Visual Solutions")}
      </h1>
      <section className="hero hero-home">
        <Swiper
          key={language}
          dir={language === "ar" ? "rtl" : "ltr"}
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          slidesPerView={1}
          loop={banners.length > 1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: '.hero-prev',
            nextEl: '.hero-next',
          }}
          pagination={{
            el: '.hero-pagination',
            clickable: true,
            bulletClass: 'dot',
            bulletActiveClass: 'active',
          }}
          className="hero-slider"
        >
          {banners.map((banner: any, index: number) => (
            <SwiperSlide key={banner.id} className="hero-slide">
              <Link
                href={banner.link}
                aria-label={banner?.title || banner?.image_alt || "Skill Tech Banner"}
                style={{ width: "100%", textDecoration: "none" }}
              >
                <div className="hero-content">
                  <div className="hero-image">
                    {(language === "ar" && banner.image_ar ? banner.image_ar : banner.image) && (
                      <Image
                        src={`${language === "ar" && banner.image_ar ? banner.image_ar : banner.image}`}
                        alt={banner?.image_alt || "Banner Image"}
                        width={1920}
                        height={1080}
                        sizes="100vw"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "auto",
                        }}
                        priority={index === 0}
                      />
                    )}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <div className="hero-nav">
          <button className="hero-prev" aria-label="Previous slide">
            <i className="fa fa-chevron-left"></i>
          </button>
          <button className="hero-next" aria-label="Next slide">
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>

        <div className="hero-pagination"></div>
      </section>

      {/* ===== Categories Section ===== */}
      {categories?.length > 0 && (
        <section className="categories">
          <div className="container">
            <div className="section-header">
              <div className="left">
                <button className="explore-btn-nocursor">
                  <span className="arrow-circle">
                    <i className="fas fa-play"></i>
                  </span>
                  {t("Categories")}
                </button>
                <h2 className="section-title">{t("Browse by Category")}</h2>
              </div>
              <div className="right">
                <button className="arrow left-arrow" aria-label="Previous category">
                  <i className="fa fa-arrow-left"></i>
                </button>
                <button className="arrow right-arrow" aria-label="Next category">
                  <i className="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>

            <div className="owl-carousel owl-theme category-slider">
              {categories.map((cat: any) => (
                <div key={cat.id} className="item">
                  <Link
                    href={`/${cat.slug}`}
                    aria-label={getCategoryTitle(cat)}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      display: "block",
                    }}
                  >
                    <div
                      className="category-img-wrapper"
                      style={{ position: "relative" }}
                    >
                      <Image
                        src={`${cat.image ?? "/images/default.png"}`}
                        alt={getCategoryTitle(cat)}
                        fill
                        sizes="(max-width: 768px) 100vw, 140px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <p>{getCategoryTitle(cat)}</p>
                  </Link>
                </div>
              ))}
              {categories.length === 0 && <p>{t("Loading categories...")}</p>}
            </div>
          </div>
        </section>
      )}

      {offers?.length > 0 && (
        <div className="arrival-section container ">
          <div className="arrival-header text-end mb-4">
            <button className="explore-btn">
              <span className="arrow-circle">
                <i className="fas fa-play"></i>
              </span>
              {t("What's New")}
            </button>
            <h2 className="arrival-title">{t("Explore the Products")}</h2>
          </div>

          <div className="row g-4">
            {/* Left Side (1 Big Image) */}
            <div className="col-lg-6 arrival-big">
              {offers[0] && (
                <Link
                  href={language === "ar" && offers[0].button_link_ar ? offers[0].button_link_ar : offers[0].button_link}
                  aria-label={getOfferTitle(offers[0]) || "Featured Product"}
                  className="arrival-card"
                >
                  <Image
                    src={offers[0].image}
                    alt={getOfferTitle(offers[0])}
                    width={800}
                    height={800}
                    sizes="(max-width: 991px) 100vw, 50vw"
                    style={{ objectFit: "cover", width: "100%" }}
                  />
                  <div className="arrival-overlay">
                    <p className="arrival-subtitle">{getOfferSubtitle(offers[0])}</p>
                    <h3>{getOfferTitle(offers[0])}</h3>
                    {!isMobile && (
                      <div>
                        <button className="explore-btn">
                          {getOfferButtonText(offers[0])}
                          <span className="arrow-circle">
                            <i className="fas fa-play"></i>
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </Link>
              )}
            </div>

            {/* Right Side (3 images) */}
            <div className="col-lg-6">
              <div className="row g-4">
                {/* Top 2 small images */}
                <div className="col-6 arrival-small">
                  {offers[1] && (
                    <Link
                      href={language === "ar" && offers[1].button_link_ar ? offers[1].button_link_ar : offers[1].button_link}
                      aria-label={getOfferTitle(offers[1]) || "Featured Product"}
                      className="arrival-card"
                    >
                      <Image
                        src={offers[1].image || "/images/new-arrival7.png"}
                        alt={getOfferTitle(offers[1])}
                        width={400}
                        height={400}
                        sizes="(max-width: 991px) 50vw, 25vw"
                        style={{ objectFit: "cover", width: "100%" }}
                      />
                      <div className="arrival-overlay">
                        <p className="arrival-subtitle">{getOfferSubtitle(offers[1])}</p>
                        <h3>{getOfferTitle(offers[1])}</h3>
                        {!isMobile && (
                          <div>
                            <button className="explore-btn">
                              {getOfferButtonText(offers[1])}
                              <span className="arrow-circle">
                                <i className="fas fa-play"></i>
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </Link>
                  )}
                </div>

                <div className="col-6 arrival-small">
                  {offers[2] && (
                    <Link
                      href={language === "ar" && offers[2].button_link_ar ? offers[2].button_link_ar : offers[2].button_link}
                      aria-label={getOfferTitle(offers[2]) || "Featured Product"}
                      className="arrival-card"
                    >
                      <Image
                        src={offers[2].image}
                        alt={getOfferTitle(offers[2])}
                        width={400}
                        height={400}
                        sizes="(max-width: 991px) 50vw, 25vw"
                        style={{ objectFit: "cover", width: "100%" }}
                      />
                      <div className="arrival-overlay">
                        <p className="arrival-subtitle">{getOfferSubtitle(offers[2])}</p>
                        <h3>{getOfferTitle(offers[2])}</h3>
                        {!isMobile && (
                          <div>
                            <button className="explore-btn">
                              {getOfferButtonText(offers[2])}
                              <span className="arrow-circle">
                                <i className="fas fa-play"></i>
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </Link>
                  )}
                </div>

                {/* Bottom wide image */}
                <div className="col-12 arrival-wide">
                  {offers[3] && (
                    <Link
                      href={language === "ar" && offers[3].button_link_ar ? offers[3].button_link_ar : offers[3].button_link}
                      aria-label={getOfferTitle(offers[3]) || "Featured Product"}
                      className="arrival-card"
                    >
                      <Image
                        src={offers[3].image}
                        alt={getOfferTitle(offers[3])}
                        width={800}
                        height={400}
                        sizes="(max-width: 991px) 100vw, 50vw"
                        style={{ objectFit: "cover", width: "100%" }}
                      />
                      <div className="arrival-overlay">
                        <p className="arrival-subtitle">{getOfferSubtitle(offers[3])}</p>
                        <h3>{getOfferTitle(offers[3])}</h3>
                        {!isMobile && (
                          <div>
                            <button className="explore-btn">
                              {getOfferButtonText(offers[3])}
                              <span className="arrow-circle">
                                <i className="fas fa-play"></i>
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="about-home-section">
        <div className="about-section ">
          <div className="row g-4 align-items-center">
            {/* Left Image Grid */}
            <div className="col-lg-6">
              <div className="row g-3">
                {/* Top Right Small Image */}
                <div className="col-6 ">
                  <div className="about-img-box">
                    <Image
                      src="/images/homepage/about2.jpg"
                      alt="About Small 2"
                      width={400}
                      height={400}
                      sizes="(max-width: 991px) 50vw, 25vw"
                      style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                {/* Top Left Pink Box with Text */}
                <div className="col-6">
                  <div className="about-img-box pink-box d-flex align-items-center justify-content-center text-center">
                    <div className="pink-box-text">
                      <p className="h2-text">{t("About Us")}</p>
                    </div>
                  </div>
                </div>
                {/* Bottom Wide Image */}
                <div className="col-12">
                  <div className="about-img-box">
                    <Image
                      src="/images/homepage/about1.jpg"
                      alt="About Wide"
                      width={800}
                      height={400}
                      sizes="(max-width: 991px) 100vw, 50vw"
                      style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text Section */}
            <div className="col-lg-6 about-text">
              <h2>{t("About Us")}</h2>
              <p id="aboutText" className={isExpanded ? "expanded" : ""}>
                {t("About Us Paragraph 1")}
                <br />
                <br />
                {t("About Us Paragraph 2")}
                <br />
                <br />
                {t("About Us Paragraph 3")}
              </p>
              <button
                className="read-more-btn"
                // type="submit"
                // id="readMoreBtn"
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsExpanded(!isExpanded); // mobile
                  } else {
                    router.push(language === "ar" ? "/ar/about" : language === "hi" ? "/hi/about" : language === "es" ? "/es/about" : language === "pt" ? "/pt/about" : language === "fr" ? "/fr/about" : language === "ru" ? "/ru/about" : "/about"); // desktop
                  }
                }}
              >
                <span className="white-circle">
                  <i className="fas fa-play"></i>
                </span>
                {isExpanded ? t("Read less") : t("Read more")}
              </button>
              {/* <button
                
                
              >
                
              </button> */}
              {/* <Link href="/about" className="readmore-link">
                <button className="readmore-btn">
                  <span className="arrow-circle">
                    <i className="fas fa-play"></i>
                  </span>
                  Read More
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      </section>
      {filterProducts?.length > 0 && (
        <div className="container product-section">
          {/* heading & category tabs */}
          <div className="category-selection-wrapper">
            {/* Desktop View: Old inline list with separators */}
            <div className="d-none  justify-content-between align-items-center mb-4">
              <div className="section-product">
                <button className="explore-btn-nocursor">
                  <span className="arrow-circle">
                    <i className="fas fa-play"></i>
                  </span>
                  {t("Our Products")}
                </button>
                <h2 className="section-title mb-0">{t("Explore Our Products")}</h2>
              </div>

              <div
                className="category-list"
                style={{
                  maxWidth: "60%",
                  textAlign: "justify",
                  textAlignLast: "justify",
                }}
              >
                {exploreCategories?.map((cat: any, index: number) => (
                  <Fragment key={cat.id}>
                    <span
                      onClick={() => setSelectedCategory(cat.slug)}
                      style={{
                        display: "inline-block",
                        cursor: "pointer",
                        fontSize:
                          selectedCategory === cat.slug ? "15px" : "12px",
                        fontWeight:
                          selectedCategory === cat.slug ? "bold" : "normal",
                        color: selectedCategory === cat.slug ? "#000" : "#777",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {getCategoryTitle(cat)}
                    </span>
                    {index < exploreCategories.length - 1 && (
                      <>
                        {" "}
                        <span className="separator"></span>{" "}
                      </>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>

            {/* Mobile View: New scrollable pills */}
            <div className="d-block category-scroll-container">
              <div className="section-product-header mb-3">
                <button className="explore-btn-nocursor">
                  <span className="arrow-circle">
                    <i className="fas fa-play"></i>
                  </span>
                  {t("Our Products")}
                </button>
                <h2 className="section-title">{t("Explore Our Products")}</h2>
              </div>

              <div
                className={`category-pills-row ${showAllCategories ? "expanded" : ""}`}
              >
                {exploreCategories?.map((cat: any) => (
                  <button
                     key={cat.id}
                     className={`category-pill ${selectedCategory === cat.slug ? "active" : ""}`}
                     onClick={() => setSelectedCategory(cat.slug)}
                  >
                    {getCategoryTitle(cat)}
                  </button>
                ))}
                {hasMoreCategories && (
                  <button
                    className="category-pill more-btn d-lg-none"
                    onClick={() => setShowAllCategories(!showAllCategories)}
                  >
                    {showAllCategories ? t("Show Less") : t("More Categories +")}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* product cards - SWIPER */}
          <div className="product-swiper-container">
            <button
              ref={prevRef}
              className="prod-left-arrow"
              aria-label="Previous products"
              style={{
                display:
                  !loading && filterProducts.length > 0 ? "flex" : "none",
              }}
            >
              <i className="fa fa-arrow-left"></i>
            </button>
            <button
              ref={nextRef}
              className="prod-right-arrow"
              aria-label="Next products"
              style={{
                display:
                  !loading && filterProducts.length > 0 ? "flex" : "none",
              }}
            >
              <i className="fa fa-arrow-right"></i>
            </button>

            <Swiper
              key={language}
              dir={language === "ar" ? "rtl" : "ltr"}
              modules={[Grid, Navigation, Pagination]}
              grid={{ rows: 2, fill: "row" }}
              slidesPerView={1}
              spaceBetween={20}
              onSwiper={setSwiperInstance}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              onBeforeInit={(swiper) => {
                if (typeof swiper.params.navigation !== "boolean") {
                  const nav = swiper.params.navigation;
                  if (nav) {
                    nav.prevEl = prevRef.current;
                    nav.nextEl = nextRef.current;
                  }
                }
              }}
              breakpoints={{
                0: { slidesPerView: 2, grid: { rows: 2, fill: "row" } },
                576: { slidesPerView: 2, grid: { rows: 2, fill: "row" } },
                768: { slidesPerView: 3, grid: { rows: 2, fill: "row" } },
                992: { slidesPerView: 4, grid: { rows: 2, fill: "row" } },
              }}
              className={`product-grid-swiper ${nudgeSlider ? "nudge-slider" : ""} ${loading ? "opacity-50" : ""}`}
            >
              {filterProducts.map((product: any) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>

            {!loading && filterProducts.length === 0 && (
              <div className="no-products-found">
                <i className="fas fa-box-open"></i>
                <p>{t("No products available in this category")}</p>
              </div>
            )}

            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>

          {selectedCategory && !loading && filterProducts.length > 0 && (
            <div className="text-center mt-4">
              <Link
                href={`/${selectedCategory}`}
                style={{ textDecoration: "none" }}
              >
                <button className="explore-btn mb-0">
                  <span className="arrow-circle">
                    <i className="fas fa-play"></i>
                  </span>
                  {t("View More")}
                </button>
              </Link>
            </div>
          )}
        </div>
      )}

      <section className="service-home-section">
        <div className=" about-section1">
          <div className="row g-4 align-items-center mt-0">
            {/* Right Text Section */}
            <div className="col-lg-6 about-text">
              <h2>{t("TV Installation Service")}</h2>
              <p>
                {t("TV Installation Description 1")}
              </p>
              <p>
                {t("TV Installation Description 2")}
              </p>
              <p>
                {t("TV Installation Description 3")}
              </p>
              <div>
                <button onClick={()=>{
                  router.push(language === "ar" ? "/ar/service#booking" : language === "hi" ? "/hi/service#booking" : language === "es" ? "/es/service#booking" : language === "pt" ? "/pt/service#booking" : language === "fr" ? "/fr/service#booking" : language === "ru" ? "/ru/service#booking" : "/service#booking")
                }} className="read-more-btn">
                  <span className="white-circle">
                    <i className="fas fa-play"></i>
                  </span>{" "}
                  {t("Book Now")}
                </button>
              </div>
            </div>
            {/* Left Image Grid */}
            <div className="col-lg-6">
              <div className="row g-3">
                {/* Top Right Small Image */}

                <div className="col-6">
                  <div className="about-img-box pink-box d-flex align-items-center justify-content-center text-center">
                    <div className="pink-box-text">
                      <p className="h2-text">{t("Services")}</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="about-img-box">
                    <Image
                      src="/images/homepage/service1.jpg"
                      alt="Services Small"
                      width={400}
                      height={400}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
                {/* Bottom Wide Image */}
                <div className="col-12">
                  <div className="about-img-box">
                    <Image
                      src="/images/homepage/service2.jpg"
                      alt="Services Wide"
                      width={800}
                      height={400}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection variant="circle" />

      {projects?.length > 0 && (
        <section className="container signature-projects">
          <div className="">
            <div className="row align-items-center">
              <div className="project-header">
                <div className="left-controls">
                  <button className="customPrev" aria-label="Previous project">
                    <i className="fa fa-arrow-left"></i>
                  </button>
                  <button className="customNext" aria-label="Next project">
                    <i className="fa fa-arrow-right"></i>
                  </button>
                </div>

                <div className="right-section d-flex flex-column">
                  <button className="explore-btn ms-auto">
                    <span className="arrow-circle">
                      <i className="fas fa-play"></i>
                    </span>
                    {t("Turning Vision into Reality")}
                  </button>
                  <h2 className="project-title">{t("Our Signature Projects")}</h2>
                </div>
              </div>
            </div>
            <div className="owl-carousel project-carousel">
              {projects?.map((project: any) => (
                <div key={project.id} className="project-card">
                  {project.image && (
                    <Image
                      src={`${project.image}`}
                      alt={
                        language === "ar" && project.title_ar
                          ? project.title_ar
                          : language === "hi" && project.title_hi
                          ? project.title_hi
                          : language === "es" && project.title_es
                          ? project.title_es
                          : language === "pt" && project.title_pt
                          ? project.title_pt
                          : language === "fr" && (project as any).title_fr
                          ? (project as any).title_fr
                          : language === "ru" && (project as any).title_ru
                          ? (project as any).title_ru
                          : (language === "hi" || language === "es" || language === "pt" || language === "fr" || language === "ru")
                          ? t(project.title)
                          : project.title
                      }
                      width={400}
                      height={300}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <span className="location-pill">
                    {language === "ar" && project.location_ar
                      ? project.location_ar
                      : language === "hi" && project.location_hi
                      ? project.location_hi
                      : language === "es" && project.location_es
                      ? project.location_es
                      : language === "pt" && project.location_pt
                      ? project.location_pt
                      : language === "fr" && (project as any).location_fr
                      ? (project as any).location_fr
                      : language === "ru" && (project as any).location_ru
                      ? (project as any).location_ru
                      : (language === "hi" || language === "es" || language === "pt" || language === "fr" || language === "ru")
                      ? t(project.location)
                      : project.location}
                  </span>
                  <div className="card-info">
                    <p className="small-title">
                      {language === "ar" && project.subtitle_ar
                        ? project.subtitle_ar
                        : language === "hi" && project.subtitle_hi
                        ? project.subtitle_hi
                        : language === "es" && project.subtitle_es
                        ? project.subtitle_es
                        : language === "pt" && project.subtitle_pt
                        ? project.subtitle_pt
                        : language === "fr" && (project as any).subtitle_fr
                        ? (project as any).subtitle_fr
                        : language === "ru" && (project as any).subtitle_ru
                        ? (project as any).subtitle_ru
                        : (language === "hi" || language === "es" || language === "pt" || language === "fr" || language === "ru")
                        ? t(project.subtitle)
                        : project.subtitle}
                    </p>
                    <p className="main-title">
                      {language === "ar" && project.title_ar
                        ? project.title_ar
                        : language === "hi" && project.title_hi
                        ? project.title_hi
                        : language === "es" && project.title_es
                        ? project.title_es
                        : language === "pt" && project.title_pt
                        ? project.title_pt
                        : language === "fr" && (project as any).title_fr
                        ? (project as any).title_fr
                        : language === "ru" && (project as any).title_ru
                        ? (project as any).title_ru
                        : (language === "hi" || language === "es" || language === "pt" || language === "fr" || language === "ru")
                        ? t(project.title)
                        : project.title}
                    </p>
                  </div>
                </div>
              ))}
              {projects?.length === 0 && <p>{t("No projects found.")}</p>}
            </div>
          </div>
        </section>
      )}

      <ClientsSection clients={clients} />
    </>
  );
}

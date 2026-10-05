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
                        alt={language === "ar" && cat.name_ar ? cat.name_ar : cat.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 140px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <p>{language === "ar" && cat.name_ar ? cat.name_ar : cat.name}</p>
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
                <Link href={language === "ar" && offers[0].button_link_ar ? offers[0].button_link_ar : offers[0].button_link} className="arrival-card">
                  <Image
                    src={offers[0].image}
                    alt={language === "ar" && offers[0].title_ar ? offers[0].title_ar : offers[0].title}
                    width={800}
                    height={800}
                    sizes="(max-width: 991px) 100vw, 50vw"
                    style={{ objectFit: "cover", width: "100%" }}
                  />
                  <div className="arrival-overlay">
                    <p className="arrival-subtitle">{language === "ar" && offers[0].subtitle_ar ? offers[0].subtitle_ar : offers[0].subtitle}</p>
                    <h3>{language === "ar" && offers[0].title_ar ? offers[0].title_ar : offers[0].title}</h3>
                    {!isMobile && (
                      <div>
                        <button className="explore-btn">
                          {language === "ar" && offers[0].button_text_ar ? offers[0].button_text_ar : offers[0].button_text}
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
                    <Link href={language === "ar" && offers[1].button_link_ar ? offers[1].button_link_ar : offers[1].button_link} className="arrival-card">
                      <Image
                        src={offers[1].image || "/images/new-arrival7.png"}
                        alt={language === "ar" && offers[1].title_ar ? offers[1].title_ar : offers[1].title}
                        width={400}
                        height={400}
                        sizes="(max-width: 991px) 50vw, 25vw"
                        style={{ objectFit: "cover", width: "100%" }}
                      />
                      <div className="arrival-overlay">
                        <p className="arrival-subtitle">{language === "ar" && offers[1].subtitle_ar ? offers[1].subtitle_ar : offers[1].subtitle}</p>
                        <h3>{language === "ar" && offers[1].title_ar ? offers[1].title_ar : offers[1].title}</h3>
                        {!isMobile && (
                          <div>
                            <button className="explore-btn">
                              {language === "ar" && offers[1].button_text_ar ? offers[1].button_text_ar : offers[1].button_text}
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
                    <Link href={language === "ar" && offers[2].button_link_ar ? offers[2].button_link_ar : offers[2].button_link} className="arrival-card">
                      <Image
                        src={offers[2].image}
                        alt={language === "ar" && offers[2].title_ar ? offers[2].title_ar : offers[2].title}
                        width={400}
                        height={400}
                        sizes="(max-width: 991px) 50vw, 25vw"
                        style={{ objectFit: "cover", width: "100%" }}
                      />
                      <div className="arrival-overlay">
                        <p className="arrival-subtitle">{language === "ar" && offers[2].subtitle_ar ? offers[2].subtitle_ar : offers[2].subtitle}</p>
                        <h3>{language === "ar" && offers[2].title_ar ? offers[2].title_ar : offers[2].title}</h3>
                        {!isMobile && (
                          <div>
                            <button className="explore-btn">
                              {language === "ar" && offers[2].button_text_ar ? offers[2].button_text_ar : offers[2].button_text}
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
                    <Link href={language === "ar" && offers[3].button_link_ar ? offers[3].button_link_ar : offers[3].button_link} className="arrival-card">
                      <Image
                        src={offers[3].image}
                        alt={language === "ar" && offers[3].title_ar ? offers[3].title_ar : offers[3].title}
                        width={800}
                        height={400}
                        sizes="(max-width: 991px) 100vw, 50vw"
                        style={{ objectFit: "cover", width: "100%" }}
                      />
                      <div className="arrival-overlay">
                        <p className="arrival-subtitle">{language === "ar" && offers[3].subtitle_ar ? offers[3].subtitle_ar : offers[3].subtitle}</p>
                        <h3>{language === "ar" && offers[3].title_ar ? offers[3].title_ar : offers[3].title}</h3>
                        {!isMobile && (
                          <div>
                            <button className="explore-btn">
                              {language === "ar" && offers[3].button_text_ar ? offers[3].button_text_ar : offers[3].button_text}
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
                      <h2>{t("About Us")}</h2>
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
                    router.push(language === "ar" ? "/ar/about" : "/about"); // desktop
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
                      {language === "ar" && cat.name_ar ? cat.name_ar : cat.name}
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
                    {language === "ar" && cat.name_ar ? cat.name_ar : cat.name}
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
                  router.push(language === "ar" ? "/ar/service#booking" : "/service#booking")
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
                      <h2>{t("Services")}</h2>
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
                      alt={language === "ar" && project.title_ar ? project.title_ar : project.title}
                      width={400}
                      height={300}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <span className="location-pill">{language === "ar" && project.location_ar ? project.location_ar : project.location}</span>
                  <div className="card-info">
                    <p className="small-title">{language === "ar" && project.subtitle_ar ? project.subtitle_ar : project.subtitle}</p>
                    <p className="main-title">{language === "ar" && project.title_ar ? project.title_ar : project.title}</p>
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

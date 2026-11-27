"use client";
import { useState, useEffect, useRef } from "react";
import Link from "@/components/Link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  fetchCategories,
  fetchSiteSettings,
  searchProducts,
  searchProductsPopup,
  MEDIA_BASE_URL,
  fetchMainCategories,
  fetchArms,
} from "@/lib/api";
import OldMegaMenu from "./OldMegaMenu";
import NewMegaMenu from "./NewMegaMenu";
import RequestQuoteModal from "./RequestQuoteModal";
import { useLanguage } from "@/lib/LanguageContext";
import { useCountry } from "@/lib/CountryContext";

interface SubCategory {
  id: number;
  name: string;
  name_ar?: string;
  slug: string;
  multi_expand: boolean;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  flatten_in_menu: boolean;
  subcategories: SubCategory[];
}

interface MainCategory {
  id: number;
  name: string;
  name_ar?: string;
  slug: string;
  categories: Category[];
}

interface SiteSettings {
  email: string;
  phone: string;
  phone_number2?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  whatsapp?: string;
  youtube?: string;
  x?: string;
  whatsapp_channel?: string;
  address_heading?: string;
  address_heading_ar?: string;
  address?: string;
  address_ar?: string;
}
interface Arms {
  name: string;
  name_ar?: string;
  show_in_articulating: boolean;
  show_in_ergonomic: boolean;
  slug: string;
}

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const { country: selectedCountry, setCountry, countries } = useCountry();
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Mega Menu State
  const [isMegamenuOpen, setIsMegamenuOpen] = useState(false);
  const [activeMainCat, setActiveMainCategory] = useState<MainCategory | null>(
    null,
  );
  const [activeCat, setActiveCategory] = useState<Category | null>(null);
  const [expandedCatId, setExpandedCatId] = useState<number | null>(null);
  const [mobileTierLevel, setMobileTierLevel] = useState(0); // 0: Main, 1: Category, 2: Subcategory
  const [Arms,setArms]=useState<Arms[]>([])

  useEffect(() => {
    if (!isMegamenuOpen) {
      setMobileTierLevel(0);
      setActiveMainCategory(null);
      setActiveCategory(null);
    }
  }, [isMegamenuOpen]);

  useEffect(() => {
    async function loadData() {
      try {
        const [mainCats, siteSettings,ArmsData] = await Promise.all([
          fetchMainCategories(),
          fetchSiteSettings(),
          fetchArms()
        ]);
        console.log(mainCats, "checkingmaincats");
        const cats = mainCats.slice(0, 4);
        setMainCategories(cats);
        setSettings(siteSettings);
        setArms(ArmsData)
      } catch (error) {
        console.error("Failed to load data", error);
      }
    }
    loadData();
  }, []);

  const handleMainCatClick = (main: MainCategory) => {
    setActiveMainCategory(main);
    setActiveCategory(null);
    setMobileTierLevel(1);
  };

  const handleCatClick = (cat: Category) => {
    setActiveCategory(cat);
    setMobileTierLevel(2);
  };

  const resetMobileTiers = () => {
    setMobileTierLevel(0);
  };

  // Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 0) {
        setIsSearching(true);
        setShowResults(true);
        try {
          const products = await searchProductsPopup(searchQuery);
          setSearchResults(products);
        } catch (error) {
          console.error("Search failed", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Handle click outside to close search results and country dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setShowResults(false);
      const searchPrefix = language === "ar" ? "/ar" : language === "hi" ? "/hi" : language === "es" ? "/es" : language === "pt" ? "/pt" : language === "fr" ? "/fr" : language === "ru" ? "/ru" : "";
      router.push(`${searchPrefix}/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Dismiss the keyboard by blurring the input
      // (e.target as HTMLInputElement).blur();
      // Keep search results visible as per user requirement
    }
  };

  const closeMenu = () => {
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      const toggler = document.querySelector(".navbar-toggler") as HTMLElement;
      if (toggler) {
        toggler.click();
      }
    }
  };

  const handleLinkClick = () => {
    closeMenu();
    setIsMegamenuOpen(false);
  };

  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === "/") return pathname === "/" || pathname === "/ar" || pathname === "/hi" || pathname === "/es" || pathname === "/pt" || pathname === "/fr";
    return (
      pathname === path ||
      pathname === `/ar${path}` ||
      pathname === `/hi${path}` ||
      pathname === `/es${path}` ||
      pathname === `/pt${path}` ||
      pathname === `/fr${path}` ||
      pathname.startsWith(`${path}/`) ||
      pathname.startsWith(`/ar${path}/`) ||
      pathname.startsWith(`/hi${path}/`) ||
      pathname.startsWith(`/es${path}/`) ||
      pathname.startsWith(`/pt${path}/`) ||
      pathname.startsWith(`/fr${path}/`)
    );
  };

  const isProductActive = () => {
    if (!pathname) return false;
    const cleanPath = pathname
      .replace(/^\/(ar|hi|es|pt|fr)/, "") || "/";

    if (cleanPath === "/category" || cleanPath.startsWith("/category/"))
      return true;

    return mainCategories.some((main) => {
      if (cleanPath === `/${main.slug}` || cleanPath.startsWith(`/${main.slug}/`))
        return true;
      return main.categories?.some((cat) => {
        if (cleanPath === `/${cat.slug}` || cleanPath.startsWith(`/${cat.slug}/`))
          return true;
        return cat.subcategories?.some(
          (sub) =>
            cleanPath === `/${cat.slug}/${sub.slug}` ||
            cleanPath.startsWith(`/${cat.slug}/${sub.slug}/`),
        );
      });
    });
  };

  return (
    <>
      {/* ===== Top Header ===== */}
      <div className="top-header">
        <div className="container top-header-inner">
          {/* Left: Social Icons */}
          <div className="left-icons">
            {settings?.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            )}
            {settings?.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            )}
             {settings?.x && (
              <a
                href={settings.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <i className="fab fa-x-twitter"></i>
              </a>
            )}
            {settings?.linkedin && (
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            )}
            {settings?.youtube && (
              <a
                href={settings.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
            )}
           
            {settings?.whatsapp_channel && (
              <a
                href={settings.whatsapp_channel}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Channel"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            )}
            {/* {settings?.whatsapp && <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>} */}
          </div>

          {/* Center: Contact Info */}
          <div className="right-info">
            {(selectedCountry?.email || settings?.email) && (
              <Link
                href={`mailto:${selectedCountry?.email || settings?.email}`}
                style={{ color: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}
              >
                <i className="fa fa-envelope"></i> {selectedCountry?.email || settings?.email}
              </Link>
            )}
            {(selectedCountry?.phone || settings?.phone) && (
              <Link
                href={`tel:${selectedCountry?.phone || settings?.phone}`}
                style={{ color: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}
              >
                <i className="fa fa-phone"></i> <span dir="ltr" style={{ whiteSpace: "nowrap" }}>{selectedCountry?.phone || settings?.phone}</span>
              </Link>
            )}
            {(selectedCountry?.mobile || settings?.phone_number2) && (
              <Link
                href={`tel:${selectedCountry?.mobile || settings?.phone_number2}`}
                style={{ color: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}
              >
                <i className="fa fa-phone"></i> <span dir="ltr" style={{ whiteSpace: "nowrap" }}>{selectedCountry?.mobile || settings?.phone_number2}</span>
              </Link>
            )}
          </div>

          {/* Right: Country Dropdown & Language Switcher */}
          <div className="d-flex align-items-center gap-2 gap-sm-3" style={{ marginInlineStart: "auto", flexShrink: 0 }}>
            <div className="country-dropdown" ref={countryDropdownRef}>
              <div
                className="selected-country"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                role="button"
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={isCountryDropdownOpen}
                aria-label="Select Country"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsCountryDropdownOpen(!isCountryDropdownOpen);
                  }
                }}
              >
                <Image
                  src={selectedCountry.flag}
                  alt={`${selectedCountry.name} Flag`}
                  width={18}
                  height={13}
                  style={{ objectFit: "cover", borderRadius: "2px" }}
                />
                <span className="d-none d-sm-inline">
                  {language === "ar" ? selectedCountry.name_ar : t(selectedCountry.name)}
                </span>
                <span className="d-inline d-sm-none">
                  {language === "ar"
                    ? (selectedCountry.short_name_ar || selectedCountry.name_ar)
                    : (selectedCountry.short_name || selectedCountry.name)}
                </span>
                <i
                  className="fa fa-chevron-down"
                  style={{
                    fontSize: "9px",
                    color: "#ffffff",
                    opacity: 0.8,
                    transition: "transform 0.2s ease",
                    transform: isCountryDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                ></i>
              </div>
              <ul
                className="country-list"
                style={{ display: isCountryDropdownOpen ? "block" : "none" }}
                role="listbox"
              >
                {countries.map((c) => (
                  <li
                    key={c.code}
                    className={c.code === selectedCountry.code ? "active" : ""}
                    onClick={() => {
                      setCountry(c.code);
                      setIsCountryDropdownOpen(false);
                    }}
                    role="option"
                    aria-selected={c.code === selectedCountry.code}
                  >
                    <Image
                      src={c.flag}
                      alt={`${c.name} Flag`}
                      width={20}
                      height={14}
                      style={{ objectFit: "cover", borderRadius: "2px" }}
                    />
                    <span>{language === "ar" ? c.name_ar : t(c.name)}</span>
                    {c.code === selectedCountry.code && (
                      <i
                        className="fa fa-check"
                        style={{ fontSize: "11px", color: "#3351a3", marginInlineStart: "auto" }}
                      ></i>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Language Dropdown */}
            <div className="country-dropdown language-dropdown" ref={langDropdownRef}>
              <div
                className="selected-country selected-language"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLangDropdownOpen(!isLangDropdownOpen);
                  setIsCountryDropdownOpen(false);
                }}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isLangDropdownOpen}
              >
                <i
                  className="fa fa-globe"
                  style={{ fontSize: "12px", color: "#ffffff", opacity: 0.9 }}
                ></i>
                <span>
                  {language === "ar" ? "العربية" : language === "hi" ? "हिन्दी" : language === "es" ? "Español" : language === "pt" ? "Português" : language === "fr" ? "Français" : language === "ru" ? "Русский" : "English"}
                </span>
                <i
                  className="fa fa-chevron-down"
                  style={{
                    fontSize: "9px",
                    color: "#ffffff",
                    opacity: 0.8,
                    transition: "transform 0.2s ease",
                    transform: isLangDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                ></i>
              </div>
              <ul
                className="country-list language-list"
                style={{ display: isLangDropdownOpen ? "block" : "none" }}
                role="listbox"
              >
                {[
                  { code: "en" as const, label: "English" },
                  { code: "ar" as const, label: "العربية" },
                  { code: "hi" as const, label: "हिन्दी" },
                  { code: "es" as const, label: "Español" },
                  { code: "pt" as const, label: "Português" },
                  { code: "fr" as const, label: "Français" },
                  { code: "ru" as const, label: "Русский" },
                ].map((l) => (
                  <li
                    key={l.code}
                    className={l.code === language ? "active" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLanguage(l.code);
                      setIsLangDropdownOpen(false);
                    }}
                    role="option"
                    aria-selected={l.code === language}
                  >
                    <span>{l.label}</span>
                    {l.code === language && (
                      <i
                        className="fa fa-check"
                        style={{ fontSize: "11px", color: "#3351a3", marginInlineStart: "auto" }}
                      ></i>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Navbar ===== */}
      <header className="navbar navbar-expand-lg">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link className="logo" href="/" aria-label="Skill Tech Home">
            <Image
              src="/images/logo.svg"
              alt="Skill Tech Logo"
              width={80}
              height={52}
              style={{ objectFit: "contain", width: "80px", height: "auto", aspectRatio: "599 / 386" }}
              priority
            />
          </Link>

          {/* Mobile Search Box (only visible on mobile) */}
          <div className="mobile-search" >
            <input
              type="text"
              placeholder={t("Search products...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (searchResults.length > 0) setShowResults(true);
              }}
            />
            {showResults && (
              <SearchPopup
                isSearching={isSearching}
                searchResults={searchResults}
                searchQuery={searchQuery}
                handleSearchSubmit={handleSearchSubmit}
                setShowResults={setShowResults}
                t={t}
              />
            )}
          </div>

          {/* Mobile Menu Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i
              className="fa fa-bars"
              style={{ fontSize: "24px", color: "#062e5c" }}
            ></i>
          </button>

          {/* Desktop Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ms-4 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ms-0 ps-0 ${isActive("/") ? "active" : ""}`}
                  href="/"
                  onClick={handleLinkClick}
                >
                  {t("Home")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/about") ? "active" : ""}`}
                  href="/about"
                  onClick={handleLinkClick}
                >
                  {t("About Us")}
                </Link>
              </li>

              {/* Products Mega Menu */}
              <li
                className="nav-item has-megamenu"
                onMouseEnter={() => {
                  if (window.innerWidth > 992) setIsMegamenuOpen(true);
                }}
                onMouseLeave={() => {
                  if (window.innerWidth > 992) setIsMegamenuOpen(false);
                }}
              >
                <Link
                  href="/tv-wall-mount"
                  className={`nav-link no-click ${isProductActive() ? "active" : ""}`}
                  onClick={(e) => {
                    if (window.innerWidth <= 992) {
                      e.preventDefault();
                      setIsMegamenuOpen(!isMegamenuOpen);
                    }
                  }}
                >
                  {t("Products")} <i className="fa fa-caret-down"></i>
                </Link>

                {/* Option 1: New Mega Menu (Currently Active) */}
                <NewMegaMenu 
                  isMegamenuOpen={isMegamenuOpen}
                  mainCategories={mainCategories}
                  expandedCatId={expandedCatId}
                  setExpandedCatId={setExpandedCatId}
                  handleLinkClick={handleLinkClick}
                  Arms={Arms}
                />

                {/* Option 2: Old Mega Menu (Commented Out) */}
                {/* 
                <OldMegaMenu 
                  isMegamenuOpen={isMegamenuOpen}
                  mobileTierLevel={mobileTierLevel}
                  mainCategories={mainCategories}
                  activeMainCat={activeMainCat}
                  activeCat={activeCat}
                  handleMainCatClick={handleMainCatClick}
                  handleCatClick={handleCatClick}
                  setIsMegamenuOpen={setIsMegamenuOpen}
                  setMobileTierLevel={setMobileTierLevel}
                  router={router}
                  handleLinkClick={handleLinkClick}
                />
                */}
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/service") ? "active" : ""}`}
                  href="/service"
                  onClick={handleLinkClick}
                >
                  {t("Services")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/support") ? "active" : ""}`}
                  href="/support"
                  onClick={handleLinkClick}
                >
                  {t("Support")}
                </Link>
              </li>
              {/*<li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/gallery") ? "active" : ""}`}
                  href="/gallery"
                  onClick={handleLinkClick}
                >
                  Gallery
                </Link>
              </li>*/}
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/news-media") ? "active" : ""}`}
                  href="/news-media"
                  onClick={handleLinkClick}
                >
                  {t("News")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/career") ? "active" : ""}`}
                  href="/career"
                  onClick={handleLinkClick}
                >
                  {t("Career")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/blog") ? "active" : ""}`}
                  href="/blog"
                  onClick={handleLinkClick}
                >
                  {t("Blog")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                  href="/contact"
                  onClick={handleLinkClick}
                >
                  {t("Contact")}
                </Link>
              </li>
              <li className="nav-item d-lg-none mt-2 mb-2">
                <button
                  type="button"
                  className="request-quote-header-btn w-100 justify-content-center"
                  onClick={() => {
                    setIsQuoteModalOpen(true);
                    const nav = document.getElementById("navbarNav");
                    if (nav && nav.classList.contains("show")) {
                      nav.classList.remove("show");
                    }
                  }}
                >
                  {t("Request a Quote")}
                </button>
              </li>
            </ul>

            {/* Request a Quote Button */}
            <button
              type="button"
              className="request-quote-header-btn d-none d-lg-inline-flex"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              {t("Request a Quote")}
            </button>

            {/* Desktop Search Box */}
            <div
              className="search-box mt-3 mt-lg-0"
              style={{ position: "relative" }}
              ref={searchContainerRef}
            >
              <input
                type="text"
                placeholder={t("Search...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (searchResults.length > 0) setShowResults(true);
                }}
              />
              <i
                className="fa fa-search"
                onClick={handleSearchSubmit}
                style={{ cursor: "pointer" }}
              ></i>

              {/* Search Results Popup */}
              {showResults && (
                <SearchPopup
                  isSearching={isSearching}
                  searchResults={searchResults}
                  searchQuery={searchQuery}
                  handleSearchSubmit={handleSearchSubmit}
                  setShowResults={setShowResults}
                  t={t}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Request A Quote Modal */}
      <RequestQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}

function SearchPopup({
  isSearching,
  searchResults,
  searchQuery,
  handleSearchSubmit,
  setShowResults,
  t,
}: any) {
  const { language } = useLanguage();
  return (
    <div className="search-popup">
      {isSearching ? (
        <div style={{ padding: "15px", textAlign: "center" }}>{t("Loading...")}</div>
      ) : (
        <>
          {searchResults.length > 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                }}
              >
                <span style={{ fontSize: "14px", color: "#666" }}>
                  {t("Products related to:")}{" "}
                  <strong style={{ color: "#333" }}>{searchQuery}</strong>
                </span>
                <span
                  onClick={handleSearchSubmit}
                  style={{
                    fontSize: "13px",
                    color: "#062e5c",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  {t("See More >")}
                </span>
              </div>

              <div style={{ display: "flex", gap: "15px" }}>
                {searchResults.map((product: any) => (
                  <Link
                    key={product.id}
                    href={`/${product.slug_path}`}
                    onClick={() => setShowResults(false)}
                    style={{
                      flex: "0 0 auto",
                      width: searchResults.length === 1 ? "150px" : "calc(25% - 12px)",
                      maxWidth: "150px",
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    className="search-result-item"
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100px",
                        position: "relative",
                        marginBottom: "10px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        padding: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src={
                          product.main_image
                            ? product.main_image.startsWith("http")
                              ? product.main_image
                              : `${MEDIA_BASE_URL}${product.main_image}`
                            : "/images/default.png"
                        }
                        alt={product.name}
                        width={100}
                        height={100}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div style={{ textAlign: "left", width: "100%" }}>
                      <div
                        style={{
                          margin: "0 0 5px",
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#333",
                        }}
                      >
                        {product.name}
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "11px",
                          color: "#888",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          lineHeight: "1.4",
                        }}
                      >
                        {language === "ar"
                          ? (product.short_description_ar || product.title_ar || product.short_description || product.title)
                          : language === "hi"
                          ? (product.short_description_hi || product.title_hi || t(product.title || product.short_description || ""))
                          : language === "es"
                          ? (product.short_description_es || product.title_es || t(product.title || product.short_description || ""))
                          : language === "pt"
                          ? (product.short_description_pt || product.title_pt || t(product.title || product.short_description || ""))
                          : (product.short_description || product.title)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div
              style={{ padding: "15px", textAlign: "center", color: "#666" }}
            >
              {t("No products found")}
            </div>
          )}
        </>
      )}
    </div>
  );
}

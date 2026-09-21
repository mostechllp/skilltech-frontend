"use client";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

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
  name_ar?: string;
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

interface OldMegaMenuProps {
  isMegamenuOpen: boolean;
  mobileTierLevel: number;
  mainCategories: MainCategory[];
  activeMainCat: MainCategory | null;
  activeCat: Category | null;
  handleMainCatClick: (main: MainCategory) => void;
  handleCatClick: (cat: Category) => void;
  setIsMegamenuOpen: (open: boolean) => void;
  setMobileTierLevel: (level: number) => void;
  router: any;
  handleLinkClick: () => void;
}

export default function OldMegaMenu({
  isMegamenuOpen,
  mobileTierLevel,
  mainCategories,
  activeMainCat,
  activeCat,
  handleMainCatClick,
  handleCatClick,
  setIsMegamenuOpen,
  setMobileTierLevel,
  router,
  handleLinkClick,
}: OldMegaMenuProps) {
  const { language, t } = useLanguage();
  return (
    <div
      className={`megamenu tiered-megamenu ${isMegamenuOpen ? "active" : ""} mobile-tier-${mobileTierLevel}`}
    >
      <div className="container">
        <div className="tiered-wrapper">
          {/* Sidebar 1: Main Categories */}
          <div className="tiered-sidebar main-sidebar">
            <div className="mobile-only-header d-lg-none">
              <span>Products</span>
              <button
                onClick={() => setIsMegamenuOpen(false)}
                className="close-menu-btn ms-auto"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <ul>
              {mainCategories.map((main) => (
                <li
                  key={main.id}
                  className={activeMainCat?.id === main.id ? "active" : ""}
                  onClick={() => handleMainCatClick(main)}
                >
                  <span>{language === "ar" && main.name_ar ? main.name_ar : main.name}</span>
                  <i className="fa fa-chevron-right"></i>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar 2: Categories */}
          <div className="tiered-sidebar category-sidebar">
            <div className="mobile-only-header d-lg-none">
              <button
                onClick={() => setMobileTierLevel(0)}
                className="back-btn"
              >
                <i className="fa fa-chevron-left"></i> Back
              </button>
              <span>{language === "ar" && activeMainCat?.name_ar ? activeMainCat.name_ar : activeMainCat?.name}</span>
              <button
                onClick={() => setIsMegamenuOpen(false)}
                className="close-menu-btn ms-auto"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            {activeMainCat && (
              <ul>
                {activeMainCat.categories?.map((cat) =>
                  cat.flatten_in_menu ? (
                    cat.subcategories?.map((sub) => (
                      <li
                        key={`sub-${sub.id}`}
                        onClick={() => {
                          router.push(`/${cat.slug}/${sub.slug}`);
                          handleLinkClick();
                        }}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ flex: 1 }}>{language === "ar" && sub.name_ar ? sub.name_ar : sub.name}</span>
                        <i className="fa fa-chevron-right"></i>
                      </li>
                    ))
                  ) : (
                    <li
                      key={`cat-${cat.id}`}
                      className={`${activeCat?.id === cat.id ? "active" : ""}`}
                      onClick={() => handleCatClick(cat)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ flex: 1 }}>{language === "ar" && cat.name_ar ? cat.name_ar : cat.name}</span>
                      <i className="fa fa-chevron-right"></i>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>

          {/* Section 3: Subcategories (Right Content) */}
          <div className="tiered-content subcategory-content">
            <div className="mobile-only-header d-lg-none">
              <button
                onClick={() => setMobileTierLevel(1)}
                className="back-btn"
              >
                <i className="fa fa-chevron-left"></i> Back
              </button>
              <span>{language === "ar" && activeCat?.name_ar ? activeCat.name_ar : activeCat?.name}</span>
              <button
                onClick={() => setIsMegamenuOpen(false)}
                className="close-menu-btn ms-auto"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            {activeCat && !activeCat.flatten_in_menu && (
              <div className="sub-grid mt-3">
                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2 px-3 px-lg-0">
                  <h4 className="sub-title mb-0 border-0 pb-0 d-none d-lg-block">
                    {language === "ar" && activeCat.name_ar ? activeCat.name_ar : activeCat.name}
                  </h4>
                  <Link
                    href={`/${activeCat.slug}`}
                    onClick={handleLinkClick}
                    className="view-all-btn"
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#f10182",
                      textDecoration: "none",
                      border: "1px solid #f10182",
                      padding: "4px 12px",
                      borderRadius: "20px",
                    }}
                  >
                    View All{" "}
                    <i
                      className="fa fa-arrow-right ms-1"
                      style={{ fontSize: "10px" }}
                    ></i>
                  </Link>
                </div>
                <ul
                  className="subcategory-final-list"
                  style={{ padding: 0, margin: 0, listStyle: "none" }}
                >
                  {activeCat.subcategories?.map((sub) => (
                    <li key={sub.id} style={{ borderBottom: "1px solid #eee" }}>
                      <Link
                        href={`/${activeCat.slug}/${sub.slug}`}
                        onClick={handleLinkClick}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 20px",
                          color: "#666",
                          textDecoration: "none",
                          fontSize: "14px",
                          borderLeft: sub.multi_expand ? "3px solid #f10182" : "none",
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span>{language === "ar" && sub.name_ar ? sub.name_ar : sub.name}</span>
                          {sub.multi_expand && (
                            <ul className="list-unstyled ps-0 mt-2 ms-2">
                              <li className="ps-2 mb-1" style={{ fontSize: "11px", color: "#666" }}>{t("Single Arm")}</li>
                              <li className="ps-2 mb-1" style={{ fontSize: "11px", color: "#666" }}>{t("Double Arm")}</li>
                              <li className="ps-2 mb-1" style={{ fontSize: "11px", color: "#666" }}>{t("Triple Arm")}</li>
                              <li className="ps-2" style={{ fontSize: "11px", color: "#666" }}>{t("Four Arm")}</li>
                            </ul>
                          )}
                        </div>
                        <i
                          className="fa fa-chevron-right"
                          style={{ fontSize: "10px", opacity: 0.5 }}
                        ></i>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
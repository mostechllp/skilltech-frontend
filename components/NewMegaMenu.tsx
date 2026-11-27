"use client";
import Link from "@/components/Link";
import { useLanguage } from "@/lib/LanguageContext";

interface SubCategory {
  id: number;
  name: string;
  name_ar?: string;
  name_hi?: string;
  slug: string;
  multi_expand: boolean;
}

interface Category {
  id: number;
  name: string;
  name_ar?: string;
  name_hi?: string;
  slug: string;
  flatten_in_menu: boolean;
  subcategories: SubCategory[];
}

interface MainCategory {
  id: number;
  name: string;
  name_ar?: string;
  name_hi?: string;
  slug: string;
  categories: Category[];
}
interface Arms {
  name: string;
  name_ar?: string;
  show_in_articulating: boolean;
  show_in_ergonomic: boolean;
  slug: string;
}

interface NewMegaMenuProps {
  isMegamenuOpen: boolean;
  mainCategories: MainCategory[];
  expandedCatId: number | null;
  setExpandedCatId: (id: number | null) => void;
  handleLinkClick: () => void;
  Arms: Arms[];
}

export default function NewMegaMenu({
  isMegamenuOpen,
  mainCategories,
  expandedCatId,
  setExpandedCatId,
  handleLinkClick,
  Arms,
}: NewMegaMenuProps) {
  const { language, t } = useLanguage();

  const getMainTitle = (main: MainCategory) => {
    if (language === "ar") return main.name_ar || t(main.name?.trim() || "");
    if (language === "hi") {
      const trans = t(main.name?.trim() || "");
      if (trans && trans !== main.name?.trim()) return trans;
      if ((main as any).name_hi && (main as any).name_hi !== main.name) return (main as any).name_hi;
      return trans || (main as any).name_hi || main.name;
    }
    if (language === "es") {
      const trans = t(main.name?.trim() || "");
      if (trans && trans !== main.name?.trim()) return trans;
      if ((main as any).name_es && (main as any).name_es !== main.name) return (main as any).name_es;
      return trans || (main as any).name_es || main.name;
    }
    if (language === "pt") {
      const trans = t(main.name?.trim() || "");
      if (trans && trans !== main.name?.trim()) return trans;
      if ((main as any).name_pt && (main as any).name_pt !== main.name) return (main as any).name_pt;
      return trans || (main as any).name_pt || main.name;
    }
    if (language === "fr") {
      const trans = t(main.name?.trim() || "");
      if (trans && trans !== main.name?.trim()) return trans;
      if ((main as any).name_fr && (main as any).name_fr !== main.name) return (main as any).name_fr;
      return trans || (main as any).name_fr || main.name;
    }
    if (language === "ru") {
      const trans = t(main.name?.trim() || "");
      if (trans && trans !== main.name?.trim()) return trans;
      if ((main as any).name_ru && (main as any).name_ru !== main.name) return (main as any).name_ru;
      return trans || (main as any).name_ru || main.name;
    }
    return main.name;
  };

  const getCategoryTitle = (cat: Category) => {
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
      if ((cat as any).name_es && (cat as any).name_es !== cat.name) return (cat as any).name_es;
      return trans || (cat as any).name_es || cat.name;
    }
    if (language === "pt") {
      const trans = t(cat.name?.trim() || "");
      if (trans && trans !== cat.name?.trim()) return trans;
      if ((cat as any).name_pt && (cat as any).name_pt !== cat.name) return (cat as any).name_pt;
      return trans || (cat as any).name_pt || cat.name;
    }
    if (language === "fr") {
      const trans = t(cat.name?.trim() || "");
      if (trans && trans !== cat.name?.trim()) return trans;
      if ((cat as any).name_fr && (cat as any).name_fr !== cat.name) return (cat as any).name_fr;
      return trans || (cat as any).name_fr || cat.name;
    }
    if (language === "ru") {
      const trans = t(cat.name?.trim() || "");
      if (trans && trans !== cat.name?.trim()) return trans;
      if ((cat as any).name_ru && (cat as any).name_ru !== cat.name) return (cat as any).name_ru;
      return trans || (cat as any).name_ru || cat.name;
    }
    return cat.name;
  };

  const getSubTitle = (sub: SubCategory) => {
    if (language === "ar") return sub.name_ar || t(sub.name?.trim() || "");
    if (language === "hi") {
      const trans = t(sub.name?.trim() || "");
      if (trans && trans !== sub.name?.trim()) return trans;
      if (sub.name_hi && sub.name_hi !== sub.name) return sub.name_hi;
      return trans || sub.name_hi || sub.name;
    }
    if (language === "es") {
      const trans = t(sub.name?.trim() || "");
      if (trans && trans !== sub.name?.trim()) return trans;
      if ((sub as any).name_es && (sub as any).name_es !== sub.name) return (sub as any).name_es;
      return trans || (sub as any).name_es || sub.name;
    }
    if (language === "pt") {
      const trans = t(sub.name?.trim() || "");
      if (trans && trans !== sub.name?.trim()) return trans;
      if ((sub as any).name_pt && (sub as any).name_pt !== sub.name) return (sub as any).name_pt;
      return trans || (sub as any).name_pt || sub.name;
    }
    if (language === "fr") {
      const trans = t(sub.name?.trim() || "");
      if (trans && trans !== sub.name?.trim()) return trans;
      if ((sub as any).name_fr && (sub as any).name_fr !== sub.name) return (sub as any).name_fr;
      return trans || (sub as any).name_fr || sub.name;
    }
    if (language === "ru") {
      const trans = t(sub.name?.trim() || "");
      if (trans && trans !== sub.name?.trim()) return trans;
      if ((sub as any).name_ru && (sub as any).name_ru !== sub.name) return (sub as any).name_ru;
      return trans || (sub as any).name_ru || sub.name;
    }
    return sub.name;
  };

  return (
    <div className={`megamenu new-megamenu ${isMegamenuOpen ? "active" : ""}`}>
      <div className="container">
        <div className="row py-2">
          {mainCategories.map((main) => (
            <div key={main.id} className="col-lg-3 col-md-6 mb-lg-0">
              <div className="megamenu-title">
                {getMainTitle(main)}
              </div>
              <ul className="list-unstyled">
                {main.categories?.map((cat) =>
                  cat.flatten_in_menu ? (
                    cat.subcategories?.map((sub) => (
                      <li key={`sub-${sub.id}`} className="">
                        <Link
                          href={`/${cat.slug}/${sub.slug}`}
                          onClick={handleLinkClick}
                          className="category-header d-flex justify-content-between align-items-center py-1"
                          style={{
                            cursor: "pointer",
                            fontSize: "18px",
                            fontWeight: "500",
                            color: "#333",
                            transition: "all 0.2s ease",
                            textDecoration: "none",
                          }}
                        >
                          <span className="me-2">
                            {getSubTitle(sub)}
                          </span>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li key={cat.id} className="">
                      <div
                        className="category-header d-flex justify-content-between align-items-center py-1"
                        onClick={() =>
                          setExpandedCatId(
                            expandedCatId === cat.id ? null : cat.id,
                          )
                        }
                        style={{
                          cursor: "pointer",
                          fontSize: "18px",
                          fontWeight: "500",
                          color: "#333",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <span className="me-2">
                          {getCategoryTitle(cat)}
                        </span>
                        <i
                          className={`fa fa-chevron-${expandedCatId === cat.id ? "down" : "right"}`}
                          style={{ fontSize: "10px", color: "#999" }}
                        ></i>
                      </div>
                      {expandedCatId === cat.id && (
                        <div className="subcategory-wrapper mt-2">
                          <ul
                            className="list-unstyled ps-3 border-start"
                            style={{ display: "block", width: "100%" }}
                          >
                            {cat.subcategories?.map((sub) => (
                              <li
                                key={sub.id}
                                className="mb-2"
                                style={{ display: "block" }}
                              >
                                <Link
                                  href={`/${cat.slug}/${sub.slug}`}
                                  onClick={handleLinkClick}
                                  style={{
                                    fontSize: "17px",
                                    color: "#666",
                                    textDecoration: "none",
                                    display: "block",
                                    padding: "2px 0 2px 10px",
                                    borderLeft:
                                      sub.multi_expand ||
                                      sub.slug === "desktop-mount"
                                        ? "2px solid #f10182"
                                        : "none",
                                  }}
                                  className="hover-link"
                                >
                                  {getSubTitle(sub)}
                                </Link>
                                {sub.multi_expand && (
                                  <ul className="list-unstyled ps-0 mt-2 ms-2">
                                    {Arms?.map((arm, index) => {
                                      return (
                                        ((arm?.show_in_ergonomic &&
                                          sub.slug == "ergonomic") ||
                                          (arm?.show_in_articulating &&
                                            sub.slug ==
                                              "articulating-monitor-arm")) && (
                                          <li key={index} className="mb-1">
                                            <Link
                                              href={`/${cat.slug}/${sub.slug}/${arm?.slug}`}
                                              onClick={handleLinkClick}
                                              className="ps-2"
                                              style={{
                                                fontSize: "16px",
                                                color: "#666",
                                                textDecoration: "none",
                                                display: "block",
                                              }}
                                            >
                                              {language === "ar" && arm?.name_ar ? arm.name_ar : t(arm?.name || "")}
                                            </Link>
                                          </li>
                                        )
                                      );
                                    })}
                                    {/* <li className="mb-1">
                                      <Link href={`/${cat.slug}/${sub.slug}?arm=single`} onClick={handleLinkClick} className="ps-2" style={{ fontSize: "12px", color: "#666", textDecoration: "none", display: "block" }}>Single Arm</Link>
                                    </li>
                                    <li className="mb-1">
                                      <Link href={`/${cat.slug}/${sub.slug}?arm=double`} onClick={handleLinkClick} className="ps-2" style={{ fontSize: "12px", color: "#666", textDecoration: "none", display: "block" }}>Double Arm</Link>
                                    </li>
                                    <li className="mb-1">
                                      <Link href={`/${cat.slug}/${sub.slug}?arm=triple`} onClick={handleLinkClick} className="ps-2" style={{ fontSize: "12px", color: "#666", textDecoration: "none", display: "block" }}>Triple Arm</Link>
                                    </li>
                                    <li>
                                      <Link href={`/${cat.slug}/${sub.slug}?arm=four`} onClick={handleLinkClick} className="ps-2" style={{ fontSize: "12px", color: "#666", textDecoration: "none", display: "block" }}>Quad Arm</Link>
                                    </li>
                                  
                                    {sub.slug==="ergonomic"&&
                                    <li>
                                      <Link href={`/${cat.slug}/${sub.slug}?arm=six`} onClick={handleLinkClick} className="ps-2" style={{ fontSize: "12px", color: "#666", textDecoration: "none", display: "block" }}>Six Arm</Link>
                                    </li>
                                    } */}
                                  </ul>
                                )}
                              </li>
                            ))}
                            {cat.subcategories?.length === 0 && (
                              <li
                                style={{
                                  fontSize: "17px",
                                  color: "#999",
                                  fontStyle: "italic",
                                  padding: "2px 0",
                                }}
                              >
                                No subcategories
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

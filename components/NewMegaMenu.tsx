"use client";
import Link from "@/components/Link";
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
  const { language } = useLanguage();
  return (
    <div className={`megamenu new-megamenu ${isMegamenuOpen ? "active" : ""}`}>
      <div className="container">
        <div className="row py-2">
          {mainCategories.map((main) => (
            <div key={main.id} className="col-lg-3 col-md-6 mb-lg-0">
              <h5 className="megamenu-title">{language === "ar" && main.name_ar ? main.name_ar : main.name}</h5>
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
                          <span className="me-2">{language === "ar" && sub.name_ar ? sub.name_ar : sub.name}</span>
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
                        <span className="me-2">{language === "ar" && cat.name_ar ? cat.name_ar : cat.name}</span>
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
                                  {language === "ar" && sub.name_ar ? sub.name_ar : sub.name}
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
                                              href={`/${cat.slug}/${sub.slug}?arm=${arm?.slug}`}
                                              onClick={handleLinkClick}
                                              className="ps-2"
                                              style={{
                                                fontSize: "16px",
                                                color: "#666",
                                                textDecoration: "none",
                                                display: "block",
                                              }}
                                            >
                                              {language === "ar" && arm?.name_ar ? arm.name_ar : arm?.name}
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

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { translations } from "./translations";

type Language = "en" | "ar" | "hi" | "es" | "pt" | "fr" | "ru";

interface LanguageContextProps {
  language: Language;
  dir: "ltr" | "rtl";
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLanguage: Language }> = ({ children, initialLanguage }) => {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const router = useRouter();
  const pathname = usePathname();

  // Sync state with URL pathname changes (handles back/forward navigation and direct links)
  useEffect(() => {
    const browserPath = typeof window !== "undefined" ? window.location.pathname : pathname;

    if (browserPath === "/ar" || browserPath.startsWith("/ar/") || pathname === "/ar" || pathname.startsWith("/ar/")) {
      setLanguageState("ar");
    } else if (browserPath === "/hi" || browserPath.startsWith("/hi/") || pathname === "/hi" || pathname.startsWith("/hi/")) {
      setLanguageState("hi");
    } else if (browserPath === "/es" || browserPath.startsWith("/es/") || pathname === "/es" || pathname.startsWith("/es/")) {
      setLanguageState("es");
    } else if (browserPath === "/pt" || browserPath.startsWith("/pt/") || pathname === "/pt" || pathname.startsWith("/pt/")) {
      setLanguageState("pt");
    } else if (browserPath === "/fr" || browserPath.startsWith("/fr/") || pathname === "/fr" || pathname.startsWith("/fr/")) {
      setLanguageState("fr");
    } else if (browserPath === "/ru" || browserPath.startsWith("/ru/") || pathname === "/ru" || pathname.startsWith("/ru/")) {
      setLanguageState("ru");
    } else {
      setLanguageState("en");
    }
  }, [pathname]);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;

    setLanguageState(lang);

    // Use current browser pathname if available, otherwise fall back to pathname
    const currentPath = typeof window !== "undefined" ? window.location.pathname : pathname;

    // Strip existing language prefix (/ar, /hi, /es, /pt, /fr or /ru)
    let cleanPath = currentPath.replace(/^\/(ar|hi|es|pt|fr|ru)(\/|$)/, "/");
    if (!cleanPath.startsWith("/")) {
      cleanPath = "/" + cleanPath;
    }

    let newUrl = cleanPath;
    if (lang === "ar") {
      newUrl = cleanPath === "/" ? "/ar" : `/ar${cleanPath}`;
    } else if (lang === "hi") {
      newUrl = cleanPath === "/" ? "/hi" : `/hi${cleanPath}`;
    } else if (lang === "es") {
      newUrl = cleanPath === "/" ? "/es" : `/es${cleanPath}`;
    } else if (lang === "pt") {
      newUrl = cleanPath === "/" ? "/pt" : `/pt${cleanPath}`;
    } else if (lang === "fr") {
      newUrl = cleanPath === "/" ? "/fr" : `/fr${cleanPath}`;
    } else if (lang === "ru") {
      newUrl = cleanPath === "/" ? "/ru" : `/ru${cleanPath}`;
    } else {
      newUrl = cleanPath;
    }

    // Set cookie and navigate
    document.cookie = `language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    localStorage.setItem("language", lang);

    const suffix = typeof window !== "undefined" ? window.location.search : "";
    window.location.href = newUrl + suffix;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  // Sync lang, dir, and Bootstrap CSS stylesheet on language change
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = dir;

      // Update Bootstrap stylesheet dynamically (only Arabic uses RTL stylesheet)
      const bootstrapLink = document.getElementById("bootstrap-theme") as HTMLLinkElement;
      if (bootstrapLink) {
        bootstrapLink.href =
          language === "ar"
            ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css"
            : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
      }
    }
  }, [language, dir]);

  const normalizeStr = (s: string) =>
    (s || "")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u00a0\s]+/g, " ")
      .trim();

  const t = (key: string): string => {
    if (!key || typeof key !== "string") return "";

    const clean = normalizeStr(key);
    if (!clean) return "";

    const lower = clean.toLowerCase();
    const langDict = ((translations as any)?.[language] || {}) as Record<string, string>;

    if (langDict) {
      if (key in langDict) return langDict[key];
      if (clean in langDict) return langDict[clean];
      for (const [k, v] of Object.entries(langDict)) {
        if (normalizeStr(k).toLowerCase() === lower) return v;
      }
    }

    // Comma-separated multi-value fallback (e.g. "Wall Mounted,Under Desk")
    if (language !== "en" && clean.includes(",")) {
      const parts = clean.split(",");
      const translatedParts = parts.map((p) => {
        const trimmedPart = p.trim();
        if (!trimmedPart) return "";
        const transPart = t(trimmedPart);
        return transPart || trimmedPart;
      });
      const hasAnyTranslation = translatedParts.some(
        (tp, idx) => tp && tp.toLowerCase() !== parts[idx].trim().toLowerCase()
      );
      if (hasAnyTranslation) {
        return translatedParts.join(", ");
      }
    }

    // Fallback to English dictionary if key not found
    const enDict = ((translations as any)?.["en"] || {}) as Record<string, string>;
    if (enDict) {
      if (key in enDict) return enDict[key];
      if (clean in enDict) return enDict[clean];
      for (const [k, v] of Object.entries(enDict)) {
        if (normalizeStr(k).toLowerCase() === lower) return v;
      }
    }

    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, dir, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

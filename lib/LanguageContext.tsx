"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { translations } from "./translations";

type Language = "en" | "ar";

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
    if (pathname === "/ar" || pathname.startsWith("/ar/")) {
      setLanguageState("ar");
    } else {
      setLanguageState("en");
    }
  }, [pathname]);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;

    let newUrl = pathname;
    if (lang === "ar") {
      if (pathname === "/") {
        newUrl = "/ar";
      } else if (!pathname.startsWith("/ar") && pathname !== "/ar") {
        newUrl = `/ar${pathname}`;
      }
    } else {
      if (pathname === "/ar") {
        newUrl = "/";
      } else if (pathname.startsWith("/ar/")) {
        newUrl = pathname.replace(/^\/ar/, "");
      }
    }

    // Set cookie and navigate
    document.cookie = `language=${lang}; path=/; max-age=31536000`;
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

      // Update Bootstrap stylesheet dynamically
      const bootstrapLink = document.getElementById("bootstrap-theme") as HTMLLinkElement;
      if (bootstrapLink) {
        bootstrapLink.href =
          language === "ar"
            ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css"
            : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
      }
    }
  }, [language, dir]);

  const t = (key: string): string => {
    const langDict = translations[language] as Record<string, string>;
    if (langDict && key in langDict) {
      return langDict[key];
    }
    // Fallback to English dictionary if key not found in Arabic
    const enDict = translations["en"] as Record<string, string>;
    if (enDict && key in enDict) {
      return enDict[key];
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

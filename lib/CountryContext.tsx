"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "./api";

export type GccCountryCode = "ae" | "sa" | "qa" | "kw" | "bh" | "om";

export interface CountryConfig {
  code: GccCountryCode;
  name: string;
  name_ar: string;
  short_name?: string;
  short_name_ar?: string;
  flag: string;
  company_name?: string;
  copyright_text?: string;
  mobile?: string;
  phone?: string;
  email?: string;
  address_heading?: string;
  address_heading_ar?: string;
  address?: string;
  address_ar?: string;
  whatsapp?: string;
  ctaLink?: string;
}

export const GCC_COUNTRIES: CountryConfig[] = [
  {
    code: "ae",
    name: "UAE",
    name_ar: "الإمارات",
    short_name: "UAE",
    short_name_ar: "الإمارات",
    flag: "/images/flags/ae.svg",
    copyright_text: "Skill Mount Electronics Trading LLC",
  },
  {
    code: "sa",
    name: "Saudi Arabia",
    name_ar: "المملكة العربية السعودية",
    short_name: "KSA",
    short_name_ar: "السعودية",
    flag: "/images/flags/sa.svg",
  },
  {
    code: "qa",
    name: "Qatar",
    name_ar: "قطر",
    short_name: "Qatar",
    short_name_ar: "قطر",
    flag: "/images/flags/qa.svg",
  },
  {
    code: "kw",
    name: "Kuwait",
    name_ar: "الكويت",
    short_name: "Kuwait",
    short_name_ar: "الكويت",
    flag: "/images/flags/kw.svg",
  },
  {
    code: "bh",
    name: "Bahrain",
    name_ar: "البحرين",
    short_name: "Bahrain",
    short_name_ar: "البحرين",
    flag: "/images/flags/bh.svg",
    company_name: "Skill Mount Trading WLL - Bahrain",
    copyright_text: "Skill Mount Trading WLL - Bahrain",
    mobile: "+973 3387 1133",
    phone: "+973 7790 3300",
    email: "accounts.bh@skilltechonline.com",
    address_heading: "Bahrain Office",
    address: "Shop No. 120A, 342 Al Maarif Ave, Al Qudaibiya, Bahrain",
    address_ar: "محل رقم 120A، 342 شارع المعارف، القضيبية، البحرين",
    whatsapp: "+97333871133",
  },
  {
    code: "om",
    name: "Oman",
    name_ar: "عُمان",
    short_name: "Oman",
    short_name_ar: "عُمان",
    flag: "/images/flags/om.svg",
  },
];

const DEFAULT_COUNTRY_CODE: GccCountryCode = "ae";

interface CountryContextProps {
  country: CountryConfig;
  countryCode: GccCountryCode;
  setCountry: (code: GccCountryCode) => void;
  countries: CountryConfig[];
}

const CountryContext = createContext<CountryContextProps | undefined>(undefined);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [countriesList, setCountriesList] = useState<CountryConfig[]>(GCC_COUNTRIES);
  const [countryCode, setCountryCode] = useState<GccCountryCode>(DEFAULT_COUNTRY_CODE);

  // Sync dynamic settings from Django Admin
  useEffect(() => {
    if (typeof window === "undefined") return;

    fetch(`${API_BASE_URL}/country-settings/?_t=${Date.now()}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((adminSettings) => {
        const list = Array.isArray(adminSettings) ? adminSettings : adminSettings?.results || [];
        if (list && list.length > 0) {
          const activeCountries: CountryConfig[] = list
            .map((remote: any) => {
              const code = remote.country_code?.toLowerCase();
              const gcc = GCC_COUNTRIES.find((item) => item.code === code);
              if (!gcc) return null;
              return {
                ...gcc,
                name: remote.country_name || gcc.name,
                name_ar: remote.country_name_ar || gcc.name_ar,
                company_name: remote.company_name !== undefined && remote.company_name !== null ? remote.company_name : gcc.company_name,
                copyright_text: remote.copyright_text !== undefined && remote.copyright_text !== null ? remote.copyright_text : gcc.copyright_text,
                phone: remote.phone !== undefined && remote.phone !== null ? remote.phone : gcc.phone,
                mobile: remote.mobile !== undefined && remote.mobile !== null ? remote.mobile : gcc.mobile,
                email: remote.email !== undefined && remote.email !== null ? remote.email : gcc.email,
                whatsapp: remote.whatsapp !== undefined && remote.whatsapp !== null ? remote.whatsapp : gcc.whatsapp,
                address_heading: remote.address_heading !== undefined && remote.address_heading !== null ? remote.address_heading : gcc.address_heading,
                address_heading_ar: remote.address_heading_ar !== undefined && remote.address_heading_ar !== null ? remote.address_heading_ar : gcc.address_heading_ar,
                address: remote.address !== undefined && remote.address !== null ? remote.address : gcc.address,
                address_ar: remote.address_ar !== undefined && remote.address_ar !== null ? remote.address_ar : gcc.address_ar,
              };
            })
            .filter((item: CountryConfig | null): item is CountryConfig => item !== null);

          if (activeCountries.length > 0) {
            setCountriesList(activeCountries);
            setCountryCode((curr) =>
              activeCountries.some((c) => c.code === curr)
                ? curr
                : activeCountries.find((c) => c.code === DEFAULT_COUNTRY_CODE)?.code || activeCountries[0].code
            );
          }
        }
      })
      .catch(() => {
        // Fallback to local defaults on any network error
      });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Check if visitor already manually selected a country
    const savedCountry = localStorage.getItem("selected_country") as GccCountryCode | null;
    const isValidGcc = savedCountry && GCC_COUNTRIES.some((c) => c.code === savedCountry);

    if (isValidGcc && savedCountry) {
      setCountryCode(savedCountry);
      return;
    }

    // 2. Check cookie fallback
    const match = document.cookie.match(/(?:^|;\s*)selected_country=([^;]+)/);
    const cookieCode = match ? (match[1] as GccCountryCode) : null;
    if (cookieCode && GCC_COUNTRIES.some((c) => c.code === cookieCode)) {
      setCountryCode(cookieCode);
      return;
    }

    // 3. Auto-detect country via IP
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // Failsafe 3.5s timeout

    fetch(`${API_BASE_URL}/detect-country/`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        clearTimeout(timeoutId);
        if (data && data.is_gcc && data.country) {
          const detected = data.country.toLowerCase() as GccCountryCode;
          if (GCC_COUNTRIES.some((c) => c.code === detected)) {
            setCountryCode(detected);
            document.cookie = `selected_country=${detected}; path=/; max-age=31536000`;
            localStorage.setItem("selected_country", detected);
            return;
          }
        }
        // If outside GCC, default to UAE
        setCountryCode(DEFAULT_COUNTRY_CODE);
      })
      .catch(() => {
        // Safe fallback on any network error or timeout
        setCountryCode(DEFAULT_COUNTRY_CODE);
      });

    return () => clearTimeout(timeoutId);
  }, []);

  const setCountry = (code: GccCountryCode) => {
    const target = countriesList.find((c) => c.code === code);
    if (!target) return;

    setCountryCode(code);
    if (typeof window !== "undefined") {
      localStorage.setItem("selected_country", code);
      document.cookie = `selected_country=${code}; path=/; max-age=31536000`;
    }
  };

  const currentCountry =
    countriesList.find((c) => c.code === countryCode) ||
    countriesList.find((c) => c.code === DEFAULT_COUNTRY_CODE) ||
    countriesList[0] ||
    GCC_COUNTRIES[0];

  return (
    <CountryContext.Provider
      value={{
        country: currentCountry,
        countryCode,
        setCountry,
        countries: countriesList,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
};


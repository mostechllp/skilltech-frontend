"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface Country {
  name: string;
  nameAr: string;
  code: string;
  dialCode: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { name: "United Arab Emirates", nameAr: "الإمارات العربية المتحدة", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "Saudi Arabia", nameAr: "المملكة العربية السعودية", code: "SA", dialCode: "+966", flag: "🇸🇦" },
  { name: "Oman", nameAr: "عمان", code: "OM", dialCode: "+968", flag: "🇴🇲" },
  { name: "Qatar", nameAr: "قطر", code: "QA", dialCode: "+974", flag: "🇶🇦" },
  { name: "Kuwait", nameAr: "الكويت", code: "KW", dialCode: "+965", flag: "🇰🇼" },
  { name: "Bahrain", nameAr: "البحرين", code: "BH", dialCode: "+973", flag: "🇧🇭" },
  { name: "India", nameAr: "الهند", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "Egypt", nameAr: "مصر", code: "EG", dialCode: "+20", flag: "🇪🇬" },
  { name: "Yemen", nameAr: "اليمن", code: "YE", dialCode: "+967", flag: "🇾🇪" },
  { name: "Iraq", nameAr: "العراق", code: "IQ", dialCode: "+964", flag: "🇮🇶" },
  { name: "Syria", nameAr: "سوريا", code: "SY", dialCode: "+963", flag: "🇸🇾" },
  { name: "Palestine", nameAr: "فلسطين", code: "PS", dialCode: "+970", flag: "🇵🇸" },
  { name: "Jordan", nameAr: "الأردن", code: "JO", dialCode: "+962", flag: "🇯🇴" },
  { name: "Lebanon", nameAr: "لبنان", code: "LB", dialCode: "+961", flag: "🇱🇧" },
  { name: "Morocco", nameAr: "المغرب", code: "MA", dialCode: "+212", flag: "🇲🇦" },
  { name: "Algeria", nameAr: "الجزائر", code: "DZ", dialCode: "+213", flag: "🇩🇿" },
  { name: "Tunisia", nameAr: "تونس", code: "TN", dialCode: "+216", flag: "🇹🇳" },
  { name: "Libya", nameAr: "ليبيا", code: "LY", dialCode: "+218", flag: "🇱🇾" },
  { name: "Sudan", nameAr: "السودان", code: "SD", dialCode: "+249", flag: "🇸🇩" },
  { name: "Turkey", nameAr: "تركيا", code: "TR", dialCode: "+90", flag: "🇹🇷" },
  { name: "Iran", nameAr: "إيران", code: "IR", dialCode: "+98", flag: "🇮🇷" },
  { name: "Afghanistan", nameAr: "أفغانستان", code: "AF", dialCode: "+93", flag: "🇦🇫" },
  { name: "Azerbaijan", nameAr: "أذربيجان", code: "AZ", dialCode: "+994", flag: "🇦🇿" },
  { name: "Kazakhstan", nameAr: "كازاخستان", code: "KZ", dialCode: "+7", flag: "🇰🇿" },
  { name: "Uzbekistan", nameAr: "أوزبكستان", code: "UZ", dialCode: "+998", flag: "🇺🇿" },
  { name: "United Kingdom", nameAr: "المملكة المتحدة", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "United States", nameAr: "الولايات المتحدة", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "Canada", nameAr: "كندا", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "Pakistan", nameAr: "باكستان", code: "PK", dialCode: "+92", flag: "🇵🇰" },
  { name: "Bangladesh", nameAr: "بنجلاديش", code: "BD", dialCode: "+880", flag: "🇧🇩" },
  { name: "Sri Lanka", nameAr: "سريلانكا", code: "LK", dialCode: "+94", flag: "🇱🇰" },
  { name: "Nepal", nameAr: "نيبال", code: "NP", dialCode: "+977", flag: "🇳🇵" },
  { name: "Philippines", nameAr: "الفلبين", code: "PH", dialCode: "+63", flag: "🇵🇭" },
  { name: "Russia", nameAr: "روسيا", code: "RU", dialCode: "+7", flag: "🇷🇺" },
  { name: "South Korea", nameAr: "كوريا الجنوبية", code: "KR", dialCode: "+82", flag: "🇰🇷" },
  { name: "Vietnam", nameAr: "فيتنام", code: "VN", dialCode: "+84", flag: "🇻🇳" },
  { name: "Thailand", nameAr: "تايلاند", code: "TH", dialCode: "+66", flag: "🇹🇭" },
  { name: "Germany", nameAr: "ألمانيا", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "France", nameAr: "فرنسا", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "Italy", nameAr: "إيطاليا", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { name: "Spain", nameAr: "إسبانيا", code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { name: "Netherlands", nameAr: "هولندا", code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { name: "Belgium", nameAr: "بلجيكا", code: "BE", dialCode: "+32", flag: "🇧🇪" },
  { name: "Switzerland", nameAr: "سويسرا", code: "CH", dialCode: "+41", flag: "🇨🇭" },
  { name: "Sweden", nameAr: "السويد", code: "SE", dialCode: "+46", flag: "🇸🇪" },
  { name: "Norway", nameAr: "النرويج", code: "NO", dialCode: "+47", flag: "🇳🇴" },
  { name: "Denmark", nameAr: "الدنمارك", code: "DK", dialCode: "+45", flag: "🇩🇰" },
  { name: "Finland", nameAr: "فنلندا", code: "FI", dialCode: "+358", flag: "🇫🇮" },
  { name: "Greece", nameAr: "اليونان", code: "GR", dialCode: "+30", flag: "🇬🇷" },
  { name: "Portugal", nameAr: "البرتغال", code: "PT", dialCode: "+351", flag: "🇵🇹" },
  { name: "Ireland", nameAr: "أيرلندا", code: "IE", dialCode: "+353", flag: "🇮🇪" },
  { name: "Poland", nameAr: "بولندا", code: "PL", dialCode: "+48", flag: "🇵🇱" },
  { name: "Austria", nameAr: "النمسا", code: "AT", dialCode: "+43", flag: "🇦🇹" },
  { name: "Ukraine", nameAr: "أوكرانيا", code: "UA", dialCode: "+380", flag: "🇺🇦" },
  { name: "Cyprus", nameAr: "قبرص", code: "CY", dialCode: "+357", flag: "🇨🇾" },
  { name: "South Africa", nameAr: "جنوب أفريقيا", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "Nigeria", nameAr: "نيجيريا", code: "NG", dialCode: "+234", flag: "🇳🇬" },
  { name: "Kenya", nameAr: "كينيا", code: "KE", dialCode: "+254", flag: "🇰🇪" },
  { name: "Brazil", nameAr: "البرازيل", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  { name: "Argentina", nameAr: "الأرجنتين", code: "AR", dialCode: "+54", flag: "🇦🇷" },
  { name: "Mexico", nameAr: "المكسيك", code: "MX", dialCode: "+52", flag: "🇲🇽" },
  { name: "Australia", nameAr: "أستراليا", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "New Zealand", nameAr: "نيوزيلندا", code: "NZ", dialCode: "+64", flag: "🇳🇿" },
  { name: "China", nameAr: "الصين", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "Japan", nameAr: "اليابان", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "Singapore", nameAr: "سنغافورة", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  { name: "Malaysia", nameAr: "ماليزيا", code: "MY", dialCode: "+60", flag: "🇲🇾" },
  { name: "Indonesia", nameAr: "إندونيسيا", code: "ID", dialCode: "+62", flag: "🇮🇩" },
];

interface PhoneInputProps {
  id?: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  placeholder?: string;
  required?: boolean;
  name?: string;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
}

export default function PhoneInput({
  id,
  value,
  onChange,
  placeholder,
  required = false,
  name = "phone",
  className = "",
  disabled = false,
  "aria-label": ariaLabel,
}: PhoneInputProps) {
  const { language, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // default UAE +971
  const [localNumber, setLocalNumber] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Sort countries by dialCode length descending to ensure accurate dial code matching
  const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);

  // Parse external value on mount/change
  useEffect(() => {
    if (!value) {
      setLocalNumber("");
      return;
    }
    
    // Find matching country
    const matched = sortedCountries.find((c) => value.startsWith(c.dialCode));
    if (matched) {
      setSelectedCountry(matched);
      setLocalNumber(value.slice(matched.dialCode.length).trim());
    } else {
      // If it doesn't match any known country, default to UAE and set local number to the whole value
      setSelectedCountry(COUNTRIES[0]);
      setLocalNumber(value);
    }
  }, [value]);

  // Handle local text input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // allow only numbers and basic formatting symbols (spaces, dashes)
    const cleaned = e.target.value.replace(/[^0-9\s-]/g, "");
    setLocalNumber(cleaned);
    onChange({
      target: {
        name,
        value: selectedCountry.dialCode + cleaned,
      },
    });
  };

  // Handle country selection
  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    onChange({
      target: {
        name,
        value: country.dialCode + localNumber,
      },
    });
    setIsOpen(false);
    setSearchQuery("");
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = COUNTRIES.filter((c) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = c.name.toLowerCase().includes(query);
    const nameArMatch = c.nameAr.includes(query);
    const codeMatch = c.code.toLowerCase().includes(query);
    const dialMatch = c.dialCode.includes(query);
    return nameMatch || nameArMatch || codeMatch || dialMatch;
  });

  return (
    <div 
      className={`phone-input-wrapper ${dir === "rtl" ? "rtl" : "ltr"} ${className}`} 
      ref={dropdownRef}
    >
      <div className="phone-input-container">
        {/* Country Selector Button */}
        <button
          type="button"
          className="country-select-btn"
          aria-label={language === "ar" ? "اختر رمز الدولة" : "Select country code"}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className="flag-icon">{selectedCountry.flag}</span>
          <span className="dial-code" dir="ltr">{selectedCountry.dialCode}</span>
          <span className={`chevron-icon ${isOpen ? "open" : ""}`}>▼</span>
        </button>

        {/* Local phone number input */}
        <input
          id={id}
          type="text"
          name={name}
          value={localNumber}
          onChange={handleInputChange}
          placeholder={placeholder || (language === "ar" ? "أدخل رقم الهاتف" : "Enter phone number")}
          required={required}
          disabled={disabled}
          className="phone-number-field"
          aria-label={ariaLabel || placeholder || (language === "ar" ? "رقم الهاتف" : "Phone number")}
        />
      </div>

      {/* Country Selection Dropdown */}
      {isOpen && (
        <div className="phone-country-dropdown-menu">
          <div className="phone-country-search-box">
            <i className="fa fa-search search-icon"></i>
            <input
              type="text"
              aria-label={language === "ar" ? "ابحث عن دولة" : "Search country"}
              placeholder={language === "ar" ? "ابحث عن دولة..." : "Search country..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="phone-country-search-input"
              autoFocus
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search-btn" 
                aria-label={language === "ar" ? "مسح البحث" : "Clear search"}
                onClick={() => setSearchQuery("")}
              >
                &times;
              </button>
            )}
          </div>
          
          <ul className="phone-country-list">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <li 
                  key={c.code} 
                  className={`phone-country-item ${c.code === selectedCountry.code ? "selected" : ""}`}
                  onClick={() => handleSelectCountry(c)}
                >
                  <span className="phone-country-flag">{c.flag}</span>
                  <span className="phone-country-name">
                    {language === "ar" ? c.nameAr : c.name}
                  </span>
                  <span className="phone-country-dial-code" dir="ltr">{c.dialCode}</span>
                </li>
              ))
            ) : (
              <li className="no-results">
                {language === "ar" ? "لا توجد نتائج" : "No results found"}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

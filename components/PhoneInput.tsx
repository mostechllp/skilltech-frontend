"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useCountry } from "@/lib/CountryContext";

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

  // Asia (additional)
  { name: "Armenia", nameAr: "أرمينيا", code: "AM", dialCode: "+374", flag: "🇦🇲" },
  { name: "Bhutan", nameAr: "بوتان", code: "BT", dialCode: "+975", flag: "🇧🇹" },
  { name: "Brunei", nameAr: "بروناي", code: "BN", dialCode: "+673", flag: "🇧🇳" },
  { name: "Cambodia", nameAr: "كمبوديا", code: "KH", dialCode: "+855", flag: "🇰🇭" },
  { name: "Georgia", nameAr: "جورجيا", code: "GE", dialCode: "+995", flag: "🇬🇪" },
  { name: "Israel", nameAr: "إسرائيل", code: "IL", dialCode: "+972", flag: "🇮🇱" },
  { name: "Kyrgyzstan", nameAr: "قيرغيزستان", code: "KG", dialCode: "+996", flag: "🇰🇬" },
  { name: "Laos", nameAr: "لاوس", code: "LA", dialCode: "+856", flag: "🇱🇦" },
  { name: "Maldives", nameAr: "المالديف", code: "MV", dialCode: "+960", flag: "🇲🇻" },
  { name: "Mongolia", nameAr: "منغوليا", code: "MN", dialCode: "+976", flag: "🇲🇳" },
  { name: "Myanmar", nameAr: "ميانمار", code: "MM", dialCode: "+95", flag: "🇲🇲" },
  { name: "North Korea", nameAr: "كوريا الشمالية", code: "KP", dialCode: "+850", flag: "🇰🇵" },
  { name: "Tajikistan", nameAr: "طاجيكستان", code: "TJ", dialCode: "+992", flag: "🇹🇯" },
  { name: "Timor-Leste", nameAr: "تيمور الشرقية", code: "TL", dialCode: "+670", flag: "🇹🇱" },
  { name: "Turkmenistan", nameAr: "تركمانستان", code: "TM", dialCode: "+993", flag: "🇹🇲" },

  // Europe (additional)
  { name: "Albania", nameAr: "ألبانيا", code: "AL", dialCode: "+355", flag: "🇦🇱" },
  { name: "Andorra", nameAr: "أندورا", code: "AD", dialCode: "+376", flag: "🇦🇩" },
  { name: "Belarus", nameAr: "بيلاروسيا", code: "BY", dialCode: "+375", flag: "🇧🇾" },
  { name: "Bosnia and Herzegovina", nameAr: "البوسنة والهرسك", code: "BA", dialCode: "+387", flag: "🇧🇦" },
  { name: "Bulgaria", nameAr: "بلغاريا", code: "BG", dialCode: "+359", flag: "🇧🇬" },
  { name: "Croatia", nameAr: "كرواتيا", code: "HR", dialCode: "+385", flag: "🇭🇷" },
  { name: "Czechia", nameAr: "التشيك", code: "CZ", dialCode: "+420", flag: "🇨🇿" },
  { name: "Estonia", nameAr: "إستونيا", code: "EE", dialCode: "+372", flag: "🇪🇪" },
  { name: "Hungary", nameAr: "المجر", code: "HU", dialCode: "+36", flag: "🇭🇺" },
  { name: "Iceland", nameAr: "آيسلندا", code: "IS", dialCode: "+354", flag: "🇮🇸" },
  { name: "Latvia", nameAr: "لاتفيا", code: "LV", dialCode: "+371", flag: "🇱🇻" },
  { name: "Liechtenstein", nameAr: "ليختنشتاين", code: "LI", dialCode: "+423", flag: "🇱🇮" },
  { name: "Lithuania", nameAr: "ليتوانيا", code: "LT", dialCode: "+370", flag: "🇱🇹" },
  { name: "Luxembourg", nameAr: "لوكسمبورغ", code: "LU", dialCode: "+352", flag: "🇱🇺" },
  { name: "Malta", nameAr: "مالطا", code: "MT", dialCode: "+356", flag: "🇲🇹" },
  { name: "Moldova", nameAr: "مولدوفا", code: "MD", dialCode: "+373", flag: "🇲🇩" },
  { name: "Monaco", nameAr: "موناكو", code: "MC", dialCode: "+377", flag: "🇲🇨" },
  { name: "Montenegro", nameAr: "الجبل الأسود", code: "ME", dialCode: "+382", flag: "🇲🇪" },
  { name: "North Macedonia", nameAr: "مقدونيا الشمالية", code: "MK", dialCode: "+389", flag: "🇲🇰" },
  { name: "Romania", nameAr: "رومانيا", code: "RO", dialCode: "+40", flag: "🇷🇴" },
  { name: "San Marino", nameAr: "سان مارينو", code: "SM", dialCode: "+378", flag: "🇸🇲" },
  { name: "Serbia", nameAr: "صربيا", code: "RS", dialCode: "+381", flag: "🇷🇸" },
  { name: "Slovakia", nameAr: "سلوفاكيا", code: "SK", dialCode: "+421", flag: "🇸🇰" },
  { name: "Slovenia", nameAr: "سلوفينيا", code: "SI", dialCode: "+386", flag: "🇸🇮" },
  { name: "Vatican City", nameAr: "الفاتيكان", code: "VA", dialCode: "+39", flag: "🇻🇦" },

  // Africa (additional)
  { name: "Angola", nameAr: "أنغولا", code: "AO", dialCode: "+244", flag: "🇦🇴" },
  { name: "Benin", nameAr: "بنين", code: "BJ", dialCode: "+229", flag: "🇧🇯" },
  { name: "Botswana", nameAr: "بوتسوانا", code: "BW", dialCode: "+267", flag: "🇧🇼" },
  { name: "Burkina Faso", nameAr: "بوركينا فاسو", code: "BF", dialCode: "+226", flag: "🇧🇫" },
  { name: "Burundi", nameAr: "بوروندي", code: "BI", dialCode: "+257", flag: "🇧🇮" },
  { name: "Cabo Verde", nameAr: "الرأس الأخضر", code: "CV", dialCode: "+238", flag: "🇨🇻" },
  { name: "Cameroon", nameAr: "الكاميرون", code: "CM", dialCode: "+237", flag: "🇨🇲" },
  { name: "Central African Republic", nameAr: "جمهورية أفريقيا الوسطى", code: "CF", dialCode: "+236", flag: "🇨🇫" },
  { name: "Chad", nameAr: "تشاد", code: "TD", dialCode: "+235", flag: "🇹🇩" },
  { name: "Comoros", nameAr: "جزر القمر", code: "KM", dialCode: "+269", flag: "🇰🇲" },
  { name: "Republic of the Congo", nameAr: "جمهورية الكونغو", code: "CG", dialCode: "+242", flag: "🇨🇬" },
  { name: "Democratic Republic of the Congo", nameAr: "جمهورية الكونغو الديمقراطية", code: "CD", dialCode: "+243", flag: "🇨🇩" },
  { name: "Cote d'Ivoire (Ivory Coast)", nameAr: "ساحل العاج", code: "CI", dialCode: "+225", flag: "🇨🇮" },
  { name: "Djibouti", nameAr: "جيبوتي", code: "DJ", dialCode: "+253", flag: "🇩🇯" },
  { name: "Equatorial Guinea", nameAr: "غينيا الاستوائية", code: "GQ", dialCode: "+240", flag: "🇬🇶" },
  { name: "Eritrea", nameAr: "إريتريا", code: "ER", dialCode: "+291", flag: "🇪🇷" },
  { name: "Eswatini", nameAr: "إسواتيني", code: "SZ", dialCode: "+268", flag: "🇸🇿" },
  { name: "Ethiopia", nameAr: "إثيوبيا", code: "ET", dialCode: "+251", flag: "🇪🇹" },
  { name: "Gabon", nameAr: "الغابون", code: "GA", dialCode: "+241", flag: "🇬🇦" },
  { name: "Gambia", nameAr: "غامبيا", code: "GM", dialCode: "+220", flag: "🇬🇲" },
  { name: "Ghana", nameAr: "غانا", code: "GH", dialCode: "+233", flag: "🇬🇭" },
  { name: "Guinea", nameAr: "غينيا", code: "GN", dialCode: "+224", flag: "🇬🇳" },
  { name: "Guinea-Bissau", nameAr: "غينيا بيساو", code: "GW", dialCode: "+245", flag: "🇬🇼" },
  { name: "Lesotho", nameAr: "ليسوتو", code: "LS", dialCode: "+266", flag: "🇱🇸" },
  { name: "Liberia", nameAr: "ليبيريا", code: "LR", dialCode: "+231", flag: "🇱🇷" },
  { name: "Madagascar", nameAr: "مدغشقر", code: "MG", dialCode: "+261", flag: "🇲🇬" },
  { name: "Malawi", nameAr: "مالاوي", code: "MW", dialCode: "+265", flag: "🇲🇼" },
  { name: "Mali", nameAr: "مالي", code: "ML", dialCode: "+223", flag: "🇲🇱" },
  { name: "Mauritania", nameAr: "موريتانيا", code: "MR", dialCode: "+222", flag: "🇲🇷" },
  { name: "Mauritius", nameAr: "موريشيوس", code: "MU", dialCode: "+230", flag: "🇲🇺" },
  { name: "Mozambique", nameAr: "موزمبيق", code: "MZ", dialCode: "+258", flag: "🇲🇿" },
  { name: "Namibia", nameAr: "ناميبيا", code: "NA", dialCode: "+264", flag: "🇳🇦" },
  { name: "Niger", nameAr: "النيجر", code: "NE", dialCode: "+227", flag: "🇳🇪" },
  { name: "Rwanda", nameAr: "رواندا", code: "RW", dialCode: "+250", flag: "🇷🇼" },
  { name: "Sao Tome and Principe", nameAr: "ساو تومي وبرينسيبي", code: "ST", dialCode: "+239", flag: "🇸🇹" },
  { name: "Senegal", nameAr: "السنغال", code: "SN", dialCode: "+221", flag: "🇸🇳" },
  { name: "Seychelles", nameAr: "سيشل", code: "SC", dialCode: "+248", flag: "🇸🇨" },
  { name: "Sierra Leone", nameAr: "سيراليون", code: "SL", dialCode: "+232", flag: "🇸🇱" },
  { name: "Somalia", nameAr: "الصومال", code: "SO", dialCode: "+252", flag: "🇸🇴" },
  { name: "South Sudan", nameAr: "جنوب السودان", code: "SS", dialCode: "+211", flag: "🇸🇸" },
  { name: "Tanzania", nameAr: "تنزانيا", code: "TZ", dialCode: "+255", flag: "🇹🇿" },
  { name: "Togo", nameAr: "توغو", code: "TG", dialCode: "+228", flag: "🇹🇬" },
  { name: "Uganda", nameAr: "أوغندا", code: "UG", dialCode: "+256", flag: "🇺🇬" },
  { name: "Zambia", nameAr: "زامبيا", code: "ZM", dialCode: "+260", flag: "🇿🇲" },
  { name: "Zimbabwe", nameAr: "زيمبابوي", code: "ZW", dialCode: "+263", flag: "🇿🇼" },

  // Americas & Caribbean (additional)
  { name: "Antigua and Barbuda", nameAr: "أنتيغوا وبربودا", code: "AG", dialCode: "+1268", flag: "🇦🇬" },
  { name: "Bahamas", nameAr: "جزر البهاما", code: "BS", dialCode: "+1242", flag: "🇧🇸" },
  { name: "Barbados", nameAr: "بربادوس", code: "BB", dialCode: "+1246", flag: "🇧🇧" },
  { name: "Belize", nameAr: "بليز", code: "BZ", dialCode: "+501", flag: "🇧🇿" },
  { name: "Bolivia", nameAr: "بوليفيا", code: "BO", dialCode: "+591", flag: "🇧🇴" },
  { name: "Chile", nameAr: "تشيلي", code: "CL", dialCode: "+56", flag: "🇨🇱" },
  { name: "Colombia", nameAr: "كولومبيا", code: "CO", dialCode: "+57", flag: "🇨🇴" },
  { name: "Costa Rica", nameAr: "كوستاريكا", code: "CR", dialCode: "+506", flag: "🇨🇷" },
  { name: "Cuba", nameAr: "كوبا", code: "CU", dialCode: "+53", flag: "🇨🇺" },
  { name: "Dominica", nameAr: "دومينيكا", code: "DM", dialCode: "+1767", flag: "🇩🇲" },
  { name: "Dominican Republic", nameAr: "جمهورية الدومينيكان", code: "DO", dialCode: "+1809", flag: "🇩🇴" },
  { name: "Ecuador", nameAr: "الإكوادور", code: "EC", dialCode: "+593", flag: "🇪🇨" },
  { name: "El Salvador", nameAr: "السلفادور", code: "SV", dialCode: "+503", flag: "🇸🇻" },
  { name: "Grenada", nameAr: "غرينادا", code: "GD", dialCode: "+1473", flag: "🇬🇩" },
  { name: "Guatemala", nameAr: "غواتيمالا", code: "GT", dialCode: "+502", flag: "🇬🇹" },
  { name: "Guyana", nameAr: "غيانا", code: "GY", dialCode: "+592", flag: "🇬🇾" },
  { name: "Haiti", nameAr: "هايتي", code: "HT", dialCode: "+509", flag: "🇭🇹" },
  { name: "Honduras", nameAr: "هندوراس", code: "HN", dialCode: "+504", flag: "🇭🇳" },
  { name: "Jamaica", nameAr: "جامايكا", code: "JM", dialCode: "+1876", flag: "🇯🇲" },
  { name: "Nicaragua", nameAr: "نيكاراغوا", code: "NI", dialCode: "+505", flag: "🇳🇮" },
  { name: "Panama", nameAr: "بنما", code: "PA", dialCode: "+507", flag: "🇵🇦" },
  { name: "Paraguay", nameAr: "باراغواي", code: "PY", dialCode: "+595", flag: "🇵🇾" },
  { name: "Peru", nameAr: "بيرو", code: "PE", dialCode: "+51", flag: "🇵🇪" },
  { name: "Saint Kitts and Nevis", nameAr: "سانت كيتس ونيفيس", code: "KN", dialCode: "+1869", flag: "🇰🇳" },
  { name: "Saint Lucia", nameAr: "سانت لوسيا", code: "LC", dialCode: "+1758", flag: "🇱🇨" },
  { name: "Saint Vincent and the Grenadines", nameAr: "سانت فنسنت والغرينادين", code: "VC", dialCode: "+1784", flag: "🇻🇨" },
  { name: "Suriname", nameAr: "سورينام", code: "SR", dialCode: "+597", flag: "🇸🇷" },
  { name: "Trinidad and Tobago", nameAr: "ترينيداد وتوباغو", code: "TT", dialCode: "+1868", flag: "🇹🇹" },
  { name: "Uruguay", nameAr: "أوروغواي", code: "UY", dialCode: "+598", flag: "🇺🇾" },
  { name: "Venezuela", nameAr: "فنزويلا", code: "VE", dialCode: "+58", flag: "🇻🇪" },

  // Oceania (additional)
  { name: "Fiji", nameAr: "فيجي", code: "FJ", dialCode: "+679", flag: "🇫🇯" },
  { name: "Kiribati", nameAr: "كيريباتي", code: "KI", dialCode: "+686", flag: "🇰🇮" },
  { name: "Marshall Islands", nameAr: "جزر مارشال", code: "MH", dialCode: "+692", flag: "🇲🇭" },
  { name: "Micronesia", nameAr: "ميكرونيسيا", code: "FM", dialCode: "+691", flag: "🇫🇲" },
  { name: "Nauru", nameAr: "ناورو", code: "NR", dialCode: "+674", flag: "🇳🇷" },
  { name: "Palau", nameAr: "بالاو", code: "PW", dialCode: "+680", flag: "🇵🇼" },
  { name: "Papua New Guinea", nameAr: "بابوا غينيا الجديدة", code: "PG", dialCode: "+675", flag: "🇵🇬" },
  { name: "Samoa", nameAr: "ساموا", code: "WS", dialCode: "+685", flag: "🇼🇸" },
  { name: "Solomon Islands", nameAr: "جزر سليمان", code: "SB", dialCode: "+677", flag: "🇸🇧" },
  { name: "Tonga", nameAr: "تونغا", code: "TO", dialCode: "+676", flag: "🇹🇴" },
  { name: "Tuvalu", nameAr: "توفالو", code: "TV", dialCode: "+688", flag: "🇹🇻" },
  { name: "Vanuatu", nameAr: "فانواتو", code: "VU", dialCode: "+678", flag: "🇻🇺" },

  // Additional territories
  { name: "Hong Kong", nameAr: "هونغ كونغ", code: "HK", dialCode: "+852", flag: "🇭🇰" },
  { name: "Macau", nameAr: "ماكاو", code: "MO", dialCode: "+853", flag: "🇲🇴" },
  { name: "Taiwan", nameAr: "تايوان", code: "TW", dialCode: "+886", flag: "🇹🇼" },
  { name: "Kosovo", nameAr: "كوسوفو", code: "XK", dialCode: "+383", flag: "🇽🇰" },
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
  
  let currentCountryCode = "ae";
  try {
    const countryContext = useCountry();
    if (countryContext?.countryCode) {
      currentCountryCode = countryContext.countryCode;
    }
  } catch {
    currentCountryCode = "ae";
  }

  const defaultCountry =
    COUNTRIES.find((c) => c.code.toLowerCase() === currentCountryCode.toLowerCase()) || COUNTRIES[0];

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(defaultCountry);
  const [localNumber, setLocalNumber] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Sort countries by dialCode length descending to ensure accurate dial code matching
  const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);

  // Parse external value on mount/change, or adopt active GCC country if empty
  useEffect(() => {
    if (!value) {
      setLocalNumber("");
      setSelectedCountry(defaultCountry);
      return;
    }
    
    // Find matching country
    const matched = sortedCountries.find((c) => value.startsWith(c.dialCode));
    if (matched) {
      setSelectedCountry(matched);
      setLocalNumber(value.slice(matched.dialCode.length).trim());
    } else {
      setSelectedCountry(defaultCountry);
      setLocalNumber(value);
    }
  }, [value, currentCountryCode]);

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

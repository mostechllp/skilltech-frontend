"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "@/components/Link";
import Image from "next/image";
import { toPng } from "html-to-image";
import { useLanguage } from "@/lib/LanguageContext";
import { submitEnquiry } from "@/lib/api";
import Captcha from "@/components/Captcha";
import ProductCard from "@/components/ProductCard";
import PhoneInput from "@/components/PhoneInput";

interface Feature {
  icon: string;
  value: string;
  feature: {
    title: string;
    title_ar?: string;
  };
}

export default function ProductDetailClient({
  product,
  images,
  mediaBaseUrl,
  similarProducts = [],
  categorySlug,
  subcategorySlug,
}: {
  product: any;
  images: { src: string; alt: string }[];
  mediaBaseUrl: string;
  similarProducts?: any[];
  categorySlug?: string;
  subcategorySlug?: string;
}) {
  const { t, language } = useLanguage();
  const getProductTitle = () => {
    if (language === "ar") return product.title_ar || t(product.title) || product.title;
    if (language === "hi") {
      if (product.title_hi && product.title_hi !== product.title) return product.title_hi;
      const trans = t(product.title || "");
      if (trans && trans !== product.title) return trans;
      return product.title_hi || product.title;
    }
    if (language === "es") {
      if (product.title_es && product.title_es !== product.title) return product.title_es;
      const trans = t(product.title || "");
      if (trans && trans !== product.title) return trans;
      return product.title_es || product.title;
    }
    if (language === "pt") {
      if (product.title_pt && product.title_pt !== product.title) return product.title_pt;
      const trans = t(product.title || "");
      if (trans && trans !== product.title) return trans;
      return product.title_pt || product.title;
    }
    if (language === "fr") {
      if (product.title_fr && product.title_fr !== product.title) return product.title_fr;
      const trans = t(product.title || "");
      if (trans && trans !== product.title) return trans;
      return product.title_fr || product.title;
    }
    if (language === "ru") {
      if (product.title_ru && product.title_ru !== product.title) return product.title_ru;
      const trans = t(product.title || "");
      if (trans && trans !== product.title) return trans;
      return product.title_ru || product.title;
    }
    return product.title;
  };
  const productTitle = getProductTitle();

  const getProductDescription = () => {
    if (language === "ar") return product.description_ar || t(product.description) || product.description;
    if (language === "hi") {
      if (product.description_hi && product.description_hi !== product.description) return product.description_hi;
      const trans = t(product.description || "");
      if (trans && trans !== product.description) return trans;
      return product.description_hi || product.description;
    }
    if (language === "es") {
      if (product.description_es && product.description_es !== product.description) return product.description_es;
      const trans = t(product.description || "");
      if (trans && trans !== product.description) return trans;
      return product.description_es || product.description;
    }
    if (language === "pt") {
      if (product.description_pt && product.description_pt !== product.description) return product.description_pt;
      const trans = t(product.description || "");
      if (trans && trans !== product.description) return trans;
      return product.description_pt || product.description;
    }
    if (language === "fr") {
      if (product.description_fr && product.description_fr !== product.description) return product.description_fr;
      const trans = t(product.description || "");
      if (trans && trans !== product.description) return trans;
      return product.description_fr || product.description;
    }
    if (language === "ru") {
      if (product.description_ru && product.description_ru !== product.description) return product.description_ru;
      const trans = t(product.description || "");
      if (trans && trans !== product.description) return trans;
      return product.description_ru || product.description;
    }
    return product.description;
  };
  const productDescription = getProductDescription();
  const TAG_MAP_HI: Record<string, string> = {
    floor: "फ्लोर",
    floors: "फ्लोर",
    stands: "स्टैंड्स",
    stand: "स्टैंड",
    "floor stands": "फ्लोर स्टैंड्स",
    "floor stand": "फ्लोर स्टैंड",
    freestanding: "फ्रीस्टैंडिंग",
    "freestanding floor stand": "फ्रीस्टैंडिंग फ्लोर स्टैंड",
    "freestanding heavy-duty floor stand": "फ्रीस्टैंडिंग हेवी-ड्यूटी फ्लोर स्टैंड",
    "freestanding heavy duty floor stand": "फ्रीस्टैंडिंग हेवी-ड्यूटी फ्लोर स्टैंड",
    "heavy-duty floor stand": "हेवी-ड्यूटी फ्लोर स्टैंड",
    "heavy duty floor stand": "हेवी-ड्यूटी फ्लोर स्टैंड",
    "heavy-duty": "हेवी-ड्यूटी",
    "heavy duty": "हेवी-ड्यूटी",
    "wall mount": "वॉल माउंट",
    "wall mounts": "वॉल माउंट्स",
    "ceiling mount": "सीलिंग माउंट",
    "ceiling mounts": "सीलिंग माउंट्स",
    "tv mount": "टीवी माउंट",
    "tv mounts": "टीवी माउंट्स",
    "tv stand": "टीवी स्टैंड",
    "tv stands": "टीवी स्टैंड्स",
    cart: "कार्ट",
    trolley: "ट्रॉली",
    projector: "प्रोजेक्टर",
    "projector mount": "प्रोजेक्टर माउंट",
    bracket: "ब्रैकेट",
    brackets: "ब्रैकेट्स",
    television: "टेलीविजन",
    "smart tv": "स्मार्ट टीवी",
    "led tv": "एलईडी टीवी",
    rack: "रैक",
    "network rack": "नेटवर्क रैक",
    "server rack": "सर्वर रैक",
    cabinet: "कैबिनेट",
    indoor: "इंडोर",
    outdoor: "आउटडोर",
    enclosure: "एन्क्लोज़र",
    "mobile cart": "मोबाइल कार्ट",
    "mobile tv cart": "मोबाइल टीवी कार्ट",
  };

  const TAG_MAP_ES: Record<string, string> = {
    floor: "suelo",
    floors: "suelo",
    stands: "soportes",
    stand: "soporte",
    "floor stands": "soportes de suelo",
    "floor stand": "soporte de suelo",
    freestanding: "independiente",
    "freestanding floor stand": "soporte de suelo independiente",
    "freestanding heavy-duty floor stand": "soporte de suelo independiente para servicio pesado",
    "freestanding heavy duty floor stand": "soporte de suelo independiente para servicio pesado",
    "heavy-duty floor stand": "soporte de suelo para servicio pesado",
    "heavy duty floor stand": "soporte de suelo para servicio pesado",
    "heavy-duty": "servicio pesado",
    "heavy duty": "servicio pesado",
    "wall mount": "soporte de pared",
    "wall mounts": "soportes de pared",
    "ceiling mount": "soporte de techo",
    "ceiling mounts": "soportes de techo",
    "tv mount": "soporte para tv",
    "tv mounts": "soportes para tv",
    "tv stand": "soporte para tv",
    "tv stands": "soportes para tv",
    cart: "carrito",
    trolley: "carrito móvil",
    projector: "proyector",
    "projector mount": "soporte de proyector",
    bracket: "soporte",
    brackets: "soportes",
    television: "televisión",
    "smart tv": "smart tv",
    "led tv": "tv led",
    rack: "rack",
    "network rack": "rack de red",
    "server rack": "rack de servidores",
    cabinet: "gabinete",
    indoor: "interior",
    outdoor: "exterior",
    enclosure: "caja de protección",
    "mobile cart": "carrito móvil",
    "mobile tv cart": "carrito móvil para tv",
  };

  const TAG_MAP_PT: Record<string, string> = {
    floor: "chão",
    floors: "chão",
    stands: "suportes",
    stand: "suporte",
    "floor stands": "suportes de chão",
    "floor stand": "suporte de chão",
    freestanding: "autônomo",
    "freestanding floor stand": "suporte de chão autônomo",
    "freestanding heavy-duty floor stand": "suporte de chão autônomo para serviço pesado",
    "freestanding heavy duty floor stand": "suporte de chão autônomo para serviço pesado",
    "heavy-duty floor stand": "suporte de chão para serviço pesado",
    "heavy duty floor stand": "suporte de chão para serviço pesado",
    "heavy-duty": "serviço pesado",
    "heavy duty": "serviço pesado",
    "wall mount": "suporte de parede",
    "wall mounts": "suportes de parede",
    "ceiling mount": "suporte de teto",
    "ceiling mounts": "suportes de teto",
    "tv mount": "suporte para tv",
    "tv mounts": "suportes para tv",
    "tv stand": "suporte para tv",
    "tv stands": "suportes para tv",
    cart: "pedestal móvel",
    trolley: "carrinho para tv",
    projector: "projetor",
    "projector mount": "suporte de projetor",
    bracket: "suporte",
    brackets: "suportes",
    television: "televisão",
    "smart tv": "smart tv",
    "led tv": "tv led",
    rack: "rack",
    "network rack": "rack de rede",
    "server rack": "rack de servidor",
    cabinet: "gabinete",
    indoor: "indoor",
    outdoor: "outdoor",
    enclosure: "caixa de proteção",
    "mobile cart": "carrinho móvel",
    "mobile tv cart": "carrinho móvel para tv",
    podium: "pódio",
    "touch podium": "pódio touch",
    "ir touch podium": "pódio touch ir",
    "l-shape touch podium": "pódio touch em forma de l",
    "l-shape podium": "pódio em forma de l",
    "k-shape podium": "pódio em forma de k",
    "interactive touch podium": "pódio touch interativo",
    "digital podium": "pódio digital",
    "smart digital podium": "pódio digital inteligente",
    "corporate presentation podium": "pódio para apresentações corporativas",
    "skill tech touch podium": "pódio touch skill tech",
    kiosk: "quiosque",
    "interactive kiosk": "quiosque interativo",
    "touch screen kiosk": "quiosque touchscreen",
    "touch kiosk": "quiosque touch",
    "digital information kiosk": "quiosque de informação digital",
    "information kiosk": "quiosque de informações",
    "self service kiosk": "quiosque de autoatendimento",
    "reception kiosk": "quiosque de recepção",
    "interactive display": "display interativo",
    "interactive display stand": "suporte para display interativo",
    "touch display": "display touch",
    "full hd touch display": "display touch full hd",
    "4k touch display": "display touch 4k",
    "infrared touch screen": "tela touch infravermelha",
    "touch screen": "tela sensível ao toque",
    "commercial touch display": "display touch comercial",
    "commercial display": "display comercial",
    "digital signage": "sinalização digital",
  };

  const TAG_MAP_FR: Record<string, string> = {
    floor: "sol",
    floors: "sol",
    stands: "supports",
    stand: "support",
    "floor stands": "supports de sol",
    "floor stand": "support de sol",
    freestanding: "autoportant",
    "freestanding floor stand": "support de sol autoportant",
    "freestanding heavy-duty floor stand": "support de sol autoportant robuste",
    "freestanding heavy duty floor stand": "support de sol autoportant robuste",
    "heavy-duty floor stand": "support de sol robuste",
    "heavy duty floor stand": "support de sol robuste",
    "heavy-duty": "robuste",
    "heavy duty": "robuste",
    "wall mount": "support mural",
    "wall mounts": "supports muraux",
    "ceiling mount": "support de plafond",
    "ceiling mounts": "supports de plafond",
    "tv mount": "support tv",
    "tv mounts": "supports tv",
    "tv stand": "support tv",
    "tv stands": "supports tv",
    cart: "chariot mobile",
    trolley: "chariot tv",
    projector: "projecteur",
    "projector mount": "support de projecteur",
    bracket: "support",
    brackets: "supports",
    television: "télévision",
    "smart tv": "smart tv",
    "led tv": "tv led",
    rack: "baie de brassage",
    "network rack": "baie réseau",
    "server rack": "baie serveur",
    cabinet: "armoire",
    indoor: "intérieur",
    outdoor: "extérieur",
    enclosure: "boîtier de protection",
    "mobile cart": "chariot mobile",
    "mobile tv cart": "chariot tv mobile",
    podium: "pupitre",
    "touch podium": "pupitre tactile",
    "ir touch podium": "pupitre tactile ir",
    "l-shape touch podium": "pupitre tactile en l",
    "l-shape podium": "pupitre en l",
    "k-shape podium": "pupitre en k",
    "interactive touch podium": "pupitre tactile interactif",
    "digital podium": "pupitre numérique",
    "smart digital podium": "pupitre numérique intelligent",
    "corporate presentation podium": "pupitre de présentation professionnelle",
    "skill tech touch podium": "pupitre tactile skill tech",
    kiosk: "borne",
    "interactive kiosk": "borne interactive",
    "touch screen kiosk": "borne tactile",
    "touch kiosk": "borne tactile",
    "digital information kiosk": "borne d'information numérique",
    "information kiosk": "borne d'information",
    "self service kiosk": "borne libre-service",
    "reception kiosk": "borne d'accueil",
    "interactive display": "écran interactif",
    "interactive display stand": "support d'écran interactif",
    "touch display": "écran tactile",
    "full hd touch display": "écran tactile full hd",
    "4k touch display": "écran tactile 4k",
    "infrared touch screen": "écran tactile infrarouge",
    "touch screen": "écran tactile",
    "commercial touch display": "écran tactile commercial",
    "commercial display": "écran commercial",
    "digital signage": "affichage dynamique",
  };

  const translateTag = (rawTag: string): string => {
    const trimmed = rawTag.replace(/\u00a0/g, " ").trim();
    if (!trimmed) return "";

    // Keep alphanumeric technical model numbers in English (e.g. SH1600FS, SK3200NT, SHCP6)
    if (/^[A-Z0-9\-_]+$/i.test(trimmed) && /\d/.test(trimmed)) {
      return trimmed;
    }

    // If already in Devanagari (Hindi) or Arabic script, preserve directly
    if (/[\u0900-\u097F\u0600-\u06FF]/.test(trimmed)) {
      return trimmed;
    }

    const lower = trimmed.toLowerCase();

    if (language === "hi") {
      if (TAG_MAP_HI[lower]) {
        return TAG_MAP_HI[lower];
      }

      const direct = t(trimmed);
      if (direct && direct.toLowerCase() !== trimmed.toLowerCase()) return direct;

      const uaeMatch = lower.match(/^(.+?)\s+in\s+uae$/i);
      if (uaeMatch) {
        return `यूएई में ${translateTag(uaeMatch[1])}`;
      }
      const dubaiMatch = lower.match(/^(.+?)\s+in\s+dubai$/i);
      if (dubaiMatch) {
        return `दुबई में ${translateTag(dubaiMatch[1])}`;
      }
      const bestMatch = lower.match(/^best\s+(.+)$/i);
      if (bestMatch) {
        return `सर्वश्रेष्ठ ${translateTag(bestMatch[1])}`;
      }
      const qualityMatch = lower.match(/^quality\s+(.+)$/i);
      if (qualityMatch) {
        return `क्वालिटी ${translateTag(qualityMatch[1])}`;
      }
      const heavyMatch = lower.match(/^freestanding\s+heavy-?duty\s+(.+)$/i);
      if (heavyMatch) {
        return `फ्रीस्टैंडिंग हेवी-ड्यूटी ${translateTag(heavyMatch[1])}`;
      }
      const fsMatch = lower.match(/^freestanding\s+(.+)$/i);
      if (fsMatch) {
        return `फ्रीस्टैंडिंग ${translateTag(fsMatch[1])}`;
      }
      const hdMatch = lower.match(/^heavy-?duty\s+(.+)$/i);
      if (hdMatch) {
        return `हेवी-ड्यूटी ${translateTag(hdMatch[1])}`;
      }
      return direct || trimmed;
    }

    if (language === "es") {
      if (TAG_MAP_ES[lower]) {
        return TAG_MAP_ES[lower];
      }
      const direct = t(trimmed);
      if (direct && direct.toLowerCase() !== trimmed.toLowerCase()) return direct;

      const uaeMatch = lower.match(/^(.+?)\s+in\s+uae$/i);
      if (uaeMatch) {
        return `${translateTag(uaeMatch[1])} en EAU`;
      }
      const dubaiMatch = lower.match(/^(.+?)\s+in\s+dubai$/i);
      if (dubaiMatch) {
        return `${translateTag(dubaiMatch[1])} en Dubái`;
      }
      const bestMatch = lower.match(/^best\s+(.+)$/i);
      if (bestMatch) {
        return `Mejor ${translateTag(bestMatch[1])}`;
      }
      return direct || trimmed;
    }

    if (language === "pt") {
      if (TAG_MAP_PT[lower]) {
        return TAG_MAP_PT[lower];
      }
      const direct = t(trimmed);
      if (direct && direct.toLowerCase() !== trimmed.toLowerCase()) return direct;

      const inchMatch = lower.match(/^(\d+)\s*inch\s+(.+)$/i);
      if (inchMatch) {
        return `${translateTag(inchMatch[2])} de ${inchMatch[1]}"`;
      }
      const uaeMatch = lower.match(/^(.+?)\s+in\s+uae$/i);
      if (uaeMatch) {
        return `${translateTag(uaeMatch[1])} nos EAU`;
      }
      const dubaiMatch = lower.match(/^(.+?)\s+in\s+dubai$/i);
      if (dubaiMatch) {
        return `${translateTag(dubaiMatch[1])} em Dubai`;
      }
      const bestMatch = lower.match(/^best\s+(.+)$/i);
      if (bestMatch) {
        return `Melhor ${translateTag(bestMatch[1])}`;
      }
      return direct || trimmed;
    }

    if (language === "fr") {
      if (TAG_MAP_FR[lower]) {
        return TAG_MAP_FR[lower];
      }
      const direct = t(trimmed);
      if (direct && direct.toLowerCase() !== trimmed.toLowerCase()) return direct;

      const inchMatch = lower.match(/^(\d+)\s*inch\s+(.+)$/i);
      if (inchMatch) {
        return `${translateTag(inchMatch[2])} ${inchMatch[1]}"`;
      }
      const uaeMatch = lower.match(/^(.+?)\s+in\s+uae$/i);
      if (uaeMatch) {
        return `${translateTag(uaeMatch[1])} aux EAU`;
      }
      const dubaiMatch = lower.match(/^(.+?)\s+in\s+dubai$/i);
      if (dubaiMatch) {
        return `${translateTag(dubaiMatch[1])} à Dubaï`;
      }
      const bestMatch = lower.match(/^best\s+(.+)$/i);
      if (bestMatch) {
        return `Meilleur ${translateTag(bestMatch[1])}`;
      }
      return direct || trimmed;
    }

    if (language === "ru") {
      const direct = t(trimmed);
      if (direct && direct.toLowerCase() !== trimmed.toLowerCase()) return direct;
      return direct || trimmed;
    }

    if (language === "ar") {
      const direct = t(trimmed);
      if (direct && direct.toLowerCase() !== trimmed.toLowerCase()) return direct;
      const uaeMatch = lower.match(/^(.+?)\s+in\s+uae$/i);
      if (uaeMatch) return `${translateTag(uaeMatch[1])} في الإمارات`;
      const dubaiMatch = lower.match(/^(.+?)\s+in\s+dubai$/i);
      if (dubaiMatch) return `${translateTag(dubaiMatch[1])} في دبي`;
      const bestMatch = lower.match(/^best\s+(.+)$/i);
      if (bestMatch) return `أفضل ${translateTag(bestMatch[1])}`;
      return direct || trimmed;
    }

    const direct = t(trimmed);
    return direct || trimmed;
  };

  const getBulletTitle = (bf: any) => {
    if (language === "ar") return bf.title_ar || t((bf.title || "").trim());
    if (language === "hi") {
      if (bf.title_hi && bf.title_hi !== bf.title && !/^[A-Za-z\s\-_0-9.,/]+$/.test(bf.title_hi)) {
        return bf.title_hi;
      }
      const rawTitle = (bf.title || "").replace(/\u00a0/g, " ").trim();
      const trans = t(rawTitle);
      if (trans && trans.toLowerCase() !== rawTitle.toLowerCase()) return trans;
      return bf.title_hi || trans || bf.title;
    }
    if (language === "es") {
      if (bf.title_es && bf.title_es !== bf.title) return bf.title_es;
      const rawTitle = (bf.title || "").replace(/\u00a0/g, " ").trim();
      const trans = t(rawTitle);
      if (trans && trans.toLowerCase() !== rawTitle.toLowerCase()) return trans;
      return bf.title_es || trans || bf.title;
    }
    if (language === "pt") {
      if (bf.title_pt && bf.title_pt !== bf.title) return bf.title_pt;
      const rawTitle = (bf.title || "").replace(/\u00a0/g, " ").trim();
      const trans = t(rawTitle);
      if (trans && trans.toLowerCase() !== rawTitle.toLowerCase()) return trans;
      return bf.title_pt || trans || bf.title;
    }
    if (language === "fr") {
      if (bf.title_fr && bf.title_fr !== bf.title) return bf.title_fr;
      const rawTitle = (bf.title || "").replace(/\u00a0/g, " ").trim();
      const trans = t(rawTitle);
      if (trans && trans.toLowerCase() !== rawTitle.toLowerCase()) return trans;
      return bf.title_fr || trans || bf.title;
    }
    if (language === "ru") {
      if (bf.title_ru && bf.title_ru !== bf.title) return bf.title_ru;
      const rawTitle = (bf.title || "").replace(/\u00a0/g, " ").trim();
      const trans = t(rawTitle);
      if (trans && trans.toLowerCase() !== rawTitle.toLowerCase()) return trans;
      return bf.title_ru || trans || bf.title;
    }
    return bf.title;
  };

  const getBulletText = (bf: any) => {
    if (language === "ar") return bf.text_ar || t((bf.text || "").trim());
    if (language === "hi") {
      if (bf.text_hi && bf.text_hi !== bf.text && !/^[A-Za-z\s\-_0-9.,/%'":;()]+$/.test(bf.text_hi)) {
        return bf.text_hi;
      }
      const rawText = (bf.text || "").replace(/\u00a0/g, " ").trim();
      const trans = t(rawText);
      if (trans && trans.toLowerCase() !== rawText.toLowerCase()) return trans;
      return bf.text_hi || trans || bf.text;
    }
    if (language === "es") {
      if (bf.text_es && bf.text_es !== bf.text) return bf.text_es;
      const rawText = (bf.text || "").replace(/\u00a0/g, " ").trim();
      const trans = t(rawText);
      if (trans && trans.toLowerCase() !== rawText.toLowerCase()) return trans;
      return bf.text_es || trans || bf.text;
    }
    if (language === "pt") {
      if (bf.text_pt && bf.text_pt !== bf.text) return bf.text_pt;
      const rawText = (bf.text || "").replace(/\u00a0/g, " ").trim();
      const trans = t(rawText);
      if (trans && trans.toLowerCase() !== rawText.toLowerCase()) return trans;
      return bf.text_pt || trans || bf.text;
    }
    if (language === "fr") {
      if (bf.text_fr && bf.text_fr !== bf.text) return bf.text_fr;
      const rawText = (bf.text || "").replace(/\u00a0/g, " ").trim();
      const trans = t(rawText);
      if (trans && trans.toLowerCase() !== rawText.toLowerCase()) return trans;
      return bf.text_fr || trans || bf.text;
    }
    if (language === "ru") {
      if (bf.text_ru && bf.text_ru !== bf.text) return bf.text_ru;
      const rawText = (bf.text || "").replace(/\u00a0/g, " ").trim();
      const trans = t(rawText);
      if (trans && trans.toLowerCase() !== rawText.toLowerCase()) return trans;
      return bf.text_ru || trans || bf.text;
    }
    return bf.text;
  };

  const productTags =
    language === "ar" && product.tags_ar
      ? product.tags_ar
      : language === "hi"
      ? ((product as any).tags_hi || product.tags || "")
          .split(",")
          .map((tag: string) => translateTag(tag))
          .filter(Boolean)
          .join(", ")
      : language === "es"
      ? ((product as any).tags_es || product.tags || "")
          .split(",")
          .map((tag: string) => translateTag(tag))
          .filter(Boolean)
          .join(", ")
      : language === "pt"
      ? ((product as any).tags_pt || product.tags || "")
          .split(",")
          .map((tag: string) => translateTag(tag))
          .filter(Boolean)
          .join(", ")
      : language === "fr"
      ? ((product as any).tags_fr || product.tags || "")
          .split(",")
          .map((tag: string) => translateTag(tag))
          .filter(Boolean)
          .join(", ")
      : language === "ru"
      ? ((product as any).tags_ru || product.tags || "")
          .split(",")
          .map((tag: string) => translateTag(tag))
          .filter(Boolean)
          .join(", ")
      : product.tags;

  const getSpecKey = (spec: any) => {
    if (language === "ar") return spec.key_ar || t(spec.key);
    if (language === "hi") {
      const trans = t(spec.key?.trim() || "");
      if (trans && trans !== spec.key?.trim()) return trans;
      if (spec.key_hi && spec.key_hi !== spec.key) return spec.key_hi;
      return trans || spec.key;
    }
    if (language === "es") {
      const trans = t(spec.key?.trim() || "");
      if (trans && trans !== spec.key?.trim()) return trans;
      if (spec.key_es && spec.key_es !== spec.key) return spec.key_es;
      return trans || spec.key;
    }
    if (language === "pt") {
      const trans = t(spec.key?.trim() || "");
      if (trans && trans !== spec.key?.trim()) return trans;
      if (spec.key_pt && spec.key_pt !== spec.key) return spec.key_pt;
      return trans || spec.key;
    }
    if (language === "fr") {
      const trans = t(spec.key?.trim() || "");
      if (trans && trans !== spec.key?.trim()) return trans;
      if (spec.key_fr && spec.key_fr !== spec.key) return spec.key_fr;
      return trans || spec.key;
    }
    if (language === "ru") {
      const trans = t(spec.key?.trim() || "");
      if (trans && trans !== spec.key?.trim()) return trans;
      if (spec.key_ru && spec.key_ru !== spec.key) return spec.key_ru;
      return trans || spec.key_ru || spec.key;
    }
    return spec.key;
  };

  const getSpecValue = (spec: any) => {
    if (language === "ar") return spec.value_ar || t(spec.value);
    if (language === "hi") {
      const trans = t(spec.value?.trim() || "");
      if (trans && trans !== spec.value?.trim()) return trans;
      if (spec.value_hi && spec.value_hi !== spec.value) return spec.value_hi;
      return trans || spec.value;
    }
    if (language === "es") {
      const trans = t(spec.value?.trim() || "");
      if (trans && trans !== spec.value?.trim()) return trans;
      if (spec.value_es && spec.value_es !== spec.value) return spec.value_es;
      return trans || spec.value;
    }
    if (language === "pt") {
      const trans = t(spec.value?.trim() || "");
      if (trans && trans !== spec.value?.trim()) return trans;
      if (spec.value_pt && spec.value_pt !== spec.value) return spec.value_pt;
      return trans || spec.value;
    }
    if (language === "fr") {
      const trans = t(spec.value?.trim() || "");
      if (trans && trans !== spec.value?.trim()) return trans;
      if (spec.value_fr && spec.value_fr !== spec.value) return spec.value_fr;
      return trans || spec.value;
    }
    if (language === "ru") {
      const trans = t(spec.value?.trim() || "");
      if (trans && trans !== spec.value?.trim()) return trans;
      if (spec.value_ru && spec.value_ru !== spec.value) return spec.value_ru;
      return trans || spec.value_ru || spec.value;
    }
    return spec.value;
  };
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(
    product.specifications?.length > 0 ? "overview" : "description",
  );
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [mainImage, setMainImage] = useState(
    images.length > 0
      ? images[0]
      : { src: "/images/default.png", alt: "Product Image" },
  );
  const relatedSliderRef = useRef<HTMLDivElement>(null);
  const thumbTrackRef = useRef<HTMLDivElement>(null);
  const cbmResultRef = useRef<HTMLDivElement>(null);
  const tabNavRef = useRef<HTMLDivElement>(null);
  const [canScrollThumbs, setCanScrollThumbs] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isManualScrolling = useRef(false);

  // Modal States
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showCBMCalculator, setShowCBMCalculator] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [isLightboxZoomed, setIsLightboxZoomed] = useState(false);

  console.log(product,'checkproducttt')

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxZoomed(false);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    setIsLightboxZoomed(false);
    document.body.style.overflow = "auto";
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + images.length) % images.length,
      );
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -70% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll(
      ".product-tabs-wrap .tab-content",
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkScrollable = () => {
      if (thumbTrackRef.current) {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        const { scrollHeight, clientHeight, scrollWidth, clientWidth } =
          thumbTrackRef.current;
        setCanScrollThumbs(
          mobile ? scrollWidth > clientWidth : scrollHeight > clientHeight,
        );
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [images]);

  // Enquiry Form
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [enquiryStatus, setEnquiryStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  // CBM Calculator
  const [quantity, setQuantity] = useState(1);
  const [cbmResult, setCbmResult] = useState<{
    totalGrossWeight: number;
    totalNetWeight: number;
    totalCartons: number;
    totalCBM: number;
  } | null>(null);
  const hasInstallVideo = Boolean(product.video_url);
  const hasProductVideo = Boolean(product.product_video_url);
  const hasAnyVideo = hasInstallVideo || hasProductVideo;
  const videoCount = [hasInstallVideo, hasProductVideo].filter(Boolean).length;

  // Helper for CBM
  const cbmPerCarton =
    ((product.carton_length_cm || 0) *
      (product.carton_width_cm || 0) *
      (product.carton_height_cm || 0)) /
    1000000;
  const calculateCBM = () => {
    const totalGrossWeight =
      (product.gross_weight_per_carton_kg || 0) * quantity;
    const totalNetWeight = (product.net_weight_per_carton_kg || 0) * quantity;
    const totalCartons = quantity;
    const totalCBM = cbmPerCarton * quantity;
    setCbmResult({ totalGrossWeight, totalNetWeight, totalCartons, totalCBM });
  };

  const getResultPng = async () => {
    if (!cbmResultRef.current) return null;
    try {
      return await toPng(cbmResultRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        skipFonts: true,
      });
    } catch (e) {
      console.error("Failed to generate PNG", e);
      return null;
    }
  };

  const downloadResultPng = async () => {
    const dataUrl = await getResultPng();
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${product.name || "cbm-result"}.png`;
    link.click();
  };

  const shareResultToWhatsapp = async () => {
    const dataUrl = await getResultPng();
    if (!dataUrl) return;
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], `${product.name || "cbm-result"}.png`, {
      type: "image/png",
    });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "CBM Result",
        text: `CBM Result for ${product.name || "product"}`,
      });
      return;
    }
    await downloadResultPng();
    const message = `CBM Result for ${product.name || "product"}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      alert("Please verify captcha.");
      return;
    }

    setEnquiryStatus("submitting");
    try {
      const response = await submitEnquiry(product.slug, enquiryForm);
      setEnquiryStatus("success");
      setIsCaptchaVerified(false);
      if (response?.reference_number) {
        sessionStorage.setItem("thank_you_ref", response.reference_number);
      }
      router.push(
        language === "ar"
          ? `/ar/product/thank-you`
          : language === "hi"
          ? `/hi/product/thank-you`
          : language === "es"
          ? `/es/product/thank-you`
          : language === "pt"
          ? `/pt/product/thank-you`
          : language === "fr"
          ? `/fr/product/thank-you`
          : language === "ru"
          ? `/ru/product/thank-you`
          : `/product/thank-you`
      );
      setTimeout(() => {
        setShowEnquiryModal(false);
        setEnquiryStatus("idle");
        setEnquiryForm({ name: "", email: "", phone: "", message: "" });
      }, 2000);
    } catch (error) {
      setEnquiryStatus("error");
    }
  };

  const scrollThumbs = (direction: "left" | "right") => {
    if (thumbTrackRef.current) {
      const isMobile = window.innerWidth <= 768;
      const scrollAmount = 120;
      if (isMobile) {
        thumbTrackRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      } else {
        thumbTrackRef.current.scrollBy({
          top: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollRelated = (direction: "left" | "right") => {
    if (relatedSliderRef.current) {
      const scrollAmount = relatedSliderRef.current.clientWidth + 25;
      relatedSliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleTabClick = (tabId: string) => {
    isManualScrolling.current = true;
    setActiveTab(tabId);
    const target = document.getElementById(tabId);
    if (target) {
      // Get actual height of the sticky nav or default to 58 if not found
      const offset = tabNavRef.current ? tabNavRef.current.offsetHeight : 58;

      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    // Reset manual scroll flag after animation
    setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    try {
      let videoId = "";

      // Handle standard watch URL: youtube.com/watch?v=VIDEO_ID
      if (url.includes("youtube.com/watch")) {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get("v") || "";
      }
      // Handle shortened URL: youtu.be/VIDEO_ID
      else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      }
      // Handle embed URL: youtube.com/embed/VIDEO_ID
      else if (url.includes("youtube.com/embed/")) {
        videoId = url.split("youtube.com/embed/")[1]?.split("?")[0];
      }
      // Handle shorts URL: youtube.com/shorts/VIDEO_ID
      else if (url.includes("youtube.com/shorts/")) {
        videoId = url.split("youtube.com/shorts/")[1]?.split("?")[0];
      }

      if (videoId) {
        // Use youtube-nocookie for better privacy and fewer restrictions, add rel=0 to hide related videos
        return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
      }

      return url;
    } catch (e) {
      return url;
    }
  };

  const isEconomic = product?.show_economic;

  const mainImageIndex = images.findIndex((img) => img.src === mainImage.src);

  const formatSlug = (slug: string | undefined) => 
    slug ? slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "";

  return (
    <>
    <div style={{ 
          padding: "12px 20px", 
          fontSize: "16px", 
          color: "#555",
          background: "#f4f4f4",
          borderRadius: "4px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "5px"
        }}  >
      <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "5px" }} >
          <Link href="/" className="breadcrumb-link">{t("Home")}</Link>
          <span>{language === "ar" ? " < " : " > "}</span>
          {product?.subcategory?.category?.slug && (
            <>
              <Link href={`/${product?.subcategory?.category?.slug}`} className="breadcrumb-link">
                {language === "ar" && product?.subcategory?.category?.name_ar 
                  ? product.subcategory.category.name_ar 
                  : (language === "hi" && product?.subcategory?.category?.name_hi
                  ? product.subcategory.category.name_hi
                  : (language === "es" && (product?.subcategory?.category as any)?.name_es
                  ? (product.subcategory.category as any).name_es
                  : (language === "pt" && (product?.subcategory?.category as any)?.name_pt
                  ? (product.subcategory.category as any).name_pt
                  : (language === "fr" && (product?.subcategory?.category as any)?.name_fr
                  ? (product.subcategory.category as any).name_fr
                  : (language === "ru" && (product?.subcategory?.category as any)?.name_ru
                  ? (product.subcategory.category as any).name_ru
                  : t(product?.subcategory?.category?.name || formatSlug(product?.subcategory?.category?.slug))))))) }
              </Link>
              <span>{language === "ar" ? " < " : " > "}</span>
            </>
          )}
           {product?.subcategory?.slug && (
            <>
              <Link href={`/${product?.subcategory?.category?.slug}/${product?.subcategory?.slug}`} className="breadcrumb-link">
                {language === "ar" && product?.subcategory?.name_ar 
                  ? product.subcategory.name_ar 
                  : (language === "hi" && product?.subcategory?.name_hi
                  ? product.subcategory.name_hi
                  : (language === "es" && (product?.subcategory as any)?.name_es
                  ? (product.subcategory as any).name_es
                  : (language === "pt" && (product?.subcategory as any)?.name_pt
                  ? (product.subcategory as any).name_pt
                  : (language === "fr" && (product?.subcategory as any)?.name_fr
                  ? (product.subcategory as any).name_fr
                  : (language === "ru" && (product?.subcategory as any)?.name_ru
                  ? (product.subcategory as any).name_ru
                  : t(product?.subcategory?.name || formatSlug(product?.subcategory?.slug))))))) }
              </Link>
              <span>{language === "ar" ? " < " : " > "}</span>
            </>
          )}
          <span style={{ color: "#cc0070", fontWeight: "500" }}>{productTitle || product.name}</span>
        </div>
    </div>
    
      <div className="container">
        
        <section className="product-detail-section">
          <div className="product-row">
            {/* LEFT : IMAGE COLUMN */}
            <div className="gallery-col">
              <div className="thumb-carousel">
                {canScrollThumbs && (
                  <button
                    className="thumb-nav left"
                    id="thumbPrev"
                    onClick={() => scrollThumbs("left")}
                  >
                    <i
                      className={`fa ${
                        isMobile ? "fa-chevron-left" : "fa-chevron-up"
                      }`}
                    ></i>
                  </button>
                )}
                <div
                  className="thumb-track"
                  id="thumbTrack"
                  ref={thumbTrackRef}
                >
                  {images.map((img, idx) => (
                    <Image
                      key={idx}
                      src={img.src}
                      className={mainImage.src === img.src ? "active" : ""}
                      onClick={() => {
                        setMainImage(img);
                      }}
                      alt={img.alt || productTitle}
                      width={130}
                      height={130}
                      style={{ objectFit: "cover", cursor: "pointer" }}
                    />
                  ))}
                  {images.length === 0 && (
                    <Image
                      src="/images/default.png"
                      className="active"
                      alt="placeholder"
                      width={130}
                      height={130}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                {canScrollThumbs && (
                  <button
                    className="thumb-nav right"
                    id="thumbNext"
                    onClick={() => scrollThumbs("right")}
                  >
                    <i
                      className={`fa ${
                        isMobile ? "fa-chevron-right" : "fa-chevron-down"
                      }`}
                    ></i>
                  </button>
                )}
              </div>
              <div
                className="main-image-wrap"
                style={{ position: "relative", cursor: "zoom-in" }}
                onClick={() =>
                  openLightbox(mainImageIndex !== -1 ? mainImageIndex : 0)
                }
              >
                <button 
                  className="zoom-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(mainImageIndex !== -1 ? mainImageIndex : 0);
                  }}
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #ddd",
                    borderRadius: "20px",
                    padding: "8px 16px",
                    height: "45px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    zIndex: 10,
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#333"
                  }}
                  aria-label={t("Click to zoom")}
                  title={t("Click to zoom")}
                >
                  <i className="fa fa-search-plus" style={{ fontSize: "16px", color: "#333" }}></i>
                  {t("Click to zoom")}
                </button>
                <Image
                  id="mainImage"
                  src={mainImage.src}
                  alt={mainImage.alt || productTitle}
                  width={600}
                  height={600}
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                  style={{
                    objectFit: "contain",
                    // width: "100%",
                    // height: "auto",
                  }}
                />
                {isEconomic && (
                  <div className="economic-detail">
                    <Image
                      src="/images/economic2.png"
                      alt={t("Economic Series")}
                      width={150}
                      height={50}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT : CONTENT COLUMN */}
            <div className="info-col">
              <div className="sub-title">{product.name}</div>
              <h1 className="section-title">{productTitle}</h1>

              {/* FEATURE GRID - Using Features */}
              {product.features?.length > 0 && (
                <div className="feature-grid">
                  {(product.features as Feature[])?.map(
                    (item: Feature, idx: number) => (
                      <div className="feature-item" key={idx}>
                        <Image
                          src={item.icon}
                          alt={`${item.value} icon`}
                          width={35}
                          height={35}
                          className="feature-icon"
                        />
                        <div>
                          <span>
                            {language === "ar" && item?.feature?.title_ar
                              ? item.feature.title_ar
                              : language === "hi" && (item?.feature as any)?.title_hi
                              ? (item?.feature as any).title_hi
                              : language === "es" && (item?.feature as any)?.title_es
                              ? (item?.feature as any).title_es
                              : language === "pt" && (item?.feature as any)?.title_pt
                              ? (item?.feature as any).title_pt
                              : language === "fr" && (item?.feature as any)?.title_fr
                              ? (item?.feature as any).title_fr
                              : language === "ru" && (item?.feature as any)?.title_ru
                              ? (item?.feature as any).title_ru
                              : t(item?.feature?.title || "")}
                          </span>
                          <strong>{item?.value}</strong>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}

              {/* CATEGORY & TAGS */}
              <div className="meta-info">
                <p>
                  <strong>{t("Tags:")}</strong>{" "}
                  {productTags}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BUTTONS */}
        <div className="cta">
          {product.datasheet ? (
            <a
              href={`${product.datasheet}`}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="btn-cta"
              style={{
                textDecoration: "none",
              }}
            >
              <i className="fa fa-cloud-download"></i>
              {t("Data Sheet")}
            </a>
          ) : (
            <button className="btn-cta" disabled style={{ opacity: 0.5 }}>
              <i className="fa fa-cloud-download"></i>
              {t("Data Sheet")}
            </button>
          )}
          <button className="btn-cta" onClick={() => setShowEnquiryModal(true)}>
            <i className="fa fa-envelope-open" ></i>
            {t("Quick Enquiry")}
          </button>
          {product.show_cbm_calculator && (
            <button
              className="btn-cta"
              onClick={() => setShowCBMCalculator(true)}
            >
              <i className="fa fa-calculator" ></i>
              {t("CBM Calculation")}
            </button>
          )}
        </div>

        <section className="product-tabs-wrap">
          <div className="tab-nav" ref={tabNavRef}>
            {product.specifications?.length > 0 && (
              <button
                className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => handleTabClick("overview")}
              >
                {t("Overview")}
              </button>
            )}
            <button
              className={`tab-btn ${activeTab === "features" ? "active" : ""}`}
              onClick={() => handleTabClick("features")}
            >
              {t("Features")}
            </button>
            <button
              className={`tab-btn ${
                activeTab === "description" ? "active" : ""
              }`}
              onClick={() => handleTabClick("description")}
            >
              {t("Description")}
            </button>
            {hasAnyVideo && (
              <button
                className={`tab-btn ${activeTab === "videos" ? "active" : ""}`}
                onClick={() => handleTabClick("videos")}
              >
                {t("Videos")}
              </button>
            )}
            <button
              className={`tab-btn ${activeTab === "drawing" ? "active" : ""}`}
              onClick={() => handleTabClick("drawing")}
            >
              {t("Drawing")}
            </button>
            {/* {product.box_3d_image && (
              <button
                className={`tab-btn ${activeTab === "3dbox" ? "active" : ""}`}
                onClick={() => handleTabClick("3dbox")}
              >
                3D Box
              </button>
            )} */}
          </div>

          {/* TAB CONTENT */}
          {product.specifications?.length > 0 && (
            <div className="tab-content" id="overview">
              <h2>{t("Overview")}</h2>
              <div className="desktop-view">
                <div className="overview-grid">
                  <div className="overview-table-wrap">
                    <table className="overview-table">
                      <tbody>
                        {product.specifications
                          .slice(
                            0,
                            Math.ceil(product.specifications.length / 2),
                          )
                          .slice(0, showFullOverview ? undefined : 5)
                          .map((spec: any, idx: number) => (
                            <tr key={idx}>
                              <th>{getSpecKey(spec)}</th>
                              <td>{getSpecValue(spec)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="overview-table-wrap">
                    <table className="overview-table">
                      <tbody>
                        {product.specifications
                          .slice(Math.ceil(product.specifications.length / 2))
                          .slice(0, showFullOverview ? undefined : 5)
                          .map((spec: any, idx: number) => (
                            <tr key={idx}>
                              <th>{getSpecKey(spec)}</th>
                              <td>{getSpecValue(spec)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Mobile View */}
              <div className="mobile-view">
                <div className="overview-grid">
                  <div className="overview-table-wrap">
                    <table className="overview-table">
                      <tbody>
                        {product.specifications
                          .slice(0, showFullOverview ? undefined : 5)
                          .map((spec: any, idx: number) => (
                            <tr key={idx}>
                              <th>{getSpecKey(spec)}</th>
                              <td>{getSpecValue(spec)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {product.specifications.length > 8 && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <button
                    onClick={() => setShowFullOverview(!showFullOverview)}
                    style={{
                      padding: "8px 20px",
                      borderRadius: "20px",
                      border: "1px solid #062e5c",
                      background: "transparent",
                      color: "#062e5c",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "#062e5c";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#062e5c";
                    }}
                  >
                    {showFullOverview ? t("View Less") : t("View More")}
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="tab-content" id="features">
            <h2>{t("Features")}</h2>
            {product.bullet_features?.length > 0 ? (
              <ul
                className="features-list-tab"
                style={{ listStyle: "none", padding: "0", color: "#000" }}
              >
                {product.bullet_features.map((bf: any, idx: number) => {
                  const bulletTitle = getBulletTitle(bf);
                  const bulletText = getBulletText(bf);
                  return (
                    <li
                      key={idx}
                      style={{
                        marginBottom: "12px",
                        color: "#555",
                        fontSize: "14px",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                        lineHeight: "1.6",
                        flexDirection: "column",
                      }}
                    >
                      {bulletTitle && (
                        <strong
                          style={{
                            marginRight: "5px",
                            color: "#333",
                            flexShrink: 0,
                            maxWidth: "100%",
                          }}
                        >
                          {bulletTitle}
                        </strong>
                      )}
                      <span
                        style={{
                          flex: "1 0 0%",
                          minWidth: "250px",
                          margin: 0,
                        }}
                      >
                        {bulletText}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>{t("No detailed features available.")}</p>
            )}
          </div>

          <div className="tab-content" id="description">
            <h2>{t("Description")}</h2>
            <div style={{ whiteSpace: "pre-line" }}>
              <p>{productDescription}</p>
            </div>
          </div>

          {hasAnyVideo && (
            <div className="tab-content" id="videos">
              <div className={`media-grid ${videoCount === 1 ? "single" : ""}`}>
                {hasInstallVideo && (
                  <div className="video-block">
                    <h2 className="video-title">{t("Installation Video")}</h2>
                    <div className="video-card">
                      <iframe
                        src={getEmbedUrl(product.video_url)}
                        frameBorder="0"
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        title={t("Installation Video")}
                      ></iframe>
                    </div>
                  </div>
                )}

                {hasProductVideo && (
                  <div className="video-block">
                    <h2 className="video-title">{t("Product Video")}</h2>
                    <div className="video-card">
                      <iframe
                        src={getEmbedUrl(product.product_video_url)}
                        frameBorder="0"
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        title={t("Product Video")}
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="tab-content" id="drawing">
            <h2>{t("Drawing")}</h2>
            <div className="media-grid">
              {product.drawing_image ? (
                <div className="image-card">
                  <Image
                    src={`${product.drawing_image}`}
                    alt={product.drawing_image_alt || "Drawing"}
                    width={600}
                    height={400}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ) : (
                <p>{t("No drawing available")}</p>
              )}
            </div>
          </div>

          {/* <div className="tab-content" id="3dbox">
            <h3>3D Box</h3>
            <div className="media-grid">
              {product.box_3d_image ? (
                <div className="image-card">
                  <Image
                    src={`${product.box_3d_image}`}
                    alt={product.box_3d_image_alt || "3D Box"}
                    width={600}
                    height={400}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ) : (
                <p>No 3D box image available</p>
              )}
            </div>
          </div> */}
        </section>
      </div>

      <section
        className="related-project-section"
        style={{ display: similarProducts.length > 0 ? "block" : "none" }}
      >
        <div className="container">
          <div className="related-slider-wrapper">
            <div className="section-header">
              <div className="left">
                <button className="explore-btn">
                  <span className="arrow-circle">
                    <i className="fas fa-play"></i>
                  </span>
                  {t("More to Explore")}
                </button>
                <h2 className="section-title">{t("Similar Products")}</h2>
              </div>
              <div className="right">
                <button
                  className="arrow left-arrow"
                  onClick={() => scrollRelated("left")}
                >
                  <i className="fa fa-arrow-left"></i>
                </button>
                <button
                  className="arrow right-arrow"
                  onClick={() => scrollRelated("right")}
                >
                  <i className="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>
            <div className="related-slider" ref={relatedSliderRef}>
              {similarProducts.map((p) => (
                <div key={p.id} className="product-card-item">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM MODALS */}
      {showEnquiryModal && (
        <div
          className="enquiry-modal-overlay"
          onClick={() => setShowEnquiryModal(false)}
        >
          <div
            className="no-scrollbar enquiry-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowEnquiryModal(false)}
              className="enquiry-modal-close"
              aria-label={t("Close")}
            >
              &times;
            </button>

            <h3 className="enquiry-modal-title">{t("Quick Enquiry")}</h3>
            <p className="enquiry-modal-subtitle">
              {t("Enquire about ")}<strong>{product.name}</strong>
            </p>

            <form onSubmit={handleEnquirySubmit}>
              <div className="enquiry-form-group">
                <label className="enquiry-form-label">{t("Name *")}</label>
                <input
                  type="text"
                  required
                  placeholder={t("Enter your full name")}
                  value={enquiryForm.name}
                  onChange={(e) =>
                    setEnquiryForm({ ...enquiryForm, name: e.target.value })
                  }
                  className="enquiry-form-input"
                />
              </div>
              <div className="enquiry-form-group">
                <label className="enquiry-form-label">{t("Email *")}</label>
                <input
                  type="email"
                  required
                  placeholder={t("your@email.com")}
                  value={enquiryForm.email}
                  onChange={(e) =>
                    setEnquiryForm({ ...enquiryForm, email: e.target.value })
                  }
                  className="enquiry-form-input"
                />
              </div>
              <div className="enquiry-form-group">
                <label className="enquiry-form-label">{t("Phone *")}</label>
                <PhoneInput
                  required
                  placeholder={t("Phone")}
                  value={enquiryForm.phone}
                  onChange={(e) =>
                    setEnquiryForm({ ...enquiryForm, phone: e.target.value })
                  }
                />
              </div>
              <div className="enquiry-form-group-last">
                <label className="enquiry-form-label">{t("Message *")}</label>
                <textarea
                  rows={4}
                  required
                  placeholder={t("How can we help you?")}
                  value={enquiryForm.message}
                  onChange={(e) =>
                    setEnquiryForm({ ...enquiryForm, message: e.target.value })
                  }
                  className="enquiry-form-input"
                ></textarea>
              </div>

              <div className="mb-4 enquiry-form-group-last">
                <Captcha onVerify={setIsCaptchaVerified} />
              </div>

              {enquiryStatus === "error" && (
                <p className="enquiry-status-error">
                  {t("Failed to submit. Please try again.")}
                </p>
              )}
              {enquiryStatus === "success" && (
                <p className="enquiry-status-success">
                  {t("Enquiry submitted successfully!")}
                </p>
              )}

              <button
                type="submit"
                disabled={enquiryStatus === "submitting"}
                className="read-more-btn"
              >
                <span className="white-circle">
                  <i className="fa fa-play"></i>
                </span>
                {enquiryStatus === "submitting" ? t("Sending...") : t("Send Enquiry")}
              </button>
            </form>
          </div>
        </div>
      )}

      {showCBMCalculator && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowCBMCalculator(false)}
        >
          <div
            className="cbm-modal"
            style={{
              width: "520px",
              maxWidth: "100%",
              maxHeight: "90vh",
              backgroundColor: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              zIndex: 9999,
              overflowY: "auto",
              borderRadius: "12px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
                  {t("CBM Calculator")}
                </h4>
                {cbmResult ? (
                  <button
                    onClick={() => setCbmResult(null)}
                    style={{
                      background: "#3351a3",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    {t("Back")}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowCBMCalculator(false)}
                    style={{
                      background: "#3351a3",
                      color: "#fff",
                      border: "none",
                      width: "30px",
                      height: "30px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            <div style={{ padding: "20px" }}>
              {!cbmResult && (
                <>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginBottom: "20px",
                    }}
                  >
                    <tbody>
                      {[
                        {
                          label: t("Quantity per Carton"),
                          value: `${product.units_per_carton || 1} units`,
                        },
                        {
                          label: t("Gross Weight"),
                          value: `${product.gross_weight_per_carton_kg || 0} Kg`,
                        },
                        {
                          label: t("Net Weight"),
                          value: `${product.net_weight_per_carton_kg || 0} Kg`,
                        },
                        {
                          label: t("CBM per Carton"),
                          value: cbmPerCarton.toFixed(4),
                        },
                        {
                          label: t("Carton Dimension"),
                          value: `${product.carton_length_cm || 0}x${
                            product.carton_width_cm || 0
                          }x${product.carton_height_cm || 0} cm`,
                        },
                      ].map((item) => (
                        <tr
                          key={item.label}
                          style={{ border: "1px solid #eee" }}
                        >
                          <td
                            style={{
                              padding: "12px",
                              border: "1px solid #eee",
                              fontWeight: "500",
                              fontSize: "14px",
                            }}
                          >
                            {item.label}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              border: "1px solid #eee",
                              fontSize: "14px",
                            }}
                          >
                            {item.value}
                          </td>
                        </tr>
                      ))}
                      <tr style={{ border: "1px solid #eee" }}>
                        <td
                          style={{
                            padding: "12px",
                            border: "1px solid #eee",
                            fontWeight: "500",
                            fontSize: "14px",
                          }}
                        >
                          {t("Enter required cartoons")}
                        </td>
                        <td
                          style={{ padding: "12px", border: "1px solid #eee" }}
                        >
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(parseInt(e.target.value) || 1)
                            }
                            style={{
                              width: "100%",
                              padding: "8px",
                              borderRadius: "4px",
                              border: "1px solid #ccc",
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <button
                    onClick={calculateCBM}
                    style={{
                      width: "auto",
                      padding: "10px 25px",
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor: "#3351a3",
                      color: "#fff",
                      fontSize: "16px",
                      cursor: "pointer",
                      marginBottom: "20px",
                    }}
                  >
                    {t("Calculate")}
                  </button>
                </>
              )}

              {cbmResult && (
                <div>
                  <div ref={cbmResultRef}>
                    <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                      {t("Result")}
                    </h5>
                    <table
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <tbody>
                        {[
                          {
                            label: t("Product Name"),
                            value: product.name,
                          },
                          {
                            label: t("Product Title"),
                            value: productTitle,
                          },
                          {
                            label: t("Gross Weight in Kg"),
                            value: cbmResult.totalGrossWeight.toFixed(2),
                          },
                          {
                            label: t("Net Weight in Kg"),
                            value: cbmResult.totalNetWeight.toFixed(2),
                          },
                          {
                            label: t("Total Carton in Nos."),
                            value: cbmResult.totalCartons,
                          },
                          {
                            label: t("Total CBM"),
                            value: cbmResult.totalCBM.toFixed(4),
                          },
                        ].map((item) => (
                          <tr
                            key={item.label}
                            style={{
                              border: "1px solid #eee",
                              background:
                                item.label === t("Total CBM") ? "#f0f0f0" : "#fff",
                            }}
                          >
                            <td
                              style={{
                                padding: "12px",
                                border: "1px solid #eee",
                                fontSize: "14px",
                                fontWeight: "bold",
                              }}
                            >
                              {item.label}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                border: "1px solid #eee",
                                fontSize: "14px",
                              }}
                            >
                              {item.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "15px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={shareResultToWhatsapp}
                      style={{
                        background: "#25D366",
                        color: "#fff",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "20px",
                        cursor: "pointer",
                        fontSize: "14px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <i
                        className="fab fa-whatsapp"
                        style={{ fontSize: "16px" }}
                      ></i>
                      {t("Share")}
                    </button>
                    <button
                      onClick={downloadResultPng}
                      style={{
                        background: "#3351a3",
                        color: "#fff",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "20px",
                        cursor: "pointer",
                        fontSize: "14px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <i
                        className="fa fa-download"
                        style={{ fontSize: "16px" }}
                      ></i>
                      {t("Download")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && images[selectedImageIndex] && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeLightbox}>
              &times;
            </button>

            <button className="nav-btn prev-btn" onClick={handlePrev}>
              <i className="fa fa-arrow-left"></i>
            </button>

            <div className={`lightbox-image-container ${isLightboxZoomed ? "zoomed" : ""}`}>
              <Image
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt || productTitle}
                width={isLightboxZoomed ? 2400 : 1200}
                height={isLightboxZoomed ? 1600 : 800}
                quality={100}
                priority
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxZoomed(!isLightboxZoomed);
                }}
              />
              <p className="lightbox-caption">
                {images[selectedImageIndex].alt || productTitle}
              </p>
            </div>

            <button className="nav-btn next-btn" onClick={handleNext}>
              <i className="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import { headers, cookies } from "next/headers";

export async function getServerLocale(): Promise<"en" | "ar" | "hi" | "es" | "pt" | "fr" | "ru"> {
  try {
    const headersList = await headers();
    const headerLocale = headersList.get("x-locale");
    if (headerLocale === "ar" || headerLocale === "hi" || headerLocale === "es" || headerLocale === "pt" || headerLocale === "fr" || headerLocale === "ru" || headerLocale === "en") {
      return headerLocale as "en" | "ar" | "hi" | "es" | "pt" | "fr" | "ru";
    }

    const urlPathname = headersList.get("x-url-pathname") || "";
    if (urlPathname.startsWith("/ar/") || urlPathname === "/ar") return "ar";
    if (urlPathname.startsWith("/hi/") || urlPathname === "/hi") return "hi";
    if (urlPathname.startsWith("/es/") || urlPathname === "/es") return "es";
    if (urlPathname.startsWith("/pt/") || urlPathname === "/pt") return "pt";
    if (urlPathname.startsWith("/fr/") || urlPathname === "/fr") return "fr";
    if (urlPathname.startsWith("/ru/") || urlPathname === "/ru") return "ru";

    const nextUrl = headersList.get("next-url") || headersList.get("x-invoke-path") || "";
    if (nextUrl.startsWith("/ar/") || nextUrl === "/ar") return "ar";
    if (nextUrl.startsWith("/hi/") || nextUrl === "/hi") return "hi";
    if (nextUrl.startsWith("/es/") || nextUrl === "/es") return "es";
    if (nextUrl.startsWith("/pt/") || nextUrl === "/pt") return "pt";
    if (nextUrl.startsWith("/fr/") || nextUrl === "/fr") return "fr";
    if (nextUrl.startsWith("/ru/") || nextUrl === "/ru") return "ru";

    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("language")?.value;
    if (cookieLocale === "ar" || cookieLocale === "hi" || cookieLocale === "es" || cookieLocale === "pt" || cookieLocale === "fr" || cookieLocale === "ru") {
      return cookieLocale;
    }
  } catch (error) {
    // Fallback if headers/cookies are unavailable in certain build contexts
  }
  return "en";
}

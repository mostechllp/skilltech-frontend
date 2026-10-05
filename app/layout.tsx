import type { Metadata } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import "./globals.css";
import { fetchCategories, fetchProducts, fetchSiteSettings } from "@/lib/api";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LanguageProvider } from "@/lib/LanguageContext";
import PWARegistration from "@/components/PWARegistration";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings();
  
  const baseMetadata: Metadata = {
    metadataBase: new URL("https://skilltechonline.com"),
    title: "Skill Tech | Smart & Stylish Mounting Solutions in Dubai",
    description: "Skill Tech provides professional TV wall mount, ceiling mount, and POS installation services across Dubai. We deliver smart and stylish mounting solutions with precision and quality.",
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.ico",
      apple: "/icon-192.png",
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Skill Tech",
    },
  };

  if (settings?.demo) {
    return {
      ...baseMetadata,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return baseMetadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerCategories = await fetchCategories(undefined, undefined, true);
  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" />
        <link id="bootstrap-theme" href={
          locale === "ar"
            ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css"
            : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        } rel="stylesheet" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5KWZ3PH2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5KWZ3PH2');
            `,
          }}
        />
        <PWARegistration />
        <LanguageProvider initialLanguage={locale}>
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer categories={footerCategories} />
        </LanguageProvider>
        
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
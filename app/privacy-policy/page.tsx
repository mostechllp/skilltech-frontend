import React from 'react';
import type { Metadata } from 'next';
import { headers } from "next/headers";
import { translations } from "@/lib/translations";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
  const t = (key: string) => {
    const langDict = (translations[locale] as Record<string, string>) || {};
    return langDict[key] || key;
  };

  const canonical = locale === "ar" ? "https://skilltechonline.com/ar/privacy-policy" : "https://skilltechonline.com/privacy-policy";

  return {
    title: locale === "ar" ? `سياسة الخصوصية | Skill Tech Electronics Trading LLC` : "Privacy Policy | Skill Tech Electronics Trading LLC",
    description: "Read Skill Tech Electronics Trading LLC's privacy policy to understand how we collect, use, and protect your personal information across our services.",
    alternates: {
      canonical,
    },
  };
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://skilltechonline.com/"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Privacy Policy",
    "item": "https://skilltechonline.com/privacy-policy"
  }]
};

export default async function PrivacyPolicyPage() {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";
  const t = (key: string) => {
    const langDict = (translations[locale] as Record<string, string>) || {};
    return langDict[key] || key;
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="container py-5 mt-5">

        <h1 className="mb-4">{t("Privacy Policy")}</h1>
        <div className="content-page">
            <p className="text-muted mb-4">{t("Effective Date: July 20, 2026")}</p>
            <p className="mb-4">{t("At Skill Tech Group of Companies, we are committed to protecting your privacy and safeguarding the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you visit www.skilltechonline.com or interact with our services.")}</p>

            <h2>{t("1. Information We Collect")}</h2>
            <p>{t("We may collect personal information that you voluntarily provide through our website, including:")}</p>
            <ul>
                <li>{t("Full Name")}</li>
                <li>{t("Company Name")}</li>
                <li>{t("Email Address")}</li>
                <li>{t("Phone Number")}</li>
                <li>{t("Location")}</li>
                <li>{t("Service or Product Enquiry Details")}</li>
                <li>{t("Installation Booking Information")}</li>
                <li>{t("Job Application Details and Uploaded CV")}</li>
                <li>{t("Any other information you choose to provide")}</li>
            </ul>

            <h2>{t("2. How We Use Your Information")}</h2>
            <p>{t("Your information is used to:")}</p>
            <ul>
                <li>{t("Respond to enquiries and customer support requests.")}</li>
                <li>{t("Process installation bookings and service requests.")}</li>
                <li>{t("Provide product information and quotations.")}</li>
                <li>{t("Review and manage job applications.")}</li>
                <li>{t("Improve our website, products, and services.")}</li>
                <li>{t("Communicate important updates when necessary.")}</li>
                <li>{t("Comply with applicable legal obligations.")}</li>
            </ul>

            <h2>{t("3. Information Sharing")}</h2>
            <p>{t("We respect your privacy and do not sell, rent, or trade your personal information. Your information may only be shared with trusted service providers or government authorities when required by law or for the purpose of delivering our services.")}</p>

            <h2>{t("4. Data Security")}</h2>
            <p>{t("We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, misuse, alteration, or disclosure. While we strive to safeguard your data, no internet transmission or electronic storage method can be guaranteed to be completely secure.")}</p>

            <h2>{t("5. Cookies")}</h2>
            <p>{t("Our website may use cookies and similar technologies to improve your browsing experience, analyze website traffic, and enhance website functionality. You can manage or disable cookies through your browser settings at any time.")}</p>

            <h2>{t("6. Third-Party Links")}</h2>
            <p>{t("Our website may contain links to external websites for your convenience. We are not responsible for the privacy practices or content of these third-party websites and encourage you to review their respective privacy policies.")}</p>

            <h2>{t("7. Your Rights")}</h2>
            <p>{t("You may request access to, correction of, or deletion of your personal information, subject to applicable laws. To make such a request, please contact us using the details below.")}</p>

            <h2>{t("8. Changes to This Policy")}</h2>
            <p>{t("We may update this Privacy Policy from time to time. Any changes will be posted on this page with the revised effective date.")}</p>

            <h2>{t("9. Contact Us")}</h2>
            <p>{t("If you have any questions regarding this Privacy Policy or how we handle your personal information, please contact us:")}</p>
            <p className="mt-3">
                <strong>{t("Skill Tech Group of Companies")}</strong><br />
                {t("Website: www.skilltechonline.com")}<br />
                {t("Email: info@skilltechonline.com")}<br />
                {t("Phone: +971 4 234 7770")}
            </p>
        </div>
      </section>
    </>
  );
}
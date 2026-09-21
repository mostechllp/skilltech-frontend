import ThankYouContent from "@/components/ThankYouContent";
import { headers } from "next/headers";
import { translations } from "@/lib/translations";

export default async function CareerThankYou() {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";

  const t = (key: string) => {
    const langDict = (translations[locale] as Record<string, string>) || {};
    return langDict[key] || key;
  };

  return (
    <ThankYouContent 
      title={t("Application Received!")} 
      message={t("Thank you for your interest in joining our team.")} 
      subMessage={t("We have received your application and will review it. If your profile matches our requirements, we will get in touch.")}
    />
  );
}

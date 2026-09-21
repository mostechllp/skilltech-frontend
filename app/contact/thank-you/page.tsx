import ThankYouContent from "@/components/ThankYouContent";
import { headers } from "next/headers";
import { translations } from "@/lib/translations";

export default async function ContactThankYou() {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";

  const t = (key: string) => {
    const langDict = (translations[locale] as Record<string, string>) || {};
    return langDict[key] || key;
  };

  return (
    <ThankYouContent 
      title={t("Message Sent!")} 
      message={t("Thank you for contacting us.")} 
      subMessage={t("We have received your message and will respond to your inquiry as soon as possible.")}
    />
  );
}

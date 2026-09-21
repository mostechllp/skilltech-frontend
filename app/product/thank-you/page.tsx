import ThankYouContent from "@/components/ThankYouContent";
import { headers } from "next/headers";
import { translations } from "@/lib/translations";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
};

export default async function ContactThankYou({ searchParams }: PageProps) {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";

  const resolvedSearchParams = await (searchParams instanceof Promise ? searchParams : Promise.resolve(searchParams || {}));
  const ref = typeof resolvedSearchParams.ref === 'string' ? resolvedSearchParams.ref : undefined;

  const t = (key: string) => {
    const langDict = (translations[locale] as Record<string, string>) || {};
    return langDict[key] || key;
  };

  return (
    <ThankYouContent 
      title={t("Enquiry Submitted!")} 
      message={t("Thank you for your interest in this product.")} 
      subMessage={t("We’ve received your enquiry and our team will contact you shortly with more details.")}
      referenceNumber={ref}
    />
  );
}

import React from "react";
import type { Metadata } from "next";
import { getServerLocale } from "@/lib/locale";

export const dynamic = "force-dynamic";

type Locale = "en" | "ar" | "hi" | "es" | "pt" | "fr" | "ru";

const META_TITLE: Record<Locale, string> = {
  en: "Refund Policy – Returns & Refunds | SkillTech Online",
  ar: "سياسة الاسترداد والإرجاع | SkillTech Online",
  hi: "रिफंड नीति – रिटर्न और रिफंड | SkillTech Online",
  es: "Política de Reembolso – Devoluciones y Reembolsos | SkillTech Online",
  pt: "Política de Reembolso – Devoluções e Reembolsos | SkillTech Online",
  fr: "Politique de Remboursement – Retours et Remboursements | SkillTech Online",
  ru: "Политика возврата средств и товаров | SkillTech Online",
};

const CONTENT: Record<
  Locale,
  {
    h1: string;
    s1Title: string;
    s1Text: string;
    s2Title: string;
    s2Intro: string;
    s2List: string[];
    s2Note: string;
    s3Title: string;
    s3Text: string;
    s4Title: string;
    s4Text: string;
    s5Title: string;
    s5Text: string;
    s6Title: string;
    s6Text: string;
    s7Title: string;
    s7Text: string;
  }
> = {
  en: {
    h1: "Refund Policy",
    s1Title: "1. Returns",
    s1Text:
      "We want you to be completely satisfied with your purchase. If you are not, you may return eligible items within 14 days of receipt for a refund or exchange, subject to the conditions below.",
    s2Title: "2. Eligibility for Returns",
    s2Intro: "To be eligible for a return:",
    s2List: [
      "The item must be unused and in the same condition that you received it.",
      "It must be in the original packaging.",
      "You must provide a receipt or proof of purchase.",
    ],
    s2Note:
      "Certain items, such as custom-made products or clearance items, may not be eligible for return.",
    s3Title: "3. Defective or Damaged Items",
    s3Text:
      "If you receive a defective or damaged item, please contact us immediately at info@skillmount.com with details and photos of the defect. We will arrange for a replacement or refund.",
    s4Title: "4. Refund Process",
    s4Text:
      "Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within a certain amount of days.",
    s5Title: "5. Shipping Costs",
    s5Text:
      "You will be responsible for paying for your own shipping costs for returning your item, unless the return is due to our error (e.g., you received an incorrect or defective item). Shipping costs are non-refundable.",
    s6Title: "6. Service Cancellation",
    s6Text:
      "For installation services, cancellations must be made at least 24 hours in advance. Cancellations made less than 24 hours before the scheduled appointment may be subject to a cancellation fee.",
    s7Title: "7. Contact Us",
    s7Text: "If you have any questions about our Refund Policy, please contact us at info@skillmount.com.",
  },
  ar: {
    h1: "سياسة الاسترداد",
    s1Title: "1. الإرجاع",
    s1Text:
      "نريدك أن تكون راضياً تماماً عن مشترياتك. إذا لم تكن كذلك، يمكنك إرجاع المنتجات المؤهلة خلال 14 يوماً من تاريخ الاستلام لاسترداد المبلغ أو الاستبدال، وفقاً للشروط أدناه.",
    s2Title: "2. شروط الأهلية للإرجاع",
    s2Intro: "لكي يكون المنتج مؤهلاً للإرجاع:",
    s2List: [
      "يجب أن يكون المنتج غير مستخدم وبنفس الحالة التي استلمته بها.",
      "يجب أن يكون في عبوته الأصلية.",
      "يجب تقديم إيصال أو إثبات للشراء.",
    ],
    s2Note:
      "قد لا تكون بعض المنتجات، مثل المنتجات المصممة حسب الطلب أو منتجات التصفية، مؤهلة للإرجاع.",
    s3Title: "3. المنتجات المعيبة أو التالفة",
    s3Text:
      "إذا استلمت منتجاً معيباً أو تالفاً، يرجى التواصل معنا فوراً على info@skillmount.com مع التفاصيل وصور العيب. سنقوم بترتيب الاستبدال أو استرداد المبلغ.",
    s4Title: "4. إجراءات الاسترداد",
    s4Text:
      "بمجرد استلام المرتجع وفحصه، سنقوم بإبلاغك بالموافقة على طلب الاسترداد أو رفضه. في حال الموافقة، سيتم معالجة الاسترداد وإعادة المبلغ تلقائياً إلى وسيلة الدفع الأصلية خلال عدة أيام.",
    s5Title: "5. تكاليف الشحن",
    s5Text:
      "ستكون مسؤولاً عن دفع تكاليف الشحن الخاصة بك لإرجاع المنتج، ما لم يكن الإرجاع بسبب خطأ من جانبنا (مثل استلام منتج خاطئ أو معيب). تكاليف الشحن غير قابلة للاسترداد.",
    s6Title: "6. إلغاء الخدمة",
    s6Text:
      "بالنسبة لخدمات التركيب، يجب إجراء الإلغاء قبل 24 ساعة على الأقل من الموعد المحدد. قد تخضع الإلغاءات التي تتم قبل أقل من 24 ساعة من الموعد المحدد لرسوم إلغاء.",
    s7Title: "7. تواصل معنا",
    s7Text: "إذا كانت لديك أي أسئلة حول سياسة الاسترداد الخاصة بنا، يرجى التواصل معنا على info@skillmount.com.",
  },
  hi: {
    h1: "रिफंड नीति",
    s1Title: "1. रिटर्न (वापसी)",
    s1Text:
      "हम चाहते हैं कि आप अपनी खरीदारी से पूरी तरह संतुष्ट हों। यदि आप संतुष्ट नहीं हैं, तो आप नीचे दी गई शर्तों के अधीन रिफंड या एक्सचेंज के लिए प्राप्त होने के 14 दिनों के भीतर पात्र आइटम वापस कर सकते हैं।",
    s2Title: "2. रिटर्न के लिए पात्रता",
    s2Intro: "रिटर्न के लिए पात्र होने हेतु:",
    s2List: [
      "आइटम अप्रयुक्त होना चाहिए और उसी स्थिति में होना चाहिए जिसमें आपको प्राप्त हुआ था।",
      "यह मूल पैकेजिंग में होना चाहिए।",
      "आपको रसीद या खरीदारी का प्रमाण प्रदान करना होगा।",
    ],
    s2Note:
      "कुछ आइटम, जैसे कस्टम-मेड उत्पाद या क्लीयरेंस आइटम, रिटर्न के लिए पात्र नहीं हो सकते हैं।",
    s3Title: "3. दोषपूर्ण या क्षतिग्रस्त आइटम",
    s3Text:
      "यदि आपको कोई दोषपूर्ण या क्षतिग्रस्त आइटम प्राप्त होता है, तो कृपया तुरंत info@skillmount.com पर विवरण और दोष की तस्वीरों के साथ हमसे संपर्क करें। हम रिप्लेसमेंट या रिफंड की व्यवस्था करेंगे।",
    s4Title: "4. रिफंड प्रक्रिया",
    s4Text:
      "एक बार आपका रिटर्न प्राप्त हो जाने और निरीक्षण किए जाने के बाद, हम आपको रिफंड की स्वीकृति या अस्वीकृति की सूचना देंगे। स्वीकृत होने पर, आपका रिफंड प्रोसेस किया जाएगा और कुछ दिनों के भीतर आपकी मूल भुगतान विधि में स्वतः क्रेडिट कर दिया जाएगा।",
    s5Title: "5. शिपिंग लागत",
    s5Text:
      "अपना आइटम वापस करने के लिए शिपिंग लागत का भुगतान करने की जिम्मेदारी आपकी होगी, जब तक कि रिटर्न हमारी गलती के कारण न हो (उदाहरण के लिए, गलत या दोषपूर्ण आइटम मिलना)। शिपिंग लागत नॉन-रिफंडेबल है।",
    s6Title: "6. सेवा रद्दीकरण",
    s6Text:
      "इंस्टॉलेशन सेवाओं के लिए, रद्दीकरण कम से कम 24 घंटे पहले किया जाना चाहिए। निर्धारित अपॉइंटमेंट से 24 घंटे से कम समय पहले किए गए रद्दीकरण पर रद्दीकरण शुल्क लागू हो सकता है।",
    s7Title: "7. संपर्क करें",
    s7Text: "यदि हमारी रिफंड नीति के बारे में आपके कोई प्रश्न हैं, तो कृपया info@skillmount.com पर संपर्क करें।",
  },
  es: {
    h1: "Política de Reembolso",
    s1Title: "1. Devoluciones",
    s1Text:
      "Queremos que esté completamente satisfecho con su compra. Si no es así, puede devolver los artículos elegibles dentro de los 14 días posteriores a la recepción para obtener un reembolso o cambio, sujeto a las condiciones siguientes.",
    s2Title: "2. Elegibilidad para Devoluciones",
    s2Intro: "Para ser elegible para una devolución:",
    s2List: [
      "El artículo debe estar sin usar y en las mismas condiciones en que lo recibió.",
      "Debe estar en su embalaje original.",
      "Debe proporcionar un recibo o comprobante de compra.",
    ],
    s2Note:
      "Ciertos artículos, como productos hechos a medida o artículos en liquidación, pueden no ser elegibles para devolución.",
    s3Title: "3. Artículos Defectuosos o Dañados",
    s3Text:
      "Si recibe un artículo defectuoso o dañado, contáctenos de inmediato en info@skillmount.com con los detalles y fotos del defecto. Coordinaremos un reemplazo o reembolso.",
    s4Title: "4. Proceso de Reembolso",
    s4Text:
      "Una vez recibida e inspeccionada su devolución, le notificaremos la aprobación o el rechazo de su reembolso. Si se aprueba, se procesará su reembolso y se aplicará automáticamente un crédito a su método de pago original en unos días.",
    s5Title: "5. Costos de Envío",
    s5Text:
      "Usted será responsable de pagar sus propios costos de envío para devolver el artículo, a menos que la devolución se deba a un error nuestro (por ejemplo, recibió un artículo incorrecto o defectuoso). Los costos de envío no son reembolsables.",
    s6Title: "6. Cancelación del Servicio",
    s6Text:
      "Para los servicios de instalación, las cancelaciones deben realizarse con al menos 24 horas de anticipación. Las cancelaciones realizadas con menos de 24 horas antes de la cita programada pueden estar sujetas a un cargo por cancelación.",
    s7Title: "7. Contáctenos",
    s7Text: "Si tiene alguna pregunta sobre nuestra Política de Reembolso, contáctenos en info@skillmount.com.",
  },
  pt: {
    h1: "Política de Reembolso",
    s1Title: "1. Devoluções",
    s1Text:
      "Queremos que você fique totalmente satisfeito com sua compra. Caso não esteja, você pode devolver itens elegíveis em até 14 dias após o recebimento para reembolso ou troca, sujeito às condições abaixo.",
    s2Title: "2. Elegibilidade para Devoluções",
    s2Intro: "Para ser elegível para uma devolução:",
    s2List: [
      "O item deve estar sem uso e nas mesmas condições em que você o recebeu.",
      "Deve estar na embalagem original.",
      "Você deve fornecer um recibo ou comprovante de compra.",
    ],
    s2Note:
      "Certos itens, como produtos feitos sob medida ou itens de liquidação, podem não ser elegíveis para devolução.",
    s3Title: "3. Itens Defeituosos ou Danificados",
    s3Text:
      "Se você receber um item com defeito ou danificado, entre em contato conosco imediatamente pelo e-mail info@skillmount.com com detalhes e fotos do defeito. Providenciaremos uma substituição ou reembolso.",
    s4Title: "4. Processo de Reembolso",
    s4Text:
      "Assim que sua devolução for recebida e inspecionada, notificaremos você sobre a aprovação ou rejeição do seu reembolso. Se aprovado, o reembolso será processado e um crédito será aplicado automaticamente ao seu método de pagamento original dentro de alguns dias.",
    s5Title: "5. Custos de Envio",
    s5Text:
      "Você será responsável por pagar seus próprios custos de envio para devolver o item, a menos que a devolução seja devido a um erro nosso (por exemplo, você recebeu um item incorreto ou com defeito). Os custos de envio não são reembolsáveis.",
    s6Title: "6. Cancelamento de Serviço",
    s6Text:
      "Para serviços de instalação, os cancelamentos devem ser feitos com pelo menos 24 horas de antecedência. Cancelamentos feitos com menos de 24 horas antes do horário agendado podem estar sujeitos a uma taxa de cancelamento.",
    s7Title: "7. Fale Conosco",
    s7Text: "Se você tiver alguma dúvida sobre nossa Política de Reembolso, entre em contato conosco pelo e-mail info@skillmount.com.",
  },
  fr: {
    h1: "Politique de Remboursement",
    s1Title: "1. Retours",
    s1Text:
      "Nous souhaitons que vous soyez entièrement satisfait de votre achat. Si ce n'est pas le cas, vous pouvez retourner les articles éligibles dans les 14 jours suivant leur réception pour un remboursement ou un échange, sous réserve des conditions ci-dessous.",
    s2Title: "2. Conditions d'Éligibilité aux Retours",
    s2Intro: "Pour être éligible à un retour :",
    s2List: [
      "L'article doit être inutilisé et dans le même état que celui dans lequel vous l'avez reçu.",
      "Il doit être dans son emballage d'origine.",
      "Vous devez fournir un reçu ou une preuve d'achat.",
    ],
    s2Note:
      "Certains articles, tels que les produits sur mesure ou les articles en déstockage, peuvent ne pas être éligibles au retour.",
    s3Title: "3. Articles Défectueux ou Endommagés",
    s3Text:
      "Si vous recevez un article défectueux ou endommagé, veuillez nous contacter immédiatement à info@skillmount.com avec les détails et des photos du défaut. Nous organiserons un remplacement ou un remboursement.",
    s4Title: "4. Processus de Remboursement",
    s4Text:
      "Une fois votre retour reçu et inspecté, nous vous informerons de l'approbation ou du rejet de votre remboursement. S'il est approuvé, votre remboursement sera traité et un crédit sera automatiquement appliqué à votre mode de paiement initial sous quelques jours.",
    s5Title: "5. Frais d'Expédition",
    s5Text:
      "Vous serez responsable du paiement de vos propres frais d'expédition pour le retour de votre article, sauf si le retour est dû à une erreur de notre part (par exemple, article incorrect ou défectueux). Les frais d'expédition ne sont pas remboursables.",
    s6Title: "6. Annulation de Service",
    s6Text:
      "Pour les services d'installation, les annulations doivent être effectuées au moins 24 heures à l'avance. Les annulations effectuées moins de 24 heures avant le rendez-vous prévu peuvent être soumises à des frais d'annulation.",
    s7Title: "7. Contactez-nous",
    s7Text: "Si vous avez des questions concernant notre Politique de Remboursement, veuillez nous contacter à info@skillmount.com.",
  },
  ru: {
    h1: "Политика возврата",
    s1Title: "1. Возврат товаров",
    s1Text:
      "Мы хотим, чтобы вы были полностью довольны своей покупкой. Если товар вам не подошел, вы можете вернуть подходящие товары в течение 14 дней с момента получения для возврата средств или обмена на условиях, указанных ниже.",
    s2Title: "2. Условия возврата",
    s2Intro: "Чтобы товар подлежал возврату:",
    s2List: [
      "Товар не должен был использоваться и должен находиться в том же состоянии, в котором вы его получили.",
      "Он должен находиться в оригинальной упаковке.",
      "Необходимо предоставить чек или подтверждение покупки.",
    ],
    s2Note:
      "Некоторые товары, например изделия на заказ или товары с распродажи, могут не подлежать возврату.",
    s3Title: "3. Дефектные или поврежденные товары",
    s3Text:
      "Если вы получили товар с дефектом или повреждением, немедленно свяжитесь с нами по адресу info@skillmount.com, приложив описание и фотографии дефекта. Мы организуем замену или возврат средств.",
    s4Title: "4. Процесс возврата средств",
    s4Text:
      "После получения и проверки возвращенного товара мы уведомим вас об одобрении или отклонении возврата. В случае одобрения возврат будет обработан, и средства будут автоматически зачислены на ваш первоначальный способ оплаты в течение нескольких дней.",
    s5Title: "5. Стоимость доставки",
    s5Text:
      "Расходы по обратной доставке товара несете вы, за исключением случаев, когда возврат вызван нашей ошибкой (например, вы получили неверный или дефектный товар). Стоимость доставки не возвращается.",
    s6Title: "6. Отмена услуги",
    s6Text:
      "Отмена услуг по установке должна производиться не менее чем за 24 часа до назначенного времени. При отмене менее чем за 24 часа может взиматься плата за отмену.",
    s7Title: "7. Свяжитесь с нами",
    s7Text: "Если у вас есть вопросы по поводу нашей Политики возврата, свяжитесь с нами по адресу info@skillmount.com.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getServerLocale()) as Locale;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const title = META_TITLE[locale] || META_TITLE.en;
  const description =
    "Read the official refund and return policy for Skill Tech. Find details on returns, exchanges, warranty and order cancellations across the UAE.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://skilltechonline.com${prefix}/refund-policy`,
    },
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RefundPolicyPage() {
  const locale = (await getServerLocale()) as Locale;
  const c = CONTENT[locale] || CONTENT.en;

  return (
    <section className="container py-5 mt-5" dir={locale === "ar" ? "rtl" : "ltr"}>
      <h1 className="mb-4">{c.h1}</h1>
      <div className="content-page">
        <h2>{c.s1Title}</h2>
        <p>{c.s1Text}</p>

        <h2>{c.s2Title}</h2>
        <p>{c.s2Intro}</p>
        <ul>
          {c.s2List.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <p>{c.s2Note}</p>

        <h2>{c.s3Title}</h2>
        <p>{c.s3Text}</p>

        <h2>{c.s4Title}</h2>
        <p>{c.s4Text}</p>

        <h2>{c.s5Title}</h2>
        <p>{c.s5Text}</p>

        <h2>{c.s6Title}</h2>
        <p>{c.s6Text}</p>

        <h2>{c.s7Title}</h2>
        <p>{c.s7Text}</p>
      </div>
    </section>
  );
}

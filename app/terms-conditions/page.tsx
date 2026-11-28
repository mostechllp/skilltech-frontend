import React from "react";
import type { Metadata } from "next";
import { getServerLocale } from "@/lib/locale";

export const dynamic = "force-dynamic";

type Locale = "en" | "ar" | "hi" | "es" | "pt" | "fr" | "ru";

const META_TITLE: Record<Locale, string> = {
  en: "Terms and Conditions - Skill Tech",
  ar: "الشروط والأحكام - Skill Tech",
  hi: "नियम और शर्तें - Skill Tech",
  es: "Términos y Condiciones - Skill Tech",
  pt: "Termos e Condições - Skill Tech",
  fr: "Conditions Générales - Skill Tech",
  ru: "Условия и положения - Skill Tech",
};

const CONTENT: Record<
  Locale,
  {
    h1: string;
    sections: { title: string; text: string }[];
  }
> = {
  en: {
    h1: "Terms and Conditions",
    sections: [
      {
        title: "1. Introduction",
        text: "Welcome to Skill Mount Electronics Trading LLC. These Terms and Conditions govern your use of our website and the purchase of our products and services. By accessing or using our website, you agree to be bound by these terms.",
      },
      {
        title: "2. Intellectual Property",
        text: "All content on this website, including text, graphics, logos, images, and software, is the property of Skill Mount Electronics Trading LLC and is protected by copyright and other intellectual property laws.",
      },
      {
        title: "3. Products and Services",
        text: "We strive to display our products and services as accurately as possible. However, we do not warrant that product descriptions, images, or other content are error-free, complete, or current. We reserve the right to modify or discontinue any product or service at any time without notice.",
      },
      {
        title: "4. Pricing and Payment",
        text: "Prices for our products and services are subject to change without notice. We reserve the right to refuse or cancel any order placed for a product listed at an incorrect price. Payment must be made in full at the time of purchase unless otherwise agreed.",
      },
      {
        title: "5. Shipping and Delivery",
        text: "We will make reasonable efforts to deliver products within the estimated timeframes. However, we are not responsible for delays caused by external factors. Risk of loss and title for items purchased pass to you upon delivery to the carrier.",
      },
      {
        title: "6. Installation Services",
        text: "For installation services, you agree to provide a safe and suitable environment for our technicians. We reserve the right to refuse service if conditions are deemed unsafe or unsuitable.",
      },
      {
        title: "7. Limitation of Liability",
        text: "Skill Mount Electronics Trading LLC shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or products.",
      },
      {
        title: "8. Governing Law",
        text: "These Terms and Conditions shall be governed by and construed in accordance with the laws of the United Arab Emirates.",
      },
      {
        title: "9. Changes to Terms",
        text: "We reserve the right to update or modify these Terms and Conditions at any time. Your continued use of the website following any changes constitutes your acceptance of the new terms.",
      },
      {
        title: "10. Contact Us",
        text: "If you have any questions about these Terms and Conditions, please contact us at info@skillmount.com.",
      },
    ],
  },
  ar: {
    h1: "الشروط والأحكام",
    sections: [
      {
        title: "1. المقدمة",
        text: "مرحباً بكم في شركة سكيل ماونت لتجارة الإلكترونيات ذ.م.م. تحكم هذه الشروط والأحكام استخدامك لموقعنا الإلكتروني وشراء منتجاتنا وخدماتنا. من خلال الدخول إلى موقعنا أو استخدامه، فإنك توافق على الالتزام بهذه الشروط.",
      },
      {
        title: "2. الملكية الفكرية",
        text: "جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والرسومات والشعارات والصور والبرامج، هي ملك لشركة سكيل ماونت لتجارة الإلكترونيات ذ.م.م ومحمية بموجب قوانين حقوق النشر والملكية الفكرية الأخرى.",
      },
      {
        title: "3. المنتجات والخدمات",
        text: "نسعى جاهدين لعرض منتجاتنا وخدماتنا بأكبر قدر ممكن من الدقة. ومع ذلك، لا نضمن أن تكون أوصاف المنتجات أو الصور أو المحتويات الأخرى خالية من الأخطاء أو كاملة أو محدثة. نحتفظ بالحق في تعديل أو إيقاف أي منتج أو خدمة في أي وقت دون إشعار مسبق.",
      },
      {
        title: "4. التسعير والدفع",
        text: "أسعار منتجاتنا وخدماتنا عرضة للتغيير دون إشعار مسبق. نحتفظ بالحق في رفض أو إلغاء أي طلب يتم تقديمه لمنتج مدرج بسعر غير صحيح. يجب سداد المبلغ بالكامل وقت الشراء ما لم يتم الاتفاق على خلاف ذلك.",
      },
      {
        title: "5. الشحن والتسليم",
        text: "سنبذل جهوداً معقولة لتسليم المنتجات ضمن الإطار الزمني المقدر. ومع ذلك، لا نتحمل المسؤولية عن التأخيرات الناتجة عن عوامل خارجية. تنتقل مسؤولية الفقدان وملكية المنتجات المشتراة إليك عند تسليمها لشركة الشحن.",
      },
      {
        title: "6. خدمات التركيب",
        text: "بالنسبة لخدمات التركيب، فإنك توافق على توفير بيئة آمنة ومناسبة لفنيينا. نحتفظ بالحق في رفض الخدمة إذا اعتُبرت الظروف غير آمنة أو غير مناسبة.",
      },
      {
        title: "7. حدود المسؤولية",
        text: "لا تتحمل شركة سكيل ماونت لتجارة الإلكترونيات ذ.م.م أي مسؤولية عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية تنشأ عن أو فيما يتعلق باستخدامك لموقعنا الإلكتروني أو منتجاتنا.",
      },
      {
        title: "8. القانون المعمول به",
        text: "تخضع هذه الشروط والأحكام وتُفسر وفقاً لقوانين دولة الإمارات العربية المتحدة.",
      },
      {
        title: "9. التغييرات على الشروط",
        text: "نحتفظ بالحق في تحديث أو تعديل هذه الشروط والأحكام في أي وقت. يشكل استمرارك في استخدام الموقع بعد أي تغييرات موافقتك على الشروط الجديدة.",
      },
      {
        title: "10. تواصل معنا",
        text: "إذا كانت لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا على info@skillmount.com.",
      },
    ],
  },
  hi: {
    h1: "नियम और शर्तें",
    sections: [
      {
        title: "1. परिचय",
        text: "Skill Mount Electronics Trading LLC में आपका स्वागत है। ये नियम और शर्तें हमारी वेबसाइट के आपके उपयोग और हमारे उत्पादों तथा सेवाओं की खरीदारी को नियंत्रित करती हैं। हमारी वेबसाइट का उपयोग करके, आप इन शर्तों से बंधे होने के लिए सहमत होते हैं।",
      },
      {
        title: "2. बौद्धिक संपदा",
        text: "इस वेबसाइट की सभी सामग्री, जिसमें टेक्स्ट, ग्राफिक्स, लोगो, चित्र और सॉफ़्टवेयर शामिल हैं, Skill Mount Electronics Trading LLC की संपत्ति है और कॉपीराइट तथा अन्य बौद्धिक संपदा कानूनों द्वारा सुरक्षित है।",
      },
      {
        title: "3. उत्पाद और सेवाएं",
        text: "हम अपने उत्पादों और सेवाओं को यथासंभव सटीक रूप से प्रदर्शित करने का प्रयास करते हैं। हालांकि, हम यह गारंटी नहीं देते कि उत्पाद विवरण, चित्र या अन्य सामग्री त्रुटि-रहित, पूर्ण या अद्यतन हैं। हम बिना किसी पूर्व सूचना के किसी भी समय किसी उत्पाद या सेवा को संशोधित या बंद करने का अधिकार सुरक्षित रखते हैं।",
      },
      {
        title: "4. मूल्य निर्धारण और भुगतान",
        text: "हमारे उत्पादों और सेवाओं की कीमतें बिना किसी पूर्व सूचना के बदल सकती हैं। गलत कीमत पर सूचीबद्ध किसी उत्पाद के लिए दिए गए किसी भी ऑर्डर को अस्वीकार या रद्द करने का अधिकार हमारे पास सुरक्षित है। जब तक अन्यथा सहमति न हो, खरीदारी के समय पूरा भुगतान किया जाना चाहिए।",
      },
      {
        title: "5. शिपिंग और डिलीवरी",
        text: "हम अनुमानित समय-सीमा के भीतर उत्पादों को डिलीवर करने का उचित प्रयास करेंगे। हालांकि, बाहरी कारकों के कारण होने वाली देरी के लिए हम जिम्मेदार नहीं हैं। खरीदे गए आइटम का जोखिम और स्वामित्व कैरियर को डिलीवरी के समय आपको स्थानांतरित हो जाता है।",
      },
      {
        title: "6. इंस्टॉलेशन सेवाएं",
        text: "इंस्टॉलेशन सेवाओं के लिए, आप हमारे तकनीशियनों हेतु एक सुरक्षित और उपयुक्त वातावरण प्रदान करने के लिए सहमत होते हैं। यदि स्थितियां असुरक्षित या अनुपयुक्त पाई जाती हैं, तो हम सेवा देने से इनकार करने का अधिकार सुरक्षित रखते हैं।",
      },
      {
        title: "7. दायित्व की सीमा",
        text: "Skill Mount Electronics Trading LLC हमारी वेबसाइट या उत्पादों के आपके उपयोग से उत्पन्न या उससे जुड़े किसी भी अप्रत्यक्ष, आकस्मिक, विशेष या परिणामी नुकसान के लिए उत्तरदायी नहीं होगा।",
      },
      {
        title: "8. शासी कानून",
        text: "ये नियम और शर्तें संयुक्त अरब अमीरात के कानूनों के अनुसार शासित और व्याख्यायित की जाएंगी।",
      },
      {
        title: "9. शर्तों में परिवर्तन",
        text: "हम किसी भी समय इन नियम और शर्तों को अपडेट या संशोधित करने का अधिकार सुरक्षित रखते हैं। किसी भी बदलाव के बाद वेबसाइट का निरंतर उपयोग नई शर्तों की आपकी स्वीकृति माना जाएगा।",
      },
      {
        title: "10. संपर्क करें",
        text: "यदि इन नियम और शर्तों के बारे में आपके कोई प्रश्न हैं, तो कृपया info@skillmount.com पर संपर्क करें।",
      },
    ],
  },
  es: {
    h1: "Términos y Condiciones",
    sections: [
      {
        title: "1. Introducción",
        text: "Bienvenido a Skill Mount Electronics Trading LLC. Estos Términos y Condiciones rigen su uso de nuestro sitio web y la compra de nuestros productos y servicios. Al acceder o utilizar nuestro sitio web, usted acepta quedar vinculado por estos términos.",
      },
      {
        title: "2. Propiedad Intelectual",
        text: "Todo el contenido de este sitio web, incluidos textos, gráficos, logotipos, imágenes y software, es propiedad de Skill Mount Electronics Trading LLC y está protegido por leyes de derechos de autor y otras leyes de propiedad intelectual.",
      },
      {
        title: "3. Productos y Servicios",
        text: "Nos esforzamos por mostrar nuestros productos y servicios con la mayor precisión posible. Sin embargo, no garantizamos que las descripciones de productos, imágenes u otro contenido estén libres de errores, completos o actualizados. Nos reservamos el derecho de modificar o descontinuar cualquier producto o servicio en cualquier momento sin previo aviso.",
      },
      {
        title: "4. Precios y Pagos",
        text: "Los precios de nuestros productos y servicios están sujetos a cambios sin previo aviso. Nos reservamos el derecho de rechazar o cancelar cualquier pedido realizado por un producto listado a un precio incorrecto. El pago debe realizarse en su totalidad al momento de la compra, salvo acuerdo en contrario.",
      },
      {
        title: "5. Envío y Entrega",
        text: "Haremos esfuerzos razonables para entregar los productos dentro de los plazos estimados. Sin embargo, no somos responsables por retrasos causados por factores externos. El riesgo de pérdida y la titularidad de los artículos comprados pasan a usted en el momento de la entrega al transportista.",
      },
      {
        title: "6. Servicios de Instalación",
        text: "Para los servicios de instalación, usted acepta proporcionar un entorno seguro y adecuado para nuestros técnicos. Nos reservamos el derecho de rechazar el servicio si las condiciones se consideran inseguras o inadecuadas.",
      },
      {
        title: "7. Limitación de Responsabilidad",
        text: "Skill Mount Electronics Trading LLC no será responsable de ningún daño indirecto, incidental, especial o consecuente que surja de o en relación con su uso de nuestro sitio web o productos.",
      },
      {
        title: "8. Ley Aplicable",
        text: "Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de los Emiratos Árabes Unidos.",
      },
      {
        title: "9. Cambios en los Términos",
        text: "Nos reservamos el derecho de actualizar o modificar estos Términos y Condiciones en cualquier momento. Su uso continuado del sitio web después de cualquier cambio constituye su aceptación de los nuevos términos.",
      },
      {
        title: "10. Contáctenos",
        text: "Si tiene alguna pregunta sobre estos Términos y Condiciones, contáctenos en info@skillmount.com.",
      },
    ],
  },
  pt: {
    h1: "Termos e Condições",
    sections: [
      {
        title: "1. Introdução",
        text: "Bem-vindo à Skill Mount Electronics Trading LLC. Estes Termos e Condições regem o uso do nosso site e a compra de nossos produtos e serviços. Ao acessar ou usar nosso site, você concorda em estar vinculado a estes termos.",
      },
      {
        title: "2. Propriedade Intelectual",
        text: "Todo o conteúdo deste site, incluindo textos, gráficos, logotipos, imagens e software, é de propriedade da Skill Mount Electronics Trading LLC e é protegido por leis de direitos autorais e outras leis de propriedade intelectual.",
      },
      {
        title: "3. Produtos e Serviços",
        text: "Nos esforçamos para exibir nossos produtos e serviços com a maior precisão possível. No entanto, não garantimos que as descrições dos produtos, imagens ou outros conteúdos sejam livres de erros, completos ou atualizados. Reservamo-nos o direito de modificar ou descontinuar qualquer produto ou serviço a qualquer momento sem aviso prévio.",
      },
      {
        title: "4. Preços e Pagamento",
        text: "Os preços de nossos produtos e serviços estão sujeitos a alterações sem aviso prévio. Reservamo-nos o direito de recusar ou cancelar qualquer pedido feito para um produto listado com preço incorreto. O pagamento deve ser feito integralmente no momento da compra, salvo acordo em contrário.",
      },
      {
        title: "5. Envio e Entrega",
        text: "Faremos esforços razoáveis para entregar os produtos dentro dos prazos estimados. No entanto, não nos responsabilizamos por atrasos causados por fatores externos. O risco de perda e a titularidade dos itens comprados passam para você no momento da entrega à transportadora.",
      },
      {
        title: "6. Serviços de Instalação",
        text: "Para serviços de instalação, você concorda em fornecer um ambiente seguro e adequado para nossos técnicos. Reservamo-nos o direito de recusar o serviço se as condições forem consideradas inseguras ou inadequadas.",
      },
      {
        title: "7. Limitação de Responsabilidade",
        text: "A Skill Mount Electronics Trading LLC não será responsável por quaisquer danos indiretos, incidentais, especiais ou consequentes decorrentes de ou em conexão com o uso do nosso site ou produtos.",
      },
      {
        title: "8. Lei Aplicável",
        text: "Estes Termos e Condições serão regidos e interpretados de acordo com as leis dos Emirados Árabes Unidos.",
      },
      {
        title: "9. Alterações nos Termos",
        text: "Reservamo-nos o direito de atualizar ou modificar estes Termos e Condições a qualquer momento. Seu uso contínuo do site após quaisquer alterações constitui sua aceitação dos novos termos.",
      },
      {
        title: "10. Fale Conosco",
        text: "Se você tiver alguma dúvida sobre estes Termos e Condições, entre em contato conosco pelo e-mail info@skillmount.com.",
      },
    ],
  },
  fr: {
    h1: "Conditions Générales",
    sections: [
      {
        title: "1. Introduction",
        text: "Bienvenue chez Skill Mount Electronics Trading LLC. Les présentes Conditions Générales régissent votre utilisation de notre site Web ainsi que l'achat de nos produits et services. En accédant à notre site Web ou en l'utilisant, vous acceptez d'être lié par ces conditions.",
      },
      {
        title: "2. Propriété Intellectuelle",
        text: "Tout le contenu de ce site Web, y compris les textes, graphiques, logos, images et logiciels, est la propriété de Skill Mount Electronics Trading LLC et est protégé par le droit d'auteur et les autres lois sur la propriété intellectuelle.",
      },
      {
        title: "3. Produits et Services",
        text: "Nous nous efforçons de présenter nos produits et services aussi précisément que possible. Toutefois, nous ne garantissons pas que les descriptions de produits, les images ou tout autre contenu soient exempts d'erreurs, complets ou à jour. Nous nous réservons le droit de modifier ou d'interrompre tout produit ou service à tout moment sans préavis.",
      },
      {
        title: "4. Tarifs et Paiement",
        text: "Les prix de nos produits et services sont susceptibles d'être modifiés sans préavis. Nous nous réservons le droit de refuser ou d'annuler toute commande passée pour un produit affiché à un prix incorrect. Le paiement doit être effectué en totalité au moment de l'achat, sauf accord contraire.",
      },
      {
        title: "5. Expédition et Livraison",
        text: "Nous ferons des efforts raisonnables pour livrer les produits dans les délais estimés. Cependant, nous ne sommes pas responsables des retards causés par des facteurs externes. Le risque de perte et la propriété des articles achetés vous sont transférés dès la remise au transporteur.",
      },
      {
        title: "6. Services d'Installation",
        text: "Pour les services d'installation, vous acceptez de fournir un environnement sûr et adapté à nos techniciens. Nous nous réservons le droit de refuser le service si les conditions sont jugées dangereuses ou inadaptées.",
      },
      {
        title: "7. Limitation de Responsabilité",
        text: "Skill Mount Electronics Trading LLC ne saurait être tenue responsable de tout dommage indirect, accessoire, spécial ou consécutif découlant de ou lié à votre utilisation de notre site Web ou de nos produits.",
      },
      {
        title: "8. Loi Applicable",
        text: "Les présentes Conditions Générales sont régies et interprétées conformément aux lois des Émirats arabes unis.",
      },
      {
        title: "9. Modifications des Conditions",
        text: "Nous nous réservons le droit de mettre à jour ou de modifier ces Conditions Générales à tout moment. Votre utilisation continue du site Web après toute modification vaut acceptation des nouvelles conditions.",
      },
      {
        title: "10. Contactez-nous",
        text: "Si vous avez des questions concernant ces Conditions Générales, veuillez nous contacter à info@skillmount.com.",
      },
    ],
  },
  ru: {
    h1: "Условия и положения",
    sections: [
      {
        title: "1. Введение",
        text: "Добро пожаловать в Skill Mount Electronics Trading LLC. Настоящие Условия и положения регулируют использование нашего веб-сайта, а также покупку наших товаров и услуг. Посещая или используя наш веб-сайт, вы соглашаетесь соблюдать данные условия.",
      },
      {
        title: "2. Интеллектуальная собственность",
        text: "Весь контент на этом веб-сайте, включая тексты, графику, логотипы, изображения и программное обеспечение, является собственностью Skill Mount Electronics Trading LLC и защищен авторским правом и другими законами об интеллектуальной собственности.",
      },
      {
        title: "3. Товары и услуги",
        text: "Мы стараемся отображать наши товары и услуги максимально точно. Однако мы не гарантируем, что описания товаров, изображения или другой контент не содержат ошибок, являются полными или актуальными. Мы оставляем за собой право изменять или прекращать выпуск любого товара или услуги в любое время без предварительного уведомления.",
      },
      {
        title: "4. Цены и оплата",
        text: "Цены на наши товары и услуги могут быть изменены без предварительного уведомления. Мы оставляем за собой право отказать или отменить любой заказ на товар, указанный по неверной цене. Оплата должна производиться в полном объеме в момент покупки, если не оговорено иное.",
      },
      {
        title: "5. Доставка",
        text: "Мы приложим все разумные усилия для доставки товаров в ориентировочные сроки. Однако мы не несем ответственности за задержки, вызванные внешними факторами. Риск утраты и право собственности на приобретенные товары переходят к вам в момент передачи перевозчику.",
      },
      {
        title: "6. Услуги по установке",
        text: "При заказе услуг по установке вы обязуетесь обеспечить безопасные и подходящие условия для работы наших специалистов. Мы оставляем за собой право отказать в обслуживании, если условия будут признаны небезопасными или неподходящими.",
      },
      {
        title: "7. Ограничение ответственности",
        text: "Skill Mount Electronics Trading LLC не несет ответственности за любые косвенные, случайные, особые или последующие убытки, возникающие в связи с использованием нашего веб-сайта или товаров.",
      },
      {
        title: "8. Применимое право",
        text: "Настоящие Условия и положения регулируются и толкуются в соответствии с законодательством Объединенных Арабских Эмиратов.",
      },
      {
        title: "9. Изменения условий",
        text: "Мы оставляем за собой право обновлять или изменять настоящие Условия и положения в любое время. Продолжение использования веб-сайта после внесения изменений означает ваше согласие с новыми условиями.",
      },
      {
        title: "10. Свяжитесь с нами",
        text: "Если у вас есть вопросы относительно данных Условий и положений, свяжитесь с нами по адресу info@skillmount.com.",
      },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getServerLocale()) as Locale;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const title = META_TITLE[locale] || META_TITLE.en;
  const description =
    "Read the official terms and conditions for using Skill Tech website and purchasing TV mounting brackets and installation services in the UAE.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://skilltechonline.com${prefix}/terms-conditions`,
    },
  };
}

export default async function TermsConditionsPage() {
  const locale = (await getServerLocale()) as Locale;
  const c = CONTENT[locale] || CONTENT.en;

  return (
    <section className="container py-5 mt-5" dir={locale === "ar" ? "rtl" : "ltr"}>
      <h1 className="mb-4">{c.h1}</h1>
      <div className="content-page">
        {c.sections.map((sec, idx) => (
          <React.Fragment key={idx}>
            <h2>{sec.title}</h2>
            <p>{sec.text}</p>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

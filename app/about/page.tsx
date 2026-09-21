import Image from "next/image";
import Link from "@/components/Link";
import React from "react";
import { fetchSEO, MEDIA_BASE_URL } from "@/lib/api";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { translations } from "@/lib/translations";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "en";
  const seo = await fetchSEO("about");
  if (!seo) return {};

  const imageUrl = seo.meta_image
    ? seo.meta_image.startsWith("http")
      ? seo.meta_image
      : `${MEDIA_BASE_URL}${seo.meta_image}`
    : null;

  const canonical = locale === "ar" ? "https://skilltechonline.com/ar/about" : "https://skilltechonline.com/about";

  return {
    title: locale === "ar" ? `من نحن | ${seo.meta_title || "Skill Tech"}` : seo.meta_title,
    description: seo.meta_description,
    keywords: seo.meta_keywords,
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: seo.meta_title,
      description: seo.meta_description,
      images: imageUrl ? [imageUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.meta_title,
      description: seo.meta_description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

const About = async () => {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") as "en" | "ar") || "en";

  const t = (key: string) => {
    const langDict = (translations[locale] as Record<string, string>) || {};
    return langDict[key] || key;
  };

  return (
    <div className="about-page">
      <section className="vector-section">
        <div className="container">
          <div className="row g-4 align-items-center">
            {/* Right Text Section */}
            <div className="col-lg-6 about-text">
              <button className="explore-btn-nocursor">
                <span className="arrow-circle">
                  <i className="fas fa-play"></i>
                </span>{" "}
                {t("About Our Company")}
              </button>
              <h2>{t("We're Changing The Way People Think About")}</h2>
              <p>
                {t("Welcome to Skill Tech, a leading provider of premium TV wall mounts, mounting solutions, LED display systems, AV accessories, cables, wires, and professional installation services. Since our establishment in 2011, we have been committed to delivering innovative, reliable, and high-quality solutions that enhance residential, commercial, hospitality, retail, education, and corporate environments across the UAE and international markets.")}
                <br />
                {t("Driven by innovation and customer satisfaction, we provide products and services designed to meet the evolving needs of modern businesses and homeowners. Every solution is backed by superior quality, technical expertise, and a commitment to safety, ensuring outstanding performance and long-term reliability.")}
                <br />
                {t("Our experienced team works closely with customers to deliver tailored solutions, exceptional service, and dependable support, making Skill Tech a trusted partner for projects of every size.")}
              </p>
              <Link
                href="/service"
                className="booknow-btn btn-book-now-inline"
              >
                <span className="arrow-circlebk">
                  <i className="fas fa-play"></i>
                </span>{" "}
                {t("Service")}
              </Link>
              <Link
                href="/contact"
                className="booknow-btn btn-book-now-inline btn-contact-inline ms-2"
              >
                <span className="arrow-circlebk">
                  <i className="fas fa-play"></i>
                </span>{" "}
                {t("Contact Us")}
              </Link>
            </div>
            {/* Left Image Grid */}
            <div className="col-lg-6">
              <div className="row g-3">
                {/* Top Right Small Image */}
                <div className="col-6 ">
                  <div className="about-img-box">
                    <Image
                      src="/images/new-arrival2.jpg"
                      alt="About Small 2"
                      width={400}
                      height={400}
                      priority
                      sizes="(max-width: 991px) 50vw, 25vw"
                      style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                {/* Top Left Box with Text */}
                <div className="col-6">
                  <div className="about-img-box pink-box d-flex align-items-center justify-content-center text-center">
                    <div className="pink-box-text">
                      <h2>{t("About Us")}</h2>
                    </div>
                  </div>
                </div>
                {/* Bottom Wide Image */}
                <div className="col-12">
                  <div className="about-img-box">
                    <Image
                      src="/images/new-arrival3.jpg"
                      alt="About Wide"
                      width={800}
                      height={400}
                      sizes="(max-width: 991px) 100vw, 50vw"
                      style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <div className="info-content">
            {/* Left Side */}
            <div className="info-text">
              <button className="explore-btn-nocursor">
                <span className="arrow-circle">
                  <i className="fas fa-play"></i>
                </span>
                {t("Our Presence")}
              </button>
              <h2>{t("Connecting Continents")}</h2>
              <h3>{t("Skill Tech – Delivering Trusted Solutions Across Multiple Countries")}</h3>
              <p>
                {t("Skill Tech has established a strong international presence by supplying innovative mounting solutions and AV products to customers across the Middle East, Asia, and Central Asia. Our growing global network reflects our dedication to quality, innovation, and long-term partnerships with distributors, retailers, contractors, system integrators, and businesses worldwide.")}
              </p>
              <p>
                {t("With years of industry expertise, we continue expanding our reach while maintaining the highest standards of product quality, customer service, and technical excellence.")}
              </p>
            </div>

            {/* Right Side */}
            <div className="info-image">
              <Image
                src="/images/world-map.jpeg"
                alt="Mounting Solutions"
                width={450}
                height={300}
              />
            </div>

            {/* Three Column Region Section */}
            <div className="region-section">
              <div className="region-card">
                <h3>
                  {" "}
                  <span className="arrow-circles">
                    <i className="fas fa-play"></i>
                  </span>{" "}
                  {t("Skill Tech Presence in the Middle East")}
                </h3>
                <p>
                  {t("Skill Tech has built a strong presence across the Middle East, including United Arab Emirates, Saudi Arabia, Bahrain, Qatar, and Oman. We proudly support businesses and residential customers with premium mounting solutions, LED display systems, and professional installation services that deliver reliability, safety, and exceptional performance.")}
                </p>
              </div>

              <div className="region-card">
                <h3>
                  <span className="arrow-circles">
                    <i className="fas fa-play"></i>
                  </span>{" "}
                  {t("Skill Tech Reach in Asia")}
                </h3>
                <p>
                  {t("Our presence in India and China enables us to serve diverse markets with innovative products and customized solutions. Through strategic partnerships and continuous innovation, we deliver products that meet international quality standards while supporting the evolving needs of customers across Asia.")}
                </p>
              </div>

              <div className="region-card">
                <h3>
                  <span className="arrow-circles">
                    <i className="fas fa-play"></i>
                  </span>{" "}
                  {t("Skill Tech Footprint in Central Asia")}
                </h3>
                <p>
                  {t("Skill Tech continues to expand its global footprint with operations in Uzbekistan, strengthening our commitment to delivering reliable products, professional support, and innovative AV solutions to customers throughout Central Asia.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-section">
        <div className="container">
          <div className="row align-items-stretch">
            {/* Left Side (Cards) */}
            <div className="col-lg-6 col-md-12">
              <div className="why-choose-content mb-lg-0 mb-4">
                <button className="explore-btn-nocursor">
                  <span className="arrow-circle">
                    <i className="fas fa-play"></i>
                  </span>{" "}
                  {t("Choose Us")}
                </button>
                <h2>{t("Why Choose Skill Tech For Your Reliable Solutions?")}</h2>
                <p>
                  {t("At Skill Tech, we combine innovation, quality, and technical expertise to deliver dependable mounting and installation solutions for residential and commercial applications. Our commitment to customer satisfaction, product reliability, and professional service has earned the trust of clients across multiple industries.")}
                </p>

                <div className="row g-4">
                  {/* Box 1 */}
                  <div className="col-sm-6">
                    <div className="choose-card">
                      <div className="choose-top">
                        <div className="icon-circles">
                          <i className="fas fa-tools"></i>
                        </div>
                        <h5>{t("Wide Range of Solutions")}</h5>
                      </div>
                      <p>
                        {t("We offer a comprehensive range of TV wall mounts, monitor mounts, ceiling mounts, LED display solutions, AV accessories, and installation services designed to enhance modern homes, offices, retail spaces, hospitality venues, and commercial environments.")}
                      </p>
                    </div>
                  </div>

                  {/* Box 2 */}
                  <div className="col-sm-6">
                    <div className="choose-card">
                      <div className="choose-top">
                        <div className="icon-circles">
                          <i className="fas fa-handshake"></i>
                        </div>
                        <h5>{t("Long Lasting Relationships")}</h5>
                      </div>
                      <p>
                        {t("We believe lasting business relationships are built on trust, transparency, and exceptional customer support. Our dedicated after-sales service ensures every customer receives reliable assistance long after the project is completed.")}
                      </p>
                    </div>
                  </div>

                  {/* Box 3 */}
                  <div className="col-sm-6">
                    <div className="choose-card">
                      <div className="choose-top">
                        <div className="icon-circles">
                          <i className="fas fa-users"></i>
                        </div>
                        <h5>{t("Expert Team")}</h5>
                      </div>
                      <p>
                        {t("Our experienced professionals combine technical knowledge with industry expertise to deliver precise, efficient, and high-quality solutions that meet the highest standards of safety, functionality, and performance.")}
                      </p>
                    </div>
                  </div>

                  {/* Box 4 */}
                  <div className="col-sm-6">
                    <div className="choose-card">
                      <div className="choose-top">
                        <div className="icon-circles">
                          <i className="fas fa-check-circle"></i>
                        </div>
                        <h5>{t("Trusted Partner")}</h5>
                      </div>
                      <p>
                        {t("Skill Mount Electronics Trading LLC is a trusted partner for businesses, contractors, retailers, distributors, and homeowners seeking reliable products, expert guidance, and dependable installation services.")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 col-md-12">
              <div className="why-choose-image">
                <Image
                  src="/images/about/About Us.png"
                  alt="Skill Tech TV Solutions"
                  width={600}
                  height={800}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-mv-section">
        <div className="container">
          <div className="row align-items-start">
            {/* LEFT CONTENT */}
            <div className="col-lg-6">
              <button className="explore-btn-nocursor">
                <span className="arrow-circle">
                  <i className="fas fa-play"></i>
                </span>{" "}
                {t("Vision & Mission")}
              </button>
              <h2 className="main-heading">
                {t("Empower Your Space With Safe & Stylish TV Installation")}
              </h2>
            </div>

            {/* RIGHT SIDE TEXT PARAGRAPH */}
            <div className="col-lg-6">
              <p className="side-text">
                {t("Transform your home or workplace with professional TV mounting and installation services from Skill Tech. Our certified technicians provide safe, secure, and precise installations that maximize viewing comfort while creating clean, organized, and modern living or working environments. Whether it's a residential TV installation, commercial display setup, or large-format LED display project, we deliver every installation with precision, safety, and attention to detail.")}
              </p>
            </div>
          </div>

          {/* STORY + MISSION/VISION BOXES */}
          <div className="row  ">
            {/* STORY IMAGE BOX */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="story-box">
                <Image
                  src="/images/about/mission2.jpg"
                  alt="Our Story"
                  width={600}
                  height={400}
                  style={{ objectFit: "cover" }}
                />
                <div className="story-content">
                  <h4>{t("Our Story")}</h4>
                  <p>
                    {t("Skill Tech began with a vision to deliver smarter, safer, and more practical mounting solutions that improve everyday spaces. Since 2011, we have continuously evolved by embracing innovation, expanding our product portfolio, and building lasting relationships with customers and partners. Today, we continue to provide high-quality products and professional services that help create more organized, efficient, and visually appealing environments for homes and businesses alike.")}
                  </p>
                </div>
              </div>
            </div>

            {/* MISSION & VISION */}
            <div className="col-lg-6">
              <div className="mv-card vision-card mb-4">
                <h4>{t("Our Mission")}</h4>
                <p>
                  {t("Our mission is to deliver innovative, safe, and high-quality mounting and AV solutions that enhance the way people live and work. Through continuous improvement, customer-focused service, and dependable products, we strive to create smarter spaces while exceeding customer expectations.")}
                </p>
              </div>

              <div className="mv-card">
                <h4>{t("Our Vision")}</h4>
                <p>
                  {t("Our vision is to become a globally recognized leader in mounting solutions and Audio Visual technologies by continuously driving innovation, maintaining exceptional quality standards, and delivering outstanding customer experiences that inspire confidence and long-term partnerships.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="working-process-vertical">
        <div className="container">
          <div className="row align-items-center">
            {/* LEFT SIDE IMAGE */}
            <div className="col-lg-6 mb-4 mb-lg-0 ">
              <div className="process-image">
                <Image
                  src="/images/2.png"
                  alt="Working Process"
                  width={600}
                  height={400}
                />
              </div>
            </div>

            {/* RIGHT SIDE STEPS */}
            <div className="col-lg-6">
              <button className="explore-btn-nocursor">
                <span className="arrow-circle">
                  <i className="fas fa-play"></i>
                </span>{" "}
                {t("Flow Process")}
              </button>
              <h2 className="process-title">{t("Our Working Process")}</h2>

              <div className="vertical-steps">
                {/* Step 1 */}
                <div className="v-step">
                  <div className="v-icon">
                    <i className="fas fa-hand-pointer"></i>
                    <span>01</span>
                  </div>
                  <div className="v-content">
                    <h4>{t("Choose a Service")}</h4>
                    <p>{t("Select the service that best meets your requirements and share your project details with our team.")}</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="v-step">
                  <div className="v-icon">
                    <i className="fas fa-file-alt"></i>
                    <span>02</span>
                  </div>
                  <div className="v-content">
                    <h4>{t("Share Requirements")}</h4>
                    <p>{t("Tell us about your installation or project needs. Our experts carefully evaluate your requirements to recommend the most suitable solution.")}</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="v-step">
                  <div className="v-icon">
                    <i className="fas fa-headset"></i>
                    <span>03</span>
                  </div>
                  <div className="v-content">
                    <h4>{t("Meeting & Support")}</h4>
                    <p>{t("Our specialists coordinate with you to discuss project requirements, finalize the scope, and ensure a smooth planning and implementation process.")}</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="v-step">
                  <div className="v-icon">
                    <i className="fas fa-check-circle"></i>
                    <span>04</span>
                  </div>
                  <div className="v-content">
                    <h4>{t("Final Delivery")}</h4>
                    <p>{t("We complete every project with precision, quality assurance, and professional support, ensuring complete customer satisfaction from start to finish.")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="unique-section">
        <div className="container">
          <button className="explore-btn-nocursor">
            <span className="arrow-circle">
              <i className="fas fa-play"></i>
            </span>
            {t("Uniques")}
          </button>
          <div className="section-header">
            <h2>{t("What Makes Us Unique")}</h2>
          </div>
          <div className="row unique-cards">
            {/* Card 1 */}
            <div className="col unique-card">
              <Image
                src="/images/about/dedicated.jpg"
                alt="Dedicated Team"
                width={400}
                height={300}
                style={{ objectFit: "cover" }}
              />
              <div className="unique-content">
                <h3>{t("Dedicated Team of Experts")}</h3>
                <p>
                  <i
                    className="fas fa-play"
                    style={{ color: "deeppink", fontSize: "10px" }}
                  ></i>{" "}
                  {t("Experienced professionals committed to delivering exceptional quality and service.")}
                  <br />
                  <i
                    className="fas fa-play"
                    style={{ color: "deeppink", fontSize: "10px" }}
                  ></i>{" "}
                  {t("Technical expertise across mounting solutions, AV systems, and installation services.")}
                  <br />
                  <i
                    className="fas fa-play"
                    style={{ color: "deeppink", fontSize: "10px" }}
                  ></i>{" "}
                  {t("Customer-focused approach with reliable project support and guidance.")}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col unique-card">
              <Image
                src="/images/about/reputation.jpg"
                alt="Reputable Supplier"
                width={400}
                height={300}
                style={{ objectFit: "cover" }}
              />
              <div className="unique-content">
                <h3>{t("Reputation as a Reputable Supplier")}</h3>
                <p>
                  <i
                    className="fas fa-play"
                    style={{ color: "deeppink", fontSize: "10px" }}
                  ></i>{" "}
                  {t("More than a decade of industry experience since 2011.")}
                  <br />
                  <i
                    className="fas fa-play"
                    style={{ color: "deeppink", fontSize: "10px" }}
                  ></i>{" "}
                  {t("Trusted by businesses, retailers, contractors, and homeowners.")}
                  <br />
                  <i
                    className="fas fa-play"
                    style={{ color: "deeppink", fontSize: "10px" }}
                  ></i>{" "}
                  {t("High-quality products backed by dependable service and customer satisfaction.")}
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col unique-card">
              <Image
                src="/images/about/partnership.jpg"
                alt="Partnership and Collaborations"
                width={400}
                height={300}
                style={{ objectFit: "cover" }}
              />
              <div className="unique-content">
                <h3>{t("Strong Partnerships & Collaborations")}</h3>
                <p>
                  <i
                    className="fas fa-play"
                    style={{ color: "deeppink", fontSize: "10px" }}
                  ></i>{" "}
                  {t("Building long-term relationships with leading manufacturers and global suppliers.")}
                  <br />
                  <i
                    className="fas fa-play"
                    style={{ color: "deeppink", fontSize: "10px" }}
                  ></i>{" "}
                  {t("Collaborating with industry partners to deliver innovative, future-ready solutions.")}
                  <br />
                  <i
                    className="fas fa-play"
                    style={{ color: "deeppink", fontSize: "10px" }}
                  ></i>{" "}
                  {t("Strengthening our international network to provide greater value and wider product availability.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

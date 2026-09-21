"use client";

import { useState, useEffect } from "react";
import Link from "@/components/Link";
import Image from "next/image";
import { submitContactForm, fetchSiteSettings, submitServiceBooking, fetchServices } from "@/lib/api";
import Captcha from "@/components/Captcha";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import PhoneInput from "@/components/PhoneInput";

interface SiteSettings {
  email: string;
  phone: string;
  phone_number2?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  whatsapp?: string;
  service_whatsapp?: string;
  youtube?: string;
  x?: string;
  address_heading?: string;
  address_heading_ar?: string;
  address?: string;
  address_ar?: string;
  google_map_link?: string;
  whatsapp_channel?: string;
}

export default function Footer({ categories }: { categories?: any[] }) {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "", // This will map to 'comments' in backend
  });
 

const leftCategories = categories ? categories.slice(0, 8) : [];
const rightCategories = categories ? categories.slice(8) : [];


  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const servicePage = pathname.includes("/service");
  const waNumber = servicePage ? settings?.service_whatsapp : settings?.whatsapp;
  const phoneNumber = settings?.phone;
  const showWhatsapp = Boolean(waNumber);
  const waNumberClean = waNumber?.replace(/\s+/g, "");
  const [isCaptcha, setIsCaptcha] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [serviceOptions, setServiceOptions] = useState<any>(null);
  const [bookingFormData, setBookingFormData] = useState({
    name: "",
    email: "",
    phone: "",
    installation_type: "",
    tv_size: "",
    bracket: false,
    date: "",
    time: "",
  });
  const [bookingStatus, setBookingStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const [isBookingCaptchaVerified, setIsBookingCaptchaVerified] = useState(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await fetchSiteSettings();
        setSettings(data);
      } catch (error) {
        console.error("Failed to load settings", error);
      }
    }
    loadSettings();
  }, []);

  useEffect(() => {
    async function loadServiceOptions() {
      try {
        const servicesData = await fetchServices();
        if (servicesData && servicesData.length > 0) {
          setServiceOptions(servicesData[0]);
        }
      } catch (error) {
        console.error("Failed to load service options", error);
      }
    }
    loadServiceOptions();
  }, []);

  const handleBookingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: any } },
  ) => {
    const { name, value } = e.target;
    if ('type' in e.target && e.target.type === "radio") {
      setBookingFormData({ ...bookingFormData, [name]: value === "yes" });
    } else {
      setBookingFormData({ ...bookingFormData, [name]: value });
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBookingCaptchaVerified) {
      setBookingStatus({
        loading: false,
        success: false,
        error: "Please verify captcha.",
      });
      return;
    }

    setBookingStatus({ loading: true, success: false, error: "" });

    try {
      const response = await submitServiceBooking(bookingFormData);
      setBookingStatus({ loading: false, success: true, error: "" });
      setBookingFormData({
        name: "",
        email: "",
        phone: "",
        installation_type: "",
        tv_size: "",
        bracket: false,
        date: "",
        time: "",
      });
      setIsBookingCaptchaVerified(false);
      setShowBookingModal(false);
      setIsMenuOpen(false);
      if (response?.reference_number) {
        sessionStorage.setItem("thank_you_ref", response.reference_number);
      }
      router.push(language === "ar" ? `/ar/service/thank-you` : `/service/thank-you`);
    } catch (err: any) {
      setBookingStatus({
        loading: false,
        success: false,
        error: err.message || "Something went wrong",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } },
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      setStatus({
        loading: false,
        success: false,
        error: "Please verify captcha.",
      });
      return;
    }

    setStatus({ loading: true, success: false, error: "" });

    // Map 'message' to 'comments' for the API
    const apiData = {
      ...formData,
      comments: formData.message,
    };

    try {
      await submitContactForm(apiData);
      setStatus({ loading: false, success: true, error: "" });
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsCaptchaVerified(false);
    } catch (err: any) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || "Something went wrong",
      });
    }
  };

  return (
    <footer className="footer-section">
      <div
        className={`support-overlay ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div className="footer-content">
        <div className="row">
          {/* Left side col-6 (2 x col-3 inside) */}
          <div className="col-lg-6 col-md-12 footer-left">
            <div className="row">
              {/* Logo + Explore Btn */}
              <div className="col-lg-6 col-md-6 col-12">
                <div className="footer-btn-logo-wrapper">
                  <Link href="/">
                    <Image
                      src="/images/logo.svg"
                      alt="Skill Tech Logo"
                      className="footer-logo"
                      width={150}
                      height={50}
                      style={{ objectFit: "contain" }}
                    />
                  </Link>
                  {/* <button className="explore-btn-nocursor">
                    <span className="arrow-circle">
                      <i className="fas fa-play"></i>
                    </span>
                    Explore More
                  </button> */}
                </div>
              </div>

              {/* QR Scanner */}
              <div className="col-lg-6 col-md-6 col-12 text-center mb-4">
                <div className="footer-qr-box">
                  <button className="explore-btn-nocursor">
                    <span className="arrow-circle">
                      <i className="fas fa-play"></i>
                    </span>{" "}
                    {t("Find Your Way to Us")}
                  </button>
                  <Image
                    src="/images/qr2.jpg"
                    alt="QR Code"
                    className="qr-image"
                    width={150}
                    height={150}
                  />
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="footer-links-container">
              <div className="footer-links-column">
                <h4 className="footer-heading">{t("Quick Links")}</h4>
                <ul className="footer-links-list">
                  <li className="footer-links-item">
                    <Link href="/" className="footer-links-link">
                      <span className="pink-circle footer-links-icon-wrap">
                        <i className="fa fa-play"></i>
                      </span>
                      {t("Home")}
                    </Link>
                  </li>
                  <li className="footer-links-item">
                    <Link href="/about" className="footer-links-link">
                      <span className="pink-circle footer-links-icon-wrap">
                        <i className="fa fa-play"></i>
                      </span>
                      {t("About Us")}
                    </Link>
                  </li>
                  <li className="footer-links-item">
                    <Link href="/service" className="footer-links-link">
                      <span className="pink-circle footer-links-icon-wrap">
                        <i className="fa fa-play"></i>
                      </span>
                      {t("Installation Services")}
                    </Link>
                  </li>
                  <li className="footer-links-item">
                    <Link href="/support" className="footer-links-link">
                      <span className="pink-circle footer-links-icon-wrap">
                        <i className="fa fa-play"></i>
                      </span>
                      {t("Support")}
                    </Link>
                  </li>
                  <li className="footer-links-item">
                    <Link href="/news-media" className="footer-links-link">
                      <span className="pink-circle footer-links-icon-wrap">
                        <i className="fa fa-play"></i>
                      </span>
                      {t("News")}
                    </Link>
                  </li>
                  <li className="footer-links-item">
                    <Link href="/career" className="footer-links-link">
                      <span className="pink-circle footer-links-icon-wrap">
                        <i className="fa fa-play"></i>
                      </span>
                      {t("Career")}
                    </Link>
                  </li> 
                  <li className="footer-links-item">
                    <Link href="/blog" className="footer-links-link">
                      <span className="pink-circle footer-links-icon-wrap">
                        <i className="fa fa-play"></i>
                      </span>
                      {t("Blog")}
                    </Link>
                  </li> 
                  <li className="footer-links-item">
                    <Link href="/contact" className="footer-links-link">
                      <span className="pink-circle footer-links-icon-wrap">
                        <i className="fa fa-play"></i>
                      </span>
                      {t("Contact Us")}
                    </Link>
                  </li>
                  {/* <li className="footer-links-item">
                    <Link href="/terms-conditions" className="footer-links-link">
                      <span className="pink-circle footer-links-icon-wrap">
                        <i className="fa fa-play"></i>
                      </span>
                      Terms & Conditions
                    </Link>
                  </li> */}
                  <li className="footer-links-item">
                    <Link href="/privacy-policy" className="footer-links-link">
                      <span className="pink-circle footer-links-icon-wrap">
                        <i className="fa fa-play"></i>
                      </span>
                      {t("Privacy Policy")}
                    </Link>
                  </li>
                  {/* <li className="footer-links-item">
                    <Link href="/refund-policy" className="footer-links-link">
                      <span className="pink-circle footer-links-icon-wrap">
                        <i className="fa fa-play"></i>
                      </span>
                      Refund Policy
                    </Link>
                  </li> */}
                </ul>
              </div>
              {leftCategories?.length > 0 && (
                <div className="footer-links-column">
                  <h4 className="footer-heading">{t("Products")}</h4>
                  <ul className="footer-links-list">
                    {leftCategories &&
                      leftCategories.map((cat: any) => (
                        <li key={cat.id} className="footer-links-item">
                          <Link href={`/${cat.slug}`} className="footer-links-link">
                            <span className="pink-circle footer-links-icon-wrap">
                              <i className="fa fa-play"></i>
                            </span>
                            {language === "ar" && cat.name_ar ? cat.name_ar : cat.name}
                          </Link>
                        </li>
                      ))}
                    {(!categories || categories.length === 0) && (
                      <li style={{ color: "#ccc" }}>No footer categories found</li>
                    )}
                  </ul>
                </div>
              )}

              {rightCategories?.length > 0 && (
                <div className="footer-links-column">
                  <ul className="footer-links-list footer-links-list-products-right">
                    {rightCategories &&
                      rightCategories.map((cat: any) => (
                        <li key={cat.id} className="footer-links-item">
                          <Link href={`/${cat.slug}`} className="footer-links-link">
                            <span className="pink-circle footer-links-icon-wrap">
                              <i className="fa fa-play"></i>
                            </span>
                            {language === "ar" && cat.name_ar ? cat.name_ar : cat.name}
                          </Link>
                        </li>
                      ))}
                    {(!categories || categories.length === 0) && (
                      <li style={{ color: "#ccc" }}>No footer categories found</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right side col-6: Let's Connect */}
          <div className="col-lg-6 col-md-12 connect-container">
            <div className="connect-box">
              {/* Left contact info */}
              <div className="connect-left">
                <h3>{t("Let’s Connect")}</h3>
                <p>
                  {t("We welcome partnership opportunities. To apply as a dealer, please provide your experience details for our review.")}
                </p>

                <div className="contact-item">
                  <div className="icon-circle">
                    <i className="fa fa-map-marker"></i>
                  </div>
                  <div className="contact-text">
                    <h5>
                      {language === "ar" && settings?.address_heading_ar
                        ? settings.address_heading_ar
                        : settings?.address_heading
                        ? t(settings.address_heading)
                        : t("Head Office")}
                    </h5>
                    {(language === "ar" && settings?.address_ar ? settings.address_ar : settings?.address) && !settings?.google_map_link && (
                      <p style={{ whiteSpace: "pre-line" }}>
                        {language === "ar" && settings?.address_ar ? settings.address_ar : settings?.address}
                      </p>
                    )}
                    {(language === "ar" && settings?.address_ar ? settings.address_ar : settings?.address) && settings?.google_map_link && (
                      <p style={{ whiteSpace: "pre-line" }}>
                        <Link
                          href={settings.google_map_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {language === "ar" && settings?.address_ar ? settings.address_ar : settings?.address}
                        </Link>
                      </p>
                    )}
                  </div>
                </div>

                <div className="contact-item">
                  <div className="icon-circle">
                    <i className="fa fa-envelope"></i>
                  </div>
                  <div className="contact-text">
                    <h5>{t("Email")}</h5>
                    {settings?.email && (
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        href={`mailto:${settings.email}`}
                      >
                        <p>{settings?.email}</p>
                      </Link>
                    )}
                  </div>
                </div>

                <div className="contact-item">
                  <div className="icon-circle">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="contact-text">
                    <h5>{t("Phone")}</h5>
                    {settings?.phone && (
                      <p>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          href={`tel:${settings.phone}`}
                        >
                          <span dir="ltr" style={{ whiteSpace: "nowrap" }}>{settings.phone}</span>
                        </Link>
                        {settings?.phone_number2 && (
                          <>
                            {" / "}
                            <Link
                              style={{
                                color: "inherit",
                                textDecoration: "none",
                              }}
                              href={`tel:${settings.phone_number2}`}
                            >
                              <span dir="ltr" style={{ whiteSpace: "nowrap" }}>{settings.phone_number2}</span>
                            </Link>
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <div className="social-icons">
                  {settings?.facebook && (
                    <a href={settings.facebook} target="_blank">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  )}
                  {settings?.instagram && (
                    <a href={settings.instagram} target="_blank">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  )}
                   {settings?.x && (
                    <a href={settings.x} target="_blank">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  )}
                  {settings?.linkedin && (
                    <a href={settings.linkedin} target="_blank">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  )}
                  {settings?.youtube && (
                    <a href={settings.youtube} target="_blank">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  )}
                 
                  {settings?.whatsapp_channel && (
                    <a href={settings.whatsapp_channel} target="_blank">
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                  )}
                </div>
              </div>

              {/* Right contact form */}
              <div className="connect-right">
                <button className="explore-btn-nocursor">
                  <span className="arrow-circle">
                    <i className="fas fa-play"></i>
                  </span>{" "}
                  {t("Those Who Trust Our")}
                </button>
                <h3>{t("Send us a message")}</h3>
                {status.success && (
                  <div className="alert alert-success mt-2">
                    {t("Message sent successfully!")}
                  </div>
                )}
                {status.error && (
                  <div className="alert alert-danger mt-2">{t(status.error)}</div>
                )}

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder={t("Name *")}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      placeholder={t("Company *")}
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <PhoneInput
                    placeholder={t("Phone *")}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    placeholder={t("Email *")}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder={t("Subject")}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  <textarea
                    placeholder={t("Message *")}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>

                  <div className="mb-4" style={{display:!isCaptcha?"none":""}} >
                    <Captcha
                      key={status.success ? "reset" : "normal"}
                      onVerify={setIsCaptchaVerified}
                      setIsCaptcha={setIsCaptcha}
                    />
                  </div>

                  <button type="submit" className="read-more-btn" disabled={status.loading}>
                    <span className="white-circle">
                      <i className="fa fa-play"></i>
                    </span>
                    {status.loading ? t("Sending...") : t("Submit")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            {t("Copyright")} © {new Date().getFullYear()} {t("Skill Mount Electronics Trading LLC")} | {t("All Rights Reserved.")}
          </p>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className={`floating-icons ${isMenuOpen ? "menu-open" : ""}`}>
        {servicePage ? (
          <>
            <a
              href={`https://wa.me/${waNumberClean}`}
              target="_blank"
              className="icon-btn green"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
             <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowBookingModal(true);
                }}
                className="icon-btn green"
              >
                {/* <i className="fa fa-wrench"></i> */}
                <img src="/images/service_icon.png" alt="service" style={{ width: "100%" }} />
              </a>
          </>
        ) : (
          <>
          <>
            <a
              href={`https://wa.me/${waNumberClean}`}
              target="_blank"
              className="icon-btn green"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href={`tel:${phoneNumber}`} className="icon-btn blue">
              <i className="fa fa-phone"></i>
            </a>
            <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowBookingModal(true);
                }}
                className="icon-btn green"
              >
                {/* <i className="fa fa-wrench"></i> */}
                <img src="/images/service_icon.png" alt="service" style={{ width: "100%" }} />
              </a>
          </>
            <div className={`support-menu ${isMenuOpen ? "open" : ""}`}>
              <a
                href={settings?.google_map_link || "#"}
                target={settings?.google_map_link ? "_blank" : "_self"}
                rel={settings?.google_map_link ? "noopener noreferrer" : undefined}
                className="icon-btn"
              >
                <i className="fa fa-location-dot"></i>
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowBookingModal(true);
                }}
                className="icon-btn"
              >
                {/* <i className="fa fa-wrench"></i> */}
                <img src="/images/service_icon.png" alt="service" style={{ width: "100%" }} />
              </a>

              <a href={`tel:${settings?.phone}`} className="icon-btn">
                <i className="fa fa-phone"></i>
              </a>
              <a href={`mailto:${settings?.email}`} className="icon-btn">
                <i className="fa fa-envelope"></i>
              </a>
            </div>
            <a
              href="#"
              onClick={toggleMenu}
              className="icon-btn pink trigger-btn"
            >
              <i
                className={`fa ${isMenuOpen ? "fa-times" : "fa-comment-dots"}`}
              ></i>
            </a>
          </>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div
          className="booking-modal-overlay"
          onClick={() => setShowBookingModal(false)}
        >
          <div
            className="no-scrollbar booking-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowBookingModal(false)}
              className="booking-modal-close"
            >
              &times;
            </button>

            <h3 className="booking-modal-title">
              {t("Book Your Slot")}
            </h3>

            {bookingStatus.success && (
              <div className="alert alert-success">
                {t("Booking submitted successfully!")}
              </div>
            )}
            {bookingStatus.error && (
              <div className="alert alert-danger">{t(bookingStatus.error)}</div>
            )}

            <form className="book-slot-form" onSubmit={handleBookingSubmit}>
              <div className="row">
                <div className="col-md-6 form-div">
                  <label className="form-label">{t("Full Name *")}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder={t("Enter your full name")}
                    required
                    value={bookingFormData.name}
                    onChange={handleBookingChange}
                  />
                </div>
                <div className="col-md-6 form-div">
                  <label className="form-label">{t("Email *")}</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder={t("your@email.com")}
                    required
                    value={bookingFormData.email}
                    onChange={handleBookingChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-div col-mobile-12">
                  <label className="form-label">{t("Phone *")}</label>
                  <PhoneInput
                    name="phone"
                    placeholder={t("Phone")}
                    required
                    value={bookingFormData.phone}
                    onChange={handleBookingChange}
                  />
                </div>
                <div className="col-md-6 form-div col-mobile-12">
                  <label className="form-label">{t("Type of Installation *")}</label>
                  <select
                    className="form-select"
                    name="installation_type"
                    required
                    value={bookingFormData.installation_type}
                    onChange={handleBookingChange}
                  >
                    <option value="">{t("Installation Type")}</option>
                    {serviceOptions?.installation_types &&
                      serviceOptions.installation_types.length > 0 &&
                      serviceOptions.installation_types.map((type: any) => (
                        <option key={type.id} value={type.name}>
                          {language === "ar" && type.name_ar ? type.name_ar : type.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-div col-mobile-12">
                  <label className="form-label">{t("TV Size *")}</label>
                  <select
                    className="form-select"
                    name="tv_size"
                    required
                    value={bookingFormData.tv_size}
                    onChange={handleBookingChange}
                  >
                    <option value="">{t("Choose Your TV Size")}</option>
                    {serviceOptions?.tv_sizes &&
                      serviceOptions.tv_sizes.length > 0 &&
                      serviceOptions.tv_sizes.map((item: any) => (
                        <option key={item.id} value={item.size}>
                          {language === "ar" && item.size_ar ? item.size_ar : item.size}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-6 form-div col-mobile-12">
                  <label className="form-label">{t("Choose Date *")}</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    required
                    value={bookingFormData.date}
                    onChange={handleBookingChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-div col-mobile-12">
                  <label className="form-label booking-form-label-time">{t("Your Available Time *")}</label>
                  <select
                    className="form-select"
                    name="time"
                    required
                    value={bookingFormData.time}
                    onChange={handleBookingChange}
                  >
                    <option value="">{t("Select Time Slot")}</option>
                    {serviceOptions?.available_times &&
                      serviceOptions.available_times.length > 0 &&
                      serviceOptions.available_times.map((item: any) => (
                        <option key={item.id} value={item.time_slot}>
                          {language === "ar" && item.time_slot_ar ? item.time_slot_ar : item.time_slot}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-6 form-div col-mobile-12">
                  <label className="form-label d-block">{t("Do you need a bracket? *")}</label>
                  <div className="pt-2">
                    <label className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="bracket"
                        value="yes"
                        checked={bookingFormData.bracket === true}
                        onChange={handleBookingChange}
                      />
                      <span className="custom-radio"></span>
                      <span className="form-check-label">{t("Yes")}</span>
                    </label>

                    <label className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="bracket"
                        value="no"
                        checked={bookingFormData.bracket === false}
                        onChange={handleBookingChange}
                      />
                      <span className="custom-radio"></span>
                      <span className="form-check-label">{t("No")}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 form-div">
                  <Captcha
                    key={bookingStatus.success ? "reset" : "normal"}
                    onVerify={setIsBookingCaptchaVerified}
                  />
                </div>
              </div>

              <button type="submit" className="read-more-btn" disabled={bookingStatus.loading}>
                <span className="white-circle">
                  <i className="fa fa-play"></i>
                </span>
                {bookingStatus.loading ? t("Sending...") : t("Book Now")}
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}

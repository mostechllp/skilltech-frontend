"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ClientsSection from "@/components/ClientsSection";
import PhoneInput from "@/components/PhoneInput";
import {
  submitServiceBooking,
  fetchServices,
  fetchClients,
  fetchSiteSettings,
  fetchServiceFaqs,
} from "@/lib/api";
import Captcha from "@/components/Captcha";
import StatsSection from "@/components/StatsSection";
import { useLanguage } from "@/lib/LanguageContext";

export default function ServiceClient() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [serviceOptions, setServiceOptions] = useState<any>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    installation_type: "",
    tv_size: "",
    bracket: false,
    date: "",
    time: "",
  });
  const [otherInstallationType, setOtherInstallationType] = useState("");

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  console.log(serviceOptions, "ehkdkkdkd");

  useEffect(() => {
    setShowBookingModal(true);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesData, clientsData, settingsData, faqsData] =
          await Promise.all([
            fetchServices(),
            fetchClients(),
            fetchSiteSettings(),
            fetchServiceFaqs(),
          ]);

        if (servicesData && servicesData.length > 0) {
          // Use the first active service to populate dropdowns
          setServiceOptions(servicesData[0]);
        }
        setClients(clientsData);
        setSettings(settingsData);
        setFaqs(faqsData);
      } catch (err) {
        console.error("Failed to load data", err);
      }
    }
    loadData();
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: any } },
  ) => {
    const { name, value } = e.target;
    if ('type' in e.target && (e.target as any).type === "radio") {
      setFormData({ ...formData, [name]: value === "yes" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

    try {
      const payload = {
        ...formData,
        installation_type: formData.installation_type === "Video wall / Others"
          ? `Video wall / Others (${otherInstallationType})`
          : formData.installation_type
      };
      const response = await submitServiceBooking(payload);
      setStatus({ loading: false, success: true, error: "" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        installation_type: "",
        tv_size: "",
        bracket: false,
        date: "",
        time: "",
      });
      setOtherInstallationType("");
      setIsCaptchaVerified(false);
      if (response?.reference_number) {
        sessionStorage.setItem("thank_you_ref", response.reference_number);
      }
      router.push(language === "ar" ? `/ar/service/thank-you` : `/service/thank-you`);
    } catch (err: any) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || "Something went wrong",
      });
    }
  };

  const renderBookingForm = () => (
    <form className="book-slot-form" onSubmit={handleSubmit}>
      {/* Row 1: Full Name & Email Address */}
      <div className="row">
        <div className="col-md-6 form-div">
          <label className="form-label">{t("Full Name *")}</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder={t("Enter your full name")}
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 form-div">
          <label className="form-label">{t("Email Address *")}</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="your@email.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 2: Mobile Number & Location */}
      <div className="row">
        <div className="col-md-6 form-div col-mobile-12">
          <label className="form-label">{t("Mobile Number *")}</label>
          <PhoneInput
            name="phone"
            placeholder={t("Mobile Number")}
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 form-div col-mobile-12">
          <label className="form-label">{t("Location *")}</label>
          <input
            type="text"
            className="form-control"
            name="location"
            placeholder={t("e.g. Dubai, UAE")}
            required
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 3: Installation Type & Screen Size */}
      <div className="row">
        <div className="col-md-6 form-div">
          <label className="form-label">{t("Installation Type *")}</label>
          <select
            className="form-select"
            name="installation_type"
            required
            value={formData.installation_type}
            onChange={handleChange}
          >
            <option value="">{t("Installation Type")}</option>
            <option value="Retail / Residential">{t("Retail / Residential")}</option>
            <option value="Commercial / Hospitality">{t("Commercial / Hospitality")}</option>
            <option value="Video wall / Others">{t("Video wall / Others")}</option>
          </select>
        </div>
        <div className="col-md-6 form-div">
          <label className="form-label">{t("Screen Size *")}</label>
          <select
            className="form-select"
            name="tv_size"
            required
            value={formData.tv_size}
            onChange={handleChange}
          >
            <option value="">{t("Screen Size")}</option>
            <option value='Upto 65" Screen'>{t('Upto 65" Screen')}</option>
            <option value='Above 65" - 75"'>{t('Above 65" - 75"')}</option>
            <option value='Above 75"'>{t('Above 75"')}</option>
          </select>
        </div>
      </div>

      {formData.installation_type === "Video wall / Others" && (
        <div className="row">
          <div className="col-12 form-div">
            <label className="form-label">{t("Please specify *")}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t("e.g. Custom stand, ceiling mount, etc.")}
              required
              value={otherInstallationType}
              onChange={(e) => setOtherInstallationType(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Row 4: Preferred Installation Date & Preferred Time Slot */}
      <div className="row">
        <div className="col-md-6 form-div col-mobile-12">
          <label className="form-label">{t("Preferred Installation Date *")}</label>
          <input
            type="date"
            className="form-control"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 form-div col-mobile-12">
          <label className="form-label booking-form-label-time">{t("Preferred Time Slot *")}</label>
          <select
            className="form-select"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
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
      </div>

      {/* Row 5: Do you require a TV Wall Mount? */}
      <div className="row">
        <div className="col-12 form-div">
          <label className="form-label d-block">{t("Do you require a TV Wall Mount?")}</label>
          <div className="pt-2">
            <label className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="bracket"
                value="yes"
                checked={formData.bracket === true}
                onChange={handleChange}
              />
              <span className="custom-radio"></span>
              <span className="form-check-label">{t("Yes, I need one")}</span>
            </label>

            <label className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="bracket"
                value="no"
                checked={formData.bracket === false}
                onChange={handleChange}
              />
              <span className="custom-radio"></span>
              <span className="form-check-label">{t("No, I already have one")}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 form-div">
          <Captcha
            key={status.success ? "reset" : "normal"}
            onVerify={setIsCaptchaVerified}
          />
        </div>
      </div>

      <button type="submit" className="read-more-btn" disabled={status.loading}>
        <span className="white-circle">
          <i className="fa fa-play"></i>
        </span>
        {status.loading ? t("Booking...") : t("Book Now")}
      </button>
    </form>
  );

  return (
    <div className="service-page" >
      <section className="vector-section">
        <div className="row g-4 align-items-center">
          {/* Right Text Section */}
          <div className="col-lg-6 about-text">
            <button className="explore-btn-nocursor">
              <span className="arrow-circle">
                <i className="fas fa-play"></i>
              </span>{" "}
              {t("Install Services")}
            </button>
            <h1>{t("TV Installation Service")}</h1>
            <p>
              {t("Looking for reliable TV installation services? Our expert team provides professional wall mounted and stand mounted TV setups for all sizes and brands. From precise mounting to clean cable management, we ensure a flawless finish every time. We handle LED, OLED, 4K, and curved TVs with expert care serving both residential and commercial spaces. Enjoy same day service, competitive pricing, and guaranteed satisfaction. Book your installation today schedule online or call us for quick assistance.")}
            </p>
            <button
              onClick={() => setShowBookingModal(true)}
              className="booknow-btn btn-book-now-inline"
            >
              <span className="arrow-circlebk">
                <i className="fas fa-play"></i>
              </span>{" "}
              {t("Book Now")}
            </button>
            {settings?.service_whatsapp && (
              <a
                href={`https://wa.me/${settings.service_whatsapp.replace(/\s+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="booknow-btn ms-2 btn-whatsapp-inline"
              >
                <span className="arrow-circlebk">
                  <i
                    className="fab fa-whatsapp icon-whatsapp-inline"
                  ></i>
                </span>{" "}
                {t("WhatsApp")}
              </a>
            )}
          </div>
          {/* Left Image Grid */}
          <div className="col-lg-6">
            <Image
              src="/images/services/mounting2.jpg"
              alt="TV Installation Service"
              width={600}
              height={400}
              priority
              sizes="(max-width: 991px) 100vw, 600px"
              className="img-fluid rounded-3 shadow"
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section>

      <section className="vector-section" style={{ background: "#f9f9fb" }}>
        <div className="row g-4 align-items-center">
          {/* Left Image Grid */}
          <div className="col-lg-6">
            <Image
              src="/images/services/mounting.jpg"
              alt="TV Mounting Service"
              width={600}
              height={400}
              sizes="(max-width: 991px) 100vw, 600px"
              className="img-fluid rounded-3 shadow"
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </div>
          {/* Right Text Section */}
          <div className="col-lg-6 about-text">
            <button className="explore-btn-nocursor">
              <span className="arrow-circle">
                <i className="fas fa-play"></i>
              </span>{" "}
              {t("Mount Services")}
            </button>
            <h2>{t("TV Mounting Service")}</h2>
            <p>
              {t("We provide reliable TV wall mounting solutions with strong, durable brackets and expert installation techniques. Every installation follows strict safety standards, ensuring stability, optimal viewing angles, and a clutter free appearance.")} <br />
              {t("Experience hassle free and secure TV mounting with our expert technicians. We ensure perfect wall placement, safe installation, and clean cable management for a seamless viewing setup in your home or office.")}
            </p>
          </div>
        </div>
      </section>

      <StatsSection source="service" />

      <section className="new-feature-section">
        <div className="container">
          <button className="explore-btn-nocursor">
            <span className="arrow-circle">
              <i className="fas fa-play"></i>
            </span>{" "}
            {t("Features")}
          </button>
          <h2 className="main-title">
            {t("Experience precision, reliability, and next-level installation technology.")}
          </h2>
          <p className="subtitle">
            {t("Discover the advanced features that make SkillTech the trusted choice for mounting and installation solutions.")}
          </p>

          <div className="features-grid">
            {/* LEFT SIDE FEATURES */}
            <div className="feature-box left">
              <div className="f-item">
                <span className="f-icon">
                  <Image src="/images/features/mounted-wall-sign.png" alt="" width={20} height={20}  />
                </span>
                <h4>{t("Premium TV Mounting")}</h4>
                <p>
                  {t("Get flawlessly aligned installations with precision-designed brackets that ensure stability and support for any screen size.")}
                </p>
              </div>

              <div className="f-item">
                <span className="f-icon">
                  <Image src="/images/features/tools.png" alt="" width={20} height={20}  />
                </span>
                <h4>{t("Professional Installation")}</h4>
                <p>
                  {t("Certified technicians handle everything end-to-end, ensuring safe, clean, and perfectly positioned installations every time.")}
                </p>
              </div>
            </div>

            {/* CENTER IMAGE */}
            <div className="center-image-box">
              <Image
                src="/images/feature.jpg"
                alt="Installation Features"
                width={600}
                height={400}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
              />
            </div>

            {/* RIGHT SIDE FEATURES */}
            <div className="feature-box right">
              <div className="f-item">
                <span className="f-icon">
                 <Image src="/images/features/shield.png" alt="" width={20} height={20}  />
                </span>
                <h4>{t("Secure & Durable Mounts")}</h4>
                <p>
                  {t("Our mounts are crafted from high-strength materials, tested for load capacity, and designed for long-term performance.")}
                </p>
              </div>

              <div className="f-item">
                <span className="f-icon">
                  <Image src="/images/features/cable.png" alt="" width={20} height={20}  />
                </span>
                <h4>{t("Wire & Cable Management")}</h4>
                <p>
                  {t("Universal design ensures seamless compatibility with LED, LCD, QLED, OLED, and smart TVs of all major brands.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="book-slot-section" id="booking">
        <div className="container">
          <div className="row align-items-center">
            {/* LEFT IMAGE */}
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="slot-image-box">
                <Image
                  src="/images/services/mounting3.jpg"
                  alt="Book a Slot"
                  width={600}
                  height={400}
                  className="img-fluid rounded"
                />
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="col-lg-6 col-md-12">
              <div className="contact-form-box">
                <button className="explore-btn-nocursor">
                  <span className="arrow-circle">
                    <i className="fas fa-play"></i>
                  </span>
                  {t("Booking")}
                </button>
                <h3 className="">{t("Book Your Slot")}</h3>

                {status.success && (
                  <div className="alert alert-success">
                    {t("Booking submitted successfully!")}
                  </div>
                )}
                {status.error && (
                  <div className="alert alert-danger">{status.error}</div>
                )}

                {renderBookingForm()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientsSection clients={clients} />

      {/* ===== FAQ SECTION ===== */}

      {faqs?.length > 0 && (
        <section className="nicepay-faq-section">
          <div className="container">
            <div className="row">
              {/* LEFT TEXT */}
              <div className="col-lg-5 col-md-12 faq-left">
                <button className="explore-btn-nocursor">
                  <span className="arrow-circle">
                    <i className="fas fa-play"></i>
                  </span>{" "}
                  {t("FAQ")}
                </button>
                <h2 className="faq-title">
                  {t("Frequently asked")} <br />
                  <span>{t("questions")}</span>
                </h2>
                <p className="faq-desc">
                  {t("Choose a plan that fits your Services needs and budget. No hidden fees, no surprises — just straight forward solutions.")}
                </p>
              </div>

              {/* RIGHT ACCORDION */}
              <div className="col-lg-7 col-md-12 faq-right">
                {faqs && faqs.length > 0 ? (
                  faqs.map((faq: any, index: number) => (
                    <div
                      key={faq.id}
                      className={`faq-item ${activeFaq === index ? "active" : ""}`}
                    >
                      <button
                        className="faq-question"
                        onClick={() => toggleFaq(index)}
                      >
                        {language === "ar" && faq.question_ar ? faq.question_ar : faq.question}
                        <span className="arrowed">▼</span>
                      </button>
                      <div
                        className="faq-answer"
                        style={{
                          maxHeight: activeFaq === index ? "200px" : "0",
                        }}
                      >
                        <p>{language === "ar" && faq.answer_ar ? faq.answer_ar : faq.answer}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>{t("No FAQs available.")}</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

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
              aria-label={t("Close")}
            >
              &times;
            </button>

            <h3 className="booking-modal-title">
              {t("Book Your Slot")}
            </h3>

            {status.success && (
              <div className="alert alert-success">
                {t("Booking submitted successfully!")}
              </div>
            )}
            {status.error && (
              <div className="alert alert-danger">{status.error}</div>
            )}

            {renderBookingForm()}
          </div>
        </div>
      )}
    </div>
  );
}

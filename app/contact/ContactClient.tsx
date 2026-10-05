"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { submitContactForm, fetchGlobalLocations, fetchBranchLocations } from "@/lib/api";
import Captcha from "@/components/Captcha";
import { useLanguage } from "@/lib/LanguageContext";
import PhoneInput from "@/components/PhoneInput";

export default function ContactClient() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    comments: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [branchLocations, setBranchLocations] = useState<any[]>([]);
  const [isCaptcha, setIsCaptcha] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [locationsData, branchData] = await Promise.all([
          fetchGlobalLocations(),
          fetchBranchLocations()
        ]);
        setLocations(locationsData);
        setBranchLocations(branchData);
      } catch (error) {
        console.error("Failed to load locations", error);
      }
    }
    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } },
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      setStatus({
        loading: false,
        success: false,
        error: t("Please verify captcha first."),
      });
      return;
    }

    setStatus({ loading: true, success: false, error: "" });

    try {
      await submitContactForm(formData);
      setStatus({ loading: false, success: true, error: "" });
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        address: "",
        comments: "",
      });
      setIsCaptchaVerified(false); // Reset captcha verification
      router.push(language === "ar" ? "/ar/contact/thank-you" : "/contact/thank-you");
    } catch (err: any) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || t("Something went wrong"),
      });
    }
  };

  return (
    <>
      {/* ===== Contact Section ===== */}
      <section className="contact-section">
        <div className="container">
          <div className="row align-items-stretch">
            {/* LEFT SIDE FORM */}
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="contact-form-box h-100">
                <button className="explore-btn-nocursor">
                  <span className="arrow-circle">
                    <i className="fas fa-play"></i>
                  </span>
                  {t("Contact Us")}
                </button>
                <h1>{t("Get in Touch")}</h1>
                <p>
                  {t("Interested to do Business with Us? To Become our Dealer, please send your experience details.")}
                </p>

                {status.success && (
                  <div className="alert alert-success">
                    {t("Message sent successfully!")}
                  </div>
                )}
                {status.error && (
                  <div className="alert alert-danger">{status.error}</div>
                )}

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder={t("Name *")}
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      placeholder={t("Company Name *")}
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <input
                      type="email"
                      placeholder={t("Email *")}
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <PhoneInput
                      placeholder={t("Phone *")}
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <textarea
                    placeholder={t("Your Address")}
                    rows={4}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                  <textarea
                    placeholder={t("Comments *")}
                    rows={4}
                    name="comments"
                    required
                    value={formData.comments}
                    onChange={handleChange}
                  ></textarea>

                  <div
                    className="mb-4"
                    style={{ display: !isCaptcha ? "none" : "" }}
                  >
                    <Captcha
                      key={status.success ? "reset" : "normal"}
                      onVerify={setIsCaptchaVerified}
                      setIsCaptcha={setIsCaptcha}
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={status.loading}
                  >
                    <span className="white-circle">
                      <i className="fa fa-play"></i>
                    </span>
                    {status.loading ? t("Sending...") : t("Submit")}
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT SIDE MAP */}
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="map-box1 h-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.925180959023!2d55.3063243!3d25.2731022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f434c000c7b25%3A0xb8e31f115675e985!2sSkill%20Mount%20Electronics%20Trading%20LLC%20-%20Skill%20Tech!5e0!3m2!1sen!2sae!4v1710000000000"
                  allowFullScreen={true}
                  loading="lazy"
                  title={t("Skill Tech Location Map")}
                ></iframe>
              </div>
            </div>
          </div>

          {/* CONTACT CARDS BELOW */}
          <h2 className="visually-hidden">{t("Our Branch Locations")}</h2>
          <div className="row contact-cards mt-4">
            {branchLocations.map((loc) => (
              <div key={loc.id} className="col-md-4 mb-4">
                <div className="contact-card h-100">
                  <i className={`fa fa-${loc.icon || "store"}`}></i>
                  <h2>{language === "ar" && loc.title_ar ? loc.title_ar : loc.title}</h2>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {language === "ar" && loc.address_ar ? loc.address_ar : loc.address}
                  </p>
                  
                  {(loc.tel1 || loc.tel2 || loc.email || (language === "ar" ? loc.working_hours_ar : loc.working_hours)) && (
                    <p>
                      {loc.tel1 && (
                        <>
                          <strong>{t("Tel:")}</strong>{" "}
                          <span dir="ltr" style={{ whiteSpace: "nowrap" }}>{loc.tel1}</span>
                        </>
                      )}
                      {loc.tel1 && loc.tel2 && " | "}
                      {loc.tel2 && (
                        <>
                          <strong>{t("Mob:")}</strong>{" "}
                          <span dir="ltr" style={{ whiteSpace: "nowrap" }}>{loc.tel2}</span>
                        </>
                      )}
                      {(loc.tel1 || loc.tel2) && <br />}
                      
                      {loc.email && (
                        <>
                          <strong>{t("Email: ")}</strong>{loc.email} <br />
                        </>
                      )}
                      
                      {(language === "ar" ? loc.working_hours_ar : loc.working_hours) && (
                        <>
                          <br />
                          <strong>{t("Working Hours:")}</strong> {language === "ar" ? loc.working_hours_ar : loc.working_hours}
                        </>
                      )}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Global Locations Section */}
      {locations?.length > 0 && (
        <section className="global-locations">
          <div className="container">
            <button className="explore-btn-nocursor">
              <span className="arrow-circle">
                <i className="fas fa-play"></i>
              </span>
              {t("More Directions")}
            </button>
            <h2 className="section-title text-left mb-3">
              {t("Global Offices of Skill Tech")}
            </h2>
            <div className="row g-4">
              {locations.map((loc) => (
                <div key={loc.id} className="col-lg-3 col-md-6 col-6">
                  <div className="location-card h-100">
                    <div className="location-info">
                      <h3>{language === "ar" && loc.country_ar ? loc.country_ar : loc.country}</h3>
                      <p className="location-address" title={language === "ar" && loc.address_ar ? loc.address_ar : loc.address}>
                        {language === "ar" && loc.address_ar ? loc.address_ar : loc.address}
                      </p>

                      <p className="location-email" title={loc.email}>
                        <strong>{t("Email: ")}</strong>
                        <br /> {loc.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {locations.length === 0 && <p>{t("Loading locations...")}</p>}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

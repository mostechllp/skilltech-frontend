"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchPageBanner, submitCareerApplication, fetchCareerPositions } from "@/lib/api";
import Captcha from "@/components/Captcha";
import { useLanguage } from "@/lib/LanguageContext";
import PhoneInput from "@/components/PhoneInput";

interface PageBanner {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  button_text: string;
  button_link: string;
}

interface CareerPosition {
  id: number;
  name: string;
}

export default function CareerClient() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [banner, setBanner] = useState<PageBanner | null>(null);
  const [positions, setPositions] = useState<CareerPosition[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    location: "",
    cover_letter: "",
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [bannerData, positionsData] = await Promise.all([
          fetchPageBanner("career"),
          fetchCareerPositions(),
        ]);
        setBanner(bannerData);
        setPositions(positionsData.results || positionsData);
      } catch (error) {
        console.error("Failed to load career data:", error);
      }
    }
    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: any } },
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      setStatus({ ...status, error: t("Please upload your CV.") });
      return;
    }
    if (!isCaptchaVerified) {
      setStatus({ ...status, error: t("Please verify captcha.") });
      return;
    }

    setStatus({ loading: true, success: false, error: "" });

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("position", formData.position);
    data.append("location", formData.location);
    data.append("cover_letter", formData.cover_letter);
    data.append("cv", cvFile);

    try {
      await submitCareerApplication(data);
      setStatus({ loading: false, success: true, error: "" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        location: "",
        cover_letter: "",
      });
      setCvFile(null);
      setIsCaptchaVerified(false);
      router.push(language === "ar" ? "/ar/career/thank-you" : "/career/thank-you");
    } catch (err: any) {
      let errorMessage = t("Failed to submit application");
      try {
        const parsed = JSON.parse(err.message);
        errorMessage = Object.values(parsed).flat().join(", ");
      } catch {
        errorMessage = err.message;
      }
      setStatus({ loading: false, success: false, error: errorMessage });
    }
  };

  return (
    <>
      <section className="career-section">
        <div className="container">
          <div className="text-left mb-4">
            <button className="explore-btn-nocursor">
              <span className="arrow-circle">
                <i className="fas fa-play"></i>
              </span>
              {t("Careers")}
            </button>
            <h2 className="section-title">
              {t("Exciting Careers Await")}
            </h2>
            <p className="section-subtitle">
              {t("We're expanding our team and looking for talented people who are driven, creative, and ready to take on new challenges. At our company, you'll find opportunities to learn, grow, and build a meaningful career")}
            </p>
          </div>

          <div className="application-form-card">
            <h3 className="application-form-title">{t("Apply for a Position")}</h3>

            {status.success && (
              <div className="alert alert-success">
                {t("Application submitted successfully!")}
              </div>
            )}
            {status.error && (
              <div className="alert alert-danger">{status.error}</div>
            )}

            <form onSubmit={handleSubmit} className="career-form">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label career-form-label">
                    {t("Full Name *")}
                  </label>
                  <input
                    type="text"
                    className="form-control career-form-control"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("Enter your full name")}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label career-form-label">
                    {t("Email Address *")}
                  </label>
                  <input
                    type="email"
                    className="form-control career-form-control"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label career-form-label">
                    {t("Phone Number *")}
                  </label>
                  <PhoneInput
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("Phone")}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label career-form-label">
                    {t("Applying Position")}
                  </label>
                  {positions && positions.length > 0 ? (
                    <select
                      className="form-select career-form-control"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                    >
                      <option value="">{t("Select a position")}</option>
                      {positions.map((pos) => (
                        <option key={pos.id} value={pos.name}>
                          {pos.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="form-control career-form-control"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder={t("e.g. Sales Manager")}
                    />
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label career-form-label">
                    {t("Location *")}
                  </label>
                  <input
                    type="text"
                    className="form-control career-form-control"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder={t("e.g. Dubai, UAE")}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label career-form-label">
                    {t("Upload CV (PDF/Doc) *")}
                  </label>
                  <input
                    type="file"
                    className="form-control career-form-control"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label career-form-label">
                  {t("Cover Letter (Optional)")}
                </label>
                <textarea
                  className="form-control career-form-control"
                  rows={4}
                  name="cover_letter"
                  value={formData.cover_letter}
                  onChange={handleChange}
                  placeholder={t("Tell us why you're a good fit...")}
                ></textarea>
              </div>

              <div className="mb-4">
                <Captcha
                  key={status.success ? "reset" : "normal"}
                  onVerify={setIsCaptchaVerified}
                />
              </div>

              <button
                type="submit"
                className="read-more-btn"
                disabled={status.loading}
              >
                <span className="white-circle">
                  <i className="fa fa-play"></i>
                </span>
                {status.loading ? t("Submitting...") : t("Submit Application")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

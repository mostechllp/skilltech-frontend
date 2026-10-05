"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import PhoneInput from "@/components/PhoneInput";
import { submitQuoteRequest } from "@/lib/api";

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestQuoteModal({ isOpen, onClose }: RequestQuoteModalProps) {
  const { language, dir, t } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    requirements: "",
  });

  const [attachment, setAttachment] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
    // Reset status after close animation
    setTimeout(() => {
      setErrorMessage("");
      setFileError("");
      if (submitSuccess) {
        setFormData({
          fullName: "",
          company: "",
          email: "",
          phone: "",
          requirements: "",
        });
        setAttachment(null);
        setSubmitSuccess(false);
        setReferenceNumber("");
      }
    }, 300);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Max 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setFileError(t("File size exceeds 10MB limit."));
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setAttachment(file);
  };

  const removeAttachment = () => {
    setAttachment(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim()) {
      setErrorMessage(t("Please enter your full name."));
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage(t("Please enter your email address."));
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMessage(t("Please enter your phone number."));
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("full_name", formData.fullName.trim());
      if (formData.company.trim()) {
        data.append("company", formData.company.trim());
      }
      data.append("email", formData.email.trim());
      data.append("phone", formData.phone.trim());
      if (formData.requirements.trim()) {
        data.append("requirements", formData.requirements.trim());
      }
      if (attachment) {
        data.append("attachment", attachment);
      }

      const res = await submitQuoteRequest(data);

      setSubmitSuccess(true);
      setReferenceNumber(res.reference_number || "");
      setFormData({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        requirements: "",
      });
      setAttachment(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      setErrorMessage(err.message || t("Failed to submit quote request. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="quote-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      dir={dir}
    >
      <div className="quote-modal-card">
        {/* Close button */}
        <button
          type="button"
          className="quote-modal-close"
          onClick={handleClose}
          aria-label={t("Close")}
        >
          &times;
        </button>

        {submitSuccess ? (
          <div className="quote-modal-success text-center py-4">
            <div className="quote-success-icon">
              <i className="fa fa-check"></i>
            </div>
            <h3 className="quote-success-title">
              {t("Thank You!")}
            </h3>
            <p className="quote-success-msg">
              {t("Your quote request has been submitted successfully.")}
            </p>
            {referenceNumber && (
              <div className="quote-ref-badge">
                <span>{t("Reference Number")}:</span> <strong>{referenceNumber}</strong>
              </div>
            )}
            <p className="quote-success-sub">
              {t("Our team will review your requirements and get back to you shortly.")}
            </p>
            <button
              type="button"
              className="quote-submit-btn mt-3"
              onClick={handleClose}
            >
              {t("Close")}
            </button>
          </div>
        ) : (
          <>
            {/* Modal Title */}
            <h3 className="quote-modal-title">{t("Request a Quote")}</h3>

            {errorMessage && (
              <div className="alert alert-danger py-2 px-3 mb-3 text-start" style={{ fontSize: "14px" }}>
                <i className="fa fa-exclamation-circle me-2"></i> {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="quote-modal-form">
              {/* Row 1: Full Name & Company */}
              <div className="quote-form-row">
                <div className="quote-form-group">
                  <label className="quote-form-label">
                    {t("Full Name")} <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    className="quote-form-input"
                    placeholder={t("Enter your full name")}
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="quote-form-group">
                  <label className="quote-form-label">{t("Company")}</label>
                  <input
                    type="text"
                    name="company"
                    className="quote-form-input"
                    placeholder={t("Company name")}
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="quote-form-row">
                <div className="quote-form-group">
                  <label className="quote-form-label">
                    {t("Email")} <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="quote-form-input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="quote-form-group">
                  <label className="quote-form-label">
                    {t("Phone")} <span className="text-danger">*</span>
                  </label>
                  <PhoneInput
                    name="phone"
                    placeholder={t("Phone")}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Row 3: Attachment Upload */}
              <div className="quote-form-group">
                <label htmlFor="quote-attachment" className="quote-form-label">
                  {t("Attachment")}{" "}
                  <span className="quote-form-hint">
                    ({t("Optional, max 10MB - PDF, DOC, Images")})
                  </span>
                </label>

                {!attachment ? (
                  <div
                    className="quote-file-dropzone"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      id="quote-attachment"
                      aria-label={t("Attachment")}
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="d-none"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.webp,.zip"
                    />
                    <i className="fa fa-cloud-upload-alt quote-upload-icon"></i>
                    <div className="quote-upload-text">
                      <span className="quote-upload-btn-text">{t("Choose a file")}</span> {t("or drag it here")}
                    </div>
                  </div>
                ) : (
                  <div className="quote-file-selected">
                    <div className="quote-file-info">
                      <i className="fa fa-file-alt quote-file-icon"></i>
                      <div className="quote-file-meta">
                        <span className="quote-file-name" title={attachment.name}>
                          {attachment.name}
                        </span>
                        <span className="quote-file-size">
                          {formatFileSize(attachment.size)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="quote-file-remove"
                      onClick={removeAttachment}
                      title={t("Remove file")}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                )}

                {fileError && (
                  <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                    {fileError}
                  </div>
                )}
              </div>

              {/* Row 4: Requirements */}
              <div className="quote-form-group">
                <label className="quote-form-label">{t("Requirements")}</label>
                <textarea
                  name="requirements"
                  style={{ height: "120px" }}
                  className="quote-form-textarea"
                  placeholder={t("Describe your requirements...")}
                  value={formData.requirements}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="quote-form-footer">
                <button
                  type="submit"
                  className="quote-submit-btn"
                  disabled={isSubmitting}
                >
                  <span className="quote-btn-icon">
                    {isSubmitting ? (
                      <i className="fa fa-spinner fa-spin"></i>
                    ) : (
                      <i className={`fa ${dir === "rtl" ? "fa-arrow-left" : "fa-arrow-right"}`}></i>
                    )}
                  </span>
                  <span>
                    {isSubmitting ? t("Submitting...") : t("Submit Request")}
                  </span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

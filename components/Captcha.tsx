"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL, fetchSiteSettings } from "@/lib/api";

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
  setIsCaptcha?:(isValid: boolean) => void;
}

export default function Captcha({ onVerify,setIsCaptcha }: CaptchaProps) {
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState(false);
  const [imgKey, setImgKey] = useState(Date.now());
  const [isValid, setIsValid] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSettings() {
        try {
            const settings = await fetchSiteSettings();
            if (settings && settings.enable_captcha === false) {
                setEnabled(false);
                onVerify(true); // Auto verify if disabled
            }else{
              if(typeof setIsCaptcha === "function"){
                setIsCaptcha?.(true);
              }
            }
        } catch (e) {
            console.error("Failed to fetch settings", e);
        } finally {
            setLoading(false);
        }
    }
    checkSettings();
  }, []); // Remove onVerify dependency loop by keeping it static or handling it carefully

  const reloadCaptcha = () => {
    setImgKey(Date.now());
    setError(false);
    setCaptcha("");
    setIsValid(false);
    onVerify(false);
  };

  const verifyCaptcha = async () => {
    if (!captcha) return;
    setVerifying(true);

    try {
      const res = await fetch(`${API_BASE_URL}/validate-captcha/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ captcha }),
      });

      const data = await res.json();

      if (data.status === "ok") {
        setIsValid(true);
        setError(false);
        onVerify(true);
      } else {
        setError(true);
        setIsValid(false);
        onVerify(false);
        reloadCaptcha(); // Reload on fail to prevent brute force
      }
    } catch (e) {
      console.error("Captcha validation error", e);
      setError(true);
    } finally {
        setVerifying(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!enabled) return null;

  return (
    <div className="captcha-container" style={{ marginBottom: 20 }}>
       <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${API_BASE_URL}/captcha/?t=${imgKey}`}
          height={50}
          alt="captcha"
          style={{borderRadius: 4, border: '1px solid #ccc', background: 'white'}}
        />
        <button type="button"  onClick={reloadCaptcha} style={{border: 'none', background: 'transparent', cursor: 'pointer', textDecoration: 'underline', fontSize: '14px', color: '#666'}}>
          Reload
        </button>
      </div>
      
      <div style={{ display: "flex", gap: 10, alignItems: 'center' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter captcha"
            value={captcha}
            onChange={(e) => {
                setCaptcha(e.target.value);
                if(error) setError(false);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    verifyCaptcha();
                }
            }}
            disabled={isValid || verifying}
            style={{flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', maxWidth: '200px'}}
          />
          <button 
            type="button" 
            onClick={verifyCaptcha}
            disabled={isValid || !captcha || verifying}
            style={{
                padding: '8px 16px', 
                background: isValid ? '#28a745' : '#3351a3', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: (isValid || !captcha || verifying) ? 'default' : 'pointer',
                opacity: (isValid || !captcha || verifying) && !isValid ? 0.7 : 1,
                minWidth: '80px'
            }}
          >
            {verifying ? "..." : (isValid ? "Verified" : "Verify")}
          </button>
      </div>
       {error && (
        <small style={{ color: "red", display: 'block', marginTop: 5 }}>
          Invalid captcha. Please try again.
        </small>
      )}
    </div>
  )
}

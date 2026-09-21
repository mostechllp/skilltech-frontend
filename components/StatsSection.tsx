"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { fetchStatistics, fetchServiceStatistics } from "@/lib/api";
import { useLanguage } from "@/lib/LanguageContext";

const CountUp = ({
  end,
  duration = 6000,
  valueAr,
  language,
}: {
  end: number;
  duration?: number;
  valueAr?: string;
  language?: string;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  if (language === "ar") {
    if (valueAr) {
      if (count === end) {
        return <span ref={countRef}>{valueAr}</span>;
      }
      return <span ref={countRef}>{count.toLocaleString("ar")}</span>;
    }
    return <span ref={countRef}>{count.toLocaleString("ar")}</span>;
  }

  return <span ref={countRef}>{count}</span>;
};

export default function StatsSection({ variant = "default", source = "home" }: { variant?: "default" | "circle", source?: "home" | "service" }) {
  const { t, language } = useLanguage();
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    async function loadStats() {
      try {
        let data;
        if (source === "service") {
            data = await fetchServiceStatistics();
        } else {
            data = await fetchStatistics();
        }
        setStats(data);
      } catch (error) {
        console.error("Failed to load statistics", error);
      }
    }
    loadStats();
  }, [source]);

  if (!stats || stats.length === 0) return null;

  if (variant === "circle") {
    return (
      <section className="aect-section">
        <div className="container">
          <div className="aect-wrapper">
            <div className="row text-center justify-content-center">
              {stats.map((stat) => {
                const statLabel = language === "ar" && stat.label_ar ? stat.label_ar : t(stat.label);
                return (
                  <div key={stat.id} className="col-4 col-md-2 ">
                    <div className="aect-item">
                      <div className="aect-circle">
                        {stat.icon && (
                           <Image src={stat.icon} alt={statLabel} width={40} height={40} style={{objectFit: 'contain'}} />
                        )}
                      </div>
                      <h3 className="aect-number">
                        <CountUp end={stat.value} valueAr={stat.value_ar} language={language} />
                        {stat.suffix}
                      </h3>
                      <p>{statLabel}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-wrapper">
          <div className="stats-grid" style={{ "--stats-cols": Math.min(stats.length, 6) } as React.CSSProperties}>
            {stats.map((stat) => {
              const statLabel = language === "ar" && stat.label_ar ? stat.label_ar : t(stat.label);
              return (
                <div key={stat.id} className="stats-item">
                  {stat.icon && (
                    <div className="mb-2">
                      <Image src={stat.icon} alt={statLabel} width={35} height={35} style={{objectFit: 'contain'}} />
                    </div>
                  )}
                  <h2>
                    <CountUp end={stat.value} valueAr={stat.value_ar} language={language} />
                    {stat.suffix}
                  </h2>
                  <p>{statLabel}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

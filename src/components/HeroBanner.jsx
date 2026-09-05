"use client";

import React, { useEffect, useRef } from "react";
import SilkHeroCanvas from "./SilkHeroCanvas";
import { useShop } from "../context/ShopContext";
import { ShieldCheck, Feather, Sparkles, RefreshCw, ArrowRight } from "lucide-react";
import gsap from "gsap";

export default function HeroBanner() {
  const { setActiveDepartment } = useShop();
  const heroContentRef = useRef(null);

  useEffect(() => {
    const container = heroContentRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".gsap-reveal");
    const reveal = () => gsap.set(elements, { clearProps: "all" });

    // The headline and both CTAs are the most important content on the page, so
    // they must never depend on a tween finishing. Skip the animation entirely
    // for reduced-motion users, and keep a timer that reveals them outright if
    // the rAF loop stalls (background tab, throttled frame, GSAP failing to run).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 35,
        scale: 0.98
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        stagger: 0.18,
        ease: "power3.out",
        delay: 0.2,
        onComplete: reveal
      }
    );

    const failsafe = setTimeout(() => {
      if (tween.progress() < 1) {
        tween.kill();
        reveal();
      }
    }, 2600);

    return () => {
      clearTimeout(failsafe);
      tween.kill();
      reveal();
    };
  }, []);

  const handleCtaClick = (dept) => {
    setActiveDepartment(dept);
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      {/* Three.js Interactive Procedural Silk Background */}
      <SilkHeroCanvas />

      {/* Radial Depth Vignette */}
      <div className="hero-overlay" />

      {/* Hero Editorial Content */}
      <div className="hero-content" ref={heroContentRef}>
        <h1 id="hero-heading" className="hero-title gsap-reveal">
          Pure Second Skin, <em>Elegantly</em> Redefined
        </h1>

        <p className="hero-desc gsap-reveal">
          Engineered from 22-momme Grade 6A pure mulberry silk, breathable Austrian micro-modal,
          and seamless architectural shapewear for men and women. Luxury you never want to take off.
        </p>

        <div className="hero-cta-group gsap-reveal">
          <button
            className="btn-primary"
            onClick={() => handleCtaClick("women")}
          >
            <span>Explore Women&apos;s Intimates</span>
            <ArrowRight size={15} />
          </button>
          <button
            className="btn-secondary"
            onClick={() => handleCtaClick("men")}
          >
            <span>Explore Men&apos;s Essentials</span>
          </button>
        </div>

        {/* Feature Highlights Bar */}
        <div className="hero-features-bar gsap-reveal">
          <div className="hero-feature-item">
            <Feather size={16} />
            <span>Grade 6A Mulberry Silk</span>
          </div>
          <div className="hero-feature-item">
            <Sparkles size={16} />
            <span>Ergonomic 3D Contour Fit</span>
          </div>
          <div className="hero-feature-item">
            <ShieldCheck size={16} />
            <span>Zero-Chafe & Seamless</span>
          </div>
          <div className="hero-feature-item">
            <RefreshCw size={16} />
            <span>Complimentary 100-Day Exchanges</span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { useShop } from "../context/ShopContext";
import { ArrowRight, Sparkles } from "lucide-react";

export default function EditorialLookbook() {
  const { setActiveDepartment } = useShop();

  const handleGoTo = (dept) => {
    setActiveDepartment(dept);
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="lookbook-section" aria-labelledby="lookbook-title">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto" }}>
          <span className="section-eyebrow">
            <Sparkles size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: "4px" }} />
            The Editorial Lookbook
          </span>
          <h2 id="lookbook-title">Where Comfort Meets Haute Couture</h2>
          <p style={{ marginTop: "0.8rem", fontSize: "1rem" }}>
            Undergarments shouldn&apos;t just be an afterthought. Designed with precision seams,
            zero-wire freedom, and tactile silk that moves in synchronicity with your body.
          </p>
        </div>

        <div className="lookbook-grid">
          {/* Large Campaign Item: Women's Silk */}
          <div
            className="lookbook-item lookbook-item-large"
            onClick={() => handleGoTo("women")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://images.unsplash.com/photo-1634655511368-6cd7213719f4?auto=format&fit=crop&w=1200&q=80"
              alt="Women's Pure Silk Editorial"
              className="lookbook-img"
              loading="lazy"
            />
            <div className="lookbook-caption">
              <span className="section-eyebrow" style={{ color: "var(--accent-amethyst)" }}>
                The Silk Reverie
              </span>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>
                Weightless Mulberry Silk & Bralettes
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.8rem" }}>
                Zero underwires. Uncompromising grace. Draped in 22-momme pure silk.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-amethyst)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                <span>Shop The Silk Edit</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Small Campaign Item: Men's Modal */}
          <div
            className="lookbook-item lookbook-item-small"
            onClick={() => handleGoTo("men")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://images.unsplash.com/photo-1640765937555-6f413ed1d936?auto=format&fit=crop&w=800&q=80"
              alt="Men's Modal Essentials Editorial"
              className="lookbook-img"
              loading="lazy"
            />
            <div className="lookbook-caption">
              <span className="section-eyebrow" style={{ color: "var(--accent-blush)" }}>
                Men&apos;s Engineered Essentials
              </span>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>
                The Micro-Modal Boxer Brief
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.8rem" }}>
                Ergonomic 3D pouch support with zero rolling or chafing.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-amethyst)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                <span>Explore Men&apos;s Line</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

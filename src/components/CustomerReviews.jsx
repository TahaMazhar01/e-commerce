"use client";

import React from "react";
import { REVIEWS } from "../data/products";
import { Star, CheckCircle2, Quote } from "lucide-react";

export default function CustomerReviews() {
  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          <h2 id="reviews-heading" style={{ fontSize: "2.2rem" }}>
            The Second-Skin Experience
          </h2>
          <p style={{ marginTop: "0.5rem" }}>
            Over 14,000 discerning clients across the globe trust AURA for day-to-night luxury.
          </p>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="flex-between">
                <div className="stars-row">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {rev.date}
                </span>
              </div>

              <h4 style={{ fontSize: "1.05rem", color: "var(--text-primary)", fontWeight: 500 }}>
                &ldquo;{rev.headline}&rdquo;
              </h4>

              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {rev.comment}
              </p>

              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "0.8rem",
                  borderTop: "1px solid rgba(42, 34, 51, 0.07)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.75rem"
                }}
              >
                <div>
                  <strong style={{ color: "var(--text-primary)", display: "block" }}>{rev.author}</strong>
                  <span style={{ color: "var(--accent-amethyst)" }}>{rev.product}</span>
                </div>
                {rev.verified && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--state-success)" }}>
                    <CheckCircle2 size={13} />
                    <span>Verified Buyer</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

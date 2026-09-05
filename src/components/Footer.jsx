"use client";

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Sparkles, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  const { setActiveDepartment, setIsSizeGuideOpen, setSizeGuideGender } = useShop();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const handleNav = (dept) => {
    setActiveDepartment(dept);
    const el = document.getElementById("catalog-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Philosophy */}
          <div className="footer-col">
            <div className="nav-brand" style={{ alignItems: "flex-start", marginBottom: "1.4rem", fontSize: "2.1rem" }}>
              <span className="brand-title">AURA</span>
              <span className="brand-subtitle">INTIMATES</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "340px" }}>
              Architectural next-to-skin luxury. Handcrafted from 22-momme pure mulberry silk,
              breathable micro-modal, and seamless sculpting fabrics for men and women.
            </p>
            <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--accent-amethyst)", fontSize: "0.8rem" }}>
              <ShieldCheck size={16} />
              <span>OEKO-TEX® Standard 100 Certified Non-Toxic</span>
            </div>
          </div>

          {/* Col 2: Women's Line */}
          <div className="footer-col">
            <h4>Women&apos;s</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleNav("women")} className="nav-link-btn">Silk Demi Bralettes</button></li>
              <li><button onClick={() => handleNav("shapewear")} className="nav-link-btn">Sculpting Bodysuits</button></li>
              <li><button onClick={() => handleNav("women")} className="nav-link-btn">Seamless Cloud Briefs</button></li>
              <li><button onClick={() => handleNav("loungewear")} className="nav-link-btn">Mulberry Silk Slips</button></li>
              <li><button onClick={() => { setSizeGuideGender("women"); setIsSizeGuideOpen(true); }} className="nav-link-btn">Women&apos;s Sizing Guide</button></li>
            </ul>
          </div>

          {/* Col 3: Men's Line */}
          <div className="footer-col">
            <h4>Men&apos;s</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleNav("men")} className="nav-link-btn">Micro-Modal Boxer Briefs</button></li>
              <li><button onClick={() => handleNav("men")} className="nav-link-btn">Athletic Performance Trunks</button></li>
              <li><button onClick={() => handleNav("men")} className="nav-link-btn">Organic Supima Cotton</button></li>
              <li><button onClick={() => handleNav("loungewear")} className="nav-link-btn">Silk-Trimmed Robes</button></li>
              <li><button onClick={() => { setSizeGuideGender("men"); setIsSizeGuideOpen(true); }} className="nav-link-btn">Men&apos;s Sizing Guide</button></li>
            </ul>
          </div>

          {/* Col 4: VIP Newsletter */}
          <div className="footer-col">
            <h4>Newsletter</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
              Receive invitations to private collection previews, seasonal silk color drops, and private vault sales.
            </p>

            {subscribed ? (
              <div style={{ padding: "0.8rem", background: "rgba(156, 137, 184, 0.16)", borderRadius: "var(--radius-sm)", color: "var(--accent-amethyst)", fontSize: "0.8rem" }}>
                ✨ Welcome to the Private Client Circle. Your 15% code <strong>LUXE15</strong> is active.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                />
                <button type="submit" className="btn-primary" style={{ padding: "0.75rem 1rem" }}>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} AURA INTIMATES Inc. All Rights Reserved. Crafted with Next.js, Three.js & GSAP.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Discreet Shipping Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

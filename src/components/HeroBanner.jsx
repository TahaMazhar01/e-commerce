"use client";

import { ArrowRight, ArrowDown, Truck, PackageCheck, Ruler, Feather } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function HeroBanner() {
  const { setActiveDepartment, setSearchQuery } = useShop();
  const shopCollection = (department) => {
    setActiveDepartment(department);
    setSearchQuery("");
  };

  return (
    <>
      <section className="campaign-hero" aria-labelledby="hero-title">
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/aura-silk-mobile.webp" />
          <img className="campaign-image" src="/images/aura-silk-campaign.webp" alt="Pearl silk camisole and flowing lounge trousers in natural light" width="1536" height="1024" fetchPriority="high" />
        </picture>
        <div className="container campaign-layout">
          <div className="campaign-copy">
            <span className="section-eyebrow">THE EVERYDAY COLLECTION</span>
            <h1 id="hero-title">Intimates &amp;<br /><em>loungewear.</em></h1>
            <p className="campaign-description">A softer kind of everyday. Thoughtfully made essentials in silk, modal, and everything you love to live in.</p>
            <div className="campaign-actions">
              <a className="btn-primary" href="#catalog-section" onClick={() => shopCollection("women")}>Shop women <ArrowRight size={17} /></a>
              <a className="campaign-secondary" href="#catalog-section" onClick={() => shopCollection("men")}>Shop men <ArrowRight size={17} /></a>
            </div>
          </div>
          <div className="campaign-bottom">
            <a href="#catalog-section" className="campaign-discover" onClick={() => shopCollection("all")}><ArrowDown size={16} /> Discover your everyday essentials</a>
            <a href="#catalog-section" className="campaign-edit" onClick={() => shopCollection("loungewear")}><span>The silk edit</span><ArrowRight size={18} /></a>
          </div>
        </div>
      </section>
      <div className="service-strip" aria-label="Shopping benefits">
        <div className="container service-grid">
          <span><Truck size={20} strokeWidth={1.5} /> Free shipping over $75</span>
          <span><PackageCheck size={20} strokeWidth={1.5} /> Discreet packaging</span>
          <span><Ruler size={20} strokeWidth={1.5} /> 100-day fit exchanges</span>
          <span><Feather size={20} strokeWidth={1.5} /> Considered fabrics</span>
        </div>
      </div>
    </>
  );
}

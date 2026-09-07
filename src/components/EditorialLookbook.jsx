"use client";

import { useShop } from "../context/ShopContext";
import { ArrowUpRight } from "lucide-react";

export default function EditorialLookbook() {
  const { setActiveDepartment, setSearchQuery } = useShop();
  const selectCollection = (department) => {
    setActiveDepartment(department);
    setSearchQuery("");
  };

  return (
    <section className="lookbook-section" aria-labelledby="lookbook-title">
      <div className="container">
        <div className="section-heading">
          <div><span className="section-eyebrow">THE ART OF FEELING GOOD</span><h2 id="lookbook-title">Made for your kind of day.</h2></div>
          <p>From a slow morning to a full calendar.<br />Comfort, without a second thought.</p>
        </div>
        <div className="lookbook-grid">
          <a className="collection-link" href="#catalog-section" onClick={() => selectCollection("loungewear")}>
            <div className="collection-image"><img src="/images/aura-silk-campaign.webp" alt="Pearl silk loungewear in the afternoon light" loading="lazy" width="1536" height="1024" /></div>
            <div className="collection-caption"><div><h3>The silk edit</h3><p>For mornings with nowhere to rush.</p></div><ArrowUpRight size={24} /></div>
          </a>
          <a className="collection-link" href="#catalog-section" onClick={() => selectCollection("men")}>
            <div className="collection-image collection-product"><img src="/images/products/m-01-charcoal.webp" alt="Charcoal micro-modal boxer briefs" loading="lazy" width="750" height="996" /></div>
            <div className="collection-caption"><div><h3>Everyday, for him</h3><p>Good foundations. Exceptional comfort.</p></div><ArrowUpRight size={24} /></div>
          </a>
        </div>
      </div>
    </section>
  );
}

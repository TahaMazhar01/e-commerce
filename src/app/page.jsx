"use client";

import React from "react";
import HeroBanner from "../components/HeroBanner";
import DepartmentTabs from "../components/DepartmentTabs";
import ProductCard from "../components/ProductCard";
import EditorialLookbook from "../components/EditorialLookbook";
import CustomerReviews from "../components/CustomerReviews";
import { useShop } from "../context/ShopContext";
import { Sparkles, ShoppingBag } from "lucide-react";

export default function StorefrontPage() {
  const { filteredProducts, activeDepartment, searchQuery } = useShop();

  return (
    <div>
      {/* 3D Silk Canvas Hero Section */}
      <HeroBanner />

      {/* Main Catalog Section */}
      <section id="catalog-section" className="catalog-section" aria-label="Curated Intimates Catalog">
        <div className="container">
          <div className="catalog-header">
            <span className="section-eyebrow">
              <Sparkles size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: "4px" }} />
              Shop the collection
            </span>
            <h2>Architectural Undergarments & Essentials</h2>
            <p style={{ maxWidth: "580px", margin: "0.6rem auto 0" }}>
              Tailored for men and women. Breathable fabrics engineered to eliminate friction,
              pressure points, and visible lines.
            </p>
          </div>

          {/* Department Switcher & Filter Controls */}
          <DepartmentTabs />

          {/* Catalog Grid */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 1rem", background: "var(--bg-surface)", borderRadius: "var(--radius-md)" }}>
              <ShoppingBag size={32} style={{ color: "var(--accent-blush)", margin: "0 auto 1rem", opacity: 0.7 }} />
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                No intimates match your criteria
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {searchQuery ? `No results for "${searchQuery}".` : "Try selecting a different collection or resetting filters."}
              </p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Editorial Fashion Lookbook */}
      <EditorialLookbook />

      {/* Verified Customer Testimonials */}
      <CustomerReviews />
    </div>
  );
}

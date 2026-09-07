"use client";

import React from "react";
import HeroBanner from "../components/HeroBanner";
import DepartmentTabs from "../components/DepartmentTabs";
import ProductCard from "../components/ProductCard";
import EditorialLookbook from "../components/EditorialLookbook";
import CustomerReviews from "../components/CustomerReviews";
import { useShop } from "../context/ShopContext";
import { ShoppingBag } from "lucide-react";

export default function StorefrontPage() {
  const { filteredProducts, searchQuery, setSearchQuery, setActiveDepartment } = useShop();

  return (
    <div>
      <HeroBanner />

      {/* Main Catalog Section */}
      <section id="catalog-section" className="catalog-section" aria-label="Curated Intimates Catalog">
        <div className="container">
          <div className="catalog-header">
            <div><span className="section-eyebrow">GOOD DAYS START HERE</span><h2>Your everyday, elevated.</h2></div>
            <p>Soft on skin. Easy to love.<br />Find the pieces you&apos;ll reach for on repeat.</p>
          </div>

          {searchQuery && <div className="search-summary"><span>Results for &ldquo;{searchQuery}&rdquo;</span><button className="text-link" onClick={() => setSearchQuery("")}>Clear search</button></div>}

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
              <button className="btn-secondary empty-reset" onClick={() => { setSearchQuery(""); setActiveDepartment("all"); }}>View all essentials</button>
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

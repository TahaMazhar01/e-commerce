"use client";

import React from "react";
import { useShop } from "../context/ShopContext";
import { SlidersHorizontal, Sparkles } from "lucide-react";

export default function DepartmentTabs() {
  const {
    activeDepartment,
    setActiveDepartment,
    sortBy,
    setSortBy,
    filteredProducts
  } = useShop();

  const tabs = [
    { id: "all", label: "All Collections" },
    { id: "women", label: "Women's Intimates" },
    { id: "men", label: "Men's Essentials" },
    { id: "shapewear", label: "Sculpt & Shape" },
    { id: "loungewear", label: "Silk & Loungewear" }
  ];

  return (
    <div className="catalog-controls">
      <div className="filter-bar">
        {/* Department Switcher */}
        <div className="department-filters" role="tablist" aria-label="Collections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeDepartment === tab.id}
              className={`dept-btn ${activeDepartment === tab.id ? "active" : ""}`}
              onClick={() => setActiveDepartment(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Subfilters & Sorting */}
        <div className="catalog-subfilters">
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Showing {filteredProducts.length} Pieces
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <SlidersHorizontal size={14} style={{ color: "var(--accent-champagne)" }} />
            <select
              className="custom-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort Collection"
            >
              <option value="featured">Curated & Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

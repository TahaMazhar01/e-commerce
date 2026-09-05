"use client";

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Search, ShoppingBag, Heart, Ruler, Sparkles, X, Menu } from "lucide-react";

const NAV_ICON = 26;

export default function Navbar() {
  const {
    activeDepartment,
    setActiveDepartment,
    cartCount,
    setIsCartOpen,
    wishlist,
    searchQuery,
    setSearchQuery,
    setIsSizeGuideOpen,
    setSizeGuideGender
  } = useShop();

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDeptSelect = (dept) => {
    setActiveDepartment(dept);
    setIsMobileMenuOpen(false);
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openSizeGuide = (gender) => {
    setSizeGuideGender(gender);
    setIsSizeGuideOpen(true);
  };

  return (
    <>
      {/* Editorial Announcement Bar */}
      <aside className="announcement-bar" aria-label="Special Offers">
        <div className="flex-center" style={{ gap: "1rem", flexWrap: "wrap" }}>
          <span>
            <Sparkles size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: "6px" }} />
            Complimentary Worldwide Express Delivery on Orders Over $75
          </span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>
            Use Code <strong className="announcement-highlight">LUXE15</strong> for 15% Off Your First Order
          </span>
        </div>
      </aside>

      {/* Main Luxury Header */}
      <header className="navbar-header">
        <div className="nav-container">
          {/* Mobile Menu Toggle */}
          <button
            className="icon-btn mobile-only"
            style={{ display: "none" }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={28} />
          </button>

          {/* Brand Logo */}
          <div
            className="nav-brand"
            onClick={() => {
              setActiveDepartment("all");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="brand-title">AURA</span>
            <span className="brand-subtitle">INTIMATES</span>
          </div>

          {/* Department Links */}
          <nav className="nav-links" aria-label="Main Navigation">
            <button
              className={`nav-link-btn ${activeDepartment === "all" ? "active" : ""}`}
              onClick={() => handleDeptSelect("all")}
            >
              All Collections
            </button>
            <button
              className={`nav-link-btn ${activeDepartment === "women" ? "active" : ""}`}
              onClick={() => handleDeptSelect("women")}
            >
              Women&apos;s Intimates
            </button>
            <button
              className={`nav-link-btn ${activeDepartment === "men" ? "active" : ""}`}
              onClick={() => handleDeptSelect("men")}
            >
              Men&apos;s Essentials
            </button>
            <button
              className={`nav-link-btn ${activeDepartment === "shapewear" ? "active" : ""}`}
              onClick={() => handleDeptSelect("shapewear")}
            >
              Sculpt & Shape
            </button>
            <button
              className={`nav-link-btn ${activeDepartment === "loungewear" ? "active" : ""}`}
              onClick={() => handleDeptSelect("loungewear")}
            >
              Silk & Lounge
            </button>
          </nav>

          {/* Actions: Search, Size Guide, Wishlist, Cart */}
          <div className="nav-actions">
            {/* Search Toggle */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              {isSearchVisible ? (
                <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Search silk, boxers, bralettes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    style={{
                      padding: "0.8rem 2.6rem 0.8rem 1.2rem",
                      background: "rgba(42, 34, 51, 0.06)",
                      border: "1px solid var(--accent-amethyst)",
                      borderRadius: "var(--radius-full)",
                      color: "var(--text-primary)",
                      fontSize: "1rem",
                      fontFamily: "var(--font-body)",
                      outline: "none",
                      width: "280px"
                    }}
                  />
                  <button
                    onClick={() => {
                      setIsSearchVisible(false);
                      setSearchQuery("");
                    }}
                    style={{
                      position: "absolute",
                      right: "12px",
                      color: "var(--text-secondary)"
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <button
                  className="icon-btn"
                  onClick={() => setIsSearchVisible(true)}
                  aria-label="Search Catalog"
                  title="Search Catalog"
                >
                  <Search size={NAV_ICON} />
                </button>
              )}
            </div>

            {/* Sizing Assistant Button */}
            <button
              className="icon-btn"
              onClick={() => openSizeGuide(activeDepartment === "men" ? "men" : "women")}
              aria-label="Interactive Fit & Size Guide"
              title="Interactive Fit & Size Guide"
            >
              <Ruler size={NAV_ICON} />
            </button>

            {/* Wishlist Button */}
            <button
              className="icon-btn"
              onClick={() => {
                const catalogEl = document.getElementById("catalog-section");
                if (catalogEl) catalogEl.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="View Saved Items"
              title="Saved Items"
            >
              <Heart size={NAV_ICON} />
              {wishlist.length > 0 && (
                <span className="badge-count">{wishlist.length}</span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              className="icon-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag size={NAV_ICON} />
              {cartCount > 0 && (
                <span className="badge-count">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

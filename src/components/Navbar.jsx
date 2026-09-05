"use client";

import React, { useState, useEffect } from "react";
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
    setSizeGuideGender,
    setIsWishlistOpen
  } = useShop();

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const departments = [
    { id: "all", label: "All Collections" },
    { id: "women", label: "Women's Intimates" },
    { id: "men", label: "Men's Essentials" },
    { id: "shapewear", label: "Sculpt & Shape" },
    { id: "loungewear", label: "Silk & Lounge" }
  ];

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
    setIsMobileMenuOpen(false);
  };

  // Close the menu on Escape and freeze the page behind it while it is open.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  // Resizing past the breakpoint should not strand the panel open.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 993px)");
    const onChange = (e) => {
      if (e.matches) setIsMobileMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={NAV_ICON} /> : <Menu size={NAV_ICON} />}
          </button>

          {/* Brand Logo */}
          <button
            type="button"
            className="nav-brand"
            onClick={() => {
              setActiveDepartment("all");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Aura Intimates - back to top"
          >
            <span className="brand-title">AURA</span>
            <span className="brand-subtitle">INTIMATES</span>
          </button>

          {/* Department Links */}
          <nav className="nav-links" aria-label="Main Navigation">
            {departments.map((dept) => (
              <button
                key={dept.id}
                className={`nav-link-btn ${activeDepartment === dept.id ? "active" : ""}`}
                onClick={() => handleDeptSelect(dept.id)}
              >
                {dept.label}
              </button>
            ))}
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
                    aria-label="Search the catalog"
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
                    aria-label="Close search"
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
              onClick={() => setIsWishlistOpen(true)}
              aria-label={`Saved items (${wishlist.length})`}
              title="Saved items"
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
              aria-label={`Shopping bag (${cartCount})`}
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

      {/* Mobile navigation. .nav-links is hidden below 992px, so this panel is
          the only route into the departments and size guides on a phone. */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav
        id="mobile-menu"
        className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}
        aria-label="Mobile Navigation"
        aria-hidden={!isMobileMenuOpen}
        inert={!isMobileMenuOpen}
      >
        <div className="mobile-menu-head">
          <span className="mobile-menu-heading">Browse</span>
          <button
            className="modal-close-btn"
            style={{ position: "static" }}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

        <ul className="mobile-menu-list">
          {departments.map((dept) => (
            <li key={dept.id}>
              <button
                className={`mobile-menu-link ${activeDepartment === dept.id ? "active" : ""}`}
                onClick={() => handleDeptSelect(dept.id)}
                aria-current={activeDepartment === dept.id ? "true" : undefined}
              >
                {dept.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mobile-menu-section">
          <span className="mobile-menu-heading">Find your fit</span>
          <button className="mobile-menu-link" onClick={() => openSizeGuide("women")}>
            <Ruler size={16} />
            <span>Women&apos;s sizing</span>
          </button>
          <button className="mobile-menu-link" onClick={() => openSizeGuide("men")}>
            <Ruler size={16} />
            <span>Men&apos;s sizing</span>
          </button>
        </div>

        <div className="mobile-menu-section">
          <button
            className="mobile-menu-link"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsWishlistOpen(true);
            }}
          >
            <Heart size={16} />
            <span>Saved items ({wishlist.length})</span>
          </button>
          <button
            className="mobile-menu-link"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
          >
            <ShoppingBag size={16} />
            <span>Shopping bag ({cartCount})</span>
          </button>
        </div>
      </nav>
    </>
  );
}

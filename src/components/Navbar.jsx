"use client";

import { useState, useEffect, useRef } from "react";
import { useShop } from "../context/ShopContext";
import { Search, ShoppingBag, Heart, Ruler, X, Menu, ArrowRight } from "lucide-react";

const departments = [
  { id: "all", label: "Shop all" },
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
  { id: "shapewear", label: "Shapewear" },
  { id: "loungewear", label: "Loungewear" }
];

export default function Navbar() {
  const { activeDepartment, setActiveDepartment, cartCount, setIsCartOpen, wishlist,
    searchQuery, setSearchQuery, setIsSizeGuideOpen, setSizeGuideGender, setIsWishlistOpen } = useShop();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchToggle = useRef(null);
  const menuToggle = useRef(null);
  const menuRef = useRef(null);

  const handleDeptSelect = (department) => {
    setActiveDepartment(department);
    setSearchQuery("");
    setIsMobileMenuOpen(false);
    document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const openSizeGuide = (gender) => {
    setSizeGuideGender(gender);
    setIsSizeGuideOpen(true);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector("button")?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
      if (event.key !== "Tab") return;
      const controls = menuRef.current?.querySelectorAll("button, a[href]");
      const first = controls?.[0];
      const last = controls?.[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 993px)");
    const onResize = (event) => { if (event.matches) setIsMobileMenuOpen(false); };
    mq.addEventListener("change", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
      menuToggle.current?.focus({ preventScroll: true });
    };
  }, [isMobileMenuOpen]);

  const closeSearch = () => {
    setIsSearchVisible(false);
    searchToggle.current?.focus();
  };

  return (
    <>
      <aside className="announcement-bar" aria-label="Special offer">
        <span>Make yourself comfortable. <strong>15% off your first order</strong> with LUXE15</span>
        <ArrowRight size={14} aria-hidden="true" />
      </aside>
      <header className="navbar-header">
        <div className="nav-container">
          <button ref={menuToggle} className="icon-btn mobile-only" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu"><Menu size={22} /></button>
          <a href="#" className="nav-brand" aria-label="Aura Intimates home" onClick={() => { setActiveDepartment("all"); setSearchQuery(""); }}>
            <span className="brand-title">AURA</span><span className="brand-subtitle">INTIMATES</span>
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            {departments.map((department) => <button key={department.id} className={`nav-link-btn ${activeDepartment === department.id ? "active" : ""}`} onClick={() => handleDeptSelect(department.id)}>{department.label}</button>)}
          </nav>
          <div className="nav-actions">
            <button ref={searchToggle} className="icon-btn" onClick={() => setIsSearchVisible(!isSearchVisible)} aria-label="Search catalog" title="Search" aria-expanded={isSearchVisible} aria-controls="catalog-search"><Search size={21} /></button>
            <button className="icon-btn desktop-only" onClick={() => openSizeGuide(activeDepartment === "men" ? "men" : "women")} aria-label="Size guide" title="Size guide"><Ruler size={21} /></button>
            <button className="icon-btn desktop-only" onClick={() => setIsWishlistOpen(true)} aria-label={`Saved items (${wishlist.length})`} title="Saved items"><Heart size={21} />{wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}</button>
            <button className="icon-btn" onClick={() => setIsCartOpen(true)} aria-label={`Shopping bag (${cartCount})`} title="Shopping bag"><ShoppingBag size={21} />{cartCount > 0 && <span className="badge-count">{cartCount}</span>}</button>
          </div>
        </div>
        {isSearchVisible && (
          <form id="catalog-search" className="search-panel" role="search" onSubmit={(event) => { event.preventDefault(); closeSearch(); document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" }); }} onKeyDown={(event) => { if (event.key === "Escape") closeSearch(); }}>
            <div className="container search-inner">
              <Search size={20} />
              <input type="search" placeholder="Search bralettes, silk, everyday essentials..." aria-label="Search the catalog" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} autoFocus />
              <button className="icon-btn" type="submit" aria-label="Show search results" title="Show results"><ArrowRight size={20} /></button>
              <button className="icon-btn" type="button" onClick={closeSearch} aria-label="Close search" title="Close search"><X size={20} /></button>
            </div>
          </form>
        )}
      </header>
      {isMobileMenuOpen && <div className="mobile-menu-backdrop" onClick={() => setIsMobileMenuOpen(false)} />}
      <nav ref={menuRef} id="mobile-menu" className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`} aria-label="Mobile navigation" aria-hidden={!isMobileMenuOpen} inert={!isMobileMenuOpen}>
        <div className="mobile-menu-head"><span className="mobile-menu-heading">Explore AURA</span><button className="icon-btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close navigation menu"><X size={22} /></button></div>
        <ul className="mobile-menu-list">{departments.map((department) => <li key={department.id}><button className={`mobile-menu-link ${activeDepartment === department.id ? "active" : ""}`} onClick={() => handleDeptSelect(department.id)}>{department.label}<ArrowRight size={18} /></button></li>)}</ul>
        <div className="mobile-menu-section">
          <button className="mobile-menu-link" onClick={() => openSizeGuide("women")}><Ruler size={18} /> Women&apos;s size guide</button>
          <button className="mobile-menu-link" onClick={() => openSizeGuide("men")}><Ruler size={18} /> Men&apos;s size guide</button>
          <button className="mobile-menu-link" onClick={() => { setIsMobileMenuOpen(false); setIsWishlistOpen(true); }}><Heart size={18} /> Saved items ({wishlist.length})</button>
        </div>
      </nav>
    </>
  );
}

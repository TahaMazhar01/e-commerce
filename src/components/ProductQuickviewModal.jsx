"use client";

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import FabricInspector3D from "./FabricInspector3D";
import { X, Star, Heart, Check, Ruler, ShieldCheck, Truck, Rotate3D, Eye } from "lucide-react";

export default function ProductQuickviewModal() {
  const {
    quickviewProduct,
    setQuickviewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    setSizeGuideGender
  } = useShop();

  const [selectedColor, setSelectedColor] = useState(
    quickviewProduct ? quickviewProduct.colors[0] : null
  );
  const [selectedSize, setSelectedSize] = useState(
    quickviewProduct ? quickviewProduct.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [show3DInspector, setShow3DInspector] = useState(false);

  // Sync state if quickviewProduct changes
  React.useEffect(() => {
    if (quickviewProduct) {
      setSelectedColor(quickviewProduct.colors[0]);
      setSelectedSize(quickviewProduct.sizes[0]);
      setQuantity(1);
      setShow3DInspector(false);
    }
  }, [quickviewProduct]);

  if (!quickviewProduct) return null;

  const isFavorited = isInWishlist(quickviewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickviewProduct, selectedColor, selectedSize, quantity);
    setQuickviewProduct(null);
  };

  const openSizeGuide = () => {
    setSizeGuideGender(quickviewProduct.gender);
    setIsSizeGuideOpen(true);
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => setQuickviewProduct(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "980px" }}
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={() => setQuickviewProduct(null)}
          aria-label="Close Modal"
        >
          <X size={18} />
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "2.5rem"
          }}
        >
          {/* Visual Column: Image or 3D Inspector */}
          <div>
            {/* View Mode Toggle: 2D Photo vs 3D Fabric Inspector */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              <button
                className={`btn-secondary ${!show3DInspector ? "active" : ""}`}
                style={{
                  padding: "0.45rem 0.9rem",
                  fontSize: "0.75rem",
                  borderColor: !show3DInspector ? "var(--accent-champagne)" : "var(--border-subtle)"
                }}
                onClick={() => setShow3DInspector(false)}
              >
                <Eye size={14} />
                <span>Editorial Image</span>
              </button>
              <button
                className={`btn-secondary ${show3DInspector ? "active" : ""}`}
                style={{
                  padding: "0.45rem 0.9rem",
                  fontSize: "0.75rem",
                  borderColor: show3DInspector ? "var(--accent-champagne)" : "var(--border-subtle)"
                }}
                onClick={() => setShow3DInspector(true)}
              >
                <Rotate3D size={14} />
                <span>3D Fabric & Weave Inspector</span>
              </button>
            </div>

            {show3DInspector ? (
              <FabricInspector3D
                fabricType={quickviewProduct.fabricType}
                productName={quickviewProduct.name}
              />
            ) : (
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3 / 4",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  background: "#14141A"
                }}
              >
                <img
                  src={selectedColor ? selectedColor.image : quickviewProduct.colors[0].image}
                  alt={quickviewProduct.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}

            {/* Thumbnail color selectors */}
            <div style={{ display: "flex", gap: "0.8rem", marginTop: "1rem" }}>
              {quickviewProduct.colors.map((col) => (
                <button
                  key={col.name}
                  onClick={() => {
                    setSelectedColor(col);
                    setShow3DInspector(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.4rem 0.7rem",
                    borderRadius: "var(--radius-sm)",
                    background: selectedColor?.name === col.name ? "rgba(228, 213, 195, 0.15)" : "var(--bg-surface-elevated)",
                    border: `1px solid ${selectedColor?.name === col.name ? "var(--accent-champagne)" : "var(--border-subtle)"}`,
                    color: "var(--text-primary)",
                    fontSize: "0.75rem",
                    cursor: "pointer"
                  }}
                >
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: col.hex,
                      border: "1px solid rgba(255,255,255,0.3)"
                    }}
                  />
                  <span>{col.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Details Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <span className="section-eyebrow">
                {quickviewProduct.gender === "women" ? "Women" : quickviewProduct.gender === "men" ? "Men" : "Unisex"} • {quickviewProduct.category}
              </span>
              <h2 id="quickview-title" style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>
                {quickviewProduct.name}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ display: "flex", color: "#E6D5C3" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  {quickviewProduct.rating} ({quickviewProduct.reviewsCount} verified reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.8rem" }}>
              <span style={{ fontSize: "1.8rem", fontWeight: 600, color: "var(--text-primary)" }}>
                ${quickviewProduct.price}
              </span>
              {quickviewProduct.originalPrice && (
                <span style={{ fontSize: "1.1rem", textDecoration: "line-through", color: "var(--text-muted)" }}>
                  ${quickviewProduct.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {quickviewProduct.description}
            </p>

            {/* Fabric Specs */}
            <div
              style={{
                background: "var(--bg-surface-elevated)",
                padding: "1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-subtle)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.8rem",
                fontSize: "0.8rem"
              }}
            >
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>Composition</span>
                <strong style={{ color: "var(--text-primary)" }}>{quickviewProduct.fabricComposition}</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>Breathability</span>
                <strong style={{ color: "var(--accent-champagne)" }}>{quickviewProduct.breathability}</strong>
              </div>
            </div>

            {/* Size Selector + Size Guide Link */}
            <div>
              <div className="flex-between" style={{ marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Select Size: <strong style={{ color: "var(--accent-champagne)" }}>{selectedSize}</strong>
                </span>
                <button
                  onClick={openSizeGuide}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.8rem",
                    color: "var(--accent-rose)",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  <Ruler size={13} />
                  <span>Size & Fit Assistant</span>
                </button>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {quickviewProduct.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      minWidth: "48px",
                      padding: "0.6rem 0.9rem",
                      borderRadius: "var(--radius-sm)",
                      background: selectedSize === sz ? "var(--accent-champagne)" : "var(--bg-surface-elevated)",
                      color: selectedSize === sz ? "#0A0A0D" : "var(--text-primary)",
                      fontWeight: selectedSize === sz ? 600 : 400,
                      border: `1px solid ${selectedSize === sz ? "var(--accent-champagne)" : "var(--border-subtle)"}`,
                      cursor: "pointer",
                      transition: "all var(--transition-fast)"
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag */}
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "0.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "var(--bg-surface-elevated)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)"
                }}
              >
                <button
                  style={{ padding: "0.75rem 1rem", color: "var(--text-secondary)" }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span style={{ padding: "0 0.8rem", fontWeight: 600 }}>{quantity}</span>
                <button
                  style={{ padding: "0.75rem 1rem", color: "var(--text-secondary)" }}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="btn-primary"
                style={{ flex: 1, padding: "0.9rem" }}
                onClick={handleAddToCart}
              >
                Add to Bag • ${(quickviewProduct.price * quantity).toFixed(2)}
              </button>

              <button
                className="icon-btn"
                style={{ width: "48px", height: "48px" }}
                onClick={() => toggleWishlist(quickviewProduct)}
                aria-label="Wishlist"
              >
                <Heart size={20} fill={isFavorited ? "currentColor" : "none"} color={isFavorited ? "#FF5A79" : "currentColor"} />
              </button>
            </div>

            {/* Trust Badges */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "0.5rem",
                fontSize: "0.78rem",
                color: "var(--text-muted)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Truck size={14} style={{ color: "var(--accent-champagne)" }} />
                <span>Complimentary Express Shipping & Discrete Luxury Gift Packaging</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShieldCheck size={14} style={{ color: "var(--accent-champagne)" }} />
                <span>100-Day Perfect Fit Guarantee (Free exchanges with prepaid label)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

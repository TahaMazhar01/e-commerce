"use client";

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import dynamic from "next/dynamic";
import useDialog from "../hooks/useDialog";
import { X, Star, Heart, Check, Ruler, ShieldCheck, Truck, Rotate3D, Eye } from "lucide-react";

const FabricInspector3D = dynamic(() => import("./FabricInspector3D"), {
  ssr: false,
  loading: () => <div className="fabric-inspector-container flex-center" role="status">Loading fabric view...</div>
});

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
  const dialogRef = useDialog(Boolean(quickviewProduct), () => setQuickviewProduct(null));

  // Sync state if quickviewProduct changes
  React.useEffect(() => {
    if (quickviewProduct) {
      setSelectedColor(quickviewProduct.colors.find(color => color.name === quickviewProduct.initialColorName) || quickviewProduct.colors[0]);
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
        ref={dialogRef}
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

        <div className="quickview-grid">
          {/* Visual Column: Image or 3D Inspector */}
          <div>
            {/* View Mode Toggle: 2D Photo vs 3D Fabric Inspector */}
            <div className="quickview-view-switch" role="group" aria-label="Product view">
              <button
                className={`btn-secondary ${!show3DInspector ? "active" : ""}`}
                style={{
                  padding: "0.45rem 0.9rem",
                  fontSize: "0.75rem",
                  borderColor: !show3DInspector ? "var(--accent-amethyst)" : "var(--border-subtle)"
                }}
                onClick={() => setShow3DInspector(false)}
                aria-pressed={!show3DInspector}
              >
                <Eye size={14} />
                <span>Photo</span>
              </button>
              <button
                className={`btn-secondary ${show3DInspector ? "active" : ""}`}
                style={{
                  padding: "0.45rem 0.9rem",
                  fontSize: "0.75rem",
                  borderColor: show3DInspector ? "var(--accent-amethyst)" : "var(--border-subtle)"
                }}
                onClick={() => setShow3DInspector(true)}
                aria-pressed={show3DInspector}
              >
                <Rotate3D size={14} />
                <span>Fabric</span>
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
            <div className="quickview-colors">
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
                    background: selectedColor?.name === col.name ? "rgba(36, 75, 64, 0.12)" : "var(--bg-surface-elevated)",
                    border: `1px solid ${selectedColor?.name === col.name ? "var(--accent-amethyst)" : "var(--border-subtle)"}`,
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
                      border: "1px solid rgba(42, 34, 51, 0.25)"
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
                <div style={{ display: "flex", color: "var(--accent-blush-deep)" }}>
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
                <strong style={{ color: "var(--accent-amethyst)" }}>{quickviewProduct.breathability}</strong>
              </div>
            </div>

            {/* Size Selector + Size Guide Link */}
            <div>
              <div className="flex-between" style={{ marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0 }}>
                  Select Size: <strong style={{ color: "var(--accent-amethyst)" }}>{selectedSize}</strong>
                </span>
                <button
                  onClick={openSizeGuide}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.8rem",
                    color: "var(--accent-blush)",
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
                      background: selectedSize === sz ? "var(--accent-amethyst)" : "var(--bg-surface-elevated)",
                      color: selectedSize === sz ? "var(--text-inverse)" : "var(--text-primary)",
                      fontWeight: selectedSize === sz ? 600 : 400,
                      border: `1px solid ${selectedSize === sz ? "var(--accent-amethyst)" : "var(--border-subtle)"}`,
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
            <div className="quickview-purchase">
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
                <Heart size={20} fill={isFavorited ? "currentColor" : "none"} color={isFavorited ? "var(--state-error)" : "currentColor"} />
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
                <Truck size={14} style={{ color: "var(--accent-amethyst)" }} />
                <span>Complimentary Express Shipping & Discrete Luxury Gift Packaging</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShieldCheck size={14} style={{ color: "var(--accent-amethyst)" }} />
                <span>100-Day Perfect Fit Guarantee (Free exchanges with prepaid label)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

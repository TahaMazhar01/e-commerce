"use client";

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Heart, Star, Eye, ShoppingBag } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickviewProduct } = useShop();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (size) => {
    setSelectedSize(size);
    addToCart(product, selectedColor, size, 1);
  };

  return (
    <article className="product-card" aria-label={product.name}>
      {/* Image & Quick Overlays */}
      <div className="product-image-container">
        {/* Badges */}
        <div className="card-badges">
          {product.badge && (
            <span
              className={`badge-luxury ${
                product.fabricType === "silk" ? "badge-silk" : ""
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Always-visible card actions. These sit outside the hover overlay so
            touch devices and keyboard users can still reach quick view. */}
        <div className="card-actions">
          <button
            className="card-action-btn"
            onClick={() => setQuickviewProduct(product)}
            aria-label={`Quick view ${product.name}`}
            title="Quick view & 3D fabric"
          >
            <Eye size={16} />
          </button>
          <button
            className={`card-action-btn wishlist-heart-btn ${isFavorited ? "active" : ""}`}
            onClick={() => toggleWishlist(product)}
            aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            aria-pressed={isFavorited}
          >
            <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Product Image (updates with color swatch) */}
        <img
          src={selectedColor.image}
          alt={`${product.name} in ${selectedColor.name}`}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.dataset.fallback) return;
            e.currentTarget.dataset.fallback = "1";
            e.currentTarget.classList.add("product-image-missing");
            e.currentTarget.removeAttribute("src");
          }}
        />

        {/* Quick-Action Hover Overlay */}
        <div className="quick-action-overlay">
          <div style={{ textAlign: "center", marginBottom: "0.2rem" }}>
            <span style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)" }}>
              Instant Select Size:
            </span>
          </div>

          <div className="size-pill-group">
            {product.sizes.map((sz) => (
              <button
                key={sz}
                className={`size-pill ${selectedSize === sz ? "selected" : ""}`}
                onClick={() => handleQuickAdd(sz)}
                title={`Quick add size ${sz}`}
              >
                {sz}
              </button>
            ))}
          </div>

          <button
            className="card-quick-add"
            onClick={() => setQuickviewProduct(product)}
          >
            <Eye size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: "6px" }} />
            Quick View & 3D Fabric
          </button>
        </div>
      </div>

      {/* Info Body */}
      <div className="product-info">
        <div className="flex-between">
          <span className="product-category">
            {product.gender === "women" ? "Women" : product.gender === "men" ? "Men" : "Unisex"} • {product.category}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--accent-amethyst)" }}>
            <Star size={12} fill="currentColor" />
            <span>{product.rating}</span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        <h3 className="product-title">
          <button
            type="button"
            className="product-title-btn"
            onClick={() => setQuickviewProduct(product)}
          >
            {product.name}
          </button>
        </h3>

        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
          {product.subtitle}
        </p>

        {/* Color Swatch Dots */}
        <div className="swatch-row" aria-label="Available Colors">
          {product.colors.map((c) => (
            <button
              key={c.name}
              className={`color-swatch-dot ${selectedColor.name === c.name ? "active" : ""}`}
              style={{ backgroundColor: c.hex }}
              onClick={() => setSelectedColor(c)}
              title={c.name}
              aria-label={`Select color ${c.name}`}
            />
          ))}
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginLeft: "4px" }}>
            {selectedColor.name}
          </span>
        </div>

        {/* Price & Add */}
        <div className="product-pricing">
          <span className="current-price">${product.price}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice}</span>
          )}
          <button
            className="btn-ghost"
            style={{ marginLeft: "auto", padding: "0.3rem 0.6rem", fontSize: "0.8rem" }}
            onClick={() => addToCart(product, selectedColor, selectedSize, 1)}
          >
            <ShoppingBag size={15} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}

"use client";

import { useState } from "react";
import { Heart, Star, Plus, ImageOff } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist, setQuickviewProduct } = useShop();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [failedImage, setFailedImage] = useState(null);
  const isFavorited = isInWishlist(product.id);
  const openQuickview = () => setQuickviewProduct({ ...product, initialColorName: selectedColor.name });

  return (
    <article className="product-card" aria-label={product.name}>
      <div className="product-image-container">
        <button className="product-image-link" onClick={openQuickview} aria-label={`View ${product.name}`}>
          {failedImage === selectedColor.image ? <span className="product-image-fallback"><ImageOff size={26} /><span>Image unavailable</span></span> : <img src={selectedColor.image} alt={`${product.name} in ${selectedColor.name}`} className="product-image" loading="lazy" width="600" height="800" onError={() => setFailedImage(selectedColor.image)} />}
        </button>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className={`card-action-btn wishlist-heart-btn ${isFavorited ? "active" : ""}`} onClick={() => toggleWishlist(product)} aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} aria-pressed={isFavorited} title={isFavorited ? "Remove from saved items" : "Save item"}><Heart size={18} strokeWidth={1.5} fill={isFavorited ? "currentColor" : "none"} /></button>
        <button className="card-shop-button" onClick={openQuickview}><Plus size={16} /> Choose options</button>
      </div>
      <div className="product-info">
        <div className="product-meta"><span>{product.gender === "unisex" ? "For everyone" : product.gender === "women" ? "Women" : "Men"} / {product.fabricType === "silk" ? "Silk" : product.fabricType === "modal" ? "Everyday" : "Sculpt"}</span><span className="product-rating"><Star size={11} fill="currentColor" /> {product.rating.toFixed(1)}</span></div>
        <h3 className="product-title"><button className="product-title-btn" onClick={openQuickview}>{product.name}</button></h3>
        <div className="product-pricing"><span className="current-price">${product.price.toFixed(2)}</span>{product.originalPrice && <span className="original-price">${product.originalPrice.toFixed(2)}</span>}</div>
        <div className="swatch-row" aria-label="Available colors">{product.colors.map((color) => <button key={color.name} className={`color-swatch-dot ${selectedColor.name === color.name ? "active" : ""}`} style={{ "--swatch-color": color.hex }} onClick={() => setSelectedColor(color)} title={color.name} aria-label={`Select color ${color.name}`} aria-pressed={selectedColor.name === color.name} />)}<span className="swatch-label">{product.colors.length} {product.colors.length === 1 ? "color" : "colors"}</span></div>
      </div>
    </article>
  );
}

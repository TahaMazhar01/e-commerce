"use client";

import React, { useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { X, Heart, ShoppingBag, Eye, Trash2 } from "lucide-react";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    clearWishlist,
    addToCart,
    setQuickviewProduct,
    setActiveDepartment
  } = useShop();

  // The slide is a CSS transition on .cart-drawer / .cart-drawer.open. Animating
  // it with GSAP as well leaves the panel stranded mid-transform whenever the
  // rAF loop stalls, so the class is the only thing that moves it.
  const handleClose = () => setIsWishlistOpen(false);

  // Escape closes the drawer; the page behind it stays put while it is open.
  useEffect(() => {
    if (!isWishlistOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsWishlistOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isWishlistOpen, setIsWishlistOpen]);

  const handleMoveToBag = (product) => {
    // Saved items carry no colour or size, so the first of each is used — the
    // same default addToCart applies to the card's own Add button.
    addToCart(product, product.colors[0], product.sizes[0], 1);
    toggleWishlist(product);
    setIsWishlistOpen(false);
  };

  return (
    <>
      <div
        className={`cart-overlay ${isWishlistOpen ? "open" : ""}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <aside
        className={`cart-drawer ${isWishlistOpen ? "open" : ""}`}
        aria-label="Saved items"
        aria-hidden={!isWishlistOpen}
        inert={!isWishlistOpen}
      >
        <div className="cart-header">
          <div>
            <h3>Saved Items</h3>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: 0 }}>
              {wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"} saved
            </span>
          </div>
          <button
            className="modal-close-btn"
            style={{ position: "static" }}
            onClick={handleClose}
            aria-label="Close saved items"
          >
            <X size={16} />
          </button>
        </div>

        <div className="cart-items-scroll">
          {wishlist.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 1rem", color: "var(--text-secondary)" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "var(--bg-surface-elevated)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.2rem",
                  color: "var(--accent-blush-deep)"
                }}
              >
                <Heart size={24} />
              </div>
              <h4 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Nothing saved yet
              </h4>
              <p style={{ fontSize: "0.85rem", maxWidth: "270px", margin: "0 auto 1.5rem" }}>
                Tap the heart on any piece to keep it here while you decide.
              </p>
              <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center" }}>
                <button
                  className="btn-primary"
                  style={{ fontSize: "0.75rem", padding: "0.6rem 1rem" }}
                  onClick={() => {
                    handleClose();
                    setActiveDepartment("women");
                  }}
                >
                  Shop Women
                </button>
                <button
                  className="btn-secondary"
                  style={{ fontSize: "0.75rem", padding: "0.6rem 1rem" }}
                  onClick={() => {
                    handleClose();
                    setActiveDepartment("men");
                  }}
                >
                  Shop Men
                </button>
              </div>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="cart-item">
                <img
                  src={product.colors[0].image}
                  alt={product.name}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <div>
                    <div className="flex-between">
                      <h4 style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: 1.3 }}>
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product)}
                        style={{ color: "var(--text-muted)", cursor: "pointer", padding: "2px" }}
                        aria-label={`Remove ${product.name} from saved items`}
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="cart-item-meta" style={{ marginTop: "3px" }}>
                      {product.colors.length} {product.colors.length === 1 ? "colour" : "colours"} •{" "}
                      {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}
                    </div>
                  </div>

                  <div className="flex-between" style={{ marginTop: "0.6rem", gap: "0.5rem" }}>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button
                        className="btn-ghost"
                        style={{ padding: "0.3rem 0.55rem", fontSize: "0.78rem" }}
                        onClick={() => {
                          setIsWishlistOpen(false);
                          setQuickviewProduct(product);
                        }}
                      >
                        <Eye size={14} />
                        <span>View</span>
                      </button>
                      <button
                        className="btn-ghost"
                        style={{ padding: "0.3rem 0.55rem", fontSize: "0.78rem" }}
                        onClick={() => handleMoveToBag(product)}
                      >
                        <ShoppingBag size={14} />
                        <span>Move to bag</span>
                      </button>
                    </div>

                    <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.95rem" }}>
                      ${product.price}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="cart-footer">
            <button
              className="btn-primary"
              style={{ width: "100%", padding: "1rem" }}
              onClick={() => {
                [...wishlist].forEach((product) =>
                  addToCart(product, product.colors[0], product.sizes[0], 1)
                );
                clearWishlist();
                setIsWishlistOpen(false);
              }}
            >
              <ShoppingBag size={15} />
              <span>Move all {wishlist.length} to bag</span>
            </button>
            <button
              className="btn-ghost"
              style={{ width: "100%", justifyContent: "center", marginTop: "0.6rem", fontSize: "0.8rem" }}
              onClick={clearWishlist}
            >
              Clear saved items
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

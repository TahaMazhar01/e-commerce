"use client";

import React, { useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeCartItem,
    cartSubtotal,
    cartTotal,
    discountAmount,
    discountPercent,
    shippingCost,
    freeShippingThreshold,
    promoCode,
    setPromoCode,
    promoMessage,
    applyPromoCode,
    setIsCheckoutOpen,
    setActiveDepartment
  } = useShop();

  // The slide is a CSS transition on .cart-drawer / .cart-drawer.open. Animating
  // it with GSAP as well leaves the panel stranded mid-transform whenever the
  // rAF loop stalls, so the class is the only thing that moves it.
  const handleClose = () => setIsCartOpen(false);

  // Escape closes the drawer; the page behind it stays put while it is open.
  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isCartOpen, setIsCartOpen]);

  const handleCheckoutClick = () => {
    handleClose();
    setIsCheckoutOpen(true);
  };

  const shippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-overlay ${isCartOpen ? "open" : ""}`}
        onClick={handleClose}
        aria-hidden={!isCartOpen}
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer ${isCartOpen ? "open" : ""}`}
        aria-label="Shopping Bag"
        aria-hidden={!isCartOpen}
        inert={!isCartOpen}
      >
        {/* Header */}
        <div className="cart-header">
          <div>
            <h3>Shopping Bag</h3>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
              {cart.reduce((a, b) => a + b.quantity, 0)} Luxury Items
            </span>
          </div>
          <button
            className="modal-close-btn"
            style={{ position: "static" }}
            onClick={handleClose}
            aria-label="Close Shopping Bag"
          >
            <X size={16} />
          </button>
        </div>

        {/* Free Shipping Progress Tracker */}
        <div className="free-shipping-tracker">
          <div className="shipping-progress-text">
            <span>
              {shippingRemaining === 0 ? (
                <strong style={{ color: "var(--accent-amethyst)" }}>
                  🎉 Complimentary Express Shipping Unlocked!
                </strong>
              ) : (
                <span>
                  Add <strong style={{ color: "var(--text-primary)" }}>${shippingRemaining.toFixed(2)}</strong> more for Free Worldwide Express
                </span>
              )}
            </span>
            <span style={{ fontWeight: 600 }}>{Math.round(shippingPercent)}%</span>
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${shippingPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="cart-items-scroll">
          {cart.length === 0 ? (
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
                  color: "var(--accent-amethyst)"
                }}
              >
                <ShoppingBag size={24} />
              </div>
              <h4 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Your Bag is Empty
              </h4>
              <p style={{ fontSize: "0.85rem", maxWidth: "260px", margin: "0 auto 1.5rem" }}>
                Indulge in breathable mulberry silk and micro-modal intimates.
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
            cart.map((item) => (
              <div key={item.key} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <div>
                    <div className="flex-between">
                      <h4 style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: 1.3 }}>
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeCartItem(item.key)}
                        style={{ color: "var(--text-muted)", cursor: "pointer", padding: "2px" }}
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="cart-item-meta" style={{ marginTop: "3px" }}>
                      Color: {item.color} • Size: {item.size}
                    </div>
                  </div>

                  <div className="flex-between" style={{ marginTop: "0.6rem" }}>
                    {/* Qty Steppers */}
                    <div className="cart-qty-control">
                      <button
                        className="qty-btn"
                        onClick={() => updateCartQuantity(item.key, -1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateCartQuantity(item.key, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.95rem" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="cart-footer">
            {/* Promo Code Box */}
            <div className="promo-input-box">
              <input
                type="text"
                placeholder="Promo Code (try LUXE15)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-input"
              />
              <button
                className="promo-btn"
                onClick={() => applyPromoCode(promoCode)}
              >
                Apply
              </button>
            </div>

            {promoMessage.text && (
              <div
                style={{
                  fontSize: "0.75rem",
                  marginBottom: "0.8rem",
                  color: promoMessage.isError ? "var(--state-error)" : "var(--state-success)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                <Tag size={12} />
                <span>{promoMessage.text}</span>
              </div>
            )}

            {/* Calculations */}
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>

            {discountPercent > 0 && (
              <div className="summary-row" style={{ color: "var(--accent-blush)" }}>
                <span>Private Client Discount ({discountPercent}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-row">
              <span>Express Delivery</span>
              <span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
            </div>

            <div className="summary-row summary-total">
              <span>Estimated Total</span>
              <span style={{ color: "var(--accent-amethyst)" }}>${cartTotal.toFixed(2)}</span>
            </div>

            <button
              className="btn-primary"
              style={{ width: "100%", marginTop: "1rem", padding: "1rem" }}
              onClick={handleCheckoutClick}
            >
              <span>Proceed to Luxury Checkout</span>
              <ArrowRight size={15} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                marginTop: "0.8rem",
                fontSize: "0.72rem",
                color: "var(--text-muted)"
              }}
            >
              <ShieldCheck size={13} style={{ color: "var(--accent-amethyst)" }} />
              <span>256-bit Encrypted Discreet Checkout</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

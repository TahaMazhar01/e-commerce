"use client";

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import confetti from "canvas-confetti";
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, Truck, ArrowRight, Package } from "lucide-react";

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotal, discountAmount, shippingCost, clearCart } = useShop();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    paymentMethod: "card",
    cardNumber: "",
    cardExp: "",
    cardCvc: ""
  });

  const [orderNumber, setOrderNumber] = useState("");

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Complete Order Simulation
      const generatedOrder = `AUR-${Math.floor(100000 + Math.random() * 900000)}-LUX`;
      setOrderNumber(generatedOrder);
      setStep(3);

      // Trigger Luxury Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#9c89b8", "#f0a6ca", "#efc3e6", "#b8bedd"]
        });
      } catch (err) {
        console.warn("Confetti error", err);
      }

      clearCart();
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "680px" }}
      >
        <button
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close Checkout"
        >
          <X size={16} />
        </button>

        {step < 3 ? (
          <div>
            {/* Steps Progress Header */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span className="section-eyebrow">
                Discreet Luxury Checkout • 256-Bit Encrypted
              </span>
              <h2 id="checkout-modal-title" style={{ fontSize: "1.8rem" }}>
                {step === 1 ? "Shipping & Delivery Address" : "Payment Authorization"}
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2rem",
                  marginTop: "1.2rem",
                  fontSize: "0.8rem"
                }}
              >
                <span
                  style={{
                    color: step >= 1 ? "var(--accent-amethyst)" : "var(--text-muted)",
                    fontWeight: step === 1 ? 700 : 400
                  }}
                >
                  1. Shipping
                </span>
                <span style={{ color: "var(--border-active)" }}>→</span>
                <span
                  style={{
                    color: step >= 2 ? "var(--accent-amethyst)" : "var(--text-muted)",
                    fontWeight: step === 2 ? 700 : 400
                  }}
                >
                  2. Payment
                </span>
                <span style={{ color: "var(--border-active)" }}>→</span>
                <span style={{ color: "var(--text-muted)" }}>3. Confirmation</span>
              </div>
            </div>

            <form onSubmit={handleNextStep}>
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        autoComplete="given-name"
                        placeholder="Jane"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="promo-input"
                        style={{ width: "100%", textTransform: "none" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        autoComplete="family-name"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="promo-input"
                        style={{ width: "100%", textTransform: "none" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                      Email Address (For Discreet Tracking)
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="promo-input"
                      style={{ width: "100%", textTransform: "none" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                      Street Address & Apartment / Suite
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      autoComplete="street-address"
                      placeholder="12 Rosewood Lane, Apt 4"
                      value={formData.address}
                      onChange={handleChange}
                      className="promo-input"
                      style={{ width: "100%", textTransform: "none" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        autoComplete="address-level2"
                        placeholder="London"
                        value={formData.city}
                        onChange={handleChange}
                        className="promo-input"
                        style={{ width: "100%", textTransform: "none" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        autoComplete="address-level1"
                        maxLength={12}
                        placeholder="NY"
                        value={formData.state}
                        onChange={handleChange}
                        className="promo-input"
                        style={{ width: "100%", textTransform: "uppercase" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="zip"
                        required
                        autoComplete="postal-code"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="10021"
                        value={formData.zip}
                        onChange={handleChange}
                        className="promo-input"
                        style={{ width: "100%", textTransform: "none" }}
                      />
                    </div>
                  </div>

                  {/* Packaging Option */}
                  <div
                    style={{
                      background: "var(--bg-surface-elevated)",
                      padding: "1rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-subtle)",
                      marginTop: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem"
                    }}
                  >
                    <Package size={20} style={{ color: "var(--accent-amethyst)" }} />
                    <div style={{ fontSize: "0.8rem" }}>
                      <strong>Complimentary Unbranded Discreet Packaging</strong>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                        Orders arrive in an unmarked matte noir magnetic box with zero brand markings outside.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ marginTop: "1rem", padding: "1rem" }}
                  >
                    <span>Continue to Payment Authorization</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  {/* Order Total Overview */}
                  <div
                    style={{
                      padding: "1rem 1.4rem",
                      background: "rgba(156, 137, 184, 0.14)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-active)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--accent-blush)" }}>
                        Total Authorized Amount:
                      </span>
                      <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        ${cartTotal.toFixed(2)}
                      </div>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textAlign: "right" }}>
                      <div>Delivering to: {formData.city}, {formData.state}</div>
                      <div style={{ color: "var(--accent-amethyst)" }}>Express Shipping (2-3 Business Days)</div>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>
                      Select Secure Payment Method
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
                      {["card", "applepay", "paypal"].map((m) => (
                        <button
                          type="button"
                          key={m}
                          onClick={() => setFormData({ ...formData, paymentMethod: m })}
                          style={{
                            padding: "0.8rem",
                            borderRadius: "var(--radius-sm)",
                            background: formData.paymentMethod === m ? "rgba(156, 137, 184, 0.22)" : "var(--bg-surface-elevated)",
                            border: `1px solid ${formData.paymentMethod === m ? "var(--accent-amethyst)" : "var(--border-subtle)"}`,
                            color: formData.paymentMethod === m ? "var(--accent-amethyst)" : "var(--text-primary)",
                            fontWeight: 600,
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            textTransform: "capitalize"
                          }}
                        >
                          {m === "card" ? "Credit Card" : m === "applepay" ? "Apple Pay" : "PayPal"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.paymentMethod === "card" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                      <div>
                        <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          required
                          autoComplete="cc-number"
                          inputMode="numeric"
                          maxLength={19}
                          pattern="[0-9 ]{12,19}"
                          placeholder="4242 4242 4242 4242"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="promo-input"
                          style={{ width: "100%", textTransform: "none" }}
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div>
                          <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            name="cardExp"
                            required
                            autoComplete="cc-exp"
                            inputMode="numeric"
                            maxLength={5}
                            pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                            placeholder="MM/YY"
                            value={formData.cardExp}
                            onChange={handleChange}
                            className="promo-input"
                            style={{ width: "100%", textTransform: "none" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                            CVC / Security Code
                          </label>
                          <input
                            type="text"
                            name="cardCvc"
                            required
                            autoComplete="cc-csc"
                            inputMode="numeric"
                            maxLength={4}
                            pattern="[0-9]{3,4}"
                            placeholder="123"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            className="promo-input"
                            style={{ width: "100%", textTransform: "none" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ padding: "0.9rem 1.4rem" }}
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ flex: 1, padding: "0.9rem" }}
                    >
                      <Lock size={14} />
                      <span>Authorize & Place Order • ${cartTotal.toFixed(2)}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          /* Step 3: Success & Confirmation */
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "var(--state-success-bg)",
                border: "1px solid var(--state-success)",
                color: "var(--state-success)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem"
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <span className="section-eyebrow" style={{ color: "var(--state-success)" }}>
              Order Confirmed • Thank You
            </span>
            <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              Your Aura Pieces Are Being Prepared
            </h2>

            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
              A confirmation email with real-time white-glove tracking has been sent to{" "}
              <strong style={{ color: "var(--text-primary)" }}>{formData.email}</strong>.
            </p>

            <div
              style={{
                background: "var(--bg-surface-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "1.5rem",
                maxWidth: "460px",
                margin: "0 auto 2rem",
                textAlign: "left"
              }}
            >
              <div className="flex-between" style={{ marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Order Reference</span>
                <strong style={{ color: "var(--accent-amethyst)", fontFamily: "monospace" }}>{orderNumber}</strong>
              </div>
              <div className="flex-between" style={{ marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Estimated Arrival</span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>Within 2 - 3 Business Days</span>
              </div>
              <div className="flex-between">
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Packaging</span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>Discreet Magnetic Noir Box</span>
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ padding: "0.9rem 2.2rem" }}
              onClick={handleClose}
            >
              Continue Exploring Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

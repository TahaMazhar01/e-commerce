"use client";

import React from "react";
import { useShop } from "../context/ShopContext";
import { CheckCircle2 } from "lucide-react";

export default function ToastNotification() {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 300,
        background: "rgba(255, 255, 255, 0.96)",
        border: "1px solid var(--accent-amethyst)",
        boxShadow: "0 10px 30px rgba(74, 59, 99, 0.18)",
        padding: "0.85rem 1.4rem",
        borderRadius: "var(--radius-sm)",
        color: "var(--text-primary)",
        fontSize: "0.85rem",
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        animation: "toastSlideUp 0.3s ease",
        backdropFilter: "blur(12px)"
      }}
    >
      <CheckCircle2 size={16} style={{ color: "var(--accent-amethyst)" }} />
      <span>{toast}</span>
    </div>
  );
}

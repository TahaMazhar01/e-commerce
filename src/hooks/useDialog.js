"use client";

import { useEffect, useRef } from "react";

let openDialogs = 0;
let previousOverflow = "";

export default function useDialog(isOpen, onClose) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    if (openDialogs++ === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    const focusable = () => [...dialog.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), [tabindex="0"]')].filter(element => element.getClientRects().length);
    focusable()[0]?.focus({ preventScroll: true });
    const onKeyDown = (event) => {
      // Only the top dialog handles keys when a size guide opens over a product.
      const overlays = document.querySelectorAll(".modal-overlay");
      if (!overlays[overlays.length - 1]?.contains(dialog)) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
      }
      if (event.key !== "Tab") return;
      const controls = focusable();
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (--openDialogs === 0) document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return dialogRef;
}

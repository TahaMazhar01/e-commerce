"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS } from "../data/products";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState({ text: "", isError: false });

  // Wishlist State
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Modals
  const [quickviewProduct, setQuickviewProduct] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeGuideGender, setSizeGuideGender] = useState("women");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Filters & Navigation
  const [activeDepartment, setActiveDepartment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Initialize from LocalStorage (client-side only)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("aura_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("aura_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.warn("Could not read from localStorage", e);
    }
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem("aura_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not save cart to localStorage", e);
    }
  }, [cart]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem("aura_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Could not save wishlist to localStorage", e);
    }
  }, [wishlist]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Cart Operations
  const addToCart = (product, selectedColor, selectedSize, quantity = 1) => {
    const color = selectedColor || product.colors[0];
    const size = selectedSize || product.sizes[0];
    const itemKey = `${product.id}-${color.name}-${size}`;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.key === itemKey);
      if (existingItem) {
        return prevCart.map((item) =>
          item.key === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            key: itemKey,
            id: product.id,
            name: product.name,
            price: product.price,
            image: color.image,
            color: color.name,
            size: size,
            quantity: quantity
          }
        ];
      }
    });

    showToast(`Added ${product.name} (${size}) to Bag`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (key, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.key === key) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeCartItem = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Operations
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to Wishlist`);
        return [...prev, product];
      }
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Promo Code Validation
  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === "LUXE15") {
      setDiscountPercent(15);
      setPromoMessage({ text: "15% Private Client discount applied!", isError: false });
    } else if (clean === "AURA20") {
      setDiscountPercent(20);
      setPromoMessage({ text: "20% VIP Member discount applied!", isError: false });
    } else {
      setDiscountPercent(0);
      setPromoMessage({ text: "Invalid or expired promo code.", isError: true });
    }
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const freeShippingThreshold = 75;
  const shippingCost = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 15;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filtered Products
  const filteredProducts = PRODUCTS.filter((p) => {
    // Department / Category filter
    if (activeDepartment === "women" && p.gender !== "women") return false;
    if (activeDepartment === "men" && p.gender !== "men") return false;
    if (activeDepartment === "shapewear" && p.category !== "shapewear") return false;
    if (activeDepartment === "loungewear" && p.category !== "loungewear") return false;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSub = p.subtitle.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchName && !matchSub && !matchCat) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return Number(b.isFeatured) - Number(a.isFeatured);
  });

  return (
    <ShopContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeCartItem,
        clearCart,
        cartSubtotal,
        cartTotal,
        cartCount,
        freeShippingThreshold,
        shippingCost,
        promoCode,
        setPromoCode,
        discountPercent,
        discountAmount,
        promoMessage,
        applyPromoCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        clearWishlist,
        quickviewProduct,
        setQuickviewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        sizeGuideGender,
        setSizeGuideGender,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeDepartment,
        setActiveDepartment,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        filteredProducts,
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}

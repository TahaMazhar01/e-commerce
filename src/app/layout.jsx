import "./globals.css";
import { ShopProvider } from "../context/ShopContext";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
import ProductQuickviewModal from "../components/ProductQuickviewModal";
import SizeGuideModal from "../components/SizeGuideModal";
import CheckoutModal from "../components/CheckoutModal";
import Footer from "../components/Footer";
import ToastNotification from "../components/ToastNotification";

export const metadata = {
  title: "AURA INTIMATES | Architectural Next-to-Skin Luxury for Men & Women",
  description:
    "Discover pure luxury undergarments, seamless sculpting shapewear, and breathable micro-modal essentials for men and women. Engineered with Three.js 3D fabric technology.",
  keywords: [
    "luxury underwear",
    "mulberry silk bralette",
    "men's modal boxers",
    "seamless shapewear",
    "intimate apparel",
    "Aura Intimates"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ShopProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />

          {/* Interactive Modals & Drawers */}
          <CartDrawer />
          <ProductQuickviewModal />
          <SizeGuideModal />
          <CheckoutModal />
          <ToastNotification />
        </ShopProvider>
      </body>
    </html>
  );
}

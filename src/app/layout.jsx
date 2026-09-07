import "./globals.css";
import { ShopProvider } from "../context/ShopContext";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
import WishlistDrawer from "../components/WishlistDrawer";
import ProductQuickviewModal from "../components/ProductQuickviewModal";
import SizeGuideModal from "../components/SizeGuideModal";
import CheckoutModal from "../components/CheckoutModal";
import Footer from "../components/Footer";
import ToastNotification from "../components/ToastNotification";

export const metadata = {
  title: "AURA Intimates | Everyday Intimates & Silk Loungewear",
  description:
    "Discover a softer kind of everyday with AURA. Shop silk intimates, breathable modal essentials, shapewear, and loungewear for women and men.",
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
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Manrope:wght@400;500;600;700&display=swap"
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
          <WishlistDrawer />
          <ProductQuickviewModal />
          <SizeGuideModal />
          <CheckoutModal />
          <ToastNotification />
        </ShopProvider>
      </body>
    </html>
  );
}

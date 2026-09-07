"use client";

import { useShop } from "../context/ShopContext";
import { ArrowRight, LockKeyhole } from "lucide-react";

export default function Footer() {
  const { setActiveDepartment, setSearchQuery, setIsSizeGuideOpen, setSizeGuideGender } = useShop();
  const handleNav = (department) => {
    setActiveDepartment(department);
    setSearchQuery("");
    document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
  };
  const openSizeGuide = (gender) => {
    setSizeGuideGender(gender);
    setIsSizeGuideOpen(true);
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <a className="nav-brand footer-brand" href="#" aria-label="Aura Intimates home"><span className="brand-title">AURA</span><span className="brand-subtitle">INTIMATES</span></a>
            <p>Considered essentials. Exceptional comfort.<br />A little more ease in your everyday.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleNav("women")}>Women&apos;s intimates</button></li>
              <li><button onClick={() => handleNav("men")}>Men&apos;s essentials</button></li>
              <li><button onClick={() => handleNav("shapewear")}>Shapewear</button></li>
              <li><button onClick={() => handleNav("loungewear")}>Silk &amp; loungewear</button></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Find your fit</h4>
            <ul className="footer-links">
              <li><button onClick={() => openSizeGuide("women")}>Women&apos;s size guide</button></li>
              <li><button onClick={() => openSizeGuide("men")}>Men&apos;s size guide</button></li>
              <li><button onClick={() => handleNav("all")}>Shop all essentials</button></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>A little welcome gift</h4>
            <span className="footer-offer">Your first order, 15% off.</span>
            <p>Make room for your new favorites.<br />Use <strong>LUXE15</strong> at checkout.</p>
            <button className="btn-ghost" onClick={() => handleNav("all")}>Find your essentials <ArrowRight size={15} /></button>
          </div>
        </div>
        <div className="footer-bottom"><span>&copy; {new Date().getFullYear()} AURA Intimates. All rights reserved.</span><span>Designed for everyday comfort.</span><span><LockKeyhole size={12} /> Discreet delivery</span></div>
      </div>
    </footer>
  );
}

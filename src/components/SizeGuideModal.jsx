"use client";

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { X, Ruler, CheckCircle2, Sparkles, HelpCircle } from "lucide-react";

export default function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen, sizeGuideGender, setSizeGuideGender } = useShop();

  const [activeTab, setActiveTab] = useState(sizeGuideGender || "women");
  
  // Women's calculator state
  const [bandMeasurement, setBandMeasurement] = useState(34);
  const [cupMeasurement, setCupMeasurement] = useState("B");

  // Men's calculator state
  const [menWaist, setMenWaist] = useState(32);
  const [fitPreference, setFitPreference] = useState("support"); // 'support' or 'relaxed'

  // The modal lives in the root layout and never unmounts, so activeTab cannot be
  // seeded from useState alone - it would freeze on whatever gender was set at first
  // mount. Re-sync every time the guide is opened. Unisex pieces fall back to women's.
  React.useEffect(() => {
    if (isSizeGuideOpen) {
      setActiveTab(sizeGuideGender === "men" ? "men" : "women");
    }
  }, [isSizeGuideOpen, sizeGuideGender]);

  if (!isSizeGuideOpen) return null;

  // Women's size recommendation logic
  const getWomenRecommendation = () => {
    const band = Number(bandMeasurement);
    if (band <= 32) {
      if (cupMeasurement === "A" || cupMeasurement === "B") return "XS";
      return "S";
    } else if (band <= 34) {
      if (cupMeasurement === "A" || cupMeasurement === "B") return "S";
      return "M";
    } else if (band <= 36) {
      if (cupMeasurement === "A" || cupMeasurement === "B") return "M";
      return "L";
    } else {
      if (cupMeasurement === "A" || cupMeasurement === "B") return "L";
      return "XL";
    }
  };

  // Men's size recommendation logic
  const getMenRecommendation = () => {
    const waist = Number(menWaist);
    if (waist < 30) return "S (28 - 30 in / 71 - 76 cm)";
    if (waist <= 32) return fitPreference === "support" ? "S/M" : "M (31 - 33 in / 78 - 84 cm)";
    if (waist <= 35) return "L (34 - 36 in / 86 - 91 cm)";
    if (waist <= 38) return "XL (37 - 39 in / 94 - 99 cm)";
    return "XXL (40 - 43 in / 101 - 109 cm)";
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => setIsSizeGuideOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "800px" }}
      >
        <button
          className="modal-close-btn"
          onClick={() => setIsSizeGuideOpen(false)}
          aria-label="Close Modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-amethyst)", marginBottom: "0.5rem" }}>
            <Ruler size={18} />
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Intelligent Fit Assistant
            </span>
          </div>
          <h2 id="size-guide-title" style={{ fontSize: "2rem" }}>
            Find Your Architectural Fit
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", maxWidth: "520px", margin: "0.5rem auto 0" }}>
            Because second-skin comfort demands precision. Use our interactive fit calculator
            or explore international sizing charts.
          </p>
        </div>

        {/* Gender Tabs */}
        <div className="flex-center" style={{ gap: "1rem", marginBottom: "2rem" }}>
          <button
            className={`dept-btn ${activeTab === "women" ? "active" : ""}`}
            onClick={() => setActiveTab("women")}
            style={{ padding: "0.6rem 1.8rem" }}
          >
            Women&apos;s Sizing
          </button>
          <button
            className={`dept-btn ${activeTab === "men" ? "active" : ""}`}
            onClick={() => setActiveTab("men")}
            style={{ padding: "0.6rem 1.8rem" }}
          >
            Men&apos;s Sizing
          </button>
        </div>

        {/* Women's Calculator */}
        {activeTab === "women" && (
          <div>
            <div
              style={{
                background: "var(--bg-surface-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "1.8rem",
                marginBottom: "2rem"
              }}
            >
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Sparkles size={16} style={{ color: "var(--accent-amethyst)" }} />
                Interactive Bralette & Bodysuit Calculator
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                    Band Measurement (Inches): <strong>{bandMeasurement}&quot;</strong>
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="42"
                    step="2"
                    value={bandMeasurement}
                    onChange={(e) => setBandMeasurement(e.target.value)}
                    style={{ width: "100%", accentColor: "var(--accent-amethyst)" }}
                  />
                  <div className="flex-between" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                    <span>30&quot;</span>
                    <span>34&quot;</span>
                    <span>38&quot;</span>
                    <span>42&quot;</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                    Standard Cup Size
                  </label>
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    {["A", "B", "C", "D", "DD"].map((cup) => (
                      <button
                        key={cup}
                        onClick={() => setCupMeasurement(cup)}
                        style={{
                          flex: 1,
                          padding: "0.5rem",
                          borderRadius: "var(--radius-sm)",
                          background: cupMeasurement === cup ? "var(--accent-amethyst)" : "var(--bg-surface)",
                          color: cupMeasurement === cup ? "var(--text-inverse)" : "var(--text-primary)",
                          fontWeight: cupMeasurement === cup ? 700 : 400,
                          border: "1px solid var(--border-subtle)",
                          cursor: "pointer"
                        }}
                      >
                        {cup}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendation Card */}
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1rem 1.4rem",
                  background: "rgba(156, 137, 184, 0.14)",
                  border: "1px solid var(--border-active)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent-blush)" }}>
                    Your Recommended Aura Size:
                  </span>
                  <div style={{ fontSize: "1.4rem", fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}>
                    Size <strong>{getWomenRecommendation()}</strong> (for {bandMeasurement}{cupMeasurement})
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--state-success)", fontSize: "0.85rem" }}>
                  <CheckCircle2 size={16} />
                  <span>Verified 98% Fit Accuracy</span>
                </div>
              </div>
            </div>

            {/* Reference Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)", color: "var(--accent-amethyst)" }}>
                  <th style={{ padding: "0.8rem" }}>AURA Size</th>
                  <th style={{ padding: "0.8rem" }}>US / CA</th>
                  <th style={{ padding: "0.8rem" }}>Bust (in)</th>
                  <th style={{ padding: "0.8rem" }}>Waist (in)</th>
                  <th style={{ padding: "0.8rem" }}>Hips (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(42, 34, 51, 0.06)" }}>
                  <td style={{ padding: "0.8rem", fontWeight: 600 }}>XS</td>
                  <td style={{ padding: "0.8rem" }}>0 - 2</td>
                  <td style={{ padding: "0.8rem" }}>31 - 33</td>
                  <td style={{ padding: "0.8rem" }}>24 - 26</td>
                  <td style={{ padding: "0.8rem" }}>34 - 36</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(42, 34, 51, 0.06)" }}>
                  <td style={{ padding: "0.8rem", fontWeight: 600 }}>S</td>
                  <td style={{ padding: "0.8rem" }}>4 - 6</td>
                  <td style={{ padding: "0.8rem" }}>33 - 35</td>
                  <td style={{ padding: "0.8rem" }}>26 - 28</td>
                  <td style={{ padding: "0.8rem" }}>36 - 38</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(42, 34, 51, 0.06)" }}>
                  <td style={{ padding: "0.8rem", fontWeight: 600 }}>M</td>
                  <td style={{ padding: "0.8rem" }}>8 - 10</td>
                  <td style={{ padding: "0.8rem" }}>35 - 37</td>
                  <td style={{ padding: "0.8rem" }}>28 - 30</td>
                  <td style={{ padding: "0.8rem" }}>38 - 40</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(42, 34, 51, 0.06)" }}>
                  <td style={{ padding: "0.8rem", fontWeight: 600 }}>L</td>
                  <td style={{ padding: "0.8rem" }}>12 - 14</td>
                  <td style={{ padding: "0.8rem" }}>37 - 40</td>
                  <td style={{ padding: "0.8rem" }}>30 - 33</td>
                  <td style={{ padding: "0.8rem" }}>40 - 43</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.8rem", fontWeight: 600 }}>XL</td>
                  <td style={{ padding: "0.8rem" }}>16</td>
                  <td style={{ padding: "0.8rem" }}>40 - 43</td>
                  <td style={{ padding: "0.8rem" }}>33 - 36</td>
                  <td style={{ padding: "0.8rem" }}>43 - 46</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Men's Calculator */}
        {activeTab === "men" && (
          <div>
            <div
              style={{
                background: "var(--bg-surface-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "1.8rem",
                marginBottom: "2rem"
              }}
            >
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Sparkles size={16} style={{ color: "var(--accent-amethyst)" }} />
                Interactive Boxer Brief & Trunk Calculator
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                    Waist Measurement: <strong>{menWaist}&quot; ({Math.round(menWaist * 2.54)} cm)</strong>
                  </label>
                  <input
                    type="range"
                    min="28"
                    max="44"
                    step="1"
                    value={menWaist}
                    onChange={(e) => setMenWaist(e.target.value)}
                    style={{ width: "100%", accentColor: "var(--accent-amethyst)" }}
                  />
                  <div className="flex-between" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                    <span>28&quot; (S)</span>
                    <span>32&quot; (M)</span>
                    <span>36&quot; (L)</span>
                    <span>40&quot;+ (XXL)</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                    Fit Silhouette Preference
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => setFitPreference("support")}
                      style={{
                        flex: 1,
                        padding: "0.6rem",
                        borderRadius: "var(--radius-sm)",
                        background: fitPreference === "support" ? "var(--accent-amethyst)" : "var(--bg-surface)",
                        color: fitPreference === "support" ? "var(--text-inverse)" : "var(--text-primary)",
                        fontWeight: fitPreference === "support" ? 600 : 400,
                        border: "1px solid var(--border-subtle)",
                        cursor: "pointer",
                        fontSize: "0.8rem"
                      }}
                    >
                      Snug Support
                    </button>
                    <button
                      onClick={() => setFitPreference("relaxed")}
                      style={{
                        flex: 1,
                        padding: "0.6rem",
                        borderRadius: "var(--radius-sm)",
                        background: fitPreference === "relaxed" ? "var(--accent-amethyst)" : "var(--bg-surface)",
                        color: fitPreference === "relaxed" ? "var(--text-inverse)" : "var(--text-primary)",
                        fontWeight: fitPreference === "relaxed" ? 600 : 400,
                        border: "1px solid var(--border-subtle)",
                        cursor: "pointer",
                        fontSize: "0.8rem"
                      }}
                    >
                      Relaxed Drape
                    </button>
                  </div>
                </div>
              </div>

              {/* Recommendation Card */}
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1rem 1.4rem",
                  background: "rgba(156, 137, 184, 0.14)",
                  border: "1px solid var(--border-active)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent-blush)" }}>
                    Your Tailored Recommendation:
                  </span>
                  <div style={{ fontSize: "1.4rem", fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}>
                    {getMenRecommendation()}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--state-success)", fontSize: "0.85rem" }}>
                  <CheckCircle2 size={16} />
                  <span>Zero-Roll Band Certified</span>
                </div>
              </div>
            </div>

            {/* Reference Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)", color: "var(--accent-amethyst)" }}>
                  <th style={{ padding: "0.8rem" }}>AURA Size</th>
                  <th style={{ padding: "0.8rem" }}>Waist (Inches)</th>
                  <th style={{ padding: "0.8rem" }}>Waist (cm)</th>
                  <th style={{ padding: "0.8rem" }}>Typical Pant Size</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(42, 34, 51, 0.06)" }}>
                  <td style={{ padding: "0.8rem", fontWeight: 600 }}>S</td>
                  <td style={{ padding: "0.8rem" }}>28 - 30&quot;</td>
                  <td style={{ padding: "0.8rem" }}>71 - 76 cm</td>
                  <td style={{ padding: "0.8rem" }}>28 - 30</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(42, 34, 51, 0.06)" }}>
                  <td style={{ padding: "0.8rem", fontWeight: 600 }}>M</td>
                  <td style={{ padding: "0.8rem" }}>31 - 33&quot;</td>
                  <td style={{ padding: "0.8rem" }}>78 - 84 cm</td>
                  <td style={{ padding: "0.8rem" }}>31 - 33</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(42, 34, 51, 0.06)" }}>
                  <td style={{ padding: "0.8rem", fontWeight: 600 }}>L</td>
                  <td style={{ padding: "0.8rem" }}>34 - 36&quot;</td>
                  <td style={{ padding: "0.8rem" }}>86 - 91 cm</td>
                  <td style={{ padding: "0.8rem" }}>34 - 36</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(42, 34, 51, 0.06)" }}>
                  <td style={{ padding: "0.8rem", fontWeight: 600 }}>XL</td>
                  <td style={{ padding: "0.8rem" }}>37 - 39&quot;</td>
                  <td style={{ padding: "0.8rem" }}>94 - 99 cm</td>
                  <td style={{ padding: "0.8rem" }}>37 - 39</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.8rem", fontWeight: 600 }}>XXL</td>
                  <td style={{ padding: "0.8rem" }}>40 - 43&quot;</td>
                  <td style={{ padding: "0.8rem" }}>101 - 109 cm</td>
                  <td style={{ padding: "0.8rem" }}>40 - 43</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

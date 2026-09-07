"use client";

import { useShop } from "../context/ShopContext";
import { SlidersHorizontal } from "lucide-react";

export default function DepartmentTabs() {
  const { activeDepartment, setActiveDepartment, sortBy, setSortBy, filteredProducts } = useShop();
  const tabs = [{ id: "all", label: "All essentials" }, { id: "women", label: "Women" }, { id: "men", label: "Men" }, { id: "shapewear", label: "Shapewear" }, { id: "loungewear", label: "Loungewear" }];
  return (
    <div className="catalog-controls">
      <div className="department-filters" role="group" aria-label="Filter by collection">
        {tabs.map((tab) => <button key={tab.id} aria-pressed={activeDepartment === tab.id} className={`dept-btn ${activeDepartment === tab.id ? "active" : ""}`} onClick={() => setActiveDepartment(tab.id)}>{tab.label}</button>)}
      </div>
      <div className="catalog-subfilters">
        <span className="catalog-count" aria-live="polite">{filteredProducts.length} pieces</span>
        <label className="sort-control"><SlidersHorizontal size={15} /><select className="custom-select" value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort collection"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Highest rated</option></select></label>
      </div>
    </div>
  );
}

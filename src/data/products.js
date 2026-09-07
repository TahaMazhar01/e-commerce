// AURA INTIMATES - Curated Luxury Product Catalog for Men & Women

export const PRODUCTS = [
  // --- WOMEN'S INTIMATES & SHAPEWEAR ---
  {
    id: "w-01",
    name: "Mulberry Silk Demi Bralette",
    subtitle: "22-Momme Grade 6A Pure Mulberry Silk with Micro-Mesh Band",
    gender: "women",
    category: "bras",
    price: 88,
    originalPrice: 110,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Best Seller",
    description: "Crafted from raw grade-6A Mulberry silk with hand-finished French seams. Provides weightless, gentle contouring without constricting underwires.",
    fabricComposition: "92% Grade 6A Mulberry Silk, 8% Elastane",
    breathability: "Ultra-Breathable (Thermal Regulating)",
    careInstructions: "Delicate hand wash cold or eco dry clean. Line dry in shade.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Champagne Gold", hex: "#E6D5C3", image: "/images/products/w-01-champagne.webp" },
      { name: "Obsidian Noir", hex: "#16161D", image: "/images/products/w-01-black.webp" },
      { name: "Blush Cashmere", hex: "#f0a6ca", image: "/images/products/w-01-blush.webp" }
    ],
    fabricType: "silk",
    isFeatured: true
  },
  {
    id: "w-02",
    name: "Architectural Contour Sculpt Bodysuit",
    subtitle: "Second-Skin Compression with Micro-Perforated Thermal Zones",
    gender: "women",
    category: "shapewear",
    price: 118,
    originalPrice: 145,
    rating: 4.8,
    reviewsCount: 218,
    badge: "Architectural Fit",
    description: "Targeted 360-degree core compression engineered with graduated tension zones. Lifts and sculpts the natural silhouette while remaining invisible under sheer silk gowns.",
    fabricComposition: "68% Polyamide, 32% High-Recovery Spandex",
    breathability: "High Elastic Compression",
    careInstructions: "Machine wash cold on gentle cycle in laundry bag. Do not tumble dry.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Mocha Nude", hex: "#7E5845", image: "/images/products/w-02-mocha.webp" },
      { name: "Espresso Noir", hex: "#221C19", image: "/images/products/w-02-black.webp" },
      { name: "Sienna Sand", hex: "#C49A78", image: "/images/products/w-02-sand.webp" }
    ],
    fabricType: "sculpt",
    isFeatured: true
  },
  {
    id: "w-03",
    name: "Seamless Cloud Briefs (3-Pack)",
    subtitle: "Laser-Cut Raw Edges in Featherweight Italian Microfiber",
    gender: "women",
    category: "briefs",
    price: 64,
    originalPrice: 75,
    rating: 4.9,
    reviewsCount: 380,
    badge: "Essential",
    description: "Zero panty lines guaranteed. Featherlight Italian bonded microfiber with 100% organic cotton antibacterial gusset lining.",
    fabricComposition: "82% Ultra-Fine Polyamide, 18% Elastane, 100% Organic Cotton Gusset",
    breathability: "Featherlight Zero-Chafe",
    careInstructions: "Machine wash warm, tumble dry delicate.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Trio Palette (Mist / Orchid / Blush)", hex: "#efc3e6", image: "/images/products/w-03-pastel.webp" },
      { name: "Obsidian Multi", hex: "#16161D", image: "/images/products/w-03-black.webp" }
    ],
    fabricType: "modal",
    isFeatured: false
  },
  {
    id: "w-04",
    name: "Mulberry Silk Flowing Lounge Slip",
    subtitle: "Bias-Cut Pure Silk Charmeuse with Delicate Low Back",
    gender: "women",
    category: "loungewear",
    price: 165,
    originalPrice: 195,
    rating: 5.0,
    reviewsCount: 89,
    badge: "Limited Edition",
    description: "Drapes like liquid silver against bare skin. Bias-cut silhouette flows effortlessly around curves, making it both luxurious sleepwear and evening-ready loungewear.",
    fabricComposition: "100% Grade 6A Pure Mulberry Silk Charmeuse",
    breathability: "Natural Temperature Regulating",
    careInstructions: "Specialty silk wash or dry clean.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Amethyst Dusk", hex: "#9c89b8", image: "/images/products/w-04-amethyst.webp" },
      { name: "Champagne Sheen", hex: "#E6D5C3", image: "/images/products/w-04-champagne.webp" }
    ],
    fabricType: "silk",
    isFeatured: true
  },
  {
    id: "w-05",
    name: "Air-Ribbed Modal Triangle Bralette",
    subtitle: "Eco-Conscious Austrian Modal with Soft Rib Texture",
    gender: "women",
    category: "bras",
    price: 54,
    originalPrice: 65,
    rating: 4.7,
    reviewsCount: 94,
    badge: "Eco-Luxe",
    description: "Buttery micro-modal spun from sustainably harvested beechwood trees. Breathable, 2x softer than cotton, with a flexible wide underband.",
    fabricComposition: "94% TENCEL™ Modal, 6% Spandex",
    breathability: "Extreme Cloud Softness",
    careInstructions: "Machine wash cold inside-out, tumble dry low.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Orchid Blush", hex: "#efc3e6", image: "/images/products/w-05-orchid.webp" },
      { name: "Periwinkle Heather", hex: "#b8bedd", image: "/images/products/w-05-periwinkle.webp" }
    ],
    fabricType: "modal",
    isFeatured: false
  },

  // --- MEN'S UNDERGARMENTS & LOUNGEWEAR ---
  {
    id: "m-01",
    name: "Ultra-Breathable Micro-Modal Boxer Brief",
    subtitle: "Ergonomic 3D Contour Pouch & Non-Rolling Jacquard Waistband",
    gender: "men",
    category: "boxers",
    price: 42,
    originalPrice: 52,
    rating: 4.9,
    reviewsCount: 520,
    badge: "Best Seller",
    description: "The gold standard in men's underwear. Crafted with micro-denier modal fibers and an anatomical ergonomic pouch that prevents friction and keeps you cool all day.",
    fabricComposition: "93% Austrian Micro-Modal, 7% Elastane",
    breathability: "3x More Breathable than Cotton",
    careInstructions: "Machine wash warm, do not bleach, tumble dry low.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal Heather", hex: "#2C2D35", image: "/images/products/m-01-charcoal.webp" },
      { name: "Obsidian Deep", hex: "#111116", image: "/images/products/m-01-black.webp" },
      { name: "Midnight Navy", hex: "#1A2436", image: "/images/products/m-01-navy.webp" }
    ],
    fabricType: "modal",
    isFeatured: true
  },
  {
    id: "m-02",
    name: "Zero-Chafe Performance Athletic Trunk",
    subtitle: "4-Way High Elasticity Mesh with Moisture Evaporation Channels",
    gender: "men",
    category: "trunks",
    price: 46,
    originalPrice: 55,
    rating: 4.8,
    reviewsCount: 310,
    badge: "Athletic Tech",
    description: "Engineered for active days and training. Anti-ride-up leg grips and laser ventilation zones wick away sweat while maintaining shape and bounce.",
    fabricComposition: "84% Recycled Performance Polyamide, 16% Spandex",
    breathability: "Aerodynamic Quick-Dry Mesh",
    careInstructions: "Machine wash cold, air dry or tumble dry low.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Carbon Black", hex: "#1B1B1E", image: "/images/products/m-02-black.webp" },
      { name: "Steel Glacier", hex: "#4A5568", image: "/images/products/m-02-steel.webp" }
    ],
    fabricType: "sculpt",
    isFeatured: true
  },
  {
    id: "m-03",
    name: "Pure Cotton Long-Staple Trunk (3-Pack)",
    subtitle: "GOTS-Certified Organic Supima Cotton with Bound Seams",
    gender: "men",
    category: "trunks",
    price: 85,
    originalPrice: 105,
    rating: 4.9,
    reviewsCount: 245,
    badge: "Eco-Luxe",
    description: "Premium California-grown Supima cotton known for extra-long fibers that resist pilling and retain their plush touch wash after wash.",
    fabricComposition: "95% GOTS Certified Organic Supima Cotton, 5% Elastane",
    breathability: "Naturally Hypoallergenic",
    careInstructions: "Machine wash warm, tumble dry medium.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Essential Trio (Raven / Mist / Heather)", hex: "#222228", image: "/images/products/m-03-trio.webp" }
    ],
    fabricType: "modal",
    isFeatured: false
  },
  {
    id: "m-04",
    name: "Mulberry Silk-Trimmed Modal Kimono Robe",
    subtitle: "Tailored Lounge Robe with Mulberry Silk Lapels & Belt",
    gender: "men",
    category: "loungewear",
    price: 195,
    originalPrice: 240,
    rating: 5.0,
    reviewsCount: 78,
    badge: "Limited Edition",
    description: "A statement in quiet luxury lounging. Ultra-heavyweight brushed modal drape lined with 100% pure silk lapels and custom monogram loops.",
    fabricComposition: "85% Heavyweight Micro-Modal, 15% Pure Mulberry Silk Trim",
    breathability: "Thermal Insulation & Breathability",
    careInstructions: "Dry clean or delicate hand wash cold.",
    sizes: ["S/M", "L/XL"],
    colors: [
      { name: "Obsidian / Silk Gold", hex: "#0E0E12", image: "/images/products/m-04-black.webp" },
      { name: "Midnight Sapphire", hex: "#161F33", image: "/images/products/m-04-navy.webp" }
    ],
    fabricType: "silk",
    isFeatured: true
  },
  {
    id: "m-05",
    name: "Seamless Featherweight Sleep Short",
    subtitle: "Relaxed-Fit Ultrasonic Bonded Modal with Concealed Pocket",
    gender: "men",
    category: "loungewear",
    price: 68,
    originalPrice: 80,
    rating: 4.8,
    reviewsCount: 112,
    badge: "New Arrival",
    description: "Engineered for uninterrupted sleep. Zero-stitch bonded hems and a soft encased drawstring that won't dig in when shifting positions.",
    fabricComposition: "92% Micro-Modal, 8% Spandex",
    breathability: "Second-Skin Cloud Drape",
    careInstructions: "Machine wash cold, tumble dry low.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Graphite Melange", hex: "#3A3C44", image: "/images/products/m-05-graphite.webp" },
      { name: "Pearl Mist", hex: "#f0e6ef", image: "/images/products/m-05-pearl.webp" }
    ],
    fabricType: "modal",
    isFeatured: false
  },
  {
    id: "u-01",
    name: "Mulberry Silk Ergonomic Contoured Sleep Mask",
    subtitle: "Zero Eye Pressure 3D Silk Cavity with Adjustable Velvet Strap",
    gender: "unisex",
    category: "essentials",
    price: 45,
    originalPrice: 55,
    rating: 5.0,
    reviewsCount: 460,
    badge: "Must-Have",
    description: "100% Grade 6A pure silk inside and out. Deep contoured eye cups protect eyelash extensions and prevent facial creasing while completely blocking out light.",
    fabricComposition: "100% Pure Mulberry Silk Filling & Shell",
    breathability: "Total Blackout Comfort",
    careInstructions: "Hand wash cold with gentle detergent. Air dry.",
    sizes: ["One Size"],
    colors: [
      { name: "Champagne Silk", hex: "#E6D5C3", image: "/images/products/u-01-champagne.webp" },
      { name: "Amethyst Silk", hex: "#9c89b8", image: "/images/products/u-01-amethyst.webp" }
    ],
    fabricType: "silk",
    isFeatured: true
  }
];

export const CATEGORIES = [
  { id: "all", label: "All Collections" },
  { id: "women", label: "Women's Intimates" },
  { id: "men", label: "Men's Essentials" },
  { id: "shapewear", label: "Contour & Shape" },
  { id: "loungewear", label: "Silk & Loungewear" }
];

export const REVIEWS = [
  {
    id: "r1",
    author: "Elena Rostova",
    verified: true,
    rating: 5,
    date: "2 days ago",
    product: "Mulberry Silk Demi Bralette",
    headline: "Unrivaled luxury & comfort",
    comment: "The silk feels like cool water against the skin. No pinching, no wire marks at the end of a 14-hour workday. I've ordered two more colors."
  },
  {
    id: "r2",
    author: "Marcus Vance",
    verified: true,
    rating: 5,
    date: "5 days ago",
    product: "Ultra-Breathable Micro-Modal Boxer Brief",
    headline: "Replaced my entire drawer",
    comment: "Hands down the most comfortable boxer briefs I have ever worn. The waistband stays completely flat and doesn't roll down."
  },
  {
    id: "r3",
    author: "Claire D.",
    verified: true,
    rating: 5,
    date: "1 week ago",
    product: "Architectural Contour Sculpt Bodysuit",
    headline: "Magic under evening dresses",
    comment: "Sculpts seamlessly without suffocating you. Smooths the silhouette and gives a gorgeous posture boost. Worth every dollar."
  },
  {
    id: "r4",
    author: "Julian Thorne",
    verified: true,
    rating: 5,
    date: "2 weeks ago",
    product: "Mulberry Silk-Trimmed Modal Kimono Robe",
    headline: "The definition of quiet luxury",
    comment: "The drape and weight are exceptional. You feel like royalty lounging on Sunday mornings."
  }
];

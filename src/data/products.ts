export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Fashion' | 'Electronics' | 'Beauty' | 'Fitness' | 'Home Decor' | 'Accessories';
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  shortDescription?: string;
  colors?: ProductColor[];
  sizes?: string[];
  badge?: 'New' | 'Bestseller' | 'Sale' | null;
  tags: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  featured?: boolean;
  specifications?: Record<string, string>;
  inStock?: boolean;
}

// Local generated image paths
import heroShoeImg from '../assets/images/hero_running_shoe_1790199449857.jpg';
import smartWatchImg from '../assets/images/tech_smartwatch_1790199492981.jpg';

export const PRODUCTS: Product[] = [
  // 1. Essential Hoodie (New Arrival)
  {
    id: 'essential-hoodie',
    name: 'Essential Hoodie',
    category: 'Fashion',
    price: 59.99,
    rating: 4.8,
    reviews: 128,
    badge: 'New',
    isNewArrival: true,
    inStock: true,
    shortDescription: 'Heavyweight brushed organic cotton hoodie with tailored relaxed fit.',
    description: 'Crafted from a custom 450gsm organic French terry cotton, the Essential Hoodie combines timeless minimalist aesthetics with supreme everyday comfort. Features double-layered hood construction, ribbed side gussets, and seamless kangaroo pocket detailing.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Oatmeal Heather', hex: '#E2DDD5' },
      { name: 'Charcoal Black', hex: '#222222' },
      { name: 'Sage Green', hex: '#7D8C7C' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tags: ['hoodie', 'sweatshirt', 'cotton', 'minimal', 'streetwear'],
    specifications: {
      'Material': '100% Organic Ring-Spun Cotton',
      'Fabric Weight': '450 GSM Heavyweight French Terry',
      'Fit': 'Slightly relaxed, true to size',
      'Care': 'Machine wash cold, air dry recommended',
      'Origin': 'Ethically made in Portugal'
    }
  },

  // 2. Air Max 270 (New Arrival & Bestseller)
  {
    id: 'air-max-270',
    name: 'Air Max 270',
    category: 'Fashion',
    price: 129.99,
    oldPrice: 159.99,
    discount: 20,
    rating: 4.9,
    reviews: 189,
    badge: 'Sale',
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    shortDescription: 'Iconic street silhouette engineered with high-volume Max Air heel unit.',
    description: 'The Air Max 270 delivers unmatched all-day bounce and futuristic style. Boasting a massive visible heel Air unit and breathable knit upper with asymmetric lacing, it wraps the foot in supportive, ultra-plush luxury whether you are on the move or in the city.',
    images: [
      heroShoeImg,
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Summit White / Solar', hex: '#FFFFFF' },
      { name: 'Triple Black', hex: '#111111' },
      { name: 'Pure Platinum', hex: '#D6D6D6' }
    ],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    tags: ['sneakers', 'footwear', 'running', 'streetwear', 'athletic'],
    specifications: {
      'Upper': 'Dual-density engineered circular knit mesh',
      'Cushioning': '270-degree Max Air heel unit with dual-density foam',
      'Outsole': 'Waffle-inspired solid rubber with flex grooves',
      'Closure': 'Asymmetric ergonomic lacing system',
      'Weight': '310g (Size 9)'
    }
  },

  // 3. Wireless Headphones (New Arrival)
  {
    id: 'wireless-headphones',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 99.99,
    rating: 4.7,
    reviews: 156,
    badge: 'New',
    isNewArrival: true,
    inStock: true,
    shortDescription: 'High-fidelity acoustic over-ear headphones with custom balanced drivers.',
    description: 'Immerse yourself in clean, studio-grade sound. Equipped with custom 40mm titanium diaphragm drivers, ultra-soft protein leather memory foam ear cups, and 45 hours of non-stop playback, these wireless headphones deliver pristine audio clarity from acoustic highs to deep bass notes.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Matte Jet Black', hex: '#181818' },
      { name: 'Warm Cream / Gold', hex: '#EBE5D8' },
      { name: 'Space Gray', hex: '#58595B' }
    ],
    sizes: ['One Size Adjustable'],
    tags: ['audio', 'headphones', 'wireless', 'bluetooth', 'music'],
    specifications: {
      'Driver Size': '40mm Custom Titanium Composite',
      'Frequency Response': '20Hz - 20,000Hz',
      'Battery Life': 'Up to 45 Hours (USB-C Fast Charging)',
      'Connectivity': 'Bluetooth 5.3 + 3.5mm Aux backup',
      'Weight': '245g'
    }
  },

  // 4. Smart Watch Series 9 (New Arrival & Floating Hero Card)
  {
    id: 'smart-watch-series-9',
    name: 'Smart Watch Series 9',
    category: 'Electronics',
    price: 199.99,
    oldPrice: 234.99,
    discount: 15,
    rating: 4.8,
    reviews: 103,
    badge: 'Sale',
    isNewArrival: true,
    inStock: true,
    shortDescription: 'Next-generation health tracker with ultra-bright always-on Retina display.',
    description: 'Precision engineered aerospace aluminum casing housing advanced biometric sensors. Track your heart rate variability, SpO2 blood oxygen levels, sleep stages, and over 100 sport modes with pinpoint GPS accuracy. Water-resistant up to 50 meters.',
    images: [
      smartWatchImg,
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#171A21' },
      { name: 'Starlight Silver', hex: '#E3E4E5' },
      { name: 'Titanium Graphite', hex: '#3B3D40' }
    ],
    sizes: ['41mm', '45mm'],
    tags: ['smartwatch', 'wearable', 'fitness', 'tech', 'gadget'],
    specifications: {
      'Display': '1.9-inch LTPO OLED Always-On Retina (2000 nits)',
      'Sensors': 'Optical Heart, ECG, SpO2, Temperature, Barometer, Compass',
      'Water Resistance': '50M / 5 ATM Swim-Proof',
      'Battery Life': 'Up to 36 hours low power mode / 18 hours typical',
      'Compatibility': 'iOS & Android'
    }
  },

  // 5. Stainless Steel Bottle (New Arrival & Floating Hero Card)
  {
    id: 'stainless-steel-bottle',
    name: 'Stainless Steel Bottle',
    category: 'Fitness',
    price: 24.99,
    rating: 4.9,
    reviews: 76,
    badge: 'New',
    isNewArrival: true,
    inStock: true,
    shortDescription: 'Double-wall vacuum insulated canteen engineered to keep drinks ice cold 24h.',
    description: 'Made with culinary-grade 18/8 stainless steel, this double-wall vacuum insulated hydration vessel keeps beverages cold for up to 24 hours or piping hot for 12 hours without condensation. Features a leakproof silicone-sealed cap and durable chip-resistant powder coat finish.',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#1C1C1E' },
      { name: 'Terracotta Rust', hex: '#C2593F' },
      { name: 'Alpine Frost', hex: '#EBF0F5' }
    ],
    sizes: ['500ml', '750ml', '1000ml'],
    tags: ['hydration', 'bottle', 'fitness', 'outdoor', 'sustainable'],
    specifications: {
      'Capacity': '750ml (25 fl oz)',
      'Insulation': 'TempShield Double-Wall Vacuum Insulation',
      'Material': 'Pro-Grade 18/8 Stainless Steel, BPA-Free',
      'Thermal Performance': '24 Hours Cold / 12 Hours Hot',
      'Mouth Diameter': 'Wide mouth for ice cubes'
    }
  },

  // 6. Aviator Sunglasses (New Arrival)
  {
    id: 'aviator-sunglasses',
    name: 'Aviator Sunglasses',
    category: 'Accessories',
    price: 89.99,
    oldPrice: 99.99,
    discount: 10,
    rating: 4.6,
    reviews: 57,
    badge: 'Sale',
    isNewArrival: true,
    inStock: true,
    shortDescription: 'Classic teardrop aviator frame in lightweight surgical titanium alloy.',
    description: 'An iconic silhouette re-imagined for modern clarity. Features scratch-resistant polarized crystal glass lenses that block 100% of UVA/UVB rays and eliminate harsh glare. Finished with hypoallergenic silicone nose pads and flexible spring-loaded temples for an effortless custom fit.',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Polished Gunmetal', hex: '#2B2E33' },
      { name: 'Warm Gold / Green Lens', hex: '#D4AF37' },
      { name: 'Silver Smoke', hex: '#C0C0C0' }
    ],
    sizes: ['Standard 58mm'],
    tags: ['eyewear', 'sunglasses', 'accessories', 'aviator', 'summer'],
    specifications: {
      'Frame Material': 'Surgical-Grade Beta Titanium',
      'Lens Type': 'Polarized Ultra-HD Mineral Glass (Category 3)',
      'UV Protection': 'UV400 (100% UVA/UVB Protection)',
      'Dimensions': 'Lens: 58mm | Bridge: 14mm | Temple: 140mm',
      'Includes': 'Hard leather carrying case and microfiber cloth'
    }
  },

  // 7. Classic Hoodie (Best Seller)
  {
    id: 'classic-hoodie',
    name: 'Classic Hoodie',
    category: 'Fashion',
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.8,
    reviews: 256,
    badge: 'Bestseller',
    isBestSeller: true,
    inStock: true,
    shortDescription: 'Premium quality hoodie perfect for everyday wear.',
    description: 'Our perennial favorite. Built from ultra-soft combed cotton fleece with brushed interior lining. Designed with refined raglan sleeves, tonal embroidery, and structured cuffs that retain their shape wash after wash.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Natural Ecru', hex: '#EAE6DF' },
      { name: 'Heather Smoke', hex: '#8F9194' },
      { name: 'Deep Navy', hex: '#1F2937' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['hoodie', 'apparel', 'bestseller', 'cotton'],
    specifications: {
      'Material': '80% Combed Cotton, 20% Recycled Polyester',
      'Weight': '400 GSM Heavyweight Fleece',
      'Pockets': 'Kangaroo pouch with hidden phone security sleeve',
      'Care': 'Machine wash cold'
    }
  },

  // 8. Sony WH-1000XM5 (Best Seller)
  {
    id: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5',
    category: 'Electronics',
    price: 349.99,
    rating: 4.9,
    reviews: 324,
    badge: 'Bestseller',
    isBestSeller: true,
    inStock: true,
    shortDescription: 'Industry-leading noise cancellation with two processors and 8 microphones.',
    description: 'The benchmark of modern active noise cancellation. With two processors controlling eight microphones, the WH-1000XM5 creates an impenetrable cocoon of peaceful acoustic silence. Powered by Auto NC Optimizer and 30-hour battery life with 3-minute quick charging for 3 hours of play.',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Silver Sand', hex: '#E1DFD7' },
      { name: 'Black', hex: '#1B1B1B' },
      { name: 'Midnight Blue', hex: '#1E293B' }
    ],
    sizes: ['One Size'],
    tags: ['audio', 'sony', 'anc', 'noise-cancelling', 'premium'],
    specifications: {
      'Processors': 'Integrated Processor V1 + HD Noise Cancelling Processor QN1',
      'Microphones': '8 beamforming microphones for voice and noise cancellation',
      'Battery Life': '30 hours with ANC on',
      'Codec Support': 'LDAC, AAC, SBC',
      'Weight': '250g'
    }
  },

  // 9. Leather Crossbody Bag (Best Seller)
  {
    id: 'leather-crossbody-bag',
    name: 'Leather Crossbody Bag',
    category: 'Accessories',
    price: 89.99,
    rating: 4.7,
    reviews: 94,
    badge: 'Bestseller',
    isBestSeller: true,
    inStock: true,
    shortDescription: 'Handcrafted full-grain Italian leather everyday city sling bag.',
    description: 'A masterclass in modern utilitarian leather goods. Crafted from vegetable-tanned full-grain leather that patinas beautifully over time. Features solid brass YKK hardware, an adjustable cotton webbing strap, and padded interior tablet sleeve.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Cognac Saddle Brown', hex: '#8B4513' },
      { name: 'Espresso Dark Brown', hex: '#3E2723' },
      { name: 'Onyx Black', hex: '#1A1A1A' }
    ],
    sizes: ['One Size (24 x 18 x 7 cm)'],
    tags: ['leather', 'bag', 'crossbody', 'accessories', 'handcrafted'],
    specifications: {
      'Leather': 'Vegetable-Tanned Full-Grain Tuscan Cowhide',
      'Lining': 'Herringbone 100% Cotton Canvas',
      'Hardware': 'Antiqued Solid Brass',
      'Strap Drop': '38cm - 68cm adjustable'
    }
  },

  // 10. Premium Running Shoes (Best Seller)
  {
    id: 'premium-running-shoes',
    name: 'Premium Running Shoes',
    category: 'Fitness',
    price: 119.99,
    oldPrice: 149.99,
    discount: 20,
    rating: 4.8,
    reviews: 142,
    badge: 'Bestseller',
    isBestSeller: true,
    inStock: true,
    shortDescription: 'Engineered mesh and responsive cushioned carbon-infused sole.',
    description: 'Engineered for high-mileage road runners seeking featherlight propulsion. Featuring a propulsive full-length carbon composite plate sandwiched between dual supercritical foam layers, this shoe turns every footstrike into effortless forward momentum.',
    images: [
      heroShoeImg,
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Pure White / Coral', hex: '#FF6B4A' },
      { name: 'Volt / Cyan', hex: '#CCFF00' },
      { name: 'Triple Ash', hex: '#4B5563' }
    ],
    sizes: ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11'],
    tags: ['running', 'shoes', 'fitness', 'marathon', 'sport'],
    specifications: {
      'Stack Height': '38mm heel / 30mm forefoot (8mm drop)',
      'Plate': 'Full-length Carbon Composite Wave Plate',
      'Upper': 'Monofilament engineered breathable weave',
      'Weight': '218g (US Men 9)'
    }
  },

  // 11. Minimalist Backpack (Best Seller)
  {
    id: 'minimalist-backpack',
    name: 'Minimalist Backpack',
    category: 'Accessories',
    price: 79.99,
    rating: 4.8,
    reviews: 210,
    badge: 'Bestseller',
    isBestSeller: true,
    inStock: true,
    shortDescription: 'Water-resistant weather-sealed urban commuter pack.',
    description: 'Designed for daily commute and weekend escapes. Built with 1000D Cordura ballistic nylon with a matte polyurethane waterproof coating. Features a suspended 16-inch fleece-lined laptop sleeve, magnetic Fidlock buckle closures, and hidden passport security pocket.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Stealth Matte Black', hex: '#1F2022' },
      { name: 'Slate Gray', hex: '#64748B' },
      { name: 'Olive Drab', hex: '#4B5320' }
    ],
    sizes: ['20 Liters Capacity'],
    tags: ['backpack', 'commute', 'bag', 'travel', 'tech'],
    specifications: {
      'Material': '1000D Recycled Ballistic Nylon with DWR finish',
      'Laptop Compartment': 'Suspended protection for up to 16" MacBook Pro',
      'Capacity': '20 Liters',
      'Dimensions': '46cm x 30cm x 15cm',
      'Zippers': 'Water-resistant YKK Aquaguard'
    }
  },

  // 12. Botanical Radiance Serum (Beauty)
  {
    id: 'botanical-radiance-serum',
    name: 'Botanical Radiance Serum',
    category: 'Beauty',
    price: 48.00,
    rating: 4.9,
    reviews: 167,
    badge: 'New',
    isNewArrival: false,
    isBestSeller: false,
    inStock: true,
    shortDescription: 'Cold-pressed bioactive vitamin C and hyaluronic acid facial oil.',
    description: 'Revitalize dull skin with 15% stabilized botanical vitamin C, fermented plant squalane, and multi-molecular hyaluronic acid. Absorbs instantly into dermal layers to even skin tone, boost collagen synthesis, and impart a healthy, glass-skin glow.',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-00994f72d5f8?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Amber Glow', hex: '#E59B3C' }
    ],
    sizes: ['30ml / 1.0 fl oz', '50ml / 1.7 fl oz'],
    tags: ['serum', 'skincare', 'beauty', 'clean', 'organic'],
    specifications: {
      'Key Ingredients': '15% THD Ascorbate (Vitamin C), Ferulic Acid, Squalane',
      'Skin Type': 'All skin types, sensitive friendly',
      'Formulation': '100% Vegan, Cruelty-Free, Fragrance-Free',
      'Bottle': 'UV-protective amber apothecary glass with glass dropper'
    }
  },

  // 13. Sculptural Ceramic Ribbed Vase (Home Decor)
  {
    id: 'ceramic-ribbed-vase',
    name: 'Sculptural Ceramic Ribbed Vase',
    category: 'Home Decor',
    price: 64.00,
    oldPrice: 75.00,
    discount: 15,
    rating: 4.8,
    reviews: 82,
    badge: null,
    inStock: true,
    shortDescription: 'Hand-thrown stoneware vase with tactile matte architectural fluting.',
    description: 'An understated centerpiece inspired by mid-century Nordic brutalism. Each piece is hand-thrown on the wheel from Portuguese terracotta clay and finished with an unglazed, raw tactile matte exterior and watertight glazed interior.',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Chalk Bone White', hex: '#F5F5F0' },
      { name: 'Sandstone Beige', hex: '#D7CEC7' },
      { name: 'Volcanic Basalt', hex: '#2E2D2B' }
    ],
    sizes: ['Medium (24cm H)', 'Large (32cm H)'],
    tags: ['vase', 'ceramics', 'homedecor', 'interior', 'minimalist'],
    specifications: {
      'Material': '100% Natural Stoneware Clay',
      'Finish': 'Textured matte exterior, glazed waterproof interior',
      'Dimensions': 'Height: 25cm | Diameter: 14cm',
      'Weight': '1.4 kg'
    }
  },

  // 14. High-Density Ergonomic Yoga Mat (Fitness)
  {
    id: 'ergonomic-yoga-mat',
    name: 'High-Density Ergonomic Yoga Mat',
    category: 'Fitness',
    price: 54.99,
    rating: 4.9,
    reviews: 118,
    badge: null,
    inStock: true,
    shortDescription: 'Biodegradable natural tree rubber mat with laser-etched alignment lines.',
    description: 'Engineered for yogis demanding absolute grip and joint protection. Constructed with sustainably harvested natural tree rubber and a sweat-activated non-slip polyurethane top coat. Laser-etched central alignment lines help perfect your posture.',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Moss Forest Green', hex: '#3E5641' },
      { name: 'Dusty Rose', hex: '#C28D8D' },
      { name: 'Deep Indigo', hex: '#26344E' }
    ],
    sizes: ['72" x 26" x 5mm'],
    tags: ['yoga', 'fitness', 'pilates', 'eco-friendly', 'wellness'],
    specifications: {
      'Thickness': '5mm high-density cushioning',
      'Material': '100% FSC-certified Natural Rubber + Eco-PU',
      'Dimensions': '183cm x 66cm x 5mm',
      'Includes': 'Cotton carry strap'
    }
  },

  // 15. Minimalist Linen Overshirt (Fashion)
  {
    id: 'minimalist-linen-overshirt',
    name: 'Minimalist Linen Overshirt',
    category: 'Fashion',
    price: 74.99,
    rating: 4.7,
    reviews: 64,
    badge: 'New',
    inStock: true,
    shortDescription: 'Breathable 100% French flax linen tailored for relaxed layering.',
    description: 'An elevated year-round layering essential. Pre-washed for a buttery soft drape, this overshirt features natural corozo nut buttons, a classic camp collar, and twin chest patch pockets. Drapes cleanly over tees or under jackets.',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Natural Sand', hex: '#D8CEBE' },
      { name: 'Washed Olive', hex: '#636854' },
      { name: 'Midnight', hex: '#1C212B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['linen', 'shirt', 'overshirt', 'fashion', 'summer'],
    specifications: {
      'Material': '100% Normandy French Flax Linen',
      'Buttons': 'Eco-friendly natural carved corozo nut',
      'Fit': 'Boxy relaxed fit',
      'Care': 'Machine wash gentle cold'
    }
  },

  // 16. Noise-Cancelling Wireless Earbuds Pro (Electronics)
  {
    id: 'wireless-earbuds-pro',
    name: 'Wireless Earbuds Pro',
    category: 'Electronics',
    price: 149.99,
    oldPrice: 179.99,
    discount: 16,
    rating: 4.8,
    reviews: 245,
    badge: 'Sale',
    inStock: true,
    shortDescription: 'Compact true wireless earbuds with spatial audio and Qi wireless charging.',
    description: 'Crystal-clear acoustics packed into an impossibly compact form. Features hybrid active noise cancellation, transparency audio pass-through, IPX5 water resistance for sweaty workouts, and 32 total hours of listening with the wireless charging case.',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Ceramic White', hex: '#FAF9F6' },
      { name: 'Matte Onyx', hex: '#1E1E1E' }
    ],
    sizes: ['Includes S, M, L, XL Silicone Tips'],
    tags: ['earbuds', 'audio', 'wireless', 'anc', 'bluetooth'],
    specifications: {
      'Driver': '11mm Dynamic Bass Boost Drivers',
      'Noise Cancellation': 'Up to 42dB Active Noise Cancellation',
      'Battery Life': '8 hours per charge + 24 hours in case',
      'Charging': 'USB-C + Qi Wireless Charging'
    }
  },

  // 17. Organic Soy Wax Scented Candle (Home Decor)
  {
    id: 'organic-soy-candle',
    name: 'Organic Soy Wax Scented Candle',
    category: 'Home Decor',
    price: 32.00,
    rating: 4.9,
    reviews: 153,
    badge: null,
    inStock: true,
    shortDescription: 'Notes of smoked cedarwood, amber resin, and crisp Siberian pine.',
    description: 'Hand-poured in small batches using 100% biodegradable American-grown soy wax and essential fragrance oils. Features a crackling natural lead-free FSC wooden wick that creates a gentle fireside ambiance with a 65-hour clean burn time.',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572726729437-3732efc7429c?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Frosted White Glass', hex: '#F0F0EE' },
      { name: 'Matte Charcoal Glass', hex: '#2A2A2A' }
    ],
    sizes: ['260g / 9.2 oz'],
    tags: ['candle', 'homedecor', 'scent', 'relaxation', 'gift'],
    specifications: {
      'Wax': '100% Non-GMO Botanical Soy Wax',
      'Burn Time': 'Approximately 60-65 Hours',
      'Wick': 'Natural Wood Crackling Wick',
      'Vessel': 'Reusable heavyweight frosted glass'
    }
  },

  // 18. Adjustable Dumbbell Workout Set (Fitness)
  {
    id: 'adjustable-dumbbell-set',
    name: 'Adjustable Dumbbell Workout Set',
    category: 'Fitness',
    price: 179.99,
    rating: 4.8,
    reviews: 89,
    badge: null,
    inStock: true,
    shortDescription: 'Compact rapid-dial selector replacing 15 individual pairs of weights.',
    description: 'Transform any room into a high-performance training studio. With a simple turn of the textured knurled dial, adjust weight from 5 lbs up to 52.5 lbs in precise increments. Compact, silent rubber-molded plates protect floors and reduce clatter.',
    images: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Industrial Black / Orange', hex: '#FF5A36' }
    ],
    sizes: ['Single (5-52.5 lbs)', 'Pair (10-105 lbs total)'],
    tags: ['gym', 'fitness', 'weights', 'dumbbells', 'strength'],
    specifications: {
      'Weight Range': '5 to 52.5 lbs (2.5 to 24 kg) per dumbbell',
      'Increments': '2.5 lb increments for first 25 lbs',
      'Handle': 'Ergonomic non-slip diamond knurling',
      'Tray Included': 'Durable molded cradle base'
    }
  },

  // 19. Titanium Mechanical Chrono Watch (Accessories)
  {
    id: 'titanium-mechanical-watch',
    name: 'Titanium Mechanical Chrono Watch',
    category: 'Accessories',
    price: 289.00,
    oldPrice: 340.00,
    discount: 15,
    rating: 4.9,
    reviews: 41,
    badge: 'Sale',
    inStock: true,
    shortDescription: 'Automatic mechanical movement housed in bead-blasted grade 5 titanium.',
    description: 'An architectural timepiece engineered for precision and durability. Features an exposed sapphire exhibition caseback revealing the 24-jewel automatic movement, 42-hour power reserve, date aperture, and 100-meter waterproof crown.',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Titanium Matte Silver', hex: '#BFC3C7' },
      { name: 'DLC Tactical Black', hex: '#1E1E1E' }
    ],
    sizes: ['40mm Diameter'],
    tags: ['watch', 'horology', 'accessories', 'luxury', 'titanium'],
    specifications: {
      'Case': 'Grade 5 Titanium (40mm diameter, 11.5mm thick)',
      'Crystal': 'Double-domed Anti-reflective Sapphire Crystal',
      'Movement': 'Japanese NH35A Automatic Movement (21,600 bph)',
      'Water Resistance': '10 ATM (100 meters)'
    }
  },

  // 20. Cashmere Blend Ribbed Beanie (Fashion)
  {
    id: 'cashmere-ribbed-beanie',
    name: 'Cashmere Blend Ribbed Beanie',
    category: 'Fashion',
    price: 38.00,
    rating: 4.8,
    reviews: 95,
    badge: null,
    inStock: true,
    shortDescription: '70% Merino wool and 30% Mongolian cashmere for cloud-soft warmth.',
    description: 'Designed to keep you cozy through chilly morning walks and winter getaways. Features a traditional 7-gauge ribbed knit pattern with an adjustable foldover cuff for customized ear coverage.',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Warm Camel', hex: '#C19A6B' },
      { name: 'Dark Charcoal', hex: '#262626' },
      { name: 'Cream Ivory', hex: '#F7F5EE' }
    ],
    sizes: ['One Size Fits All'],
    tags: ['beanie', 'cashmere', 'winter', 'hat', 'fashion'],
    specifications: {
      'Composition': '70% Extra-fine Merino Wool, 30% Grade-A Cashmere',
      'Knit': '7-gauge fisherman rib stitch',
      'Origin': 'Inner Mongolia'
    }
  },

  // 21. Solid Walnut Desk Organizer Tray (Home Decor)
  {
    id: 'walnut-desk-tray',
    name: 'Solid Walnut Desk Organizer Tray',
    category: 'Home Decor',
    price: 45.00,
    rating: 4.7,
    reviews: 62,
    badge: null,
    inStock: true,
    shortDescription: 'Carved from a single piece of sustainably harvested American black walnut.',
    description: 'Declutter your workspace with understated craftsmanship. Precision CNC-milled from solid American black walnut with smooth concave bowls for keys, pens, and AirPods, complemented by natural cork dampening pads on the base.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Natural Black Walnut', hex: '#4A3525' },
      { name: 'White Oak', hex: '#CDB18B' }
    ],
    sizes: ['Standard (28 x 12 x 2 cm)'],
    tags: ['desk', 'organizer', 'wood', 'homedecor', 'minimal'],
    specifications: {
      'Wood': '100% Solid FSC-Certified Black Walnut',
      'Finish': 'Hand-rubbed natural organic beeswax',
      'Base': 'Non-scratch Portuguese natural cork pads'
    }
  },

  // 22. Clarifying Clay Detox Mask (Beauty)
  {
    id: 'clarifying-clay-mask',
    name: 'Clarifying Clay Detox Mask',
    category: 'Beauty',
    price: 36.00,
    rating: 4.8,
    reviews: 87,
    badge: 'New',
    inStock: true,
    shortDescription: 'French green clay and activated bamboo charcoal pore-refining treatment.',
    description: 'Purify and detoxify congested pores without stripping essential moisture. Infused with mineral-rich volcanic ash, soothing colloidal oatmeal, and tea tree extract to gently rebalance oily zones and leave complexion refined and refreshed.',
    images: [
      'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Earthy Sage', hex: '#879782' }
    ],
    sizes: ['100ml / 3.4 oz Jar'],
    tags: ['mask', 'skincare', 'beauty', 'clay', 'detox'],
    specifications: {
      'Key Ingredients': 'French Green Clay, Bamboo Charcoal, Colloidal Oatmeal',
      'Texture': 'Creamy smooth paste that rinses clean without cracking',
      'Frequency': 'Use 1-2 times weekly for 10 minutes'
    }
  }
];

export const CATEGORIES = [
  {
    id: 'fashion',
    name: 'Fashion',
    count: '340+ Items',
    description: 'Modern silhouettes, premium hoodies, knitwear, and streetwear essentials.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    count: '180+ Items',
    description: 'Precision acoustics, wireless headphones, smart wearables, and audio gear.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beauty',
    name: 'Beauty',
    count: '120+ Items',
    description: 'Clean skincare, botanical serums, and organic self-care formulas.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fitness',
    name: 'Fitness',
    count: '95+ Items',
    description: 'High-performance running gear, hydration vessels, and studio equipment.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'home-decor',
    name: 'Home Decor',
    count: '150+ Items',
    description: 'Handcrafted stoneware ceramics, sculptural lighting, and cozy accents.',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    count: '210+ Items',
    description: 'Italian leather bags, polarized sunglasses, and everyday carry packs.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  }
];

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'build-better-everyday-wardrobe',
    title: 'How to Build a Better Everyday Wardrobe',
    category: 'Fashion & Style',
    date: 'Sep 18, 2026',
    readTime: '4 min read',
    author: 'Julian Vance',
    excerpt: 'The capsule wardrobe philosophy is not about owning fewer items—it is about curating pieces with intentional fabric weights, neutral silhouettes, and versatile cuts that elevate everyday dressing.',
    content: `Building an intentional wardrobe begins with identifying your daily uniform. Rather than chasing seasonal hype cycles, invest in pieces crafted with premium fabric weights—such as 450gsm organic cotton hoodies, tailored flax linen overshirts, and raw selvedge denim.

When your rotation is grounded in cohesive neutrals (oatmeal, deep charcoal, muted olive, and crisp chalk), combining pieces becomes effortless. Look for craftsmanship markers like double-needle flatlock seams, pre-shrunk organic weaves, and natural corozo buttons. Quality over quantity ensures every garment looks even better after three years of wear than on day one.`,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5-tech-essentials-for-modern-life',
    title: '5 Tech Essentials for Modern Life',
    category: 'Technology',
    date: 'Sep 12, 2026',
    readTime: '5 min read',
    author: 'Marcus Hayes',
    excerpt: 'From active noise-cancelling acoustics that preserve focus in bustling cities to health sensors that monitor recovery metrics, here are 5 tools crafted for modern productivity.',
    content: `Technology should recede quietly into the background while keeping you in flow.

1. High-Performance ANC Headphones: Blocking out auditory distractions in coffee shops or open offices protects cognitive endurance.
2. Smart Wearable with Biometric Telemetry: Tracking HRV (Heart Rate Variability) and sleep staging helps synchronize high-output work with physiological recovery.
3. Multi-Device GaN Charger: High-wattage gallium nitride charging eliminates cable clutter when switching between laptop, phone, and tablet.
4. Water-Resistant Commuter Pack: A sealed backpack featuring suspended laptop sleeves prevents costly drops and rain damage.
5. True Wireless Studio Earbuds: For seamless audio switches between mobile phone calls and desktop video conferences.`,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'how-to-choose-the-right-running-shoes',
    title: 'How to Choose the Right Running Shoes',
    category: 'Fitness',
    date: 'Sep 05, 2026',
    readTime: '6 min read',
    author: 'Elena Rostova',
    excerpt: 'Stack heights, carbon plates, heel drops, and pronation—we demystify the footwear engineering metrics so you can pick the ideal shoe for your weekly miles.',
    content: `Choosing the right running shoe can mean the difference between hitting personal records and nursing joint fatigue.

- Understand Your Heel Drop: An 8mm to 10mm drop encourages smooth heel-to-toe transitions, ideal for beginners and high-mileage road runners. Lower drops (0mm–4mm) promote midfoot strikes.
- Supercritical Foam vs Standard EVA: Modern shoes use nitrogen-infused foams that return up to 85% of kinetic energy, significantly reducing calf strain during long runs.
- The Role of Carbon Plates: Carbon-fiber and nylon wave plates provide longitudinal stiffness, acting as a spring lever that propels you through toe-off.
- Sizing Rule: Always size up a half-size from your casual footwear to account for natural foot swelling during endurance workouts.`,
    image: heroShoeImg
  },
  {
    id: 'home-decor-trends-for-2026',
    title: 'Home Decor Trends for 2026',
    category: 'Home & Living',
    date: 'Aug 28, 2026',
    readTime: '4 min read',
    author: 'Sophia Sterling',
    excerpt: 'Discover why sculptural ceramics, raw stone textures, and tactile timber are defining the new wave of calm architectural interiors.',
    content: `The design zeitgeist for 2026 embraces organic brutalism and warm minimalism. Sterile white boxes are yielding to rich tactile surfaces—textured limestone travertine, fluted ceramic stoneware, hand-rubbed black walnut, and linen window treatments that diffuse natural sunlight.

Lighting is taking center stage as functional sculpture: rather than harsh overhead LEDs, homes are layered with dimmable ambient lamps, architectural sconces, and soft scented beeswax candles that mark the transition into evening calm.`,
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80'
  }
];

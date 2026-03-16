const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99,
    image: "https://m.media-amazon.com/images/I/61-FDD1CHTL._AC_SX644_CB1169409_QL70_.jpg",
    brand: "SoundCore",
    category: "Audio",
    rating: 4.5,
    reviews: 1240,
    stock: 35,
    description: "High quality wireless headphones with noise isolation and long battery life.",
    features: ["Bluetooth 5.0", "20h Battery", "Noise Isolation", "Fast Charging"],
    specs: {
      connectivity: "Bluetooth",
      battery: "20 Hours",
      weight: "250g"
    }
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 149,
    image: "https://m.media-amazon.com/images/I/61rmkmqD5VL._AC_SX416_CB1169409_QL70_.jpg",
    brand: "FitPulse",
    category: "Wearables",
    rating: 4.4,
    reviews: 980,
    stock: 50,
    description: "Track fitness, heart rate, sleep, and notifications with this smart watch.",
    features: ["Heart Rate Monitor", "Sleep Tracking", "Water Resistant", "7 Day Battery"],
    specs: {
      display: "1.4 AMOLED",
      battery: "7 Days",
      compatibility: "Android & iOS"
    }
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 79,
    image: "https://m.media-amazon.com/images/I/614Q9nPTpkL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "BoomBox",
    category: "Audio",
    rating: 4.3,
    reviews: 720,
    stock: 40,
    description: "Portable speaker with powerful bass and waterproof design.",
    features: ["Waterproof", "10h Playtime", "Deep Bass", "Bluetooth 5.0"],
    specs: {
      battery: "10 Hours",
      range: "10m",
      weight: "500g"
    }
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: 49,
    image: "https://m.media-amazon.com/images/I/71PfyTreJIL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "HyperTech",
    category: "Gaming",
    rating: 4.6,
    reviews: 860,
    stock: 60,
    description: "Precision gaming mouse with customizable RGB lighting.",
    features: ["16000 DPI", "RGB Lighting", "Programmable Buttons", "Ergonomic Design"],
    specs: {
      dpi: "16000",
      connection: "USB",
      weight: "120g"
    }
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 129,
    image: "https://m.media-amazon.com/images/I/61BGtLdXTLL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "KeyForge",
    category: "Gaming",
    rating: 4.7,
    reviews: 910,
    stock: 25,
    description: "Mechanical keyboard with tactile switches and RGB backlight.",
    features: ["Mechanical Switches", "RGB Backlight", "Anti-Ghosting", "USB-C"],
    specs: {
      switchType: "Blue Switch",
      connection: "USB-C",
      layout: "Full Size"
    }
  },
  {
    id: 6,
    name: "Laptop Stand",
    price: 39,
    image: "https://m.media-amazon.com/images/I/51B4emQb6yL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "ErgoLift",
    category: "Accessories",
    rating: 4.4,
    reviews: 350,
    stock: 70,
    description: "Adjustable aluminum laptop stand for better ergonomics.",
    features: ["Adjustable Height", "Aluminum Build", "Portable", "Anti-Slip"],
    specs: {
      material: "Aluminum",
      compatibility: "Up to 17 inch laptops"
    }
  },
  {
    id: 7,
    name: "USB-C Hub",
    price: 59,
    image: "https://m.media-amazon.com/images/I/510+ulysfhL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "PortLink",
    category: "Accessories",
    rating: 4.3,
    reviews: 430,
    stock: 45,
    description: "Multiport USB-C hub with HDMI and card reader.",
    features: ["HDMI Output", "USB 3.0 Ports", "SD Card Reader", "Plug & Play"],
    specs: {
      ports: "6-in-1",
      connection: "USB-C"
    }
  },
  {
    id: 8,
    name: "Portable SSD",
    price: 119,
    image: "https://m.media-amazon.com/images/I/711-n+US0bL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "FlashPro",
    category: "Storage",
    rating: 4.6,
    reviews: 650,
    stock: 30,
    description: "High speed portable SSD for fast data transfers.",
    features: ["1TB Storage", "USB-C", "Shock Resistant", "Compact"],
    specs: {
      capacity: "1TB",
      speed: "1050MB/s"
    }
  },
  {
    id: 9,
    name: "Webcam HD",
    price: 69,
    image: "https://m.media-amazon.com/images/I/51gTkS5fHVL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "StreamCam",
    category: "Accessories",
    rating: 4.2,
    reviews: 520,
    stock: 38,
    description: "HD webcam ideal for video meetings and streaming.",
    features: ["1080p Video", "Built-in Mic", "Plug & Play", "Auto Focus"],
    specs: {
      resolution: "1080p",
      fps: "30fps"
    }
  },
  {
    id: 10,
    name: "Earbuds",
    price: 89,
    image: "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "AirBeat",
    category: "Audio",
    rating: 4.4,
    reviews: 1100,
    stock: 55,
    description: "Compact wireless earbuds with immersive sound.",
    features: ["Bluetooth 5.2", "Touch Control", "Noise Reduction", "18h Battery"],
    specs: {
      battery: "18 Hours",
      connection: "Bluetooth"
    }
  },

  {
    id: 11,
    name: "Portable Power Bank",
    price: 45,
    image: "https://m.media-amazon.com/images/I/71AHIPCb15L._AC_UY327_FMwebp_QL65_.jpg",
    brand: "ChargeMax",
    category: "Accessories",
    rating: 4.3,
    reviews: 760,
    stock: 80,
    description: "10000mAh power bank for charging devices on the go.",
    features: ["Fast Charging", "Dual USB", "Compact Design"],
    specs: { capacity: "10000mAh", output: "18W" }
  },
  {
    id: 12,
    name: "LED Desk Lamp",
    price: 35,
    image: "https://m.media-amazon.com/images/I/61NvUwJzp5L._AC_UL480_FMwebp_QL65_.jpg",
    brand: "BrightLite",
    category: "Home",
    rating: 4.2,
    reviews: 240,
    stock: 90,
    description: "Adjustable LED desk lamp with touch brightness control.",
    features: ["Touch Control", "Adjustable Arm", "Energy Efficient"],
    specs: { power: "10W", modes: "3 Brightness Modes" }
  },
  {
    id: 13,
    name: "Tablet Stand",
    price: 29,
    image: "https://m.media-amazon.com/images/I/71wp7A90xDL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "TabHold",
    category: "Accessories",
    rating: 4.1,
    reviews: 180,
    stock: 65,
    description: "Stable tablet stand ideal for desks and video calls.",
    features: ["Adjustable Angle", "Foldable", "Lightweight"],
    specs: { material: "Aluminum" }
  },
  {
    id: 14,
    name: "External Hard Drive",
    price: 109,
    image: "https://m.media-amazon.com/images/I/71D9ImsvEtL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "DataVault",
    category: "Storage",
    rating: 4.5,
    reviews: 540,
    stock: 42,
    description: "Reliable external hard drive for secure data backup.",
    features: ["2TB Storage", "USB 3.0", "Plug & Play"],
    specs: { capacity: "2TB", speed: "5400RPM" }
  },
  {
    id: 15,
    name: "Wireless Charger",
    price: 39,
    image: "https://m.media-amazon.com/images/I/410qG39NZkL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "ChargePad",
    category: "Accessories",
    rating: 4.3,
    reviews: 310,
    stock: 58,
    description: "Fast wireless charger compatible with most smartphones.",
    features: ["10W Fast Charging", "LED Indicator", "Anti Slip"],
    specs: { power: "10W", compatibility: "Qi Enabled Devices" }
  },
  {
    id: 16,
    name: "Gaming Headset",
    price: 89,
    image: "https://m.media-amazon.com/images/I/71BC1mi6uDL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "GameSound",
    category: "Gaming",
    rating: 4.6,
    reviews: 820,
    stock: 33,
    description: "Immersive surround sound gaming headset with mic.",
    features: ["7.1 Surround", "Noise Cancel Mic", "RGB Lighting"],
    specs: { connection: "USB", weight: "320g" }
  },
  {
    id: 17,
    name: "1080p Projector",
    price: 199,
    image: "https://m.media-amazon.com/images/I/614scKF+SeL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "ViewMax",
    category: "Electronics",
    rating: 4.4,
    reviews: 410,
    stock: 22,
    description: "Compact projector perfect for home entertainment.",
    features: ["Full HD", "HDMI Support", "Built-in Speaker"],
    specs: { resolution: "1080p", brightness: "6000 Lumens" }
  },
  {
    id: 18,
    name: "Smart LED Bulb",
    price: 25,
    image: "https://m.media-amazon.com/images/I/51T0RbnCy6L._AC_UL480_FMwebp_QL65_.jpg",
    brand: "GlowSmart",
    category: "Smart Home",
    rating: 4.2,
    reviews: 270,
    stock: 120,
    description: "Color changing smart bulb controllable via mobile app.",
    features: ["16M Colors", "Voice Control", "Energy Efficient"],
    specs: { power: "9W", connectivity: "WiFi" }
  },
  {
    id: 19,
    name: "VR Headset",
    price: 159,
    image: "https://m.media-amazon.com/images/I/61nkctF66PL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "VirtualX",
    category: "Gaming",
    rating: 4.3,
    reviews: 300,
    stock: 28,
    description: "Experience immersive virtual reality gaming.",
    features: ["Wide FOV", "Adjustable Lens", "Lightweight"],
    specs: { compatibility: "Android & iOS" }
  },
  {
    id: 20,
    name: "Portable Monitor",
    price: 179,
    image: "https://m.media-amazon.com/images/I/71JuZnct6TL._AC_UY327_FMwebp_QL65_.jpg",
    brand: "ScreenGo",
    category: "Electronics",
    rating: 4.5,
    reviews: 460,
    stock: 26,
    description: "Slim portable monitor for productivity on the go.",
    features: ["15.6 inch Display", "USB-C", "Ultra Thin"],
    specs: { resolution: "1080p", size: "15.6 inch" }
  }
];

export default products;

const clone = (value) => JSON.parse(JSON.stringify(value));

const createPriceLabel = (priceValue) => `Rs ${priceValue}`;

const initialProducts = [
  {
    id: 'prd-001',
    name: 'Mandua Cookies',
    shortLabel: 'Mandua',
    category: 'Millet Snacks',
    origin: 'Uttarakhand',
    weight: '250 gm',
    price: 'Rs 149',
    priceValue: 149,
    tagline: 'Traditional finger millet cookies with a modern tea-time crunch.',
    highlights: ['High Fiber', 'Village Crafted', 'No Preservatives'],
    tone: 'Health Focused',
    imageGradient: 'from-[#2D6A4F] via-[#7EA172] to-[#E2B870]',
    description:
      'Premium Himalayan Mandua Cookies crafted from nutrient-rich finger millet sourced from Uttarakhand farms. A wholesome snack with rustic flavor, clean ingredients, and everyday wellness appeal.',
  },
  {
    id: 'prd-002',
    name: 'Millet Namkeen',
    shortLabel: 'Namkeen',
    category: 'Millet Snacks',
    origin: 'Kumaon',
    weight: '200 gm',
    price: 'Rs 129',
    priceValue: 129,
    tagline: 'Savory roasted bites for conscious snacking with Himalayan character.',
    highlights: ['Roasted', 'Light Spice', 'Travel Friendly'],
    tone: 'Traditional',
    imageGradient: 'from-[#7D5A2F] via-[#D99A52] to-[#F6E0B7]',
    description:
      'Crunchy millet namkeen inspired by traditional hill-side recipes, balanced with gentle spices and a roasted finish for modern healthy snacking.',
  },
  {
    id: 'prd-003',
    name: 'Buransh Juice',
    shortLabel: 'Buransh',
    category: 'Heritage Drinks',
    origin: 'Himalayan Foothills',
    weight: '500 ml',
    price: 'Rs 199',
    priceValue: 199,
    tagline: 'A floral mountain refreshment made from the iconic rhododendron bloom.',
    highlights: ['Seasonal', 'Floral', 'Refreshing'],
    tone: 'Premium',
    imageGradient: 'from-[#7B1F3A] via-[#C84E75] to-[#F7C8D6]',
    description:
      'A vibrant Himalayan beverage made from buransh blossoms, celebrated for its refreshing taste, natural color, and premium regional identity.',
  },
  {
    id: 'prd-004',
    name: 'Apple Pickle',
    shortLabel: 'Apple',
    category: 'Pickles',
    origin: 'Ramgarh',
    weight: '300 gm',
    price: 'Rs 169',
    priceValue: 169,
    tagline: 'Sweet-tangy apple pickle with a spiced finish and homestyle warmth.',
    highlights: ['Small Batch', 'Tangy', 'Traditional'],
    tone: 'Traditional',
    imageGradient: 'from-[#8D2E21] via-[#D97732] to-[#F2C888]',
    description:
      'Handmade apple pickle blending orchard freshness with bold household spices for a regional preserve that feels both nostalgic and distinctive.',
  },
  {
    id: 'prd-005',
    name: 'Mango Pickle',
    shortLabel: 'Mango',
    category: 'Pickles',
    origin: 'Terai Belt',
    weight: '300 gm',
    price: 'Rs 159',
    priceValue: 159,
    tagline: 'A robust pickle with sun-cured mango pieces and a bold masala profile.',
    highlights: ['Bold Flavor', 'Sun Cured', 'Classic Recipe'],
    tone: 'Traditional',
    imageGradient: 'from-[#8A5D04] via-[#D9A51C] to-[#F6E58D]',
    description:
      'Sun-cured mango pickle created with a classic spice base that delivers authentic flavor and everyday versatility for Indian meals.',
  },
  {
    id: 'prd-006',
    name: 'Herbal Juice',
    shortLabel: 'Herbal',
    category: 'Wellness Drinks',
    origin: 'Hill Herbs',
    weight: '500 ml',
    price: 'Rs 189',
    priceValue: 189,
    tagline: 'A refreshing wellness blend inspired by clean mountain ingredients.',
    highlights: ['Detox Blend', 'Clean Label', 'Cooling'],
    tone: 'Health Focused',
    imageGradient: 'from-[#1F5B42] via-[#78A17F] to-[#D8E7D2]',
    description:
      'A wellness-oriented herbal drink built around gentle Himalayan botanicals, refreshing hydration, and a clean modern lifestyle story.',
  },
  {
    id: 'prd-007',
    name: 'Jhangora Kheer Mix',
    shortLabel: 'Jhangora',
    category: 'Dessert Mix',
    origin: 'Garhwal',
    weight: '180 gm',
    price: 'Rs 139',
    priceValue: 139,
    tagline: 'Barnyard millet dessert mix that brings a festive hill recipe home.',
    highlights: ['Quick Cook', 'Festive', 'Millet Rich'],
    tone: 'Premium',
    imageGradient: 'from-[#4E6240] via-[#CBA972] to-[#F3E4BF]',
    description:
      'An elegant dessert mix featuring Jhangora millet for a creamy Himalayan kheer experience with convenience and authenticity built in.',
  },
  {
    id: 'prd-008',
    name: 'Apricot Chutney',
    shortLabel: 'Apricot',
    category: 'Condiments',
    origin: 'Pithoragarh',
    weight: '220 gm',
    price: 'Rs 179',
    priceValue: 179,
    tagline: 'A bright fruit chutney with sweet tart notes and hill-side depth.',
    highlights: ['Fruit Forward', 'Artisanal', 'Giftable'],
    tone: 'Premium',
    imageGradient: 'from-[#9C5223] via-[#E09547] to-[#F7D8A6]',
    description:
      'Artisanal apricot chutney that balances natural sweetness, gentle spice, and premium regional storytelling for gifting and gourmet meals.',
  },
  {
    id: 'prd-009',
    name: 'Ragi Energy Bites',
    shortLabel: 'Energy',
    category: 'Healthy Snacks',
    origin: 'Village Co-op',
    weight: '180 gm',
    price: 'Rs 149',
    priceValue: 149,
    tagline: 'Soft energy bites made for active modern families and mindful snacking.',
    highlights: ['Protein Rich', 'School Snack', 'No Fry'],
    tone: 'Health Focused',
    imageGradient: 'from-[#5F3F2A] via-[#C37B4E] to-[#F1CFB5]',
    description:
      'Portable ragi snack bites designed for sustained energy, fiber, and a natural ingredient story rooted in local farming communities.',
  },
  {
    id: 'prd-010',
    name: 'Sea Buckthorn Shot',
    shortLabel: 'Buckthorn',
    category: 'Wellness Drinks',
    origin: 'High Altitude',
    weight: '120 ml',
    price: 'Rs 129',
    priceValue: 129,
    tagline: "A bold immunity shot highlighting one of the Himalaya's most vibrant fruits.",
    highlights: ['Vitamin Rich', 'Functional', 'Modern'],
    tone: 'Premium',
    imageGradient: 'from-[#A34711] via-[#DE7C2D] to-[#F6C485]',
    description:
      'A premium wellness shot featuring sea buckthorn for a sharp, modern, nutrient-forward product with strong health positioning.',
  },
];

const initialSalesSeries = [
  { name: 'Jan', revenue: 22000, orders: 80 },
  { name: 'Feb', revenue: 32000, orders: 120 },
  { name: 'Mar', revenue: 28000, orders: 106 },
  { name: 'Apr', revenue: 41000, orders: 149 },
  { name: 'May', revenue: 51000, orders: 182 },
  { name: 'Jun', revenue: 85000, orders: 250 },
];

const initialRawMaterials = [
  {
    id: 'rm-001',
    batch: 'A101',
    item: 'Mandua Flour',
    entryDate: '2026-06-01',
    expiryDate: '2026-07-20',
    quantity: '40 kg',
  },
  {
    id: 'rm-002',
    batch: 'A102',
    item: 'Apple Pulp',
    entryDate: '2026-06-05',
    expiryDate: '2026-06-19',
    quantity: '65 kg',
  },
  {
    id: 'rm-003',
    batch: 'A103',
    item: 'Buransh Extract',
    entryDate: '2026-06-08',
    expiryDate: '2026-06-16',
    quantity: '25 L',
  },
  {
    id: 'rm-004',
    batch: 'A104',
    item: 'Jaggery',
    entryDate: '2026-05-28',
    expiryDate: '2026-08-05',
    quantity: '50 kg',
  },
];

const initialFinishedGoods = [
  {
    id: 'fg-001',
    product: 'Mandua Cookies',
    productionDate: '2026-06-12',
    shelfLifeDays: 90,
    stock: '400 packs',
  },
  {
    id: 'fg-002',
    product: 'Buransh Juice',
    productionDate: '2026-06-10',
    shelfLifeDays: 120,
    stock: '180 bottles',
  },
  {
    id: 'fg-003',
    product: 'Apple Pickle',
    productionDate: '2026-05-30',
    shelfLifeDays: 180,
    stock: '96 jars',
  },
  {
    id: 'fg-004',
    product: 'Herbal Juice',
    productionDate: '2026-06-09',
    shelfLifeDays: 100,
    stock: '210 bottles',
  },
];

const initialPackagingBriefs = [
  {
    id: 'millet-snacks',
    title: 'Millet Snacks',
    mood: 'Premium Organic',
    colors: ['Earth Brown', 'Forest Green', 'Millet Beige'],
    typography: 'Modern minimal serif heading with clean readable support text.',
    material: 'Matte kraft paper pouch with inner freshness lining.',
    labelHierarchy: ['Brand mark', 'Product name', 'Nutritional benefit', 'Farmer origin story', 'QR reorder strip'],
    labelDetails: [
      'Highlight Himalayan millet sourcing and fiber-rich nutrition.',
      'Use a transparent strip to reveal the product texture.',
      'Include QR code for farmer story and WhatsApp reorder journey.',
    ],
  },
  {
    id: 'fruit-pickles',
    title: 'Fruit Pickles',
    mood: 'Traditional Himalayan',
    colors: ['Warm Red', 'Turmeric Yellow', 'Spice Orange'],
    typography: 'Expressive heritage title paired with compact product details.',
    material: 'Reusable glass jar with textured label and tamper-evident seal.',
    labelHierarchy: ['Brand seal', 'Variant name', 'Flavor note', 'Serving cues', 'Batch authenticity sticker'],
    labelDetails: [
      'Feature orchard origin, small-batch note, and serving pairings.',
      'Emphasize homestyle recipe and handcrafted process on the lid tag.',
      'Use festive illustrated borders inspired by hill artisan motifs.',
    ],
  },
];

let products = clone(initialProducts);
let salesSeries = clone(initialSalesSeries);
let rawMaterials = clone(initialRawMaterials);
let finishedGoods = clone(initialFinishedGoods);
let packagingBriefs = clone(initialPackagingBriefs);

const getDaysLeft = (dateString) => {
  const today = new Date();
  const targetDate = new Date(dateString);
  const difference = targetDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
  return Math.ceil(difference / (1000 * 60 * 60 * 24));
};

const getStatusLabel = (daysLeft) => {
  if (daysLeft < 7) {
    return 'Critical';
  }
  if (daysLeft < 15) {
    return 'Warning';
  }
  return 'Safe';
};

const getFinishedExpiryDate = (productionDate, shelfLifeDays) => {
  const date = new Date(productionDate);
  date.setDate(date.getDate() + Number(shelfLifeDays || 0));
  return date.toISOString().slice(0, 10);
};

const buildCategoryMix = () => {
  const counts = products.reduce((summary, product) => {
    const key = product.category;
    summary[key] = (summary[key] ?? 0) + 1;
    return summary;
  }, {});

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

const buildInventoryStatus = () => {
  const statuses = [
    ...rawMaterials.map((item) => getStatusLabel(getDaysLeft(item.expiryDate))),
    ...finishedGoods.map((item) =>
      getStatusLabel(getDaysLeft(getFinishedExpiryDate(item.productionDate, item.shelfLifeDays))),
    ),
  ];

  return ['Safe', 'Warning', 'Critical'].map((label) => ({
    name: label,
    value: statuses.filter((status) => status === label).length,
  }));
};

const buildDashboardStats = () => {
  const latestSales = salesSeries.at(-1) ?? { revenue: 0, orders: 0 };
  const warningCount = buildInventoryStatus().find((item) => item.name === 'Critical')?.value ?? 0;

  return [
    {
      label: 'Total Products',
      value: String(products.length),
      delta: `${new Set(products.map((product) => product.category)).size} active categories`,
    },
    {
      label: 'Monthly Revenue',
      value: createPriceLabel(latestSales.revenue),
      delta: '+18% from last month',
    },
    {
      label: 'Waste Alerts',
      value: `${warningCount}`,
      delta: warningCount ? 'Critical inventory needs attention' : 'No critical stock today',
    },
    {
      label: 'Orders',
      value: String(latestSales.orders),
      delta: 'Direct customer orders this month',
    },
  ];
};

export const getProducts = () => clone(products);

export const getProductById = (productId) => clone(products.find((product) => product.id === productId) ?? null);

export const searchProducts = (query) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return [];
  }

  return clone(
    products.filter((product) =>
      [
        product.name,
        product.shortLabel,
        product.category,
        product.origin,
        product.tagline,
        product.description,
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    ),
  );
};

export const addProduct = (payload) => {
  const priceValue = Number(payload.priceValue);
  const product = {
    ...payload,
    id: `prd-${Date.now()}`,
    priceValue,
    price: createPriceLabel(priceValue),
    highlights: payload.highlights.map((item) => item.trim()).filter(Boolean),
  };

  products = [product, ...products];
  return clone(product);
};

export const updateProduct = (productId, payload) => {
  const existingProduct = products.find((product) => product.id === productId);
  if (!existingProduct) {
    return null;
  }

  const nextProduct = {
    ...existingProduct,
    ...payload,
    id: productId,
    priceValue: Number(payload.priceValue ?? existingProduct.priceValue),
  };

  nextProduct.price = createPriceLabel(nextProduct.priceValue);
  nextProduct.highlights = Array.isArray(nextProduct.highlights)
    ? nextProduct.highlights.map((item) => item.trim()).filter(Boolean)
    : existingProduct.highlights;

  products = products.map((product) => (product.id === productId ? nextProduct : product));
  return clone(nextProduct);
};

export const removeProduct = (productId) => {
  const existingProduct = products.find((product) => product.id === productId);
  if (!existingProduct) {
    return false;
  }

  products = products.filter((product) => product.id !== productId);
  return true;
};

export const getDashboard = () => ({
  stats: buildDashboardStats(),
  salesSeries: clone(salesSeries),
  categoryMix: buildCategoryMix(),
  inventoryStatus: buildInventoryStatus(),
});

export const getInventory = () => ({
  rawMaterials: clone(rawMaterials),
  finishedGoods: clone(finishedGoods),
});

export const getRawMaterials = () => clone(rawMaterials);

export const addRawMaterial = (payload) => {
  const entry = {
    ...payload,
    id: `rm-${Date.now()}`,
  };

  rawMaterials = [entry, ...rawMaterials];
  return clone(entry);
};

export const updateRawMaterial = (entryId, payload) => {
  const existingEntry = rawMaterials.find((entry) => entry.id === entryId);
  if (!existingEntry) {
    return null;
  }

  const updatedEntry = {
    ...existingEntry,
    ...payload,
    id: entryId,
  };

  rawMaterials = rawMaterials.map((entry) => (entry.id === entryId ? updatedEntry : entry));
  return clone(updatedEntry);
};

export const removeRawMaterial = (entryId) => {
  const existingEntry = rawMaterials.find((entry) => entry.id === entryId);
  if (!existingEntry) {
    return false;
  }

  rawMaterials = rawMaterials.filter((entry) => entry.id !== entryId);
  return true;
};

export const getFinishedGoods = () => clone(finishedGoods);

export const addFinishedGood = (payload) => {
  const entry = {
    ...payload,
    id: `fg-${Date.now()}`,
    shelfLifeDays: Number(payload.shelfLifeDays),
  };

  finishedGoods = [entry, ...finishedGoods];
  return clone(entry);
};

export const updateFinishedGood = (entryId, payload) => {
  const existingEntry = finishedGoods.find((entry) => entry.id === entryId);
  if (!existingEntry) {
    return null;
  }

  const updatedEntry = {
    ...existingEntry,
    ...payload,
    id: entryId,
    shelfLifeDays: Number(payload.shelfLifeDays ?? existingEntry.shelfLifeDays),
  };

  finishedGoods = finishedGoods.map((entry) => (entry.id === entryId ? updatedEntry : entry));
  return clone(updatedEntry);
};

export const removeFinishedGood = (entryId) => {
  const existingEntry = finishedGoods.find((entry) => entry.id === entryId);
  if (!existingEntry) {
    return false;
  }

  finishedGoods = finishedGoods.filter((entry) => entry.id !== entryId);
  return true;
};

export const getPackagingBriefs = () => clone(packagingBriefs);

export const getAiSamples = () =>
  clone(
    products.map((product) => ({
      name: product.name,
      weight: product.weight,
      tone: product.tone,
      description: product.description,
    })),
  );

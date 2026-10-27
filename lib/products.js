// ✏️ PRODUCT DATA — edit here to add/remove products, prices and stock.
// images: array of paths in /public (or full URL). Use [] to show a "Photo" placeholder.
// inStock: false => "Stock out" card (shows "Notify me").
// variants: price options (pack size). oldPrice optional (shows discount).

export const categories = [
  { id: 'khejur-gur', label: { bn: 'খেজুর গুড়', en: 'Khejur Gur' } },
  { id: 'aam', label: { bn: 'আম', en: 'Mango' } },
  { id: 'achar', label: { bn: 'আচার', en: 'Achar (Pickle)' } },
];

const mangoBenefits = {
  bn: ['সরাসরি বাগান থেকে সংগ্রহ', 'কোনো কেমিক্যাল ব্যবহার করা হয় না', 'ক্যাশ অন ডেলিভারি, হাতে পেয়ে টাকা'],
  en: ['Picked straight from the orchard', 'No chemicals or artificial ripening', 'Cash on delivery, pay when it arrives'],
};

export const products = [
  // ---------------- AAM (Mango) — data from the live site ----------------
  {
    slug: 'amropali', category: 'aam', sku: 'RB-AM-001', inStock: true, bestseller: true, rating: 4.8, reviews: 700,
    name: { bn: 'আম্রপালি আম', en: 'Amropali Mango' },
    short: { bn: 'মিষ্টি ও সুস্বাদু আম্রপালি সরাসরি বাগান থেকে', en: 'Sweet, juicy Amropali straight from the orchard' },
    badge: { bn: 'আমের রাণী', en: 'Queen of mangoes' },
    images: ['/images/amropali-1.jpg', '/images/amropali-2.jpg', '/images/amropali-3.jpg', '/images/amropali-4.jpg'],
    variants: [
      { id: '11kg', label: { bn: '১১ কেজি', en: '11 kg' }, price: 1320, popular: false },
      { id: '22kg', label: { bn: '২২ কেজি', en: '22 kg' }, price: 2640, popular: true },
    ],
    benefits: mangoBenefits,
    description: {
      bn: 'আমাদের আম্রপালি সম্পূর্ণ প্রাকৃতিকভাবে বাগান থেকে সংগ্রহ করা হয়। কোনো কেমিক্যাল ব্যবহার করা হয় না। হাতে বাছাই করে সর্বোচ্চ সতেজতা নিশ্চিত করা হয়।\n\nআমের সিজনের সবথেকে সেরা এই আম একবার খেলে সিজন শেষে আবার খুঁজবেন, গ্যারান্টি দিয়ে বললাম।',
      en: 'Our Amropali is harvested naturally from the orchard with no chemicals. Every mango is hand-picked to keep it as fresh as possible.\n\nOne of the best mangoes of the season — once you taste it, you will be looking for it again.',
    },
    why: {
      bn: ['একদম তাজা বাগান থেকে সংগ্রহ', 'কোনো কেমিক্যাল ব্যবহার করা হয় না', 'দ্রুত হোম ডেলিভারি', 'সেরা দামে গ্যারান্টি'],
      en: ['Fresh from the orchard', 'No chemicals used', 'Fast home delivery', 'Best price guarantee'],
    },
    how: { bn: 'সরাসরি কেটে খান, অথবা ঠান্ডা করে শেক ও ডেজার্টে ব্যবহার করুন।', en: 'Eat fresh, chill it, or blend into shakes and desserts.' },
    details: { origin: { bn: 'রাজশাহী', en: 'Rajshahi' }, shelf: { bn: '৫–৭ দিন', en: '5–7 days' }, storage: { bn: 'ঠান্ডা ও শুকনো স্থানে', en: 'Cool, dry place' } },
  },
  {
    slug: 'himsagor', category: 'aam', sku: 'RB-AM-002', inStock: false, bestseller: false, rating: 4.8, reviews: 320,
    name: { bn: 'হিমসাগর আম', en: 'Himsagor Mango' },
    short: { bn: 'মিষ্টি স্বাদের বিখ্যাত হিমসাগর আম', en: 'The famously sweet Himsagor mango' },
    badge: { bn: 'আমের রাজা', en: 'King of mangoes' },
    images: ['/images/himsagor-1.webp', '/images/himsagor-2.webp', '/images/himsagor-3.webp', '/images/himsagor-4.webp'],
    variants: [
      { id: '11kg', label: { bn: '১১ কেজি', en: '11 kg' }, price: 1320 },
      { id: '22kg', label: { bn: '২২ কেজি', en: '22 kg' }, price: 2640, popular: true },
    ],
    benefits: mangoBenefits,
    description: {
      bn: 'হিমসাগর আম তার অসাধারণ মিষ্টতা এবং নরম টেক্সচারের জন্য বিখ্যাত। রাজশাহীর এই হিমসাগর সরাসরি বাগান থেকে সংগ্রহ করা হয়।',
      en: 'Himsagor is loved for its remarkable sweetness and soft texture, collected straight from our Rajshahi orchard.',
    },
    why: { bn: ['কড়া মিষ্টি স্বাদ', 'কেমিক্যালমুক্ত গ্যারান্টি', 'ফ্রেশ বাগান থেকে সংগ্রহ', 'নিরাপদ প্যাকেজিং'], en: ['Rich sweet taste', 'Chemical-free guarantee', 'Fresh from the orchard', 'Safe packaging'] },
    how: { bn: 'সরাসরি কেটে খান বা ঠান্ডা করে পরিবেশন করুন।', en: 'Eat fresh or serve chilled.' },
    details: { origin: { bn: 'রাজশাহী', en: 'Rajshahi' }, shelf: { bn: '৫–৭ দিন', en: '5–7 days' }, storage: { bn: 'ঠান্ডা ও শুকনো স্থানে', en: 'Cool, dry place' } },
  },
  {
    slug: 'nakfojli', category: 'aam', sku: 'RB-AM-003', inStock: false, bestseller: false, rating: 4.7, reviews: 210,
    name: { bn: 'নাকফজলি আম', en: 'Nak Fojli Mango' },
    short: { bn: 'বড় আকৃতির ও রসালো নাকফজলি আম', en: 'Large, juicy Nak Fojli mango' },
    badge: null,
    images: ['/images/nakfojli-1.jpg', '/images/nakfojli-2.jpg', '/images/nakfojli-3.jpg', '/images/nakfojli-4.jpg'],
    variants: [
      { id: '10kg', label: { bn: '১০ কেজি', en: '10 kg' }, price: 990 },
      { id: '20kg', label: { bn: '২০ কেজি', en: '20 kg' }, price: 1980, popular: true },
    ],
    benefits: mangoBenefits,
    description: {
      bn: 'নাকফজলি আম তার বড় আকার এবং অতিরিক্ত রসের জন্য বিখ্যাত। আমরা সরাসরি বাগান থেকে সংগ্রহ করি, কোনো কৃত্রিম রিপেনিং ছাড়াই।',
      en: 'Nak Fojli is known for its large size and extra juice. Collected directly from the orchard without artificial ripening.',
    },
    why: { bn: ['প্রিমিয়াম কোয়ালিটি আম', 'সরাসরি বাগান থেকে সংগ্রহ', 'দ্রুত ডেলিভারি', 'ফ্রেশ গ্যারান্টি'], en: ['Premium quality', 'Direct from the orchard', 'Fast delivery', 'Freshness guarantee'] },
    how: { bn: 'পাকা আম কেটে খান অথবা জুস বানিয়ে নিন।', en: 'Slice when ripe or make fresh juice.' },
    details: { origin: { bn: 'রাজশাহী', en: 'Rajshahi' }, shelf: { bn: '৫–৭ দিন', en: '5–7 days' }, storage: { bn: 'ঠান্ডা ও শুকনো স্থানে', en: 'Cool, dry place' } },
  },
  {
    slug: 'langra', category: 'aam', sku: 'RB-AM-004', inStock: false, bestseller: false, rating: 4.8, reviews: 180,
    name: { bn: 'ল্যাংড়া আম', en: 'Langra Mango' },
    short: { bn: 'সুগন্ধি ও মিষ্টি ল্যাংড়া আম', en: 'Fragrant and sweet Langra mango' },
    badge: null,
    images: [], // TODO: add Langra photos
    variants: [
      { id: '12kg', label: { bn: '১২ কেজি', en: '12 kg' }, price: 3000 },
      { id: '24kg', label: { bn: '২৪ কেজি', en: '24 kg' }, price: 5000, popular: true },
    ],
    benefits: mangoBenefits,
    description: { bn: 'রাজশাহীর বাগান থেকে সংগ্রহ করা সুগন্ধি ও মিষ্টি ল্যাংড়া আম।', en: 'Fragrant, sweet Langra mangoes collected from our Rajshahi orchard.' },
    why: { bn: ['সুগন্ধি ও মিষ্টি', 'কেমিক্যালমুক্ত', 'দ্রুত ডেলিভারি'], en: ['Fragrant and sweet', 'Chemical-free', 'Fast delivery'] },
    how: { bn: 'কেটে খান বা ঠান্ডা করে পরিবেশন করুন।', en: 'Eat fresh or serve chilled.' },
    details: { origin: { bn: 'রাজশাহী', en: 'Rajshahi' }, shelf: { bn: '৫–৭ দিন', en: '5–7 days' }, storage: { bn: 'ঠান্ডা ও শুকনো স্থানে', en: 'Cool, dry place' } },
  },

  // ---------------- KHEJUR GUR — ⚠️ PLACEHOLDER prices/photos, please update ----------------
  ...[
    { slug: 'khejur-jhola-gur', sku: 'RB-KG-001', bn: 'খেজুরের ঝোলা গুড়', en: 'Khejur Jhola Gur (Liquid)', sbn: 'নলেন ঝোলা গুড়, খাঁটি ও সুগন্ধি', sen: 'Pure, aromatic liquid date-palm jaggery', best: true, v: [['500g', '৫০০ গ্রাম', '500 g', 380], ['1kg', '১ কেজি', '1 kg', 720, 800]] },
    { slug: 'khejur-patali-gur', sku: 'RB-KG-002', bn: 'খেজুরের পাটালি গুড়', en: 'Khejur Patali Gur (Solid)', sbn: 'ঘন ও দানাদার পাটালি গুড়', sen: 'Dense, solid date-palm jaggery blocks', best: true, v: [['500g', '৫০০ গ্রাম', '500 g', 420], ['1kg', '১ কেজি', '1 kg', 800, 900]] },
    { slug: 'khejur-gur-powder', sku: 'RB-KG-003', bn: 'খেজুর গুড়ের গুঁড়া', en: 'Khejur Gur Powder', sbn: 'চা ও পিঠার জন্য গুঁড়া গুড়', sen: 'Powdered jaggery for tea and pitha', best: false, v: [['500g', '৫০০ গ্রাম', '500 g', 350], ['1kg', '১ কেজি', '1 kg', 680]] },
    { slug: 'khejur-gur-combo', sku: 'RB-KG-004', bn: 'খেজুর গুড় কম্বো', en: 'Khejur Gur Combo', sbn: 'ঝোলা ও পাটালি গুড় একসাথে', sen: 'Liquid and solid jaggery together', best: false, v: [['2kg', '২ কেজি', '2 kg', 1450, 1600]] },
  ].map(p => ({
    slug: p.slug, category: 'khejur-gur', sku: p.sku, inStock: true, bestseller: p.best, rating: 4.8, reviews: 0,
    name: { bn: p.bn, en: p.en }, short: { bn: p.sbn, en: p.sen }, badge: null,
    images: [], // TODO: add photos
    variants: p.v.map(([id, bn, en, price, oldPrice]) => ({ id, label: { bn, en }, price, oldPrice })),
    benefits: {
      bn: ['১০০% খাঁটি খেজুরের রস থেকে তৈরি', 'কোনো চিনি বা কেমিক্যাল মেশানো নেই', 'ক্যাশ অন ডেলিভারি'],
      en: ['Made from 100% pure date-palm sap', 'No added sugar or chemicals', 'Cash on delivery'],
    },
    description: {
      bn: 'সরাসরি খেজুরের রস জ্বাল দিয়ে তৈরি খাঁটি গুড়। পিঠা, পায়েস, চা কিংবা সরাসরি খাওয়ার জন্য দারুণ।',
      en: 'Pure jaggery made by slowly boiling fresh date-palm sap. Perfect for pitha, payesh, tea or on its own.',
    },
    why: { bn: ['খাঁটি খেজুরের রস', 'ঐতিহ্যবাহী পদ্ধতিতে তৈরি', 'নিরাপদ প্যাকেজিং'], en: ['Pure date-palm sap', 'Traditionally made', 'Safe packaging'] },
    how: { bn: 'পিঠা, পায়েস ও চায়ে চিনির বদলে ব্যবহার করুন।', en: 'Use instead of sugar in pitha, payesh and tea.' },
    details: { origin: { bn: 'বাংলাদেশ', en: 'Bangladesh' }, shelf: { bn: '৬ মাস', en: '6 months' }, storage: { bn: 'ঠান্ডা ও শুকনো স্থানে', en: 'Cool, dry place' } },
  })),

  // ---------------- ACHAR (Pickle) — data from the live /acher page ----------------
  ...[
    { slug: 'achar-combo', sku: 'RB-AC-001', bn: 'তেঁতুল, বরই ও মিক্সড আচার কম্বো (১.২ কেজি)', en: 'Tamarind-Jujube Mixed Achar Combo (1.2kg)', sbn: 'টক-ঝাল-মিষ্টি সকল স্পেশাল আচার', sen: 'All our special sour-spicy-sweet pickles', best: true, v: [['1.2kg', '১.২ কেজি', '1.2 kg', 999, 1200]], img: 'https://i.ibb.co.com/qM9xkTGX/Combo-A.png' },
    { slug: 'tetul-achar', sku: 'RB-AC-002', bn: 'তেঁতুল আচার (৪০০ গ্রাম)', en: 'Tamarind Achar (400g)', sbn: 'টক-মিষ্টি স্বাদে মুখরোচক তেঁতুল আচার', sen: 'Tangy-sweet tamarind pickle', best: false, v: [['400g', '৪০০ গ্রাম', '400 g', 250]] },
    { slug: 'boroi-achar', sku: 'RB-AC-003', bn: 'বরই আচার (৪০০ গ্রাম)', en: 'Jujube (Boroi) Achar (400g)', sbn: 'টক-মিষ্টি স্বাদে অতুলনীয় সুস্বাদু বরই আচার', sen: 'Tangy-sweet jujube pickle', best: false, v: [['400g', '৪০০ গ্রাম', '400 g', 220]] },
    { slug: 'mixed-achar', sku: 'RB-AC-004', bn: 'তেঁতুল-বরই মিক্সড আচার (৪০০ গ্রাম)', en: 'Tamarind-Jujube Mixed Achar (400g)', sbn: 'টক-ঝাল-মিষ্টি মিশেলে তৈরি স্পেশাল আচার', sen: 'Special sour-spicy-sweet blend', best: false, v: [['400g', '৪০০ গ্রাম', '400 g', 300]] },
  ].map(p => ({
    slug: p.slug, category: 'achar', sku: p.sku, inStock: true, bestseller: p.best, rating: 4.8, reviews: p.best ? 167 : 0,
    name: { bn: p.bn, en: p.en }, short: { bn: p.sbn, en: p.sen },
    badge: p.best ? { bn: 'এক অর্ডারে সব স্বাদ', en: 'All flavours in one order' } : null,
    images: p.img ? [p.img] : [], // TODO: add photos
    variants: p.v.map(([id, bn, en, price, oldPrice]) => ({ id, label: { bn, en }, price, oldPrice })),
    benefits: {
      bn: ['ঘরোয়া মসলায় তৈরি, কোনো প্রিজারভেটিভ নেই', 'টক-ঝাল-মিষ্টি অসাধারণ স্বাদ', 'ক্যাশ অন ডেলিভারি'],
      en: ['Homemade spices, no preservatives', 'Perfect sour-spicy-sweet taste', 'Cash on delivery'],
    },
    description: {
      bn: 'রাজশাহীর খাঁটি আচার — মায়ের হাতের স্বাদের মতো ঘরোয়া পদ্ধতিতে তৈরি। কোনো প্রিজারভেটিভ ছাড়াই।',
      en: 'Authentic Rajshahi achar, made the homemade way with no preservatives.',
    },
    why: { bn: ['ঘরোয়া রেসিপি', 'প্রিজারভেটিভমুক্ত', 'নিরাপদ প্যাকেজিং'], en: ['Homemade recipe', 'Preservative-free', 'Safe packaging'] },
    how: { bn: 'ভাত, খিচুড়ি বা পরোটার সাথে খান।', en: 'Enjoy with rice, khichuri or paratha.' },
    details: { origin: { bn: 'রাজশাহী', en: 'Rajshahi' }, shelf: { bn: '৬ মাস', en: '6 months' }, storage: { bn: 'ঠান্ডা ও শুকনো স্থানে', en: 'Cool, dry place' } },
  })),
];

// Current selling season: only khejur gur is available; mango and achar are out of stock.
products.forEach(p => { p.inStock = p.category === 'khejur-gur'; });

export const getProduct = slug => products.find(p => p.slug === slug);
export const minPrice = p => Math.min(...p.variants.map(v => v.price));
export const maxPrice = p => Math.max(...p.variants.map(v => v.price));
export const discountPct = (variant) =>
  variant.oldPrice && variant.oldPrice > variant.price ? Math.round((1 - variant.price / variant.oldPrice) * 100) : 0;
export const maxDiscount = p => Math.max(0, ...p.variants.map(discountPct));

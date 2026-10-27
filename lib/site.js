// ✏️ Site-wide settings. Change contact info here and it updates everywhere.
export const site = {
  name: 'Rifi Bazar',
  phone: '+8801XXXXXXXXX', // TODO: put the real phone number
  whatsapp: '8801XXXXXXXXX', // TODO: WhatsApp number, digits only with country code
  email: 'info@rifibazar.com', // TODO
  address: { bn: 'রাজশাহী, বাংলাদেশ', en: 'Rajshahi, Bangladesh' }, // TODO: full address
  gtmId: 'GTM-P58XPPDQ', // same GTM container as the live site
  // Delivery areas shown at checkout. Live site = free delivery nationwide (all 0).
  deliveryAreas: [
    { id: 'dhaka', charge: 0, label: { bn: 'ঢাকা শহরের ভিতরে', en: 'Inside Dhaka city' } },
    { id: 'dhaka-out', charge: 0, label: { bn: 'ঢাকার বাইরে (শহর এলাকা)', en: 'Outside Dhaka city' } },
    { id: 'other', charge: 0, label: { bn: 'ঢাকার বাইরে (অন্যান্য জেলা)', en: 'Outside Dhaka (other districts)' } },
  ],
  // Coupons: { CODE: percentOff }
  coupons: {},
  // Brand logos strip on the home page. Add { name, src } items to show the section.
  brands: [],
  reviews: [
    { text: 'আচারের স্বাদটা একদম অসাধারণ, মনে হচ্ছে যেন মায়ের হাতের তৈরি আচার খাচ্ছি। ১০/১০!', name: 'তাহমিদ খান', place: 'ঢাকা' },
    { text: 'তেঁতুল আচারের টক-মিষ্টি ভাবটা জাস্ট দারুণ! জিভে জল আসার মতো স্বাদ, সবার ট্রাই করা উচিত', name: 'ফারিহা আক্তার', place: 'চট্টগ্রাম' },
    { text: 'বাজারে সস্তা আচারের চেয়ে আপনাদেরটা অনেক গুণ ভালো। কোনো প্রিজারভেটিভ নেই সেটা খেয়েই বোঝা যাচ্ছে।', name: 'মিজানুর রহমান', place: 'খুলনা' },
  ],
};

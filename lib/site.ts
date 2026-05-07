/**
 * Single source of truth for business / contact info.
 * Edit this file to update the entire site (header, footer, schema, contact page).
 *
 * Phone, email, address, and social handles are placeholders — replace before launch.
 */

export const siteConfig = {
  name: 'Mediterra Fresh',
  legalName: 'Mediterra Fresh SARL',
  tagline: {
    fr: 'Fruits & légumes frais — du producteur marocain à votre cuisine',
    en: 'Fresh fruits & vegetables — from Moroccan growers to your kitchen',
    ar: 'فواكه وخضروات طازجة — من المنتج المغربي إلى مطبخك',
  },
  description: {
    fr: "Fournisseur B2B de fruits et légumes frais à Agadir. Hôtels, restaurants, pâtisseries, riads. Chaîne du froid maîtrisée, livraison quotidienne.",
    en: 'B2B fresh produce supplier in Agadir. Hotels, restaurants, pâtisseries, riads. Cold chain controlled, daily delivery.',
    ar: 'مورد B2B للفواكه والخضروات الطازجة في أكادير. فنادق، مطاعم، حلويات.',
  },
  url: 'https://mediterra-fresh.com',
  // Replace with real numbers before launch
  phone: '+212600000000',
  phoneDisplay: '+212 6 00 00 00 00',
  whatsapp: '212600000000', // E.164 without "+" for wa.me links
  email: 'contact@mediterra-fresh.com',
  emailSales: 'commandes@mediterra-fresh.com',
  address: {
    street: 'Zone industrielle Tassila',
    city: 'Agadir',
    postal: '80000',
    country: 'Maroc',
    countryCode: 'MA',
  },
  // GPS coords for Agadir (placeholder)
  geo: { lat: 30.4278, lon: -9.5981 },
  hours: {
    fr: 'Lun – Sam, 06h00 – 18h00',
    en: 'Mon – Sat, 6:00 AM – 6:00 PM',
    ar: 'الإثنين – السبت، 06:00 – 18:00',
  },
  // Service area (cities) — also used for LocalBusiness areaServed
  deliveryZones: [
    { city: 'Agadir', radiusKm: 30, note: '' },
    { city: 'Inezgane', radiusKm: 0, note: 'inclus' },
    { city: 'Aït Melloul', radiusKm: 0, note: 'inclus' },
    { city: 'Taroudant', radiusKm: 0, note: 'sur demande' },
    { city: 'Essaouira', radiusKm: 0, note: 'sur demande' },
  ] as ReadonlyArray<{ city: string; radiusKm: number; note: string }>,
  social: {
    instagram: 'https://instagram.com/mediterrafresh',
    facebook: 'https://facebook.com/mediterrafresh',
    linkedin: 'https://linkedin.com/company/mediterrafresh',
  },
  // Legal placeholders — replace with real values
  legal: {
    rc: 'RC Agadir 000000',
    ice: '000000000000000',
    if: '00000000',
    cnss: '000000',
    patente: '00000000',
    cndp: 'Déclaration CNDP n° D-XXX/2025',
  },
} as const;

export type SiteConfig = typeof siteConfig;

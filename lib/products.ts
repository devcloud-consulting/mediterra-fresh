/**
 * Product catalogue data.
 * Names/descriptions are translation keys — actual labels live in messages/{locale}.json
 * under `catalogue.categories.{slug}` and per-product `name`/`origin` are inline (multilingual).
 *
 * Add or edit products by extending the arrays below. Photos go in /public/images/products/<slug>.jpg
 * (we ship CSS-gradient placeholders if a photo is missing).
 */

export type CategorySlug =
  | 'agrumes'
  | 'fruits-rouges'
  | 'fruits-exotiques'
  | 'fruits-saison'
  | 'legumes-feuilles'
  | 'legumes-racines'
  | 'herbes';

export type Locale = 'fr' | 'en' | 'ar';

export type Product = {
  slug: string;
  category: CategorySlug;
  name: Record<Locale, string>;
  origin: Record<Locale, string>;
  calibres: string[]; // e.g. ['56–63 mm', '63–70 mm']
  packaging: Record<Locale, string>;
  /** Months in season, 1–12 */
  seasonality: number[];
  organic?: boolean;
  globalgap?: boolean;
  /** Hex color for placeholder gradient when photo missing */
  accent?: string;
  /** Short marketing description for the product detail page. */
  description?: Record<Locale, string>;
  /** Recommended uses — typically directed at chefs / pâtissiers. */
  uses?: Record<Locale, string>;
  /** Storage / handling tip (cold chain, ripening, shelf-life). */
  handling?: Record<Locale, string>;
};

export const categories: {
  slug: CategorySlug;
  accent: string;
  image: string;
}[] = [
  { slug: 'agrumes', accent: '#f59e0b', image: '/images/categories/cat-agrumes.jpg' },
  { slug: 'fruits-rouges', accent: '#dc2626', image: '/images/categories/cat-fruits-rouges.jpg' },
  { slug: 'fruits-exotiques', accent: '#a16207', image: '/images/categories/cat-fruits-exotiques.jpg' },
  { slug: 'fruits-saison', accent: '#84cc16', image: '/images/categories/cat-fruits-saison.jpg' },
  { slug: 'legumes-feuilles', accent: '#16a34a', image: '/images/categories/cat-legumes-feuilles.jpg' },
  { slug: 'legumes-racines', accent: '#92400e', image: '/images/categories/cat-legumes-racines.jpg' },
  { slug: 'herbes', accent: '#15803d', image: '/images/categories/cat-herbes.jpg' },
];

export function categoryImage(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.image ?? '';
}

export const products: Product[] = [
  // ---------- AGRUMES ----------
  {
    slug: 'orange-maroc-late',
    category: 'agrumes',
    name: { fr: 'Orange Maroc Late', en: 'Maroc Late orange', ar: 'برتقال المغرب-لايت' },
    origin: { fr: 'Souss-Massa', en: 'Souss-Massa', ar: 'سوس-ماسة' },
    calibres: ['56–63 mm', '63–70 mm', '70–80 mm'],
    packaging: { fr: 'Caisse 15 kg', en: '15 kg case', ar: 'صندوق 15 كلغ' },
    seasonality: [3, 4, 5, 6],
    globalgap: true,
    accent: '#f59e0b',
  },
  {
    slug: 'clementine-nour',
    category: 'agrumes',
    name: { fr: 'Clémentine Nour', en: 'Nour clementine', ar: 'كليمنتين نور' },
    origin: { fr: 'Berkane', en: 'Berkane', ar: 'بركان' },
    calibres: ['1', '2', '3', '4'],
    packaging: { fr: 'Caisse 10 kg', en: '10 kg case', ar: 'صندوق 10 كلغ' },
    seasonality: [10, 11, 12, 1],
    globalgap: true,
    accent: '#fb923c',
  },
  {
    slug: 'citron-eureka',
    category: 'agrumes',
    name: { fr: 'Citron Eureka', en: 'Eureka lemon', ar: 'ليمون أوريكا' },
    origin: { fr: 'Souss', en: 'Souss', ar: 'سوس' },
    calibres: ['3', '4', '5'],
    packaging: { fr: 'Caisse 10 kg', en: '10 kg case', ar: 'صندوق 10 كلغ' },
    seasonality: [1, 2, 3, 4, 5, 11, 12],
    accent: '#facc15',
  },
  {
    slug: 'mandarine-nadorcott',
    category: 'agrumes',
    name: { fr: 'Mandarine Nadorcott', en: 'Nadorcott mandarin', ar: 'يوسفي نادوركوت' },
    origin: { fr: 'Berkane', en: 'Berkane', ar: 'بركان' },
    calibres: ['1', '2', '3'],
    packaging: { fr: 'Caisse 10 kg', en: '10 kg case', ar: 'صندوق 10 كلغ' },
    seasonality: [1, 2, 3, 12],
    accent: '#f97316',
  },

  // ---------- FRUITS ROUGES ----------
  {
    slug: 'fraise-sabrina',
    category: 'fruits-rouges',
    name: { fr: 'Fraise Sabrina', en: 'Sabrina strawberry', ar: 'فراولة سابرينا' },
    origin: { fr: 'Larache', en: 'Larache', ar: 'العرائش' },
    calibres: ['25 mm+', '30 mm+'],
    packaging: { fr: 'Barquette 250 g — colis 8', en: 'Punnet 250 g — case of 8', ar: 'علبة 250 غ — صندوق 8' },
    seasonality: [12, 1, 2, 3, 4, 5],
    organic: true,
    globalgap: true,
    accent: '#dc2626',
  },
  {
    slug: 'framboise',
    category: 'fruits-rouges',
    name: { fr: 'Framboise', en: 'Raspberry', ar: 'توت أحمر' },
    origin: { fr: 'Gharb', en: 'Gharb', ar: 'الغرب' },
    calibres: ['standard'],
    packaging: { fr: 'Barquette 125 g — colis 12', en: 'Punnet 125 g — case of 12', ar: 'علبة 125 غ — صندوق 12' },
    seasonality: [3, 4, 5, 6, 10, 11],
    accent: '#b91c1c',
  },
  {
    slug: 'myrtille',
    category: 'fruits-rouges',
    name: { fr: 'Myrtille', en: 'Blueberry', ar: 'توت أزرق' },
    origin: { fr: 'Gharb', en: 'Gharb', ar: 'الغرب' },
    calibres: ['12 mm+', '14 mm+'],
    packaging: { fr: 'Barquette 125 g — colis 12', en: 'Punnet 125 g — case of 12', ar: 'علبة 125 غ — صندوق 12' },
    seasonality: [2, 3, 4, 5, 6],
    globalgap: true,
    accent: '#1e3a8a',
  },

  // ---------- FRUITS EXOTIQUES ----------
  {
    slug: 'avocat-hass',
    category: 'fruits-exotiques',
    name: { fr: 'Avocat Hass', en: 'Hass avocado', ar: 'أفوكادو هاس' },
    origin: { fr: 'Gharb', en: 'Gharb', ar: 'الغرب' },
    calibres: ['14', '16', '18', '20'],
    packaging: { fr: 'Caisse 4 kg', en: '4 kg case', ar: 'صندوق 4 كلغ' },
    seasonality: [11, 12, 1, 2, 3, 4],
    globalgap: true,
    accent: '#365314',
  },
  {
    slug: 'mangue',
    category: 'fruits-exotiques',
    name: { fr: 'Mangue (importation)', en: 'Mango (imported)', ar: 'مانجو (مستورد)' },
    origin: { fr: 'Côte d\'Ivoire / Pérou (selon saison)', en: 'Ivory Coast / Peru (seasonal)', ar: 'ساحل العاج / بيرو (حسب الموسم)' },
    calibres: ['8', '10', '12'],
    packaging: { fr: 'Caisse 4 kg', en: '4 kg case', ar: 'صندوق 4 كلغ' },
    seasonality: [4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#ea580c',
  },
  {
    slug: 'papaye',
    category: 'fruits-exotiques',
    name: { fr: 'Papaye', en: 'Papaya', ar: 'بابايا' },
    origin: { fr: 'Sud Maroc / importation', en: 'Southern Morocco / imported', ar: 'جنوب المغرب / مستورد' },
    calibres: ['1–1.5 kg', '1.5–2 kg'],
    packaging: { fr: 'Carton 5 kg', en: '5 kg carton', ar: 'كرتون 5 كلغ' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#fb923c',
  },
  {
    slug: 'fruit-passion',
    category: 'fruits-exotiques',
    name: { fr: 'Fruit de la passion', en: 'Passion fruit', ar: 'فاكهة العشق' },
    origin: { fr: 'Souss / importation', en: 'Souss / imported', ar: 'سوس / مستورد' },
    calibres: ['standard'],
    packaging: { fr: 'Caisse 2 kg', en: '2 kg case', ar: 'صندوق 2 كلغ' },
    seasonality: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    accent: '#7c2d12',
  },

  // ---------- FRUITS DE SAISON ----------
  {
    slug: 'pomme-golden',
    category: 'fruits-saison',
    name: { fr: 'Pomme Golden', en: 'Golden apple', ar: 'تفاح غولدن' },
    origin: { fr: 'Midelt / Imouzzer', en: 'Midelt / Imouzzer', ar: 'ميدلت / إموزار' },
    calibres: ['65–75 mm', '75–85 mm'],
    packaging: { fr: 'Caisse 18 kg', en: '18 kg case', ar: 'صندوق 18 كلغ' },
    seasonality: [9, 10, 11, 12, 1, 2, 3, 4, 5],
    accent: '#ca8a04',
  },
  {
    slug: 'raisin-victoria',
    category: 'fruits-saison',
    name: { fr: 'Raisin Victoria', en: 'Victoria grapes', ar: 'عنب فيكتوريا' },
    origin: { fr: 'Doukkala', en: 'Doukkala', ar: 'دكالة' },
    calibres: ['standard'],
    packaging: { fr: 'Caisse 5 kg', en: '5 kg case', ar: 'صندوق 5 كلغ' },
    seasonality: [7, 8, 9, 10],
    accent: '#65a30d',
  },
  {
    slug: 'melon-galia',
    category: 'fruits-saison',
    name: { fr: 'Melon Galia', en: 'Galia melon', ar: 'شمام غاليا' },
    origin: { fr: 'Souss', en: 'Souss', ar: 'سوس' },
    calibres: ['1.2–1.6 kg', '1.6–2 kg'],
    packaging: { fr: 'Carton 8 kg', en: '8 kg carton', ar: 'كرتون 8 كلغ' },
    seasonality: [4, 5, 6, 7, 8, 9],
    accent: '#bef264',
  },
  {
    slug: 'pasteque',
    category: 'fruits-saison',
    name: { fr: 'Pastèque Crimson', en: 'Crimson watermelon', ar: 'بطيخ كريمسون' },
    origin: { fr: 'Zagora / Tata', en: 'Zagora / Tata', ar: 'زاكورة / طاطا' },
    calibres: ['6–8 kg', '8–12 kg'],
    packaging: { fr: 'Vrac (palox 350 kg)', en: 'Bulk (paloxx 350 kg)', ar: 'سائب (350 كلغ)' },
    seasonality: [5, 6, 7, 8, 9],
    accent: '#16a34a',
  },

  // ---------- LÉGUMES FEUILLES ----------
  {
    slug: 'salade-romaine',
    category: 'legumes-feuilles',
    name: { fr: 'Salade Romaine', en: 'Romaine lettuce', ar: 'خس روماني' },
    origin: { fr: 'Haouz', en: 'Haouz', ar: 'الحوز' },
    calibres: ['400–500 g'],
    packaging: { fr: 'Caisse 12 pièces', en: 'Case of 12', ar: 'صندوق 12 قطعة' },
    seasonality: [1, 2, 3, 4, 5, 10, 11, 12],
    organic: true,
    accent: '#22c55e',
  },
  {
    slug: 'roquette',
    category: 'legumes-feuilles',
    name: { fr: 'Roquette', en: 'Rocket / Arugula', ar: 'جرجير' },
    origin: { fr: 'Haouz', en: 'Haouz', ar: 'الحوز' },
    calibres: ['baby', 'standard'],
    packaging: { fr: 'Sachet 500 g — colis 5 kg', en: 'Bag 500 g — 5 kg case', ar: 'كيس 500 غ — صندوق 5 كلغ' },
    seasonality: [1, 2, 3, 4, 10, 11, 12],
    accent: '#16a34a',
  },
  {
    slug: 'epinard',
    category: 'legumes-feuilles',
    name: { fr: 'Épinard', en: 'Spinach', ar: 'سبانخ' },
    origin: { fr: 'Skhirat / Haouz', en: 'Skhirat / Haouz', ar: 'الصخيرات / الحوز' },
    calibres: ['baby', 'standard'],
    packaging: { fr: 'Caisse 5 kg', en: '5 kg case', ar: 'صندوق 5 كلغ' },
    seasonality: [1, 2, 3, 4, 10, 11, 12],
    accent: '#15803d',
  },
  {
    slug: 'chou-kale',
    category: 'legumes-feuilles',
    name: { fr: 'Chou kale', en: 'Kale', ar: 'كرنب أخضر' },
    origin: { fr: 'Haouz', en: 'Haouz', ar: 'الحوز' },
    calibres: ['standard'],
    packaging: { fr: 'Caisse 5 kg', en: '5 kg case', ar: 'صندوق 5 كلغ' },
    seasonality: [10, 11, 12, 1, 2, 3, 4],
    organic: true,
    accent: '#166534',
  },

  // ---------- LÉGUMES RACINES ----------
  {
    slug: 'carotte',
    category: 'legumes-racines',
    name: { fr: 'Carotte', en: 'Carrot', ar: 'جزر' },
    origin: { fr: 'Berrechid / Doukkala', en: 'Berrechid / Doukkala', ar: 'برشيد / دكالة' },
    calibres: ['standard', 'extra'],
    packaging: { fr: 'Sac 25 kg', en: '25 kg sack', ar: 'كيس 25 كلغ' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#ea580c',
  },
  {
    slug: 'pomme-de-terre',
    category: 'legumes-racines',
    name: { fr: 'Pomme de terre Spunta', en: 'Spunta potato', ar: 'بطاطس سبونتا' },
    origin: { fr: 'Loukkos / Saïs', en: 'Loukkos / Saïs', ar: 'لوكوس / سايس' },
    calibres: ['45–60 mm', '60–80 mm'],
    packaging: { fr: 'Sac 25 kg', en: '25 kg sack', ar: 'كيس 25 كلغ' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#a16207',
  },
  {
    slug: 'oignon',
    category: 'legumes-racines',
    name: { fr: 'Oignon doux', en: 'Sweet onion', ar: 'بصل حلو' },
    origin: { fr: 'Souss / El Jadida', en: 'Souss / El Jadida', ar: 'سوس / الجديدة' },
    calibres: ['40–60 mm', '60–80 mm'],
    packaging: { fr: 'Sac 20 kg', en: '20 kg sack', ar: 'كيس 20 كلغ' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#fde047',
  },
  {
    slug: 'betterave',
    category: 'legumes-racines',
    name: { fr: 'Betterave', en: 'Beetroot', ar: 'شمندر' },
    origin: { fr: 'Doukkala', en: 'Doukkala', ar: 'دكالة' },
    calibres: ['M', 'L'],
    packaging: { fr: 'Caisse 10 kg', en: '10 kg case', ar: 'صندوق 10 كلغ' },
    seasonality: [1, 2, 3, 4, 5, 10, 11, 12],
    accent: '#9f1239',
  },

  // ---------- HERBES ----------
  {
    slug: 'menthe',
    category: 'herbes',
    name: { fr: 'Menthe Naânaâ', en: 'Moroccan mint (Naânaâ)', ar: 'نعناع' },
    origin: { fr: 'Meknès / Haouz', en: 'Meknès / Haouz', ar: 'مكناس / الحوز' },
    calibres: ['bottes 80–100 g'],
    packaging: { fr: 'Colis 30 bottes', en: 'Case of 30 bunches', ar: 'صندوق 30 حزمة' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#22c55e',
  },
  {
    slug: 'coriandre',
    category: 'herbes',
    name: { fr: 'Coriandre fraîche', en: 'Fresh coriander', ar: 'كزبرة طازجة' },
    origin: { fr: 'Haouz', en: 'Haouz', ar: 'الحوز' },
    calibres: ['bottes 50 g'],
    packaging: { fr: 'Colis 50 bottes', en: 'Case of 50 bunches', ar: 'صندوق 50 حزمة' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#16a34a',
  },
  {
    slug: 'persil',
    category: 'herbes',
    name: { fr: 'Persil plat', en: 'Flat-leaf parsley', ar: 'معدنوس مفلطح' },
    origin: { fr: 'Haouz', en: 'Haouz', ar: 'الحوز' },
    calibres: ['bottes 50 g'],
    packaging: { fr: 'Colis 50 bottes', en: 'Case of 50 bunches', ar: 'صندوق 50 حزمة' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#15803d',
  },
  {
    slug: 'basilic',
    category: 'herbes',
    name: { fr: 'Basilic Genovese', en: 'Genovese basil', ar: 'حبق' },
    origin: { fr: 'Souss (sous-serre)', en: 'Souss (greenhouse)', ar: 'سوس (محمي)' },
    calibres: ['bottes 30 g'],
    packaging: { fr: 'Colis 30 bottes', en: 'Case of 30 bunches', ar: 'صندوق 30 حزمة' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    organic: true,
    accent: '#65a30d',
  },
  {
    slug: 'thym',
    category: 'herbes',
    name: { fr: 'Thym (Zaâtar)', en: 'Thyme', ar: 'زعتر' },
    origin: { fr: 'Atlas', en: 'Atlas', ar: 'الأطلس' },
    calibres: ['bottes 30 g'],
    packaging: { fr: 'Colis 30 bottes', en: 'Case of 30 bunches', ar: 'صندوق 30 حزمة' },
    seasonality: [3, 4, 5, 6, 7, 8, 9, 10],
    accent: '#84cc16',
  },
  {
    slug: 'romarin',
    category: 'herbes',
    name: { fr: 'Romarin', en: 'Rosemary', ar: 'إكليل الجبل' },
    origin: { fr: 'Atlas', en: 'Atlas', ar: 'الأطلس' },
    calibres: ['bottes 50 g'],
    packaging: { fr: 'Colis 30 bottes', en: 'Case of 30 bunches', ar: 'صندوق 30 حزمة' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#166534',
  },
];

export function productsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function isInSeason(product: Product, monthIndex1to12: number): boolean {
  return product.seasonality.includes(monthIndex1to12);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}

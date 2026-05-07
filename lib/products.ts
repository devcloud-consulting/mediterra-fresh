/**
 * Product catalogue data.
 * Names/descriptions are translation keys — actual labels live in messages/{locale}.json
 * under `catalogue.categories.{slug}` and per-product `name`/`origin` are inline (multilingual).
 *
 * Add or edit products by extending the arrays below. Photos go in /public/images/products/<slug>.jpg
 * (we ship CSS-gradient placeholders if a photo is missing).
 */

export type CategorySlug = 'fruits' | 'legumes';

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
  { slug: 'fruits', accent: '#ea580c', image: '/images/categories/cat-fruits.jpg' },
  { slug: 'legumes', accent: '#16a34a', image: '/images/categories/cat-legumes.jpg' },
];

export function categoryImage(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.image ?? '';
}

export const products: Product[] = [
  // ---------- FRUITS ----------
  {
    slug: 'framboise',
    category: 'fruits',
    name: { fr: 'Framboise', en: 'Raspberry', ar: 'توت أحمر' },
    origin: { fr: 'Gharb', en: 'Gharb', ar: 'الغرب' },
    calibres: [],
    packaging: { fr: '', en: '', ar: '' },
    seasonality: [3, 4, 5, 6, 10, 11],
    accent: '#b91c1c',
    description: {
      fr: 'Framboise rouge, parfumée, récoltée à la main au plus juste de la maturité.',
      en: 'Red raspberry, fragrant, hand-picked at peak ripeness.',
      ar: 'توت أحمر معطّر، يُجنى يدوياً في ذروة النضج.',
    },
  },
  {
    slug: 'myrtille',
    category: 'fruits',
    name: { fr: 'Myrtille', en: 'Blueberry', ar: 'توت أزرق' },
    origin: { fr: 'Gharb', en: 'Gharb', ar: 'الغرب' },
    calibres: [],
    packaging: { fr: '', en: '', ar: '' },
    seasonality: [2, 3, 4, 5, 6],
    accent: '#1e3a8a',
    description: {
      fr: 'Myrtille bleue, calibre régulier, idéale pour la pâtisserie et le snacking.',
      en: 'Blue blueberry, even calibre, perfect for pastry and snacking.',
      ar: 'توت أزرق بمقاسات منتظمة، مثالي للحلويات والوجبات الخفيفة.',
    },
  },
  {
    slug: 'banane',
    category: 'fruits',
    name: { fr: 'Banane', en: 'Banana', ar: 'موز' },
    origin: { fr: 'Importation', en: 'Imported', ar: 'مستورد' },
    calibres: [],
    packaging: { fr: '', en: '', ar: '' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#facc15',
    description: {
      fr: 'Banane Cavendish, disponible toute l\'année, mûrie à différents stades selon votre service.',
      en: 'Cavendish banana, available year-round, ripened to your service stage.',
      ar: 'موز كافنديش، متوفر طوال السنة، بمراحل نضج مختلفة حسب الطلب.',
    },
  },
  {
    slug: 'mangue',
    category: 'fruits',
    name: { fr: 'Mangue', en: 'Mango', ar: 'مانجو' },
    origin: { fr: 'Importation', en: 'Imported', ar: 'مستورد' },
    calibres: [],
    packaging: { fr: '', en: '', ar: '' },
    seasonality: [4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#ea580c',
    description: {
      fr: 'Mangue importée selon la saison (Côte d\'Ivoire, Pérou, Brésil), maturité contrôlée.',
      en: 'Imported mango by season (Ivory Coast, Peru, Brazil), controlled ripening.',
      ar: 'مانجو مستوردة حسب الموسم (ساحل العاج، بيرو، البرازيل)، نضج موجَّه.',
    },
  },
  {
    slug: 'avocat',
    category: 'fruits',
    name: { fr: 'Avocat', en: 'Avocado', ar: 'أفوكادو' },
    origin: { fr: 'Gharb', en: 'Gharb', ar: 'الغرب' },
    calibres: [],
    packaging: { fr: '', en: '', ar: '' },
    seasonality: [11, 12, 1, 2, 3, 4],
    accent: '#365314',
    description: {
      fr: 'Avocat Hass marocain, mûrissement contrôlé sur demande pour s\'aligner sur votre planning.',
      en: 'Moroccan Hass avocado, ripening controlled on request to fit your schedule.',
      ar: 'أفوكادو هاس مغربي، نضج موجَّه عند الطلب وفق جدول الخدمة.',
    },
  },
  {
    slug: 'orange',
    category: 'fruits',
    name: { fr: 'Orange', en: 'Orange', ar: 'برتقال' },
    origin: { fr: 'Souss-Massa', en: 'Souss-Massa', ar: 'سوس-ماسة' },
    calibres: [],
    packaging: { fr: '', en: '', ar: '' },
    seasonality: [11, 12, 1, 2, 3, 4, 5],
    accent: '#f59e0b',
    description: {
      fr: 'Orange marocaine de saison, jutosité élevée, idéale pour les bars à jus.',
      en: 'Seasonal Moroccan orange, high juiciness, ideal for juice bars.',
      ar: 'برتقال مغربي موسمي، نسبة عصير عالية، مثالي لبارات العصائر.',
    },
  },
  {
    slug: 'kiwi',
    category: 'fruits',
    name: { fr: 'Kiwi', en: 'Kiwi', ar: 'كيوي' },
    origin: { fr: 'Importation', en: 'Imported', ar: 'مستورد' },
    calibres: [],
    packaging: { fr: '', en: '', ar: '' },
    seasonality: [11, 12, 1, 2, 3, 4],
    accent: '#65a30d',
    description: {
      fr: 'Kiwi vert importé, chair acidulée, parfait pour la pâtisserie et les plateaux de fruits.',
      en: 'Imported green kiwi, tangy flesh, perfect for pastry and fruit platters.',
      ar: 'كيوي أخضر مستورد، طعم منعش، مثالي للحلويات وصحون الفواكه.',
    },
  },
  {
    slug: 'ananas',
    category: 'fruits',
    name: { fr: 'Ananas', en: 'Pineapple', ar: 'أناناس' },
    origin: { fr: 'Importation', en: 'Imported', ar: 'مستورد' },
    calibres: [],
    packaging: { fr: '', en: '', ar: '' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#ca8a04',
    description: {
      fr: 'Ananas importé, disponible toute l\'année, livré à maturité sur demande.',
      en: 'Imported pineapple, available year-round, delivered ripe on request.',
      ar: 'أناناس مستورد، متوفر طوال السنة، يُسلَّم ناضجاً عند الطلب.',
    },
  },

  // ---------- LÉGUMES ----------
  {
    slug: 'tomate-allongee',
    category: 'legumes',
    name: { fr: 'Tomate allongée', en: 'Long tomato', ar: 'طماطم مستطيلة' },
    origin: { fr: 'Souss', en: 'Souss', ar: 'سوس' },
    calibres: [],
    packaging: { fr: '', en: '', ar: '' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#dc2626',
    description: {
      fr: 'Tomate de forme allongée, chair ferme, idéale pour les coupes nettes et les sauces.',
      en: 'Long-shaped tomato, firm flesh, ideal for clean slices and sauces.',
      ar: 'طماطم مستطيلة الشكل، لحمها صلب، مثالية للتقطيع الدقيق والصلصات.',
    },
  },
  {
    slug: 'tomate-cerise-allongee',
    category: 'legumes',
    name: { fr: 'Tomate cerise allongée', en: 'Long cherry tomato', ar: 'طماطم كرزية مستطيلة' },
    origin: { fr: 'Souss', en: 'Souss', ar: 'سوس' },
    calibres: [],
    packaging: { fr: '', en: '', ar: '' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#b91c1c',
    description: {
      fr: 'Tomate cerise de forme allongée, sucrée, parfaite pour le dressage et les salades.',
      en: 'Long-shaped cherry tomato, sweet, perfect for plating and salads.',
      ar: 'طماطم كرزية مستطيلة، حلوة المذاق، مثالية للتقديم والسلطات.',
    },
  },
  {
    slug: 'poivrons',
    category: 'legumes',
    name: { fr: 'Poivrons', en: 'Bell peppers', ar: 'فلفل حلو' },
    origin: { fr: 'Souss', en: 'Souss', ar: 'سوس' },
    calibres: [],
    packaging: { fr: '', en: '', ar: '' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#16a34a',
    description: {
      fr: 'Poivrons rouge, vert et jaune, calibre régulier, peau brillante.',
      en: 'Red, green and yellow bell peppers, even calibre, glossy skin.',
      ar: 'فلفل حلو أحمر وأخضر وأصفر، بمقاسات منتظمة وقشرة لامعة.',
    },
  },
  {
    slug: 'concombre',
    category: 'legumes',
    name: { fr: 'Concombre', en: 'Cucumber', ar: 'خيار' },
    origin: { fr: 'Souss / Skhirat', en: 'Souss / Skhirat', ar: 'سوس / الصخيرات' },
    calibres: [],
    packaging: { fr: '', en: '', ar: '' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#22c55e',
    description: {
      fr: 'Concombre long, peau fine, chair croquante.',
      en: 'Long cucumber, thin skin, crunchy flesh.',
      ar: 'خيار طويل، قشرة رقيقة ولحم مقرمش.',
    },
  },
  {
    slug: 'carottes',
    category: 'legumes',
    name: { fr: 'Carottes', en: 'Carrots', ar: 'جزر' },
    origin: { fr: 'Berrechid / Doukkala', en: 'Berrechid / Doukkala', ar: 'برشيد / دكالة' },
    calibres: [],
    packaging: { fr: '', en: '', ar: '' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#ea580c',
    description: {
      fr: 'Carottes orange, calibre uniforme, terre brossée.',
      en: 'Orange carrots, uniform calibre, brushed earth.',
      ar: 'جزر برتقالي، مقاسات منتظمة، منظَّف من التراب.',
    },
  },
  {
    slug: 'pomme-de-terre',
    category: 'legumes',
    name: { fr: 'Pomme de terre', en: 'Potato', ar: 'بطاطس' },
    origin: { fr: 'Loukkos / Saïs', en: 'Loukkos / Saïs', ar: 'لوكوس / سايس' },
    calibres: [],
    packaging: { fr: '', en: '', ar: '' },
    seasonality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    accent: '#a16207',
    description: {
      fr: 'Pomme de terre marocaine, chair ferme, polyvalente en cuisine.',
      en: 'Moroccan potato, firm flesh, versatile in the kitchen.',
      ar: 'بطاطس مغربية، لحم صلب، متعدد الاستعمالات في المطبخ.',
    },
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

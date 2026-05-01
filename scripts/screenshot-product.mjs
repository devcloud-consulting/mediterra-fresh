import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'screenshots-final');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

// Desktop
const desktop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await desktop.newPage();

const products = [
  { slug: 'orange-maroc-late', name: '50-orange' },
  { slug: 'fraise-sabrina', name: '51-fraise' },
  { slug: 'avocat-hass', name: '52-avocat' },
  { slug: 'menthe', name: '53-menthe' },
];

for (const p of products) {
  await page.goto(`http://localhost:3003/fr/catalogue/${p.slug}`, {
    waitUntil: 'networkidle',
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: join(outDir, `${p.name}-detail.png`), fullPage: true });
  console.log(`✓ ${p.name}-detail`);
}

// Detail top viewport
await page.goto('http://localhost:3003/fr/catalogue/orange-maroc-late', {
  waitUntil: 'networkidle',
});
await page.waitForTimeout(500);
await page.screenshot({ path: join(outDir, '54-orange-top.png'), fullPage: false });
console.log('✓ 54-orange-top');

// Form with prefilled product
await page.goto('http://localhost:3003/fr/contact?product=avocat-hass', {
  waitUntil: 'networkidle',
});
await page.waitForTimeout(800);
await page.evaluate(() => window.scrollTo(0, 600));
await page.waitForTimeout(400);
await page.screenshot({ path: join(outDir, '55-form-prefilled.png'), fullPage: false });
console.log('✓ 55-form-prefilled');

// Click into a product from the catalogue (verify navigation)
await page.goto('http://localhost:3003/fr/catalogue', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
await page.evaluate(() => window.scrollTo(0, 800));
await page.waitForTimeout(400);
await page.screenshot({ path: join(outDir, '56-catalogue-with-links.png'), fullPage: false });
console.log('✓ 56-catalogue-with-links');

await desktop.close();

// Mobile
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const m = await mobile.newPage();
await m.goto('http://localhost:3003/fr/catalogue/orange-maroc-late', {
  waitUntil: 'networkidle',
});
await m.waitForTimeout(800);
await m.screenshot({ path: join(outDir, '60-mobile-product.png'), fullPage: true });
console.log('✓ 60-mobile-product');

await mobile.close();
await browser.close();
console.log('Done.');

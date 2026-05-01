import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'screenshots-final');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

// Desktop full-page captures of refreshed pages
const desktop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await desktop.newPage();

const pages = [
  { name: '20-fr-references-full', url: 'http://localhost:3003/fr/references', full: true },
  { name: '21-fr-blog-full', url: 'http://localhost:3003/fr/blog', full: true },
  { name: '22-fr-references-top', url: 'http://localhost:3003/fr/references', full: false },
  { name: '23-fr-blog-top', url: 'http://localhost:3003/fr/blog', full: false },
  { name: '24-fr-catalogue-cards', url: 'http://localhost:3003/fr/catalogue', full: false },
];
for (const t of pages) {
  await page.goto(t.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  if (t.name === '24-fr-catalogue-cards') {
    // scroll past the editorial header to show product cards
    await page.evaluate(() => window.scrollTo(0, 1100));
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: join(outDir, `${t.name}.png`), fullPage: t.full });
  console.log(`✓ ${t.name}`);
}

// Hover state on a product card
await page.goto('http://localhost:3003/fr/catalogue', { waitUntil: 'networkidle' });
await page.evaluate(() => window.scrollTo(0, 1200));
await page.waitForTimeout(400);
const firstCard = page.locator('article').nth(2);
await firstCard.hover().catch(() => {});
await page.waitForTimeout(900);
await page.screenshot({ path: join(outDir, '25-fr-card-hover.png'), fullPage: false });
console.log('✓ 25-fr-card-hover');

await desktop.close();

// Mobile final pass
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const m = await mobile.newPage();
const mobilePages = [
  { name: '30-mobile-references', url: 'http://localhost:3003/fr/references' },
  { name: '31-mobile-blog', url: 'http://localhost:3003/fr/blog' },
];
for (const t of mobilePages) {
  await m.goto(t.url, { waitUntil: 'networkidle' });
  await m.waitForTimeout(800);
  await m.screenshot({ path: join(outDir, `${t.name}.png`), fullPage: true });
  console.log(`✓ ${t.name}`);
}

await mobile.close();
await browser.close();
console.log('Done.');

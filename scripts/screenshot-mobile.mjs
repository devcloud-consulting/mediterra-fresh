import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'screenshots-mobile');
mkdirSync(outDir, { recursive: true });

const base = process.env.BASE_URL || 'http://localhost:3003';

const targets = [
  { name: '01-fr-home', url: `${base}/fr` },
  { name: '02-fr-catalogue', url: `${base}/fr/catalogue` },
  { name: '03-fr-pourquoi', url: `${base}/fr/pourquoi-nous` },
  { name: '04-fr-contact', url: `${base}/fr/contact` },
  { name: '05-ar-home', url: `${base}/ar` },
  { name: '06-fr-legal', url: `${base}/fr/mentions-legales` },
];

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
});
const page = await context.newPage();

for (const t of targets) {
  await page.goto(t.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: join(outDir, `${t.name}.png`),
    fullPage: true,
  });
  console.log(`✓ ${t.name}`);
}

// Hero-only screenshot
await page.goto(`${base}/fr`, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.screenshot({
  path: join(outDir, '00-fr-hero-viewport.png'),
  fullPage: false,
});
console.log('✓ 00-fr-hero-viewport');

// Open the mobile menu
await page.click('button[aria-label*="Menu"], button[aria-label*="menu"], button[aria-label*="Fermer"], button[aria-label*="القائمة"]', {
  timeout: 5000,
}).catch(() => {});
await page.waitForTimeout(500);
await page.screenshot({
  path: join(outDir, '07-fr-menu-open.png'),
  fullPage: false,
});
console.log('✓ 07-fr-menu-open');

await browser.close();
console.log('\nDone — see screenshots-mobile/');

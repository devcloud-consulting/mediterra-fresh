import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'screenshots-final');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

const desktopShots = [
  { name: '01-fr-home', url: 'http://localhost:3003/fr', full: true },
  { name: '02-fr-legal', url: 'http://localhost:3003/fr/mentions-legales', full: false },
  { name: '03-fr-pourquoi', url: 'http://localhost:3003/fr/pourquoi-nous', full: false },
  { name: '04-fr-catalogue', url: 'http://localhost:3003/fr/catalogue', full: false },
  { name: '05-ar-home', url: 'http://localhost:3003/ar', full: false },
];

for (const t of desktopShots) {
  await page.goto(t.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  await page.screenshot({ path: join(outDir, `${t.name}.png`), fullPage: t.full });
  console.log(`✓ ${t.name}`);
}

await browser.close();
console.log('Done.');

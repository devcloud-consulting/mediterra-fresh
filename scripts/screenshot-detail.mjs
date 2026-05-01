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

await page.goto('http://localhost:3003/fr/references', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

await page.evaluate(() => window.scrollTo(0, 750));
await page.waitForTimeout(500);
await page.screenshot({ path: join(outDir, '40-segments-grid.png'), fullPage: false });
console.log('✓ 40-segments-grid');

await page.evaluate(() => window.scrollTo(0, 1700));
await page.waitForTimeout(500);
await page.screenshot({ path: join(outDir, '41-pilot-program.png'), fullPage: false });
console.log('✓ 41-pilot-program');

await page.evaluate(() => window.scrollTo(0, 2400));
await page.waitForTimeout(500);
await page.screenshot({ path: join(outDir, '42-commitments.png'), fullPage: false });
console.log('✓ 42-commitments');

await ctx.close();
await browser.close();
console.log('Done.');

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'screenshots-mobile');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

// Mobile form screenshots
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3003/fr/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  // Locate the form card and screenshot it
  const card = page.locator('form').first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(outDir, '08-form-mobile-empty.png'), fullPage: false });

  // Focus the first field to show the floating label animation
  await page.locator('#name').focus();
  await page.fill('#name', 'Yassine Benali');
  await page.locator('#company').focus();
  await page.fill('#company', 'Riad Yasmina');
  await page.fill('#role', 'Chef de cuisine');
  await page.locator('#message').focus();
  await page.fill('#message', '40 chambres, livraison quotidienne 6h–8h.');
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(outDir, '09-form-mobile-filled.png'), fullPage: false });

  await ctx.close();
  console.log('✓ form mobile');
}

// Desktop form screenshot
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3003/fr/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(outDir, '10-form-desktop.png'), fullPage: false });

  // Take a desktop home hero too
  await page.goto('http://localhost:3003/fr', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(outDir, '11-fr-home-desktop.png'), fullPage: false });

  await ctx.close();
}

await browser.close();
console.log('Done.');

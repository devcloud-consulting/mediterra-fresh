import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// A premium maskable icon SVG (works as both regular & maskable — content is
// inside the safe zone). Used to derive PNGs at multiple sizes.
const maskableSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5b722c"/>
      <stop offset="100%" stop-color="#3a4720"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <g transform="translate(256 256)">
    <!-- olive leaf in safe zone (~80% center) -->
    <path d="M0 -110 C 60 -55 80 -10 80 50 a 80 80 0 0 1 -160 0 C -80 -10 -60 -55 0 -110 Z"
          fill="#bef264"/>
    <line x1="0" y1="-100" x2="0" y2="120" stroke="#3a4720" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>`;

const appleSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5b722c"/>
      <stop offset="100%" stop-color="#3a4720"/>
    </linearGradient>
  </defs>
  <rect width="180" height="180" rx="36" fill="url(#bg)"/>
  <g transform="translate(90 90) scale(0.55)">
    <path d="M0 -110 C 60 -55 80 -10 80 50 a 80 80 0 0 1 -160 0 C -80 -10 -60 -55 0 -110 Z" fill="#bef264"/>
    <line x1="0" y1="-100" x2="0" y2="120" stroke="#3a4720" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>`;

const faviconSvg = readFileSync(join(root, 'public', 'favicon.svg'));

async function go() {
  // Maskable / Android icons (192, 512)
  for (const size of [192, 512]) {
    await sharp(Buffer.from(maskableSvg))
      .resize(size, size)
      .png({ quality: 90 })
      .toFile(join(root, 'public', `icon-${size}.png`));
    console.log(`✓ icon-${size}.png`);
  }

  // Apple touch icon (180)
  await sharp(Buffer.from(appleSvg))
    .resize(180, 180)
    .png({ quality: 90 })
    .toFile(join(root, 'public', 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png');

  // Standard 32 PNG favicon (fallback for browsers that prefer raster)
  await sharp(faviconSvg)
    .resize(32, 32)
    .png()
    .toFile(join(root, 'public', 'favicon-32.png'));
  console.log('✓ favicon-32.png');
}

go().catch((err) => {
  console.error(err);
  process.exit(1);
});

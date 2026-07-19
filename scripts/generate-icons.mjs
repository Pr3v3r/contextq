import sharp from 'sharp';

const sizes = [192, 512];

for (const size of sizes) {
  await sharp('public/icon.svg')
    .resize(size, size)
    .png()
    .toFile(`public/icon-${size}.png`);
  console.log(`Generated icon-${size}.png`);
}
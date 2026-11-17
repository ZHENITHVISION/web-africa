import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('../restau-savana/index.html', 'utf8');
const regex = /https:\/\/images\.unsplash\.com\/[^\s"'()>]+/g;
const matches = [...new Set(html.match(regex) || [])];
console.log(`Found ${matches.length} unique Unsplash images`);

async function downloadAll() {
  const photoDir = path.resolve('dist/photos');
  fs.mkdirSync(photoDir, { recursive: true });

  const urlToLocal = new Map();

  for (let i = 0; i < matches.length; i++) {
    const url = matches[i];
    const filename = `restau-img-${i + 1}.jpg`;
    const localPath = path.join(photoDir, filename);

    if (!fs.existsSync(localPath)) {
      try {
        console.log(`Downloading ${i + 1}/${matches.length}: ${url.slice(0, 50)}...`);
        const res = await fetch(url);
        if (res.ok) {
          const buf = await res.arrayBuffer();
          fs.writeFileSync(localPath, Buffer.from(buf));
          console.log(`Saved ${filename} (${buf.byteLength} bytes)`);
          urlToLocal.set(url, `/photos/${filename}`);
        } else {
          console.warn(`Failed ${url}: status ${res.status}`);
        }
      } catch (err) {
        console.error(`Error downloading ${url}:`, err.message);
      }
    } else {
      urlToLocal.set(url, `/photos/${filename}`);
    }
  }

  // Update HTML with local images
  let updatedHtml = html;
  for (const [url, local] of urlToLocal.entries()) {
    updatedHtml = updatedHtml.replaceAll(url, local);
  }

  // Also ensure standalone styles in case tailwind CDN is slow
  // Add CSS reset and base styles for the classes
  fs.writeFileSync('dist/demos/restaurant/index.html', updatedHtml);
  fs.writeFileSync('../restau-savana/index.html', updatedHtml);
  console.log('Updated HTML files with local images.');
}

downloadAll();

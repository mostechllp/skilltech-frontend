const fs = require('fs');
const https = require('https');
const path = require('path');

const cssDir = path.join(__dirname, '../public/css');
const webfontsDir = path.join(__dirname, '../public/webfonts');

fs.mkdirSync(cssDir, { recursive: true });
fs.mkdirSync(webfontsDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed ${url}: ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Saved ${path.basename(dest)} (${fs.statSync(dest).size} bytes)`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const fonts = [
  'fa-solid-900.woff2',
  'fa-solid-900.ttf',
  'fa-brands-400.woff2',
  'fa-brands-400.ttf',
  'fa-regular-400.woff2',
  'fa-regular-400.ttf',
  'fa-v4compatibility.woff2',
  'fa-v4compatibility.ttf'
];

async function run() {
  try {
    // 1. Download FontAwesome CSS
    await download(
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
      path.join(cssDir, 'all.min.css')
    );

    // 2. Download FontAwesome webfonts
    for (const f of fonts) {
      await download(
        `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/${f}`,
        path.join(webfontsDir, f)
      );
    }
    console.log('FontAwesome successfully downloaded locally!');
  } catch (e) {
    console.error('FontAwesome download error:', e.message);
  }
}

run();

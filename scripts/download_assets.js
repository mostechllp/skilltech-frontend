const fs = require('fs');
const https = require('https');
const path = require('path');

const targetDir = path.join(__dirname, '../public/css');
fs.mkdirSync(targetDir, { recursive: true });

function download(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(targetDir, filename);
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, filename).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename} (${fs.statSync(dest).size} bytes)`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  try {
    await Promise.all([
      download('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', 'bootstrap.min.css'),
      download('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css', 'bootstrap.rtl.min.css'),
      download('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css', 'owl.carousel.min.css'),
      download('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css', 'owl.theme.default.min.css'),
    ]);
    console.log('All CSS assets successfully saved locally in public/css');
  } catch (err) {
    console.error('Error downloading assets:', err);
    process.exit(1);
  }
}

run();

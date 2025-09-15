/*
  Generate sitemap.xml with static routes and dynamic product detail pages.
  - Fetches product list from Fake Store API
  - Writes to public/sitemap.xml
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE_URL = process.env.SITE_URL || 'https://shopsmartweb.netlify.app';
const OUT_PATH = path.resolve(__dirname, '..', 'public', 'sitemap.xml');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 400) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        res.resume();
        return;
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy(new Error('Request timed out'));
    });
  });
}

function formatDate(d = new Date()) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

(async function main() {
  const today = formatDate();
  const urls = [
    { loc: `${SITE_URL}/`, changefreq: 'daily', priority: '1.0' },
    { loc: `${SITE_URL}/product`, changefreq: 'daily', priority: '0.9' },
    { loc: `${SITE_URL}/about`, changefreq: 'monthly', priority: '0.6' },
    { loc: `${SITE_URL}/contact`, changefreq: 'yearly', priority: '0.3' }
  ];

  try {
    const products = await fetchJson('https://fakestoreapi.com/products');
    if (Array.isArray(products)) {
      for (const p of products) {
        if (p && (typeof p.id === 'number' || typeof p.id === 'string')) {
          urls.push({
            loc: `${SITE_URL}/product/${p.id}`,
            changefreq: 'weekly',
            priority: '0.7'
          });
        }
      }
    }
  } catch (e) {
    // Non-fatal: keep static URLs if dynamic fetch fails
    console.warn('[sitemap] Failed to fetch products:', e.message || e);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n') +
    `\n</urlset>\n`;

  fs.writeFileSync(OUT_PATH, xml, 'utf8');
  console.log(`[sitemap] Wrote ${urls.length} URLs to ${OUT_PATH}`);
})();

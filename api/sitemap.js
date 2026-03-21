// ══════════════════════════════════════════
// HEARTHPICK — api/sitemap.js
// Dynamic sitemap — queries Supabase live
// Always returns 200 so Google never gets an error
// ══════════════════════════════════════════
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const BASE = 'https://hearthpick.vercel.app';

export default async function handler(req, res) {

  // Static pages — always included
  const staticPages = [
    { url: '/',            priority: '1.0', changefreq: 'weekly'  },
    { url: '/shop',        priority: '0.9', changefreq: 'weekly'  },
    { url: '/blog',        priority: '0.8', changefreq: 'weekly'  },
    { url: '/about',       priority: '0.5', changefreq: 'monthly' },
    { url: '/category/c1', priority: '0.7', changefreq: 'weekly'  },
    { url: '/category/c2', priority: '0.7', changefreq: 'weekly'  },
    { url: '/category/c3', priority: '0.7', changefreq: 'weekly'  },
    { url: '/category/c4', priority: '0.7', changefreq: 'weekly'  },
    { url: '/category/c5', priority: '0.7', changefreq: 'weekly'  },
    { url: '/category/c6', priority: '0.7', changefreq: 'weekly'  },
  ];

  const today = new Date().toISOString().split('T')[0];

  const staticXml = staticPages.map(p => `
  <url>
    <loc>${BASE}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('');

  // Dynamic blog posts — fetched from Supabase
  let postXml = '';
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?select=slug,date,status&status=eq.published&order=date.desc`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.ok) {
      const posts = await response.json();
      if (Array.isArray(posts) && posts.length > 0) {
        postXml = posts.map(p => `
  <url>
    <loc>${BASE}/post/${p.slug}</loc>
    <lastmod>${p.date || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');
      }
    }
  } catch (err) {
    // Supabase unavailable — serve static-only sitemap
    // Never return 500 — Google marks sitemap as broken
    console.error('Sitemap Supabase error:', err);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${postXml}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(sitemap);
}

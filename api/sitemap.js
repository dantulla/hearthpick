// ══════════════════════════════════════════
// HEARTHPICK — api/sitemap.js
// Dynamic sitemap — queries Supabase live
// and returns all published posts automatically.
// Google always sees up-to-date URLs.
// ══════════════════════════════════════════

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const BASE = 'https://hearthpick.vercel.app';

export default async function handler(req, res) {
  try {
    // Fetch all published posts from Supabase
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?select=slug,date&status=eq.published&order=date.desc`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    const posts = await response.json();

    // Static pages
    const staticPages = [
      { url: '/',          priority: '1.0', changefreq: 'weekly'  },
      { url: '/blog',      priority: '0.9', changefreq: 'weekly'  },
      { url: '/shop',      priority: '0.8', changefreq: 'weekly'  },
      { url: '/about',     priority: '0.5', changefreq: 'monthly' },
      { url: '/category/c1', priority: '0.7', changefreq: 'weekly' },
      { url: '/category/c2', priority: '0.7', changefreq: 'weekly' },
      { url: '/category/c3', priority: '0.7', changefreq: 'weekly' },
      { url: '/category/c4', priority: '0.7', changefreq: 'weekly' },
      { url: '/category/c5', priority: '0.7', changefreq: 'weekly' },
      { url: '/category/c6', priority: '0.7', changefreq: 'weekly' },
    ];

    const staticXml = staticPages.map(p => `
  <url>
    <loc>${BASE}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('');

    // Dynamic blog post pages from Supabase
    const postXml = Array.isArray(posts) && posts.length > 0
      ? posts.map(p => `
  <url>
    <loc>${BASE}/post/${p.slug}</loc>
    <lastmod>${p.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')
      : '';

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${postXml}
</urlset>`;

    // Cache for 1 hour so Google doesn't hammer Supabase
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).send(sitemap);

  } catch (err) {
    console.error('Sitemap error:', err);
    return res.status(500).send('Sitemap generation failed');
  }
}

// ══════════════════════════════════════════
// HEARTHPICK — api/sitemap.js
// Dynamic sitemap — includes product pages
// Always returns 200 so Google never gets an error
// ══════════════════════════════════════════
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const BASE = 'https://hearthpick.vercel.app';

function prodSlug(p){
  const s = (p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''));
  return s + '-' + p.id;
}

export default async function handler(req, res) {

  const today = new Date().toISOString().split('T')[0];

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

  const staticXml = staticPages.map(p => `
  <url>
    <loc>${BASE}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('');

  let postXml = '';
  let productXml = '';

  try {
    const [prodsRes, postsRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/products?select=id,name,slug,date&status=eq.published&order=date.desc`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' }
      }),
      fetch(`${SUPABASE_URL}/rest/v1/posts?select=slug,date&status=eq.published&order=date.desc`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' }
      })
    ]);

    if (prodsRes.ok) {
      const prods = await prodsRes.json();
      if (Array.isArray(prods) && prods.length > 0) {
        productXml = prods.map(p => `
  <url>
    <loc>${BASE}/product/${prodSlug(p)}</loc>
    <lastmod>${p.date || today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('');
      }
    }

    if (postsRes.ok) {
      const posts = await postsRes.json();
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
    console.error('Sitemap error:', err);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${productXml}
${postXml}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(sitemap);
}

exports.handler = async function() {
  const SUPA_URL = process.env.SUPABASE_URL;
  const SUPA_KEY = process.env.SUPABASE_SERVICE_KEY;
  const BASE = 'https://hearthpick.netlify.app';

  try {
    const res = await fetch(
      `${SUPA_URL}/rest/v1/posts?select=slug,date&status=eq.published`,
      {
        headers: {
          'apikey': SUPA_KEY,
          'Authorization': `Bearer ${SUPA_KEY}`
        }
      }
    );
    const posts = await res.json();

    const staticPages = [
      { url: '/',       priority: '1.0', changefreq: 'weekly'  },
      { url: '/blog',   priority: '0.9', changefreq: 'weekly'  },
      { url: '/shop',   priority: '0.8', changefreq: 'weekly'  },
      { url: '/about',  priority: '0.5', changefreq: 'monthly' },
    ];

    const staticXml = staticPages.map(p => `
  <url>
    <loc>${BASE}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('');

    const postXml = Array.isArray(posts) ? posts.map(p => `
  <url>
    <loc>${BASE}/post/${p.slug}</loc>
    <lastmod>${p.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('') : '';

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${postXml}
</urlset>`;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/xml' },
      body: sitemap
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: 'Sitemap generation failed: ' + err.message
    };
  }
};

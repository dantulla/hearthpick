export default async function handler(req, res) {

  // ── STEP 1: Check if request is from a bot/crawler ──
  const ua = req.headers['user-agent'] || '';
  const isBot = /googlebot|bingbot|pinterestbot|twitterbot|facebookexternalhit|linkedinbot|whatsapp|slackbot/i.test(ua);

  // Real users get redirected to the SPA as normal
  if (!isBot) {
    res.setHeader('Location', '/');
    return res.status(307).end();
  }

  // ── STEP 2: Fetch products from Supabase ──
  const SUPA_URL = process.env.SUPABASE_URL;
  const SUPA_KEY = process.env.SUPABASE_SERVICE_KEY;

  let prods = [];
  let cats = [];

  try {
    const [prodsRes, catsRes] = await Promise.all([
      fetch(`${SUPA_URL}/rest/v1/products?status=eq.published&select=*&order=date.desc`, {
        headers: {
          apikey: SUPA_KEY,
          Authorization: `Bearer ${SUPA_KEY}`,
          'Content-Type': 'application/json'
        }
      }),
      fetch(`${SUPA_URL}/rest/v1/categories?select=*`, {
        headers: {
          apikey: SUPA_KEY,
          Authorization: `Bearer ${SUPA_KEY}`,
          'Content-Type': 'application/json'
        }
      })
    ]);

    prods = await prodsRes.json();
    cats = await catsRes.json();

    if (!Array.isArray(prods)) prods = [];
    if (!Array.isArray(cats)) cats = [];

  } catch (err) {
    console.error('Supabase fetch failed:', err);
    return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hearthpick — Curated Home Finds</title>
  <meta name="description" content="Handpicked home finds from Amazon. Honest curation, real prices.">
</head>
<body>
  <h1>Hearthpick — Curated Home Finds</h1>
  <p>Handpicked home finds from Amazon.</p>
</body>
</html>`);
  }

  // ── STEP 3: Build Product schema ──
  const prodsWithImg = prods.filter(p => p.img && p.img.trim());

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Hearthpick — Curated Home Finds',
    'url': 'https://hearthpick.vercel.app/',
    'itemListElement': prodsWithImg.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'item': {
        '@type': 'Product',
        'name': p.name,
        'image': p.img,
        'description': p.desc || p.description || p.name,
        'brand': { '@type': 'Brand', 'name': p.src || 'Amazon' },
        'offers': {
          '@type': 'Offer',
          'price': String(p.price),
          'priceCurrency': 'USD',
          'availability': 'https://schema.org/InStock',
          'url': p.url || 'https://hearthpick.vercel.app/',
          'shippingDetails': {
            '@type': 'OfferShippingDetails',
            'shippingRate': { '@type': 'MonetaryAmount', 'value': '0', 'currency': 'USD' },
            'deliveryTime': {
              '@type': 'ShippingDeliveryTime',
              'businessDays': {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': ['Monday','Tuesday','Wednesday','Thursday','Friday']
              }
            }
          },
          'hasMerchantReturnPolicy': {
            '@type': 'MerchantReturnPolicy',
            'returnPolicyCategory': 'https://schema.org/MerchantReturnFiniteReturnWindow',
            'merchantReturnDays': 30
          }
        }
      }
    }))
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Hearthpick',
    'url': 'https://hearthpick.vercel.app/',
    'description': 'Curated home finds from Amazon, Wayfair, IKEA and beyond.',
    'sameAs': ['https://pinterest.com/hearthpick']
  };

  // ── STEP 4: Build readable HTML body for crawlers ──
  const catMap = {};
  cats.forEach(c => { catMap[c.id] = c.name; });

  const productRows = prods.map(p => `
    <article itemscope itemtype="https://schema.org/Product">
      <h2 itemprop="name">${p.name}</h2>
      ${p.img ? `<img src="${p.img}" alt="${p.name}" itemprop="image" width="400">` : ''}
      <p itemprop="description">${p.desc || p.description || ''}</p>
      <p>Category: ${catMap[p.cat] || ''}</p>
      <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
        <span itemprop="price" content="${p.price}">$${p.price}</span>
        <meta itemprop="priceCurrency" content="USD">
        <meta itemprop="availability" content="https://schema.org/InStock">
        <a href="${p.url}" itemprop="url" rel="noopener">View on ${p.src || 'Amazon'}</a>
      </div>
    </article>
  `).join('\n');

  // ── STEP 5: Send the full HTML response to the crawler ──
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hearthpick — Curated Home Finds</title>
  <meta name="description" content="Handpicked home finds from Amazon, Wayfair and IKEA. Honest curation, real prices. 50K+ Pinterest saves.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://hearthpick.vercel.app/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Hearthpick — Curated Home Finds">
  <meta property="og:description" content="Handpicked home finds from Amazon. Honest curation, real prices.">
  <meta property="og:url" content="https://hearthpick.vercel.app/">
  <meta property="og:image" content="https://hearthpick.vercel.app/og-image.jpg">
  <script type="application/ld+json">${JSON.stringify(orgSchema)}</script>
  <script type="application/ld+json">${JSON.stringify(itemListSchema)}</script>
</head>
<body>
  <header>
    <h1>Hearthpick — Curated Home Finds</h1>
    <p>Handpicked home finds from Amazon, Wayfair and IKEA. 500+ curated picks. Honest reviews, real prices.</p>
  </header>
  <main>
    <h2>Featured Home Finds</h2>
    ${productRows}
  </main>
  <footer>
    <p>© ${new Date().getFullYear()} Hearthpick. Affiliate disclosure: We earn from qualifying purchases.</p>
  </footer>
</body>
</html>`);
}

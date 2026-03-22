// ══════════════════════════════════════════
// HEARTHPICK — api/debug.js
// TEMPORARY — delete after fixing sitemap
// Visit: hearthpick.vercel.app/api/debug
// ══════════════════════════════════════════
export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

  const info = {
    has_url: !!SUPABASE_URL,
    has_key: !!SUPABASE_KEY,
    url_preview: SUPABASE_URL ? SUPABASE_URL.substring(0, 30) + '...' : 'MISSING',
    key_preview: SUPABASE_KEY ? SUPABASE_KEY.substring(0, 20) + '...' : 'MISSING',
  };

  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/products?select=id,name&limit=3`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const text = await r.text();
    info.supabase_status = r.status;
    info.supabase_response = text.substring(0, 300);
  } catch (err) {
    info.supabase_error = err.message;
  }

  res.status(200).json(info);
}

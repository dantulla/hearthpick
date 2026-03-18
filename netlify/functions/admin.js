// ══════════════════════════════════════════
// HEARTHPICK — netlify/functions/admin.js
// Secure server-side admin writes.
// The Supabase SERVICE_ROLE key lives only
// here — never in the browser.
// ══════════════════════════════════════════

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_PIN    = process.env.ADMIN_PIN || '1234';

// Helper: call Supabase REST API with service role key
async function supabase(method, table, data, filter = '') {
  const url = `${SUPABASE_URL}/rest/v1/${table}${filter ? '?' + filter : ''}`;
  const res = await fetch(url, {
    method,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: method === 'POST' ? 'resolution=merge-duplicates,return=representation' : 'return=representation',
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  const text = await res.text();
  try { return { ok: res.ok, status: res.status, data: JSON.parse(text) }; }
  catch { return { ok: res.ok, status: res.status, data: text }; }
}

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const { pin, action, table, data, id } = body;

  // ── PIN verification (server-side, not bypassable) ──
  if (!pin || pin !== ADMIN_PIN) {
    // Artificial delay to slow brute force
    await new Promise(r => setTimeout(r, 800));
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  // ── Validate table (whitelist only) ──
  const allowed = ['products', 'posts', 'categories', 'config', 'subscribers'];
  if (!allowed.includes(table)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid table' }) };
  }

  try {
    let result;

    switch (action) {
      case 'upsert':
        result = await supabase('POST', table, data);
        break;

      case 'update':
        if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'ID required for update' }) };
        result = await supabase('PATCH', table, data, `id=eq.${id}`);
        break;

      case 'delete':
        if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'ID required for delete' }) };
        result = await supabase('DELETE', table, null, `id=eq.${id}`);
        break;

      default:
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid action' }) };
    }

    if (!result.ok) {
      return { statusCode: result.status, body: JSON.stringify({ error: result.data }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, data: result.data }),
    };

  } catch (err) {
    console.error('Admin function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};

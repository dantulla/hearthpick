export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const result = {};

  try {
    const r1 = await fetch(`${SUPABASE_URL}/rest/v1/products?select=id,name,status&limit=5`, { headers });
    result.test1_status = r1.status;
    result.test1_data = await r1.text();
  } catch(e){ result.test1_error = e.message; }

  try {
    const r2 = await fetch(`${SUPABASE_URL}/rest/v1/products?select=id,name,slug,date,status&limit=1000`, { headers });
    result.test2_status = r2.status;
    const data = await r2.json();
    result.test2_count = Array.isArray(data) ? data.length : 'not array';
    result.test2_first = Array.isArray(data) ? data[0] : data;
  } catch(e){ result.test2_error = e.message; }

  try {
    const r3 = await fetch(`${SUPABASE_URL}/rest/v1/posts?select=slug,date,status&limit=1000`, { headers });
    result.test3_status = r3.status;
    const data = await r3.json();
    result.test3_count = Array.isArray(data) ? data.length : 'not array';
    result.test3_first = Array.isArray(data) ? data[0] : data;
  } catch(e){ result.test3_error = e.message; }

  res.status(200).json(result);
}

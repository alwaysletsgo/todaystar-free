export default async function handler(req, res) {
  // CORS 허용
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const MAKE_URL = 'https://hook.us2.make.com/4v4z9xqdej2fvpgs678z35u39n71o1op';
    
    const makeRes = await fetch(MAKE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await makeRes.json();
    return res.status(200).json(data);
  } catch (e) {
    console.error('Make 호출 에러:', e);
    return res.status(500).json({ error: 'Make 연동 실패' });
  }
}

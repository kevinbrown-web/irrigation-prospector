export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  const { query, lat, lng, radius } = req.query;
  if (!query) return res.status(400).json({ error: "Missing query" });
  const key = process.env.GOOGLE_API_KEY;
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${key}`;
  if (lat && lng) url += `&location=${lat},${lng}`;
  if (radius) url += `&radius=${radius}`;
  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

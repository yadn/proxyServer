export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received body:', req?.body?.message?.text);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500); // max 1.5 seconds

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL; // ENV VARIABLE

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
        signal: controller.signal,
      });
    } catch (err) {
      console.error('Fetch failed or timed out:', err.name);
    } finally {
      clearTimeout(timeout);
    }

    res.status(200).send('OK');
  } else {
    res.status(405).send('Method Not Allowed');
  }
}

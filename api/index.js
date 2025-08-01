export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received body:', req?.body?.message.text);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500); // max 1.5 seconds

    try {
      await fetch('https://script.google.com/macros/s/AKfycbwa5Yg6Eryx4Avmp98o711aSuUtgB4JOAZVW82RtPeCdqKcBEVFTs7X1NsNTnkcONJoVw/exec', {
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

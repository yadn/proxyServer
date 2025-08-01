export default async function handler(req, res) {
  if (req.method === 'POST') {
    res.status(200).send('OK'); // Instant response to Telegram

    // Forward to Google Apps Script (or anywhere)
    try {
      await fetch('https://script.google.com/macros/s/AKfycbwa5Yg6Eryx4Avmp98o711aSuUtgB4JOAZVW82RtPeCdqKcBEVFTs7X1NsNTnkcONJoVw/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
    } catch (err) {
      console.error('Forwarding failed:', err);
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}

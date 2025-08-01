export default function handler(req, res) {
  if (req.method === 'POST') {
    res.status(200).send('OK'); // Instant response to Telegram

    // Fire-and-forget: Don't wait for this request
    fetch('https://script.google.com/macros/s/AKfycbwa5Yg6Eryx4Avmp98o711aSuUtgB4JOAZVW82RtPeCdqKcBEVFTs7X1NsNTnkcONJoVw/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    }).catch((err) => {
      console.error('Forwarding failed:', err); // Still logs if failed
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}

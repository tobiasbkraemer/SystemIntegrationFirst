import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

let webhooks = []; 

app.post('/register', (req, res) => {
  const { url, event } = req.body;
  if (!url || !event) return res.status(400).send("Missing 'url' or 'event'");
  webhooks.push({ url, event });
  res.send('Webhook registered.');
});

app.get('/ping', async (req, res) => {
  for (const webhook of webhooks) {
    try {
      await fetch(webhook.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: webhook.event,
          data: 'Test ping payload'
        })
      });
    } catch (err) {
      console.error('❌ Failed to call webhook:', webhook.url, err.message);
    }
  }
  res.send('🔔 Ping event sent to all webhooks');
});

app.listen(3000, () => {
  console.log('Webhook server running on http://localhost:3000');
});

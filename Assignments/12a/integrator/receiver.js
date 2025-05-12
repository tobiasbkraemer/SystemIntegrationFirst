// receiver.js
import express from 'express';

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('📥 Received webhook event:');
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Receiver listening on http://localhost:${PORT}/webhook`);
});

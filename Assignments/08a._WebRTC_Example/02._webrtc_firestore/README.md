WebRTC med Firebase Firestore – Opgave 08a

Beskrivelse
Denne opgave viser, hvordan to browsere (f.eks. mobil og computer) kan forbinde via WebRTC med Firebase Firestore som signaleringsserver. Brugeren kan starte og besvare opkald direkte i browseren.

Sådan kører du projektet

1. Installer afhængigheder:
   npm install

2. Start udviklingsserver (til netværksadgang):
   npm run dev -- --host

3. (Valgfrit) Del via HTTPS med ngrok:
   ngrok http 5173  
   Tilføj domænet i vite.config.js under `server.allowedHosts`.

4. Åbn URL i to browsere (f.eks. mobil og computer):
   - Tryk “Start Call” i én
   - Tryk “Answer Call” i den anden

5. Krav
- Chrome/Edge (WebRTC-kompatible)
- Firestore projekt opsat
- Samme netværk (eller ngrok)


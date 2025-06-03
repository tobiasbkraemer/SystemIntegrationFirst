12a - Webhook System (Exposee & Integrator Roles)
=================================================

Dette dokument forklarer præcist hvordan opgaven 12a er blevet løst, både som **Exposee** og **Integrator**, med alle nødvendige trin og detaljer.

--------------------------------------------------------------------------------
OVERBLIK OVER SYSTEMET
--------------------------------------------------------------------------------

- Vi har to roller i opgaven:
  1. **Exposee** – tillader registrering af webhooks og sender events ud.
  2. **Integrator** – registrerer sin webhook og modtager events.

- Vi bruger:
  - Node.js og Express til begge roller.
  - `ngrok` til at eksponere lokale servere til internettet.
  - JSON som format for webhook payloads.
  - cURL til at registrere og teste.

--------------------------------------------------------------------------------
SETUP: INSTALLATION OG START
--------------------------------------------------------------------------------

1. Installer afhængigheder:
   (Kør i roden)

   npm install express node-fetch

2. Start din exposee (webhook-server):

   cd exposee
   node server.js

   Output: "Webhook server running on http://localhost:3000"

3. Start din integrator (webhook-modtager):

   cd integrator
   node receiver.js

   Output: "Receiver listening on http://localhost:3001/webhook"

--------------------------------------------------------------------------------
NGROK - EKSPONER DIN SERVER
--------------------------------------------------------------------------------

1. Download ngrok og placer `ngrok.exe` i din mappe.
2. Kør:

   .\ngrok config add-authtoken <din-token>

3. Start exposee server:

   .\ngrok http 3000

   → Husk din URL fx: https://abc123.ngrok-free.app

4. Start integrator receiver:

   .\ngrok http 3001

   → Husk din URL fx: https://xyz456.ngrok-free.app

--------------------------------------------------------------------------------
ROLLE: SOM EXPOSEE
--------------------------------------------------------------------------------

1. Din webhook-server (`server.js`) skal understøtte følgende endpoints:

   - `POST /register` – gem webhook (fx i en JSON-fil)
   - `GET /ping` – sender test payload til ALLE registrerede webhooks
   - `POST /simulate-payment` – sender "payment_received"-event

2. Register/unregister webhook via cURL (kørt af integrator eller ven):

   curl -X POST https://abc123.ngrok-free.app/register \
     -H "Content-Type: application/json" \
     -d '{"url": "https://xyz456.ngrok-free.app/webhook", "event": "payment_received"}'

    curl -X POST https://abc123.ngrok-free.app/unregister \
     -H "Content-Type: application/json" \
     -d '{"url": "https://xyz456.ngrok-free.app/webhook", "event": "payment_received"}'

3. Test med ping:

   curl https://abc123.ngrok-free.app/ping

4. Simuler betaling:

   curl -X POST http://localhost:3000/simulate-payment

--------------------------------------------------------------------------------
ROLLE: SOM INTEGRATOR
--------------------------------------------------------------------------------

1. Kør din `receiver.js` på port 3001:

   node receiver.js

2. Eksponér via ngrok:

   .\ngrok http 3001 → fx https://xyz456.ngrok-free.app

3. Registrer/unregiser din webhook hos en ven (Exposee):

   curl -X POST https://<vens-ngrok-url>/register \
     -H "Content-Type: application/json" \
     -d '{"url": "https://xyz456.ngrok-free.app/webhook", "event": "payment_received"}'

    curl -X POST https://<vens-ngrok-url>/unregister \
     -H "Content-Type: application/json" \
     -d '{"url": "https://xyz456.ngrok-free.app/webhook", "event": "payment_received"}'

4. Når ven pinger eller sender "simulate-payment", modtager du:

   Received webhook event:
   {
     "event": "payment_received",
     "data": "..."
   }

--------------------------------------------------------------------------------
STORAGE AF WEBHOOKS
--------------------------------------------------------------------------------

Webhooks gemmes lokalt i en JSON-fil, fx `webhooks.json`.

Format:

[
  {
    "url": "https://xyz456.ngrok-free.app/webhook",
    "event": "payment_received"
  }
]



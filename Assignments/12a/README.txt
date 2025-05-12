12a - Webhook System (Exposee + Integrator)
===========================================

🔧 Setup Overview
-----------------
This project demonstrates a working webhook system using Node.js and Express.
It contains two parts:

1. **Exposee**: A server that lets clients register webhook endpoints and sends events.
2. **Integrator**: A client that runs a receiver server to accept webhook POST events.

Folder Structure
-------------------
12a/
├── exposee/
│   └── server.js         # Webhook registration + ping sender
├── integrator/
│   └── receiver.js       # Webhook receiver
└── package.json

🚀 How to Run It
----------------

1. Install dependencies (only once, in the root folder):

    npm install express node-fetch

2. Start the webhook server (Exposee):

    cd exposee
    node server.js

    Output: "Webhook server running on http://localhost:3000"

3. In a new terminal, start the webhook receiver (Integrator):

    cd integrator
    node receiver.js

    Output: "Receiver listening on http://localhost:3001/webhook"

Register a Webhook
----------------------
Use curl (Git Bash) to register the webhook:

    curl -X POST http://localhost:3000/register \
      -H "Content-Type: application/json" \
      -d '{"url": "http://localhost:3001/webhook", "event": "test"}'

Response:

    Webhook registered.

Trigger Webhook Event
------------------------
Send a ping to all registered webhook endpoints:

    curl http://localhost:3000/ping

Expected output in receiver terminal:

    Received webhook event:
    {
      "event": "test",
      "data": "Test ping payload"
    }

Dependencies
---------------
This solution uses:
- express
- node-fetch

Notes
--------
- No UI is used — this is all HTTP-based.
- Webhooks are stored in-memory (you can persist to a file/DB if needed).
- You can extend this by supporting DELETE /register to remove hooks.
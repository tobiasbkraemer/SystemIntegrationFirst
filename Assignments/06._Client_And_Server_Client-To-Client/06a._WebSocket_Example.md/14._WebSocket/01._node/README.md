WebSocket Example – Opgave 06a

Denne opgave viser et simpelt eksempel på brugen af WebSockets i Node.js.
Der er både en WebSocket-server og en klient, som kommunikerer direkte.

---

## Filer:
- server.js        → WebSocket-server (bruger ws-pakken)
- client.js        → WebSocket-klient (forbinder til serveren og sender en besked)

---

## Forudsætninger:
- Node.js installeret
- ws-pakken installeret

Installer ws-pakken med:
npm install ws

---

## Sådan køres serveren:

1. Åbn en terminal
2. Kør:
   node server.js

Serveren starter på port 8080 (eller en anden port hvis angivet via miljøvariabel).

## Sådan køres klienten:

1. Åbn en ny terminal
2. Kør:
   node client.js

Klienten forbinder til serveren og sender en besked:
"Sending a client message from Node.js"

Når serveren modtager beskeden, videresender den den til alle forbundne klienter.

Du kan køre klienten flere gange for at simulere flere forbindelser.

---

## Formål:

Formålet med opgaven er at demonstrere to-vejs realtidskommunikation mellem server og klient ved hjælp af WebSockets, uden brug af almindelige HTTP-requests. Serveren kan håndtere flere samtidige klienter og videresender beskeder til dem alle.

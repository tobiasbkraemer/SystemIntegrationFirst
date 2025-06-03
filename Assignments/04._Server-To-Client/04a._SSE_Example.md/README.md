Opgave 4a – Server-Sent Events (SSE)

Denne opgave viser brugen af Server-Sent Events (SSE) i Node.js og Express.
Serveren sender den aktuelle tid til klienten hvert sekund.


Filer:
- server.js         → Express-server der håndterer SSE
- public/index.html → HTML-klient der modtager og viser tiden

Sådan kører du det:

1. Installer Express hvis nødvendigt:
   npm install express

2. Start serveren:
   node server.js

3. Åbn browseren og gå til:
   http://localhost:8080


Funktionalitet:

- Klienten bruger EventSource til at forbinde til /synchronizetime
- Serveren sender tid i ISO-format hvert sekund
- Status vises i browseren (Connected, Connecting, Closed)


Formål:
At demonstrere hvordan man sender realtidsdata fra server til klient
uden brug af WebSockets – kun med indbygget browserteknologi (SSE).

Dette projekt består af to servere, der kan parse forskellige dataformater (JSON, XML, YAML, TXT, CSV) og kommunikere med hinanden.

- **Part I**: Parse datafiler lokalt
- **Part II**: Eksponér data via en server (FastAPI)

AKTUEL
- **Part III**: Tilføj en anden server (Express/Node.js) og lad dem snakke sammen

**Server A**
C:\Users\tobia\System Integration\SystemIntegrationFirst\Assignments\02._Data\00._Data_parsing_server_Part_II
Start: 
uvicorn main:app --reload

**Server B**
C:\Users\tobia\System Integration\SystemIntegrationFirst\Assignments\03._Server-To-Server\03a._Data_parsing_server_Part_III.md
Start:
node app.js

Prøv:
http://localhost:5000/parse/json
http://localhost:8000/parse/xml

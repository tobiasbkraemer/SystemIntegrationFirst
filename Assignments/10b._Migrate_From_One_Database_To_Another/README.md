Beskrivelse af løsning til opgave 10b – Migrering mellem databaser
Formål:
Migrere data (brugere) fra én PostgreSQL-database til en anden ved hjælp af Node.js og Knex.js.

Teknologier:
Node.js (ES Modules)
Knex.js
PostgreSQL via Docker
dotenv (miljøkonfiguration)

Struktur:
.env.source definerer kilde-databasen (sourcedb på port 5433)
.env.target definerer mål-databasen (targetdb på port 5434)
docker-compose.yml starter begge databaser med volumener
seed-source.js opretter og fylder sourcedb.users med testdata

migrate-data.js:
Læser begge .env-filer separat
Sikrer at users-tabellen findes i targetdb
Kopierer data fra sourcedb.users til targetdb.users

Resultat:
Begge databaser har users-tabellen med 3 brugere efter migrering.

Commandoer:
docker-compose up -d
docker-compose dopwn -v

npm install knex pg dotenv  

npm run seed

npm run migrate
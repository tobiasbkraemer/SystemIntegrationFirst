
README – Assignment 13a: GraphQL Server med Apollo
========================================================

Formål:
-------
Oprette en GraphQL-server i Node.js baseret på det udleverede schema.graphql.

Teknologier brugt:
------------------
- Node.js
- Apollo Server
- Express
- graphql-ws (WebSocket support for Subscription)
- graphql-subscriptions (PubSub)
- GraphQL schema + resolvers

1. Installation
---------------
1. Klon projektet:
   git clone <repo-url>
   cd <projektmappe>

2. Installer afhængigheder:
   npm install

2. Kør serveren
---------------
npm start

Output:
Server is now running on http://localhost:4000/graphql

3. Test med GraphQL Explorer
----------------------------
Gå til: http://localhost:4000/graphql

Eksempler på queries:

Få alle bøger:
--------------
query {
  books {
    id
    title
    releaseYear
    author {
      name
    }
  }
}

Tilføj ny bog:
--------------
mutation {
  addBook(authorId: 2, title: "Emma", releaseYear: 1815) {
    id
    title
  }
}

Subscription (valgfri – kræver WebSocket-klient):
-------------------------------------------------
subscription {
  bookAdded {
    id
    title
  }
}

4. Struktur
-----------
- src/graphql/schema.graphql → Det overordnede GraphQL-schema
- resolvers/ → Indeholder Query, Mutation, Subscription, Book, Author
- database/data.js → Dummy database med bøger og forfattere
- database/pubsubUtil.js → PubSub til Subscription

Bemærk:
-------
- Projektet bruger ESM (type: "module") i package.json
- Hvis du bruger Windows, anbefales Node.js v18 eller nyere

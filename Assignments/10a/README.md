# Assignment 10a – Document a Database

## Overview

This assignment demonstrates the documentation of a PostgreSQL database using a modern documentation tool.

## Tool Used

I used **[dbdocs.io](https://dbdocs.io)** together with **DBML (Database Markup Language)** to create a visual and structured documentation of the database schema.

## Schema Overview

The documented database contains the following tables:

- `users`
- `products`
- `knex_migrations`
- `knex_migrations_lock`

## Live Documentation Link

You can view the database documentation here:  
🔗 [https://dbdocs.io/tobiasbkraemer/10a](https://dbdocs.io/tobiasbkraemer/10a)

## Files

- `schema.dbml`: Describes the database schema in DBML format and is used to generate the documentation.
- This `README.md`: Contains an overview of the work and the documentation link.

## Notes

The documentation was generated using the following commands:

```bash
npm install -g dbdocs
dbdocs login
dbdocs build schema.dbml

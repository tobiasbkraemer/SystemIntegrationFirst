import 'dotenv/config';

/**
 * @type { import("knex").Knex.Config }
 */
export default {
  client: 'postgresql',
  connection: {
    host: "localhost",
    port: "5433",
    user: "myuser",
    password: "mypassword",
    database: "mydatabase"
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

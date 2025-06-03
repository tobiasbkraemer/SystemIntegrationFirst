import knex from 'knex';
import { config } from 'dotenv';

// Load source env
config({ path: '.env.source', override: true }); // force override
const source = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
});

// Gem source værdier
const sourceEnv = { ...process.env };

// Load target env (override=true sikrer at værdier overskrives)
config({ path: '.env.target', override: true }); // force override
const target = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
});

// Debug output
console.log('Using source DB:', sourceEnv.POSTGRES_DB, 'on port', sourceEnv.POSTGRES_PORT);
console.log('Using target DB:', process.env.POSTGRES_DB, 'on port', process.env.POSTGRES_PORT);


async function migrate() {
  try {
    // Sikr at target har en users-tabel
    const exists = await target.schema.hasTable('users');
    if (!exists) {
      await target.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('first_name');
        table.string('last_name');
      });
    }

    // Hent data fra source
    const users = await source('users').select('*');
    console.log(`Migrating ${users.length} users...`);

    // Indsæt i target
    await target('users').del();
    await target('users').insert(users);

    console.log('Migration complete');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await source.destroy();
    await target.destroy();
  }
}

migrate();

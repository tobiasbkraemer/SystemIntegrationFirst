import knex from 'knex';
import config from './knexfile-source.js';

const db = knex(config);

async function seed() {
  await db.schema.dropTableIfExists('users');
  await db.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('first_name');
    table.string('last_name');
  });

  await db('users').insert([
    { first_name: 'John', last_name: 'Doe' },
    { first_name: 'Jane', last_name: 'Smith' },
    { first_name: 'Alice', last_name: 'Johnson' }
  ]);

  console.log('Seeded source database');
  await db.destroy();
}

seed();

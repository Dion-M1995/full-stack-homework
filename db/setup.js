const fs = require('fs');
const path = require('path');
const postgres = require('postgres');

const PG_HOST = 'localhost';
const PG_PORT = 5432;
const PG_DATABASE = 'alison_assessment'; // Using a new, clean database
const PG_USER = 'postgres';
const PG_PASSWORD = 'postgres';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function setupDatabase() {
  let lastError;
  for (let i = 0; i < 5; i++) {
    try {
      console.log(`Attempt ${i + 1}: Connecting to PostgreSQL...`);
      const sql = postgres({
        host: PG_HOST,
        port: PG_PORT,
        database: 'postgres', // Connect to default db first
        user: PG_USER,
        password: PG_PASSWORD,
        connect_timeout: 5,
      });

      // 1. Create the new database
      console.log(`Creating database "${PG_DATABASE}"...`);
      await sql`CREATE DATABASE ${sql(PG_DATABASE)}`;
      console.log('Database created successfully.');
      await sql.end();

      // 2. Connect to the new database
      const dbSql = postgres({
        host: PG_HOST,
        port: PG_PORT,
        database: PG_DATABASE,
        user: PG_USER,
        password: PG_PASSWORD,
      });

      // 3. Apply the schema
      console.log('Applying schema...');
      const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
      await dbSql.unsafe(schema);
      console.log('Database schema loaded successfully.');
      await dbSql.end();

      console.log('✅ Database setup complete!');
      return; // Success!
    } catch (error) {
      lastError = error;
      if (error.message.includes('already exists')) {
        console.log(`Database "${PG_DATABASE}" already exists. Applying schema...`);
        // If the database exists, we can skip creating it and just apply the schema.
        const dbSql = postgres({
          host: PG_HOST,
          port: PG_PORT,
          database: PG_DATABASE,
          user: PG_USER,
          password: PG_PASSWORD,
        });
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        await dbSql.unsafe(schema);
        console.log('Database schema loaded successfully.');
        await dbSql.end();
        console.log('✅ Database setup complete!');
        return; // Success!
      }
      console.error(`Attempt ${i + 1} failed:`, error.message);
      if (i < 4) {
        console.log('Retrying in 3 seconds...');
        await sleep(3000);
      }
    }
  }
  console.error('\n❌ Database setup failed after all retries.');
  console.error('Final error:', lastError);
  process.exit(1);
}

setupDatabase();

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

// CREATE SCHEMA todoapp;
// CREATE TABLE todoapp.items (id text, title text, completed bool);
// INSERT INTO todoapp.items VALUES ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'Walk the dog', false);

module.exports.queryDb = async (query) => {
    const client = await pool.connect();
    return await client.query("SELECT * FROM todoapp.items;");
};
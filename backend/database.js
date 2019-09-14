const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

module.exports.query = async (query) => {
    const client = await pool.connect();
    console.log(`Sending query: ${query}`);

    const response = client.query(query);
    console.log(`Got response (${JSON.stringify(response).length} characters)`);
    return response;
};

const buildTable = async () => {
    try {
        await module.exports.query('SELECT * FROM todoapp.items;');
        console.log('Table already exists.');
    } catch (e) {
        console.log('Building table...');
        await module.exports.query('CREATE SCHEMA todoapp;');
        await module.exports.query('CREATE TABLE todoapp.items (id text, title text, completed bool);');
        await module.exports.query("INSERT INTO todoapp.items VALUES ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'Walk the dog', false);");
    }
};

buildTable().then(r => {});
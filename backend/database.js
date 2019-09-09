const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

module.exports.queryDb = async (query) => {
    const client = await pool.connect();
    await client.query("INSERT INTO todo_list VALUES ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'Walk the dog', false);");
    return await client.query("SELECT * FROM todo_list;");
};

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env,DATABASE_URL,
    ssl: true
});

module.exports.queryDb = async (query) => {
    const client = await pool.connect();
    return await client.query(query);
};

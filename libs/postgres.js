const { Pool } = require('pg');


  const pool = new Pool({
    user: 'admin123',
    port: 5432,
    password: 'admin123',
    database: 'my_store'
  });

module.exports = pool;

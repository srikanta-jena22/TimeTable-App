const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ai_timetable",
  password: "srikanta22",
  port: 1523,
});

module.exports = pool;

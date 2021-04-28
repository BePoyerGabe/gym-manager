const { Pool } = require("pg");
require("dotenv").config();
//Pool - se não usar o tipo pool preciso informar user e password toda query

module.exports = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

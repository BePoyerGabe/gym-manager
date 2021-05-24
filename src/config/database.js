const { Pool } = require("pg");
//Pool - se não usar o tipo pool preciso informar user e password toda query

module.exports = new Pool({
  user: "postgres",
  password: "31101999",
  host: "localhost",
  port: 5432,
  database: "gymmanager",
});

const db = require("../../config/database");

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM instructors`, (err, results) => {
      callback(results.rows);
    });
  },
  create(data, callback) {
    const query = `
      INSERT INTO instructors (name, avatar_url, gender, services, birth, created_at)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `;

    db.query(query, data, function (err, result) {
      if (err) return new Error("Erro ao inserir instrutor");

      callback(result.rows[0].id);
    });
  },
};

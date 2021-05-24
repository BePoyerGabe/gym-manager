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
      if (err) throw new Error("Erro ao inserir instrutor");

      callback(result.rows[0].id);
    });
  },

  find(id, callback) {
    db.query(
      "SELECT * FROM instructors WHERE id = $1",
      [id],
      (err, results) => {
        if (err) throw new Error(`Database error: ${err}`);
        console.log(results.rows[0]);
        callback(results.rows[0]);
      }
    );
  },

  update(data, callback) {
    const query = `
      UPDATE instructors SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        gender=($4),
        services=($5)
        WHERE id = $6
    `;

    const values = [
      data.avatar_url,
      data.name,
      data.birth,
      data.gender,
      data.services,
      data.id,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw new Error(`Database error, update was canceled: ${err}`);
    });

    callback();
  },

  delete(id, callback) {
    db.query(
      `DELETE FROM instructors WHERE id = $1`,
      [id],
      (error, results) => {
        if (error) throw new Error(`Cannot delete: ${error}`);

        callback();
      }
    );
  },
};

const db = require("../../config/database");

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM members ORDER BY name ASC`, (err, results) => {
      callback(results.rows);
    });
  },

  create(data, callback) {
    const query = `
      INSERT INTO members (name, avatar_url, gender, email, birth, blood, weight, height )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
    `;

    db.query(query, data, function (err, result) {
      if (err) throw new Error(`Erro ao inserir membro: ${err}`);

      callback(result.rows[0].id);
    });
  },

  find(id, callback) {
    db.query("SELECT * FROM members WHERE id = $1", [id], (err, results) => {
      if (err) throw new Error(`Database error: ${err}`);
      console.log(results.rows[0]);
      callback(results.rows[0]);
    });
  },

  update(data, callback) {
    const query = `
      UPDATE members SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        gender=($4),
        email=($5),
        blood=($6),
        weight=($7),
        height=($8)
        WHERE id = $9
    `;

    const values = [
      data.avatar_url,
      data.name,
      data.birth,
      data.gender,
      data.email,
      data.blood,
      data.weight,
      data.height,
      data.id,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw new Error(`Database error, update was canceled: ${err}`);
    });

    callback();
  },

  delete(id, callback) {
    db.query(`DELETE FROM members WHERE id = $1`, [id], (error, results) => {
      if (error) throw new Error(`Cannot delete: ${error}`);

      callback();
    });
  },
};

const db = require("../../config/database");

module.exports = {
   all(callback) {
    db.query(`SELECT * FROM members ORDER BY name ASC`, (err, results) => {
      callback(results.rows);
    });
  },

  create(data, callback) {
    const query = `
      INSERT INTO members (
        name, 
        avatar_url, 
        gender, 
        email, 
        birth, 
        blood, 
        weight, 
        height,
        instructor_id
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `;

    db.query(query, data, function (err, result) {
      if (err) throw new Error(`Erro ao inserir membro: ${err}`);

      callback(result.rows[0].id);
    });
  },

  find(id, callback) {
    db.query(`SELECT members.*, instructors.name AS instructor_name
              FROM members 
              LEFT JOIN instructors ON (members.instructor_id = instructors.id)
              WHERE members.id = $1`, [id], (err, results) => {
      if (err) throw new Error(`Database error: ${err}`);
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
        height=($8),
        instructor_id=($9)
        WHERE id = $10
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
      data.instructor,
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

  instructorSelect(callback) {
    db.query(`SELECT id, name FROM instructors`, (err, results) => {
      if (err) throw new Error("Database error ", err);

      callback(results.rows);
    });
  },
};

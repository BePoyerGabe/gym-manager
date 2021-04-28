const { age, fullbirthday } = require("../../lib/age");
const Instructor = require("../models/instructor");

module.exports = {
  index(req, res) {
    Instructor.all((instructors) => {
      res.render(`instructors/index.njk`, { instructors });
    });
  },

  create(req, res) {
    //Rota html para a criação de instrutores
    res.render("instructors/create.njk");
  },

  show(req, res) {
    res.render("instructors/show.njk");
  },

  edit(req, res) {
    res.render("instructors/edit.njk");
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      //["avatar_url","name","birth","gender","services"]
      if (req.body[key] == "") return res.send(`Field ${key} is obligatory`);
    }

    const instructorToInsert = [
      req.body.name,
      req.body.avatar_url,
      req.body.gender,
      req.body.services,
      fullbirthday(req.body.birth).iso,
      fullbirthday(Date.now()).iso,
    ];

    Instructor.create(instructorToInsert, (createdInstructorId) => {
      res.redirect(`/instrutores/show/${createdInstructorId}`);
    });
  },

  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      //["avatar_url","name","birth","gender","services"]
      if (req.body[key] == "") return res.send(`Field ${key} is obligatory`);
    }

    return;
  },

  delete(req, res) {
    return;
  },
};

const { age, fullbirthday } = require("../../lib/age");
const Instructor = require("../models/instructor");

module.exports = {
  index(req, res) {
    Instructor.all((instructors) => {
      return res.render(`instructors/index.njk`, { instructors });
    });
  },

  create(req, res) {
    //Rota html para a criação de instrutores
    res.render("instructors/create.njk");
  },

  show(req, res) {
    Instructor.find(req.params.id, (instructor) => {
      if (!instructor) return res.send("Not found this instructor");

      instructor.age = age(instructor.birth);
      instructor.services = instructor.services.split(",");
      instructor.created_at = fullbirthday(instructor.created_at).ptFormat;

      return res.render("instructors/show.njk", { instructor });
    });
  },

  edit(req, res) {
    Instructor.find(req.params.id, (instructor) => {
      if (!instructor) return res.send("Not found this instructor");

      instructor.birth = fullbirthday(instructor.birth).iso;
      instructor.services = instructor.services.split(",");
      instructor.created_at = fullbirthday(instructor.created_at).ptFormat;

      return res.render("instructors/edit.njk", { instructor });
    });
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

    Instructor.update(req.body, () => {
      return res.redirect(`instrutores/show/${req.body.id}`);
    });
  },

  delete(req, res) {
    Instructor.delete(req.body.id, () => {
      return res.redirect(`/instrutores`);
    });
  },
};

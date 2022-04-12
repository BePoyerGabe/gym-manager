const { age, fullbirthday } = require("../../lib/age");

const Member = require("../models/member");

module.exports = {
  index(req, res) {
    Member.all((members) => {
      return res.render(`members/index.njk`, { members });
    });
  },

  create(req, res) {
    //Rota html para a criação de instrutores
    Member.instructorSelect((instructors) => {
      console.log("teste", instructors)
      return res.render("members/create.njk", { instructors });
    });
  },

  show(req, res) {
    Member.find(req.params.id, (member) => {
      if (!member) return res.send("Not found this member");

      member.birth = fullbirthday(member.birth).memberShow;

      return res.render("members/show.njk", { member });
    });
  },

  edit(req, res) {
    Member.find(req.params.id, (member) => {
      if (!member) return res.send("Not found this member");

      member.birth = fullbirthday(member.birth).iso;

      Member.instructorSelect((instructors) => {
        console.log("teste", instructors)
        return res.render("members/edit.njk", { member, instructors });
      });

    });
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      //["avatar_url","name","birth","gender","services"]
      if (req.body[key] == "") return res.send(`Field ${key} is obligatory`);
    }

    const memberToInsert = [
      req.body.name,
      req.body.avatar_url,
      req.body.gender,
      req.body.email,
      fullbirthday(req.body.birth).iso,
      req.body.blood,
      req.body.weight,
      req.body.height,
      req.body.instructor_id
    ];

    Member.create(memberToInsert, (createdMemberId) => {
      res.redirect(`/membros/show/${createdMemberId}`);
    });
  },

  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      //["avatar_url","name","birth","gender","services"]
      if (req.body[key] == "") return res.send(`Field ${key} is obligatory`);
    }

    Member.update(req.body, () => {
      return res.redirect(`membros/show/${req.body.id}`);
    });
  },

  delete(req, res) {
    Member.delete(req.body.id, () => {
      return res.redirect(`/membros`);
    });
  },
};

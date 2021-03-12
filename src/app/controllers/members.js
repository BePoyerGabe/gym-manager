const { age, fullbirthday } = require("../../lib/age");

module.exports = {
  index(req, res) {
    return;
  },
  show(req, res) {
    return;
  },
  edit(req, res) {
    return;
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      //["avatar_url","name","birth","gender","services"]
      if (req.body[key] == "") return res.send(`Field ${key} is obligatory`);
    }
    return;
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send(`Field ${key} is obligatory`);
    }

    return;
  },
  delete(req, res) {
    return;
  },
};

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

    let { avatar_url, name, birth, gender, services } = req.body;

    return;

    //writeFile (path, dado a ser salvo, callback)
    // deve usar o JSON pois senão salvaria como OBJECT

    // com a linha abaixo, ele enviaria para instrutores porém mostraria o req.body
    // pois a  callback levaria algum tempo para ser executada
    // return res.send(req.body)
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

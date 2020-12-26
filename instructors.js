const fs = require('fs');
const data = require('./data.json')

exports.post = function (req, res) {
    //req.query geralm GET------ ?id=
    //req.body geralm POST

    const keys = Object.keys(req.body)


    for (key of keys) {
    //["avatar_url","name","birth","gender","services"]
    if (req.body[key] == "") 
        //req.body.key
        return res.send(`Field ${key} is obligatory`)
    }

    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now();

    data.instrutores.push(req.body)


    //writeFile (path, dado a ser salvo, callback)
    // deve usar o JSON pois senão salvaria como OBJECT
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send('Fail to write file')

        return res.redirect('/instrutores')
    })

    // com a linha abaixo, ele enviaria para instrutores porém mostraria o req.body
    // pois a  callback levaria algum tempo para ser executada
    // return res.send(req.body)
}
const { json } = require('express');
const fs = require('fs');
const data = require('./data.json')
const { age } = require('./assets/age')

exports.show = function (req, res) {
    const { id } = req.params

    const foundedInstructor = data.instrutores.find(element => element.id == id)

    // if(!foundedInstructor) {
    //     return res.send('This instructor does nott exist');
    // }
    const instructor = {
        ...foundedInstructor,
        age: age(foundedInstructor.birth),
        services: foundedInstructor.services.split(","),
        created_at: Intl.DateTimeFormat('pt-BR').format(foundedInstructor.created_at)
    }
    console.log(instructor)
    return res.render('instrutores/show', {instructor})
}

exports.post = function (req, res) {

    const keys = Object.keys(req.body)


    for (key of keys) {
    //["avatar_url","name","birth","gender","services"]
    if (req.body[key] == "") 
        return res.send(`Field ${key} is obligatory`)
    }

    let {avatar_url, name, birth, gender, services} = req.body;

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instrutores.length + 1)

    data.instrutores.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })


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
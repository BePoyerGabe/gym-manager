const fs = require('fs');
const data = require('../data.json')
const { fullbirthday } = require('../utils/age')

exports.loadTableMembers = function (req, res) {

    res.render('members/index.njk', { members: data.membros })

}

exports.post = function (req, res) {

    const keys = Object.keys(req.body)


    for (key of keys) {
        //["avatar_url","name","birth","gender","services"]
        if (req.body[key] == "")
            return res.send(`Field ${key} is obligatory`)
    }

    let { avatar_url, name, email, birth, gender, blood, weight, height } = req.body;

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.membros.length + 1)

    data.membros.push({
        id,
        avatar_url,
        name,
        email,
        birth,
        gender,
        blood,
        weight,
        height,
        created_at
    })


    //writeFile (path, dado a ser salvo, callback)
    // deve usar o JSON pois senão salvaria como OBJECT
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Fail to write file')

        return res.redirect('/membros')
    })

    // com a linha abaixo, ele enviaria para membros porém mostraria o req.body
    // pois a  callback levaria algum tempo para ser executada
    // return res.send(req.body)
}

exports.show = function (req, res) {
    const { id } = req.params

    const foundedMember = data.membros.find(element => element.id == id)

    if (!foundedMember) {
        return res.send('This member does not exist');
    }
    const member = {
        ...foundedMember,
        birthday: fullbirthday(foundedMember.birth).memberShow,
        created_at: Intl.DateTimeFormat('pt-BR').format(foundedMember.created_at)
    }

    return res.render('members/show', { member })
}

exports.edit = function (req, res) {
    const { id } = req.params

    const foundedMember = data.membros.find(element => element.id == id)

    if (!foundedMember) {
        return res.send('This member does not exist');
    }

    // não manipulando o dado original
    const member = {
        ...foundedMember,
        birth: fullbirthday(foundedMember.birth).iso,
        id: Number(id)
    }

    res.render('members/edit', { member })
}

exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundedMember = data.membros.find((element, indexFind) => {
        if (element.id == id) {
            index = indexFind
            return true
        }
    })

    if (!foundedMember) {
        return res.send('This member does not exist');
    }

    const updatedMember = {
        ...foundedMember,
        ...req.body
    }

    data.membros[index] = updatedMember

    fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Error: ' + err)

        return res.redirect(`/membros/show/${id}`)
    })


}

exports.delete = function (req, res) {
    const { id } = req.body

    const filteredMember = data.membros.filter(member => {
        return member.id != id
    })

    if (!filteredMember) {
        return res.send('This member does not exist');
    }

    data.membros = filteredMember

    fs.writeFile('./data.json', JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Error: ' + err)

        return res.redirect('/membros')
    })
}
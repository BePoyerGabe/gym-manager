const express = require('express');
const instructors = require('./controllers/instructors')
const members = require('./controllers/members')
const routes = express.Router();

/*
Assim fica um midlleware aqui nas rotas
routes.get('/', function(){}, (req, res) => {} 

*/

routes.get('/membros', members.loadTableMembers)
routes.post('/membros', members.post)           //Rota criação de intrutores
routes.get('/membros/show/:id', members.show)
routes.get('/membros/:id/edit', members.edit)
routes.put('/membros', members.put)
routes.delete('/membros', members.delete)
routes.get('/membros/create', (req, res) => {       //Rota html para a criação de instrutores
    res.render('members/create')
})

routes.get('/', (req, res) => { res.redirect('/instrutores') })
routes.get('/instrutores', instructors.loadTableInstructors)
routes.post('/instrutores', instructors.post)           //Rota criação de intrutores
routes.get('/instrutores/show/:id', instructors.show)
routes.get('/instrutores/:id/edit', instructors.edit)
routes.put('/instrutores', instructors.put)
routes.delete('/instrutores', instructors.delete)

routes.get('/instrutores/create', (req, res) => {       //Rota html para a criação de instrutores
    res.render('instructors/create')
})

module.exports = routes
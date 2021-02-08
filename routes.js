const express = require('express');
const instructors = require('./instructors')
const routes = express.Router();

/*
Assim fica um midlleware aqui nas rotas
routes.get('/', function(){}, (req, res) => {} 

*/

routes.get('/', (req, res) => {
    res.redirect('/instrutores')
})

routes.get('/instrutores', instructors.loadTableInstructors)

routes.get('/membros', (req, res) => {
    res.send('membros')
})

routes.get('/instrutores/create', (req, res) => {       //Rota html para a criação de instrutores
    res.render('instrutores/create')
})


routes.post('/instrutores', instructors.post)           //Rota criação de intrutores
routes.get('/instrutores/show/:id', instructors.show)
routes.get('/instrutores/:id/edit', instructors.edit)
routes.put('/instrutores', instructors.put)
routes.delete('/instrutores', instructors.delete)


module.exports = routes
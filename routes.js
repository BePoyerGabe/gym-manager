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


routes.get('/membros', (req, res) => {
    res.send('membros')
})

    /* Primeira página, dados mockados*/ 
routes.get('/instrutores', (req, res) => {
    res.render('instrutores/index')
})

/* Rota html para a criação de instrutores */
routes.get('/instrutores/create', (req, res) => {
    res.render('instrutores/create')
})

/* Rota criação de intrutores */
routes.post('/instrutores', instructors.post)


routes.get('/instrutores/show/:id', instructors.show)

routes.get('/instrutores/:id/edit', instructors.edit)

routes.put('/instrutores', instructors.put)

routes.delete('/instrutores', instructors.delete)


module.exports = routes
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


routes.get('/instrutores', (req, res) => {
    res.render('instrutores/index')
})

routes.get('/instrutores/create', (req, res) => {
    res.render('instrutores/create')
})

routes.get('/instrutores/show/:id', instructors.show)

routes.post('/instrutores', instructors.post)
module.exports = routes
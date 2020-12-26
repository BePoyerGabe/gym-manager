const express = require('express');
const Instructors = require('./instructors')
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

routes.post('/instrutores', Instructors.post)
module.exports = routes
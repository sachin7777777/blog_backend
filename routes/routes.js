// const { Bollywood_data,Hollywood_data, Technology_data, Fitness_data, Food_data,  } = require('../controller/api')
const { signup, login, logout, auth } = require('../controller/user')

const route = require('express').Router()

// route.get('/Bollywood_data',Bollywood_data)
// route.get('/Hollywood_data',Hollywood_data)
// route.get('/Technology_data',Technology_data)
// route.get('/Fitness_data',Fitness_data)
// route.get('/Food_data',Food_data)

route.post('/signup',signup)
route.post('/login',login)
route.post('/logout',logout)
route.get('/auth',auth)

module.exports = route

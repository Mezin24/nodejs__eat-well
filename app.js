const fs = require('fs')
const path = require('path')

const express = require('express')
const { v4: uuidv4 } = require('uuid')

const restData = require('./utils/restaurants-data')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/confirm', (req, res) => {
  res.render('confirm')
})

app.get('/recommend', (req, res) => {
  res.render('recommend')
})

app.post('/recommend', (req, res) => {
  const newRestaurant = req.body
  newRestaurant.id = uuidv4()

  const restaurants = restData.getRestaurants()
  restaurants.push(newRestaurant)
  restData.setRestaurants(restaurants)
  res.redirect('/confirm')
})

app.get('/restaurants', (req, res) => {
  const restaurants = restData.getRestaurants()

  res.render('restaurants', {
    numberOfRestaurants: restaurants.length,
    restaurants,
  })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurantID = req.params.id

  const restaurants = restData.getRestaurants()
  const restaurant = restaurants.find((el) => el.id === restaurantID)

  if (restaurant) {
    res.render('restaurant-details', {
      restaurant,
    })
  } else {
    res.status(404).render('404')
  }
})

app.use((req, res) => {
  res.status(404).render('404')
})
// app.get('/*', (req, res) => {
//   res.render('404')
// })

app.use((error, req, res, next) => {
  res.status(500).render('500')
})

app.listen(3000)

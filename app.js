const fs = require('fs')
const path = require('path')
const express = require('express')
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
  const filePath = path.join(__dirname, 'data', 'restaurants.json')
  const newRestaurant = req.body
  const restaurants = JSON.parse(fs.readFileSync(filePath))
  restaurants.push(newRestaurant)
  fs.writeFileSync(filePath, JSON.stringify(restaurants))
  res.redirect('/confirm')
})

app.get('/restaurants', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'restaurants.json')
  const restaurants = JSON.parse(fs.readFileSync(filePath))

  res.render('restaurants', {
    numberOfRestaurants: restaurants.length,
    restaurants,
  })
})

app.listen(3000)

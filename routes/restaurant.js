const fs = require('fs')

const express = require('express')
const { v4: uuidv4 } = require('uuid')

const restData = require('./../utils/restaurants-data')

const router = express.Router()

router.get('/recommend', (req, res) => {
  res.render('recommend')
})

router.post('/recommend', (req, res) => {
  const newRestaurant = req.body
  newRestaurant.id = uuidv4()

  const restaurants = restData.getRestaurants()
  restaurants.push(newRestaurant)
  restData.setRestaurants(restaurants)
  res.redirect('/confirm')
})

router.get('/restaurants', (req, res) => {
  let { order } = req.query
  let nextorder = 'desc'

  if (order !== 'asc' && order !== 'desc') {
    order = 'asc'
  }

  if (order === 'desc') {
    nextorder = 'asc'
  }

  const restaurants = restData.getRestaurants()

  restaurants.sort((restA, restB) => {
    if (
      (order === 'asc' && restA.name > restB.name) ||
      (order === 'desc' && restB.name > restA.name)
    ) {
      return 1
    }
    return -1
  })

  res.render('restaurants', {
    numberOfRestaurants: restaurants.length,
    restaurants,
    nextorder,
  })
})

router.get('/restaurants/:id', (req, res) => {
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

module.exports = router

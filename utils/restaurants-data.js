const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json')

function getRestaurants() {
  const restaurants = JSON.parse(fs.readFileSync(filePath))

  return restaurants
}

function setRestaurants(restaurants) {
  fs.writeFileSync(filePath, JSON.stringify(restaurants))
}

module.exports = {
  getRestaurants,
  setRestaurants,
}

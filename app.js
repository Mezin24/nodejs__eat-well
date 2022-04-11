const path = require('path')

const express = require('express')

const app = express()
const defaultRouter = require('./routes/default')
const restautantRouter = require('./routes/restaurant')

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', defaultRouter)
app.use('/', restautantRouter)

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

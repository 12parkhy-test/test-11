const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const app = express()
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use(indexRouter)
app.use('/users', usersRouter)

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server is running on port ${port}`) })
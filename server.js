const flash = require('express-flash')
const express = require('express')
const app = express()
const web = require('./routes/web')
const bodyParser = require('body-parser')
const session = require('express-session')
const database = require('./database/db')
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const port = 5000

app.use(fileUpload());

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
}
app.use(flash());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use('', web)

app.use(function(req, res) {
    res.status(404).send('Page Not Found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
let express = require('express')
let ejs = require('ejs')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
const bluebird = require('bluebird')
mongoose.Promise = bluebird;
let app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/pagination')

let mainRoutes = require('./routes/main')
app.use(mainRoutes)

app.set('view engine', 'ejs')

app.listen(3000, function() {
    console.log('Runing on port ' + 3000)
})
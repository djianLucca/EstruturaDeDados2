var app = require('express')()
var bodyParser = require('body-parser');

app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

module.exports = () => app
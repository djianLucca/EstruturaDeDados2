var app = require('./config/express')()
var routesPerson = require('./app/routes/person')(app)

app.listen(3001, () => {
    console.log("Server Up =]")
})
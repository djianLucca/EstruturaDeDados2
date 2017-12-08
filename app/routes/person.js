var dbConnection = require('../infra/dbConnection')()
module.exports = app => {
    app.get('/', (req, res) => {
        var data = dbConnection.getAll()
        res.render('list', {data: data})
    })

    app.get('/order', (req, res) => {
        var data = dbConnection.getAllOrdered()
        res.render('list', {data: data})
    })

    app.get('/delete/:id', (req, res) => {
        
        dbConnection.remove(req.params.id)
        .then(() => {
                var data = dbConnection.getAll()
                res.redirect('/')
        })
    })
    
    app.post('/search', (req, res) => {        
        dbConnection.search(req.body.search)
        .then(result => {
                var data = result
                res.render('list', {data: data})
        })
    })

    app.post('/', (req, res) => {
        var person = req.body

        dbConnection.insert(person)
            .then(() => {
                    var data = dbConnection.getAll()
                    res.redirect('/')
            })
    })
}
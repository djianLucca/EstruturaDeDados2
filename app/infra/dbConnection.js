var fs = require('fs')
var lastIndex

module.exports = () => {

    var data = fs.readFileSync('app/infra/db.txt', (err, dataFromTxt) => dataFromTxt)

    var getAll = () => {
        var formatedData = fs.readFileSync('app/infra/db.txt', (err, dataFromTxt) => dataFromTxt).toString().split(';')
        var allData = []

        formatedData.forEach(item => {
            var personArray = item.toString().split('|');
            allData.push({
                id: personArray[0],
                name: personArray[1],
                telephone: personArray[2]
            })
        })
        allData.splice(allData.length - 1, 1)

        return allData
    }

    var getAllOrdered = () => {
        var data = getAll()
        var ordered = data.sort((a, b) =>{
            return a.name > b.name
        }) 
        return ordered
    }

    var insert = (person) => {
        return new Promise((resolve, reject) => {
            var id = getLastIndex()
            id++
            var content = fs.readFileSync('app/infra/db.txt', (err, dataFromTxt) => dataFromTxt)
            var newData = content + id + '|' + person.name + '|' + person.telephone + ';'
            fs.writeFileSync('app/infra/db.txt', newData, (err, dataFromTxt) => dataFromTxt)    

            resolve(true)
        })
    }

    var remove = (id) => {
        return new Promise((resolve, reject) => {
            var content = getAll()
            content.splice(content.findIndex( item => item.id == id), 1)
            var newData = content.map(item => {
                return item.id + '|' + item.name + '|' + item.telephone
            })

            dataToInsert = newData.join(';')
            dataToInsert += ';'
            fs.writeFileSync('app/infra/db.txt', dataToInsert, (err, dataFromTxt) => dataFromTxt)    

            resolve(true)
        })
    }

    var search = (search) => {
        return new Promise((resolve, reject) => {
            var content = getAll()
            var filteredContet = content.filter( item => item.name == search)
            resolve(filteredContet)
        })
    }

    var getLastIndex = () => {
        var content = getAll()
        return content[content.length - 1].id
    } 
    
    return {getAll, insert, remove, search, getAllOrdered}
}
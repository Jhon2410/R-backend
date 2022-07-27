const database = require('../mongo')

const BaseUrl = database.Schema({
    url : String,
})

const baseUrl = database.model("baseUrl", BaseUrl)

module.exports = baseUrl;
const database = require('../mongo')

const peluqueria = database.Schema({

})

const Peluqueria = database.model("peluqueria", peluqueria)

module.exports = Peluqueria;
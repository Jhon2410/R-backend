const database = require('../mongo')

const peluqueria = database.Schema({
    name : String,
    description : String,
    price : String, 
    subPhotos:  Array,
    mainPhoto: String, 
    peluquero : Array,

})

const Peluqueria = database.model("cortes", peluqueria)

module.exports = Peluqueria;
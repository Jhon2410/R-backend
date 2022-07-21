const database = require('../mongo')

const peluqueria = database.Schema({
    name : String,
    description : String,
    price : String, 
    subPhotos:  Array,
    mainPhoto: String, 
    peluquero : Array,
    idPeluquero : String

})

const Peluqueria = database.model("cortesFinal", peluqueria)

module.exports = Peluqueria;
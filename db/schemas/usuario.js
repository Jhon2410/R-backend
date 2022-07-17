const database = require('../mongo')

const usuario = database.Schema({
    name : String,
    mail : String,
    password : String,
    estado : String,
    rol : String, 
    foto : String
})

const Usuario = database.model("usuario", usuario)

module.exports = Usuario;
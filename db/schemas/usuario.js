const database = require('../mongo')

const usuario = database.Schema({
    name : String,
    mail : String,
    password : String,
    estado : String,
    rol : String, 
    foto : String,
    chats: Array,
    amigos : Array,
    fotos : Array, 
    publicaciones : Array,
    descripcion : String, 
    codigoPostal : String, 
    ciudad : String,
    pais : String,
    notificaciones : Array,
    socket : String,
    historico : Array,
    estudios : Array,
    tags : Array, 
})

const Usuario = database.model("usuariosFinalFinal", usuario)

module.exports = Usuario;
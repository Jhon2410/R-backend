const router = require('express').Router()
const usuario = require("../db/schemas/usuario")
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: path.join("public/img/profile"),
  filename: (req, file, cb) => {
    cb(null, Date.now()  + file.originalname);
  }
});

const upload = multer({ storage, dest: path.join("/public/img/profil") });



// subir imagen multer
router.post("/update",upload.single("foto"),(req,res) => {
     res.json({res  : req.file.filename})
})


//Info usuario 

router.get("/user/info",(req,res)=>{
    usuario.find({_id : req.query.id})
    .then((data)=>{
       data[0].password = ""
       return  res.json({ msg : data[0] , success : true})
    }).catch(err =>{
       return  res.json({ msg : "Error" , success : false})

    })
})

// Listar todos los usuarios
router.get('/list',(req, res, next) => {
     usuario.find({})
    .then((data)=>{
        data = data.map(usuario=>{
            let {name, mail, _id , foto, rol, estado} = usuario
            return {
                _id,
                name,
                mail,
                foto,
                rol, 
                estado
            }
        })
        res.json({ msg : data , success : true})
    })
    .catch(err => console.error(err))
})


module.exports = router;
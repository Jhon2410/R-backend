const router = require('express').Router()
const usuario = require("../db/schemas/usuario")
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: path.join("public/img"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage, dest: path.join("/public/img") });



// subir imagen multer
router.post("/update",upload.single("foto"),(req,res) => {
    console.log(req)
     res.json({res  : req.file.filename})
})

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
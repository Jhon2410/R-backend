const router = require('express').Router();
const usuariosDB = require('../db/schemas/usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()


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



const Generar_token=(data)=>{
    return jwt.sign({id:data},process.env.privateHashKey,{ expiresIn: '1D'})
}
// Validar usuario login 
router.post("/login",(req,res)=>{
    const {usuario} = req.body
    const {mail ,password } = usuario
    if(!usuario){
       return res.json({success:false , msg : "Usuario o contraseña incorrecta"})
    }else{
        if((mail, password)){
            usuariosDB.find({mail})
            .then((data)=>{
                if(data.length !== 0){

                    if(data[0].mail === mail && bcrypt.compareSync(password,data[0].password,)){
                       return res.json({success:true , msg : "", token : Generar_token(data[0]._id)})
                    }else{
                        return res.json({success:false , msg : "Usuario o contraseña incorrecta"})

                     }
                }else{
                 return  res.json({success:false , msg : "Usuario o contraseña incorrecta"})
                }
            })
            .catch((err)=>{
              console.log(err);
            })
    
        }else{
           return  res.json({success:false , msg : "Usuario o contraseña incorrecta"})
    
        }
    }
   

    

})

// registrar usuario  
router.post("/register",upload.any(), (req,res)=>{
    const {name, mail ,password }  = req.body
    if(name, mail ,password){
            usuariosDB.find({mail})
            .then((data)=>{
                if(data.length !== 0){
                 return  res.json({success:false , msg : "El correo ya está en uso"})
                }else{
                    const new_usuario = usuariosDB({name, mail, password : bcrypt.hashSync(password, 10) , estado: "activo", rol : "usuario", foto : req.files[0].filename , chats : [] , amigos :[] , fotos : [] , publicaciones :[] , descripcion :"",codigoPostal : "", ciudad:  "", pais:  "", notificaciones : "" , socket : "", historico:[] , estudios :[],tags : []  })
                    new_usuario.save().then(data=> {
                        console.log(data);
                        return res.json({success:true ,msg:"" , token : Generar_token(data._id)})
                    })
                }
            })
            .catch((err)=>{
              console.log(err);
            })
      
     }else{
        return res.json({success:false , msg : "Usuario o contraseña incorrecta"})
         
     }

    
})




module.exports = router;
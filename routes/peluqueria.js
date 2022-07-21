const router = require('express').Router();
const peluqueria = require('../db/schemas/peluqueria')
const usuarios = require('../db/schemas/usuario')
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: path.join("public/img"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage, dest: path.join("/public/img") });


router.post("/cortes/delete",(req, res) => {

    const {id} = req.body
    console.log(req.body)
    if(id){
        peluqueria.remove({_id : id }).then(data=>{
            return res.json({success : true , msg : "Deleted"})
        }).catch(err=>{
            if(err){
                return res.json({success : false , msg : "Error"})

            }

        })

    }else{
        return res.json({success : false , msg : "Error server"})

    }
})

router.get("/cortes/info",(req,res)=>{
    peluqueria.find({idPeluquero : req.query.id})
    .then(data=>{
        return res.json({success : true , msg : data})
    }).catch(err=>{
        if(err) return res.json({success : false , msg : "Error server."})
    })
})

router.get('/cortes',(req,res)=>{

    peluqueria.find({})
    .then((data)=>{
        res.json({sucess : true , msg : data})

    }).catch((err)=>{
        res.json({sucess : false , msg : "Error, por favor recargue la pagina."})

    })
    
})



router.post('/add',upload.any(),(req,res)=>{
    const  { name, description, price  } =  req.body
    let mainPhoto="";
    let subPhotos = [];
    let peluquero = [];
    if(name, description, price ){
        usuarios.find({_id : req.query.id})
        .then((data)=>{
            req.files.map(file=>{
                if(file.fieldname === "mainPhoto"){
                    mainPhoto = file.filename
                }else{
                    subPhotos.push(file.filename)
                }
            })

            const idPeluquero = data[0]._id
            peluquero.push({
                id : data[0]._id,
                name : data[0].name,
                foto : data[0].foto,
                mail : data[0].mail,
            })

            const newproduct = peluqueria({ name, description, price ,mainPhoto , subPhotos , peluquero, idPeluquero})
            newproduct.save().then((err)=>{
    
              
                return  res.json({success : true , msg : "Producto agreagado" })
    
            })
         })
      
       
    }else{
       return res.json({success : false , msg : "Error al agregar" })

    }
})

module.exports = router;
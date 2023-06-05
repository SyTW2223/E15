import { User } from '../Schema/userSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { upload } from '../middleware/file'
const jwt = require('jsonwebtoken')

export const signUpR = express.Router();

signUpR.use(bodyParser.json());


signUpR.post('/signUp', upload.single('picture'), async (req: any, res)=>{
  console.log(req.body);

  let imageURL = "";
  if (req.body.picture === "") {
    console.log("No hay imagen");
    imageURL = "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
  } else {
    const url = req.protocol + '://' + req.get('host');
    if(req.file.filename){
      imageURL = url + '/public/' + req.file.filename;
    } else {
      imageURL = "";
    }
  }
  

  const new_user = new User({ id: Math.floor(Math.random() * 1000000), first_name: req.body.first_name, last_name: req.body.last_name, username: req.body.username, 
    phone_number: req.body.phone_number, email: req.body.email, password: req.body.password, 
    gender: req.body.gender, role: req.body.role, birthdate: req.body.birthdate, picture: imageURL})


  new_user.save()
  .then(async (user) =>{
    if(!user){
      res.status(400).send({message: "Fallo al guardar el usuario, no se ha podido almacenar"})
    } else{
      const token = await jwt.sign({user}, 'secretkey')
      res.status(200).json({token});
    }
  }).catch((err) =>{
    if(err.code === 11000){
      res.status(500).send({message: "El usuario ya existe"})
    } else {
      res.status(500).send({message: "ha ocurrido un error"})
    }
  })
});
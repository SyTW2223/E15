import { User } from '../Schema/userSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken')

export const signUpR = express.Router();

signUpR.use(bodyParser.json());

signUpR.post('/signUp', async (req, res)=>{
  console.log(req.body);
  //const { username, password, email, first_name, last_name, phone_number, profile_picture, role} = req.body;
  const new_user = new User({ id: Math.floor(Math.random() * 1000000), first_name: req.body.first_name, last_name: req.body.last_name, username: req.body.username, 
   phone_number: req.body.phone_number, email: req.body.email, password: req.body.password, 
   gender: req.body.gender, role: req.body.role, birthdate: req.body.birthdate, picture: req.body.picture})
  new_user.save()
  .then((saveU) =>{
    if(!saveU){
      //res.status(400).send({message: "Fallo al guardar el usuario, no se ha podido almacenar"})
    } else{
      //res.status(200).send({new_user: saveU})
    }
  }).catch((err) =>{
    if(err.code === 11000){
      //res.status(500).send({message: "El usuario ya existe"})
    } else {
      //res.status(500).send({message: "ha ocurrido un error"})
    }
  })


  const token = await jwt.sign({new_user}, 'secretkey')

  res.status(200).json({token});
});
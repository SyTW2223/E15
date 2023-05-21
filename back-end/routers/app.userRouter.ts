import { User } from '../Schema/userSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken');


export const userR = express.Router();


userR.use(bodyParser.json());


userR.get('/user', async(req, res) =>{
  const users = await User.find();
  console.log(users);
  res.status(200).json(users);
})

userR.get('/user/:id' , async(req,res) =>{
  try {
    const users = await User.findOne({_id: req.params.id});
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(401)
  }
})

userR.patch('/user/:id', async(req, res) =>{
  console.log(req.body);
  const user_update = req.body;

  await User.findByIdAndUpdate({_id: req.params.id}, user_update)
  .then((user) => {
    if(!user){
      return res.status(404).send({ msg: "Usuario no encontrado" })
    }
    return res.status(200).send({ msg: "Usuario actualizado correctamente" })
  })
  .catch(() => {
    return res.status(500).send({ msg: "Error al actualizar el usuario" })
  })
})


userR.delete('/user/:id', async(req,res) =>{
  console.log(req.body);
  await User.findByIdAndDelete({_id: req.params.id})
  .then((user)=>{
    if(!user){
    return res.status(404).send({ msg: "Usuario no encontrado" });
  }
    return res.status(200).send({ msg: "Usuario eliminado satisfactoriamente" });
  })
  .catch(()=>{
    return res.status(500).send({ msg: "Error" });
  })
})
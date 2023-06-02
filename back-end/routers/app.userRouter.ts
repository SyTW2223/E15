import { User } from '../Schema/userSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken');

export const userR = express.Router();

userR.use(bodyParser.json());

userR.get('/user', async(req, res) =>{
  await User.find()
  .then((users) =>{
    if (!users) {
      return res.status(404).json({ error: "No hay usuarios" });
    
    }
    console.log(users);
    res.status(200).json(users);
  })
  .catch(() => {
    return res.status(500).json({ error: "Error interno del servidor" });
  });
})

userR.get('/user/:id' , async(req,res) =>{
  await User.findOne({_id: req.params.id})
  .then((user) =>{
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    console.log(user);
    res.status(200).json(user);
  })
  .catch(() => {
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});

userR.patch('/user/:id', async(req, res) =>{
  await User.findOneAndUpdate({_id: req.params.id}, req.body)
  .then((user) => {
    if(!user){
      return res.status(404).send({ msg: "Usuario no encontrado" })
    }
    return res.status(200).send({ msg: "Usuario actualizado correctamente" })
  })
  .catch(() => {
    return res.status(500).send({ msg: "Error al actualizar el usuario" })
  })
});


userR.delete('/user/:id', async(req,res) =>{
  await User.findOneAndDelete({_id: req.params.id})
  .then((user)=>{
    if(!user){
    return res.status(404).send({ msg: "Usuario no encontrado" });
  }
    return res.status(200).send({ msg: "Usuario eliminado satisfactoriamente" });
  })
  .catch(()=>{
    return res.status(500).send({ msg: "Error" });
  })
});
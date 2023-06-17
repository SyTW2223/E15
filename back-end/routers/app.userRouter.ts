import { User } from '../Schema/userSchema';
import { upload } from '../middleware/file';
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
    users.sort((a, b) => (a.username > b.username) ? 1 : -1)
    res.status(200).json(users);
  })
  .catch((err) => {
    console.log(err);
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
  .catch((err) => {
    console.log(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});

userR.patch('/user/:id', upload.single('picture'), async(req: any, res) =>{
  const userId = req.params.id;
  const newUserData = req.body;

  let imageURL = "";
  if (req.body.picture === "") {
    newUserData.picture = "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
  } else {
    try {
      const url = req.protocol + '://' + req.get('host');
      if(req.file.filename){
        imageURL = url + '/public/' + req.file.filename;
        newUserData.picture = imageURL;
      }
    } catch (error) {}
  }
  
  await User.findOneAndUpdate({_id: userId}, newUserData)
  .then((user) => {
    if(!user){
      return res.status(404).send({ msg: "Usuario no encontrado" })
    }
    return res.status(200).send({ msg: "Usuario actualizado correctamente" })
  })
  .catch((err) => {
    console.log(err);
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
  .catch((err)=>{
    console.log(err);
    return res.status(500).send({ msg: "Error" });
  })
});
import { Exercise } from '../Schema/exerciseSchema';
import { User } from '../Schema/userSchema';
import { Comment } from '../Schema/commentsSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {upload} from '../middleware/file';
const jwt = require('jsonwebtoken')

export const exerciseR = express.Router();

exerciseR.use(bodyParser.json());

exerciseR.post('/exercise', upload.single('picture'),async (req, res) =>{
  await User.findOne({_id: req.body.author})
  .then((author) =>{
    if (!author) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const comments = req.body.comments;
    const new_comments = [];
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const new_comment = new Comment({username: comment.username, comment: comment.comment})
      new_comments.push(new_comment);
    }
    const new_exercise = new Exercise({id: Math.floor(Math.random() * 1000000), name: req.body.name, author: author ,short_description: req.body.short_description, long_description: req.body.long_description,
      initial_position: req.body.initial_position, category: req.body.category, equipment_needed: req.body.equipment_needed, picture: req.body.picture, likes: req.body.likes, comments: new_comments })
    new_exercise.save();
    res.status(200).send({ msg: "Ejercicio creado correctamente" });
  })
  .catch(() => {
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});

exerciseR.get('/exercise', async(req, res) =>{
  await Exercise.find()
  .then((exercises) =>{
    if (!exercises) {
      return res.status(404).json({ error: "No hay ejercicios" });
    }
    console.log(exercises);
    res.status(200).json(exercises);
  })
  .catch(() => {
    return res.status(500).json({ error: "Error interno del servidor" });
  });   
});

/* exerciseR.get('assets/image/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = `assets/image/${filename}`;

  // Envía la imagen al cliente
  res.sendFile(imagePath, { root: '.' });
}); */

exerciseR.get('/exercise/:id', async(req, res) =>{
  await Exercise.findOne({name: req.params.id})
  .then((exercise) =>{
    if (!exercise) {
      return res.status(404).json({ error: "Ejercicio no encontrado" });
    }
    res.status(200).json(exercise);
  })
  .catch(() => {
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});


exerciseR.patch('/exercise/:id', async(req, res) =>{
  await Exercise.findOneAndUpdate({name: req.params.id}, req.body)
  .then((exercise) =>{
    if(!exercise){
        return res.status(404).send({ msg: 'Ejercicios no encontrado' })
      }
      return res
        .status(200)
        .send({ msg: 'Ejercicio actualizado satisfactoriamente' })
    })
    .catch(() => {
      return res.status(500).send({ msg: 'Error al actualizar el ejercicio' })
    })  
})

exerciseR.delete('/exercise/:id', async(req, res)=>{
  await Exercise.findOneAndDelete({name: req.params.id})
  .then((Exercise)=>{
    if(!Exercise){
    return res.status(404).send({ msg: "Ejercicio no encontrado" });
  }
    return res.status(200).send({ msg: "Ejercicio eliminado satisfactoriamente" });
  })
  .catch(()=>{
    return res.status(500).send({ msg: "Error" });
  })
})

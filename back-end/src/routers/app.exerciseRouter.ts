import { Exercise } from '../Schema/exerciseSchema';
import { User } from '../Schema/userSchema';
import { Comment } from '../Schema/commentsSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {upload} from '../middleware/file';
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');

export const exerciseR = express.Router();

exerciseR.use(bodyParser.json());

exerciseR.post('/exercise', auth, upload.single('picture'),async (req: any, res) =>{
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

       
    let imageURL = "";
    if (req.body.picture === "") {
      imageURL = "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
    } else {
      const url = req.protocol + '://' + req.get('host');
      if(req.file.filename){
        imageURL = url + '/public/' + req.file.filename;
      } else {
        imageURL = "";
      }
    }


    const new_exercise = new Exercise({id: Math.floor(Math.random() * 1000000), name: req.body.name, author: author ,short_description: req.body.short_description, long_description: req.body.long_description,
      initial_position: req.body.initial_position, category: req.body.category, equipment_needed: req.body.equipment_needed, picture: imageURL, likes: req.body.likes, comments: new_comments })
    new_exercise.save()
    .then(() =>{
      return res.status(200).send({ msg: "Ejercicio creado correctamente" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Error interno del servidor" });
    });
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});

exerciseR.get('/exercise', auth, async(req, res) =>{
  await Exercise.find()
  .then((exercises) =>{
    if (!exercises) {
      return res.status(404).json({ error: "No hay ejercicios" });
    }
    console.log(exercises);
    exercises.sort((a, b) => (a.name > b.name) ? 1 : -1)
    res.status(200).json(exercises);
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  });   
});

exerciseR.get('/exercise/:id', async(req, res) =>{
  await Exercise.findOne({name: req.params.id})
  .then((exercise) =>{
    if (!exercise) {
      return res.status(404).json({ error: "Ejercicio no encontrado" });
    }
    res.status(200).json(exercise);
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});


exerciseR.patch('/exercise/:id', auth, upload.single('picture'), async(req: any, res) =>{

  let imageURL = "";
  if (req.body.picture === "") {
    req.body.picture = "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
  } else {
    try {
      const url = req.protocol + '://' + req.get('host');
      if(req.file.filename){
        imageURL = url + '/public/' + req.file.filename;
        req.body.picture = imageURL;
      }
    } catch (error) {}
  }
  
  console.log(req.params.id);
  await Exercise.findOneAndUpdate({name: req.params.id}, req.body)
  .then((exercise) =>{
    if(!exercise){
        return res.status(404).send({ msg: 'Ejercicios no encontrado' })
      }
      return res
        .status(200)
        .send({ msg: 'Ejercicio actualizado satisfactoriamente' })
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ msg: 'Error al actualizar el ejercicio' })
    })  
})

exerciseR.delete('/exercise/:id', auth, async(req, res)=>{
  await Exercise.findOneAndDelete({name: req.params.id})
  .then((Exercise)=>{
    if(!Exercise){
    return res.status(404).send({ msg: "Ejercicio no encontrado" });
  }
    return res.status(200).send({ msg: "Ejercicio eliminado satisfactoriamente" });
  })
  .catch((err)=>{
    console.log(err);
    return res.status(500).send({ msg: "Error" });
  })
})

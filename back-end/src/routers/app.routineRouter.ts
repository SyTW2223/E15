import { Routine } from '../Schema/routineSchema';
import { User } from '../Schema/userSchema';
import { Comment } from '../Schema/commentsSchema';
import { Exercise } from '../Schema/exerciseSchema';
import { upload } from '../middleware/file';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');

export const routineR = express.Router();

routineR.use(bodyParser.json());

routineR.post('/routine', auth, upload.single('picture') ,async (req: any, res) =>{
  await User.findOne({_id: req.body.author})
  .then(async (user) =>{
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const comments = req.body.comments;
    const new_comments = [];
    
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const new_comment = new Comment({username: comment.username, comment: comment.comment})
      new_comments.push(new_comment);
    }
    
    let exercises = [];
    try {
      exercises = JSON.parse(req.body.exercises);
    } catch (error) { 
      if (req.body.exercises === undefined) {
        exercises = [];
      } else {
        exercises = req.body.exercises;
      }
    }
    const new_exercises = [];
    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i];
      const new_exercise = await Exercise.findOne({_id: exercise})
      new_exercises.push(new_exercise);
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

    const new_routine = new Routine({ id: Math.floor(Math.random() * 1000000), name: req.body.name,  description: req.body.description, 
      author: user, category: req.body.category, exercises: new_exercises, equipment_needed: req.body.equipment_needed, avg_duration: req.body.avg_duration, 
      sets: req.body.sets, reps: req.body.reps, picture: imageURL, likes: req.body.likes, comments: new_comments })
    new_routine.save()
    .then(() =>{
      return res.status(200).send({ msg: "Rutina creada correctamente" });
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

routineR.get('/routine', auth, async(req, res) =>{
  await Routine.find()
  .then((routines) =>{
    if (!routines) {
      return res.status(404).json({ error: "No hay rutinas" });
    }
    console.log(routines);
    routines.sort((a, b) => (a.name < b.name) ? 1 : -1)
    res.status(200).json(routines);
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});

routineR.get('/routine/:id', auth, async(req, res) =>{
  await Routine.findOne({name: req.params.id})
  .then((routine) =>{
    if (!routine) {
      return res.status(404).json({ error: "Rutina no encontrada" });
    }
    console.log(routine);
    res.status(200).json(routine);
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});

routineR.patch('/routine/:id', auth, upload.single('picture'), async(req: any, res) =>{
  let exercises = [];
  try {
    exercises = JSON.parse(req.body.exercises);
  } catch (error) { 
    if (req.body.exercises === undefined) {
      exercises = [];
    } else {
      exercises = req.body.exercises;
    }
  }

  const new_exercises = [];
  for (let i = 0; i < exercises.length; i++) {
    const exercise = exercises[i];
    const new_exercise = await Exercise.findOne({_id: exercise})
    new_exercises.push(new_exercise);
  }
  req.body.exercises = new_exercises;
  
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

  await Routine.findOneAndUpdate({name: req.params.id}, req.body)
  .then((Routine) =>{
    if(!Routine){
      res.status(404).send({ msg: "No se ha encontrado la rutina" })
    }
    return res.status(200).send({ msg: "Rutina actualizada correctamente" })
  })
  .catch((err) =>{
    console.log(err);
    res.status(500).send({ msg: "Error al actualizar la rutina" })
  })
});

routineR.delete('/routine/:id', auth, async(req, res)=>{
  console.log(req.body);
  await Routine.findOneAndDelete({name: req.params.id})
  .then((Routine)=>{
    if(!Routine){
    return res.status(404).send({ msg: "Rutina no encontrado" });
  }
    return res.status(200).send({ msg: "Rutina eliminada satisfactoriamente" });
  })
  .catch((err)=>{
    console.log(err);
    return res.status(500).send({ msg: "Error" });
  })
})
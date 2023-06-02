import { Routine } from '../Schema/routineSchema';
import { User } from '../Schema/userSchema';
import { Comment } from '../Schema/commentsSchema';
import { Exercise } from '../Schema/exerciseSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken')

export const routineR = express.Router();

routineR.use(bodyParser.json());

routineR.post('/routine', async (req, res) =>{
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

    const exercises = req.body.exercises;
    const new_exercises = [];
    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i];
      const new_exercise = await Exercise.findOne({_id: exercise})
      new_exercises.push(new_exercise);
    }

    const new_routine = new Routine({ id: Math.floor(Math.random() * 1000000), name: req.body.name,  description: req.body.description, 
      author: user, category: req.body.category, exercises: new_exercises, equipment_needed: req.body.equipment_needed, avg_duration: req.body.avg_duration, 
      sets: req.body.sets, reps: req.body.reps, picture: req.body.picture, likes: req.body.likes, comments: new_comments })
    new_routine.save();
    res.status(200).send({ msg: "Rutina creada correctamente" })
  })
  .catch(() => {
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});

routineR.get('/routine', async(req, res) =>{
  await Routine.find()
  .then((routines) =>{
    if (!routines) {
      return res.status(404).json({ error: "No hay rutinas" });
    }
    console.log(routines);
    res.status(200).json(routines);
  })
  .catch(() => {
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});

routineR.get('/routine/:id', async(req, res) =>{
  await Routine.findOne({name: req.params.id})
  .then((routine) =>{
    if (!routine) {
      return res.status(404).json({ error: "Rutina no encontrada" });
    }
    console.log(routine);
    res.status(200).json(routine);
  })
  .catch(() => {
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});

routineR.patch('/routine/:id', async(req, res) =>{
  await Routine.findOneAndUpdate({name: req.params.id}, req.body)
  .then((Routine) =>{
    if(!Routine){
      res.status(404).send({ msg: "No se ha encontrado la rutina" })
    }
    return res.status(200).send({ msg: "Rutina actualizada correctamente" })
  })
  .catch((err) =>{
    res.status(500).send({ msg: "Error al actualizar la rutina" })
  })
});

routineR.delete('/routine/:id', async(req, res)=>{
  console.log(req.body);
  await Routine.findOneAndDelete({_id: req.params.id})
  .then((Routine)=>{
    if(!Routine){
    return res.status(404).send({ msg: "Rutina no encontrado" });
  }
    return res.status(200).send({ msg: "Rutina eliminada satisfactoriamente" });
  })
  .catch(()=>{
    return res.status(500).send({ msg: "Error" });
  })
})
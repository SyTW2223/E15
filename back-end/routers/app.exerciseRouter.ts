import { Exercise } from '../Schema/exerciseSchema';
import { User } from '../Schema/userSchema';
import { Comment } from '../Schema/commentsSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken')

export const exerciseR = express.Router();

exerciseR.use(bodyParser.json());

exerciseR.post('/exercise', async (req, res) =>{
  //TODO: Hay que buscar el usuario por el id que ofrece el JTW y comprobar que puede crear el ejercicio
  console.log(req.body);
  const author = await User.findOne({first_name: req.body.author})
  
  //Array de comment
  const comments = req.body.comments;
  const new_comments = [];
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    const new_comment = new Comment({username: comment.username, comment: comment.comment})
    new_comments.push(new_comment);
  }

  // Create exercise and save it
  const new_exercise = new Exercise({id: Math.floor(Math.random() * 1000000), name: req.body.name, author: author ,short_description: req.body.short_description, long_description: req.body.long_description, 
   initial_position: req.body.initial_position, category: req.body.category, equipment_needed: req.body.equipment_needed, picture: req.body.picture, likes: req.body.likes, comments: new_comments })
  new_exercise.save();
  
  res.status(200).send("Ejercicio creado correctamente")
});

exerciseR.get('/exercise', async(req, res) =>{
  ///TODO: Funcionalidad base funciona, hacer manejo de errores
  const exercises = await Exercise.find();
  console.log(exercises);
  res.status(200).json(exercises);
})

exerciseR.get('/exercise/:id', async(req, res) =>{
  //TODO: Funcionalidad base funciona, hacer manejo de errores y que sea por el _ID
  try {
    const exercise = await Exercise.findOne({_id: req.params.id});
    console.log(exercise);
    res.status(200).json(exercise);
  } catch (error) {
    res.status(401)
  }
})


exerciseR.patch('/exercise/:id', async(req, res) =>{
  //TODO: Hay que buscar el usuario por el id que ofrece el JTW y comprobar que puede updatear el ejercicio bien
  console.log(req.body);
  const { id } = req.params
  const exercise_update = req.body;

  await Exercise.findByIdAndUpdate({_id: id}, exercise_update)
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
  console.log(req.body);
  await Exercise.findByIdAndDelete({_id: req.params.id})
  .then((Exercise)=>{
    if(!Exercise){
    return res.status(404).send("Ejercicio no encontrado");
  }
    return res.status(200).send("Ejercicio eliminado satisfactoriamente");
  })
  .catch(()=>{
    return res.status(500).send("Error");
  })
})

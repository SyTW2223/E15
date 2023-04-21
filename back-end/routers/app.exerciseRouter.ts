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

  //Un unico comentario
  //const new_comments = [];
  //const new_comment = new Comment({username: comment.username, comment: comment.comment})
  //new_comments.push(new_comment);

exerciseR.get('/exercise', async(req, res) =>{
  ///TODO: Funcionalidad base funciona, hacer manejo de errores
  const exercises = await Exercise.find();
  console.log(exercises);
  res.status(200).json(exercises);
})

exerciseR.get


exerciseR.put('/exercise', async(req, res) =>{
  
})

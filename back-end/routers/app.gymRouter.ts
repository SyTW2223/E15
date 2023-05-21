import { Gym } from '../Schema/gymSchema';
import { User } from '../Schema/userSchema';
import { Comment } from '../Schema/commentsSchema';
import { Scheduled } from '../Schema/scheduledSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken')

export const gymR = express.Router();

gymR.use(bodyParser.json());

gymR.post('/gym', async (req, res)=>{
  console.log(req.body);
  //Encontrar owner
  const owner = await User.findOne({_id: req.body.owner})

  //Comentarios
  const comments = req.body.comments;
  const new_comments = [];
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    const new_comment = new Comment({username: comment.username, comment: comment.comment})
    new_comments.push(new_comment);
  }

  //schedule
  const schedule = req.body.schedule;
  const new_schedule = new Scheduled(schedule);

  const new_gym = new Gym({ id: Math.floor(Math.random() * 1000000), name: req.body.name, owner: owner,
     latitude: req.body.latitude, longitude: req.body.latitude, address: req.body.address, phone_number: req.body.phone_number,
     website: req.body.website, likes:req.body.likes, comments: new_comments, picture: req.body.picture, schedule: new_schedule});
  new_gym.save();

  res.status(200).send({ msg: "Gimnasio creado correctamente" });
})

//devuelve toda la lista de gimnasios
gymR.get('/gym', async (req,res) => {
  const gym = await Gym.find();
  console.log(gym);
  res.status(200).json(gym);
})

gymR.get('/gym/:id', async (req,res) => {
  try{
    const gym = await Gym.findById({_id: req.params.id});
    console.log(gym);
    res.status(200).json(gym);
  } catch {
    res.status(400).send({ msg: "Gimnasio no encontrado" });
  }
})

gymR.patch('/gym/:id', async(req, res) =>{
  console.log(req.body);
  const gym_update = req.body;

  await Gym.findByIdAndUpdate({_id: req.params.id}, gym_update)
  .then((gym) => {
    if(!gym){
      return res.status(404).send({ msg: "Gimnasio no encontrado" })
    }
    return res.status(200).send({ msg: "Gimnasio actualizado correctamente" })
  })
  .catch(() => {
    return res.status(500).send({ msg: "Error al actualizar el Gimnasio" })
  })
})

gymR.delete('/gym/:id', async(req,res) =>{
  console.log(req.body);
  await Gym.findByIdAndDelete({_id: req.params.id})
  .then((gym)=>{
    if(!gym){
    return res.status(404).send({ msg: "Gimnasio no encontrado" });
  }
    return res.status(200).send({ msg: "Gimnasio eliminado correctamente"});
  })
  .catch(()=>{
    return res.status(500).send({ msg: "Error" });
  })
})
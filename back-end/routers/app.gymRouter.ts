import { Gym } from '../Schema/gymSchema';
import { User } from '../Schema/userSchema';
import { Comment } from '../Schema/commentsSchema';
import { Scheduled } from '../Schema/scheduledSchema';
import { upload } from '../middleware/file';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken')

export const gymR = express.Router();

gymR.use(bodyParser.json());

gymR.post('/gym', upload.single('picture'), async (req: any, res)=>{
  await User.findOne({_id: req.body.owner})
  .then((owner) =>{
    if (!owner) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const comments = req.body.comments;
    const new_comments = [];
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const new_comment = new Comment({username: comment.username, comment: comment.comment})
      new_comments.push(new_comment);
    }
    const schedule = req.body.schedule;
    const new_schedule = new Scheduled(schedule);
    
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

    const new_gym = new Gym({ id: Math.floor(Math.random() * 1000000), name: req.body.name, owner: owner,
        latitude: req.body.latitude, longitude: req.body.latitude, address: req.body.address, phone_number: req.body.phone_number,
        website: req.body.website, likes:req.body.likes, comments: new_comments, picture: imageURL, schedule: new_schedule});
    new_gym.save()
    .then(() =>{
      return res.status(200).send({ msg: "Gimnasio creado correctamente" });
    })
    .catch(() => {
      return res.status(500).json({ error: "Error interno del servidor" });
    });
  })
  .catch(() => {
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});


gymR.get('/gym', async (req,res) => {
  await Gym.find()
  .then((gyms) => {
    if(!gyms){
      return res.status(404).send({ msg: "No hay gimnasios" })
    }
    console.log(gyms);
    return res.status(200).send(gyms);
  })
  .catch(() => {
    return res.status(500).send({ msg: "Error al buscar los gimnasios" })
  });
})

gymR.get('/gym/:id', async (req,res) => {
  await Gym.findOne({name: req.params.id})
  .then((gym) => {
    if(!gym){
      return res.status(404).send({ msg: "Gimnasio no encontrado" })
    }
    console.log(gym);
    return res.status(200).send(gym);
  })
  .catch(() => {
    return res.status(500).send({ msg: "Error al buscar el gimnasio" })
  });
})

gymR.patch('/gym/:id', async(req, res) =>{
  await Gym.findOneAndUpdate({name: req.params.id}, req.body)
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
  await Gym.findOneAndDelete({name: req.params.id})
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
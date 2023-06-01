import { Diet } from '../Schema/dietSchema';
import { User } from '../Schema/userSchema';
import { Comment } from '../Schema/commentsSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken');

export const dietR = express.Router();

dietR.use(bodyParser.json());

dietR.post('/diet', async (req, res) =>{
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
    const new_diet = new Diet({id: Math.floor(Math.random() * 1000000), name: req.body.name, category: req.body.category, author: author,
      breakfast: req.body.breakfast, lunch: req.body.lunch, snacks: req.body.snacks, dinner: req.body.dinner,
      short_description: req.body.short_description, long_description: req.body.short_description, picture: req.body.picture,
      likes: req.body.likes, comments: comments});
    new_diet.save();
    res.status(200).send({ msg: "Dieta creada correctamente" });
  })
  .catch(() => {
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});

dietR.get('/diet', async(req, res) =>{
  await Diet.find()
  .then((diets) =>{
    if (!diets) {
      return res.status(404).json({ error: "No hay dietas" });
    }
    console.log(diets);
    res.status(200).json(diets);
  })
  .catch(() => {
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});

dietR.get('/diet/:name', async(req, res) =>{
  await Diet.findOne({name: req.params.name})
  .then((diet) =>{
    if (!diet) {
      return res.status(404).json({ error: "Dieta no encontrada" });
    }
    console.log(diet);
    res.status(200).json(diet);
  })
  .catch(() => {
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});

dietR.patch('/diet/:name', async(req, res) =>{
  await Diet.findOneAndUpdate({name: req.params.name}, req.body)
  .then((diet) =>{
    if(!diet){
        return res.status(404).send({ msg: 'Dieta no encontrada' })
      }
      return res
        .status(200)
        .send({ msg: 'Dieta actualizada satisfactoriamente' })
    })
    .catch(() => {
      return res.status(500).send({ msg: 'Error al actualizar la dieta' })
    })
});

dietR.delete('/diet/:name', async(req, res)=>{
  await Diet.findOneAndDelete({name: req.params.name})
  .then((Diet)=>{
    if(!Diet){
      return res.status(404).send({ msg: "Dieta no encontrada" });
    }
    return res.status(200).send({ msg: "Dieta eliminada correctamente" });
  })
  .catch(()=>{
    return res.status(500).send({ msg: "Error" });
  })
});

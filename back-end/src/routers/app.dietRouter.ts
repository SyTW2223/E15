import { Diet } from '../Schema/dietSchema';
import { User } from '../Schema/userSchema';
import { Comment } from '../Schema/commentsSchema';
import { upload } from '../middleware/file';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

export const dietR = express.Router();

dietR.use(bodyParser.json());

dietR.post('/diet', auth, upload.single('picture'), async (req: any, res) =>{
  await User.findOne({_id: req.body.author})
  .then((author) =>{
    if (!author) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const comments = req.body.comments;
    const new_comments = [];
    for (let i = 0; i < comments.length; i++) {
      console.log("entra aqui");
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

    const new_diet = new Diet({id: Math.floor(Math.random() * 1000000), name: req.body.name, category: req.body.category, author: author,
      breakfast: req.body.breakfast, lunch: req.body.lunch, snacks: req.body.snacks, dinner: req.body.dinner,
      short_description: req.body.short_description, long_description: req.body.short_description, picture: imageURL,
      likes: req.body.likes, comments: new_comments});
    new_diet.save()
    .then(() =>{
      return res.status(200).send({ msg: "Dieta creada correctamente" });
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

dietR.get('/diet', auth, async(req, res) =>{
  await Diet.find()
  .then((diets) =>{
    if (!diets) {
      return res.status(404).json({ error: "No hay dietas" });
    }
    console.log(diets);
    diets.sort((a, b) => (a.name > b.name) ? 1 : -1);
    res.status(200).json(diets);
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});

dietR.get('/diet/:name', auth, async(req, res) =>{
  await Diet.findOne({name: req.params.name})
  .then((diet) =>{
    if (!diet) {
      return res.status(404).json({ error: "Dieta no encontrada" });
    }
    console.log(diet);
    res.status(200).json(diet);
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  });
});

dietR.patch('/diet/:name', auth, upload.single('picture'), async(req: any, res) =>{

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

  await Diet.findOneAndUpdate({name: req.params.name}, req.body)
  .then((diet) =>{
    if(!diet){
        return res.status(404).send({ msg: 'Dieta no encontrada' })
      }
      return res
        .status(200)
        .send({ msg: 'Dieta actualizada satisfactoriamente' })
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ msg: 'Error al actualizar la dieta' })
    })
});

dietR.delete('/diet/:name', auth, async(req, res)=>{
  await Diet.findOneAndDelete({name: req.params.name})
  .then((Diet)=>{
    if(!Diet){
      return res.status(404).send({ msg: "Dieta no encontrada" });
    }
    return res.status(200).send({ msg: "Dieta eliminada correctamente" });
  })
  .catch((err)=>{
    console.log(err);
    return res.status(500).send({ msg: "Error" });
  })
});

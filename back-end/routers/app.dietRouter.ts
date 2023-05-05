import { Diet } from '../Schema/dietSchema';
import { User } from '../Schema/userSchema';
import { Comment } from '../Schema/commentsSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken');

export const dietR = express.Router();

dietR.use(bodyParser.json());

dietR.post('/diet', async (req, res) =>{
  // Author
  console.log(req.body);
  const author = await User.findOne({first_name: req.body.author});

  // Comments
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
  
  res.status(200).send("Dieta creada correctamente");
});

dietR.get('/diet', async(req, res) =>{
  const diets = await Diet.find();
  console.log(diets);
  res.status(200).json(diets);
});

dietR.get('/diet/:id', async(req, res) =>{
  try {
    const diets = await Diet.findOne({_id: req.params.id});
    console.log(diets);
    res.status(200).json(diets);
  } catch (error) {
    res.status(401)
  }
});

dietR.patch('/diet/:id', async(req, res) =>{
  console.log(req.body);
  const { id } = req.params
  const diet_update = req.body;

  await Diet.findByIdAndUpdate({_id: id}, diet_update)
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

dietR.delete('/diet/:id', async(req, res)=>{
  console.log(req.body);
  await Diet.findByIdAndDelete({_id: req.params.id})
  .then((Diet)=>{
    if(!Diet){
    return res.status(404).send("Dieta no encontrada");
  }
    return res.status(200).send("Dieta eliminada satisfactoriamente");
  })
  .catch(()=>{
    return res.status(500).send("Error");
  })
});

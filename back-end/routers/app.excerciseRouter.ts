import { Exercise } from '../Schema/exerciseSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken')


export const excerciseR = express.Router();


excerciseR.use(bodyParser.json());



excerciseR.post('/excersice', async (req, body) =>{
  console.log(req.body);
  const exercise = new Exercise({id: Math.floor(Math.random() * 1000000), name: req.body.name, short_description: req.body.short_description, long_description: req.body.long_description, 
    initial_position: req.body.initial_position, category: req.body.category, equipment_needed: req.body.equipment_needed, picture: req.body.picture, likes: req.body.likes, comments: req.body.comments })
});

  // id: number, 
  // name: string,
  // author: UserModel, 
  // short_description: string,
  // long_description: string,
  // initial_position: string,
  // category: string,
  // equipment_needed: boolean,
  // picture: string,
  // likes: number,
  // comments: CommentsModel[]

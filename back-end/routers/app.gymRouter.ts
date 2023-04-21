import { Gym } from '../Schema/gymSchema';
import { User } from '../Schema/userSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken')

export const gymR = express.Router();

gymR.use(bodyParser.json());

gymR.post('/gym', async (req, res)=>{
  console.log(req.body);
  const owner = await User.findOne({name: req.body.owner})
  const new_gym = new Gym({ id: Math.floor(Math.random() * 1000000), name: req.body.name, address: req.body.address, phone_number: req.body.phone_number, 
     owner: owner});
})
import { User } from '../Schema/userSchema';
import * as express from 'express';
const jwt = require('jsonwebtoken')

export const signUpR = express.Router();

signUpR.post('/signUp', async (req, res)=>{
  //const { username, password, email, first_name, last_name, phone_number, profile_picture, role} = req.body;
  //const new_user = new User({ id: req.body.id, first_name: req.body.first_name, last_name: req.body.last_name, username: req.body.username, 
  //  phone_number: req.body.phone_number, email: req.body.email, password: req.body.password, 
  //  gender: req.body.gender, role: req.body.role, birthdate: req.body.birthdate, picture: req.body.picture})
  const new_user = new User(req.body)
  let result = await new_user.save();

  const token = await jwt.sign({_id: new_user._id}, 'secretkey')
  res.status(200).json({token});

  console.log(result)
})

import { User } from '../Schema/userSchema';
import * as express from 'express';
const jwt = require('jsonwebtoken')

export const signUpR = express.Router();

signUpR.post('/signUp', async (req, res)=>{
  const { username, password, email, first_name, last_name, phone_number, profile_picture, role} = req.body;
  const new_user = new User({ username: 'manolo', password: 'prueba123', email: 'sibueno@gmail.com', first_name: 'manolo', last_name: 'manolo', phone_number: '123456789', profile_picture: 'https://i.imgur.com/dM7Thhn.png', role: 'entrenador'});
  await new_user.save();

  const token = await jwt.sign({_id: new_user._id}, 'secretkey');
  res.status(200).json({token});


  console.log(new_user)
})




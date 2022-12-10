import { User } from '../Schema/userSchema';
import * as express from 'express';
const jwt = require('jsonwebtoken')

export const signInR = express.Router();

signInR.post('/signIn', async (req, res)=>{
  const {username, email, password} = req.body;
  const user = await User.findOne({email});
    if (!user) {
      return res.status(401).send("El correo no existe");
    }
    if (user.password !== password) {
      return res.status(401).send("La contraseña no existe");
    }
  const token = jwt.sign({_id: user._id}, 'secretkey');
  return res.status(200).json({token});
})

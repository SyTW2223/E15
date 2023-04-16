import { User } from '../Schema/userSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken')

export const signInR = express.Router();


signInR.use(bodyParser.json());

signInR.post('/signIn', async (req, res)=>{
  console.log(req.body);
  const {email, password} = req.body;
  const user =  await User.findOne({email});
    if (!user) {
      return res.status(401).send("El correo no existe");
    }
    if (user.password !== password) {
      return res.status(401).send("La contraseña no existe");
    }

  const token = jwt.sign({user}, 'secretkey');
  return res.status(200).json({token});
})

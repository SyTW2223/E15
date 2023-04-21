import { Gym } from '../Schema/gymSchema';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('jsonwebtoken')

export const gymR = express.Router();

gymR.use(bodyParser.json());

gymR.post('/gym', async (req, res)=>{
  console.log(req.body);
  const {email, password} = req.body;
  const user =  await Gym.findOne({email});
    if (!user) {
      return res.status(401).send("El correo no existe");
    }
    if (user.password !== password) {
      return res.status(401).send("La contraseña no existe");
    }

  const token = jwt.sign({user}, 'secretkey');
  return res.status(200).json({token});
})
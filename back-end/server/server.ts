import express from 'express';
import cors from 'cors';
import '../db/moongose';
import { signUpR } from '../routers/app.routerSignUp'
import { signInR } from '../routers/app.routerSignIn'
import { exerciseR } from '../routers/app.exerciseRouter'

export const app = express();

/* mirar porque es de dsi pillado*/
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(cors({origin: 'http://localhost:4200'}));
app.use(signUpR);
app.use(signInR);
app.use(exerciseR);


const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
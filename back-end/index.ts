import express from 'express';
import cors from 'cors';
import './src/db/moongose';
import { signUpR } from './src/routers/app.routerSignUp'
import { signInR } from './src/routers/app.routerSignIn'
import { exerciseR } from './src/routers/app.exerciseRouter'
import { gymR } from './src/routers/app.gymRouter'
import { routineR } from './src/routers/app.routineRouter';
import { dietR } from './src/routers/app.dietRouter';
import { userR } from './src/routers/app.userRouter';

export const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(cors());
app.use(signUpR);
app.use(signInR);
app.use(exerciseR);
app.use(gymR);
app.use(routineR);
app.use(dietR);
app.use(userR);
app.use('/public', express.static('public'));

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
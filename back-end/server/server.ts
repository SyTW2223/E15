import * as express from 'express';
import '../db/mongoose';
import { signUpR } from '../routers/app.routerSignUp'
import { signInR } from '../routers/app.routerSignIn'

const app = express();

/* mirar porque es de dsi pillado*/
app.use(signUpR);
app.use(signInR);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

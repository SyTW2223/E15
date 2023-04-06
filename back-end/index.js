const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect('mongodb+srv://alu0101101507:prueba12345@cluster0.yeffxqw.mongodb.net/test', {useNewUrlParser: true})
  .then(() => console.log(('Conectando con la base de datos')))
  .catch(()=> console.log('Error al conectarse a mongodb'))

const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
  email: String,
  first_name: String,
  last_name: String,
  phone_number: String,
  profile_picture: String,
  role: String,
})

const User = mongoose.model('User', userSchema);

run().catch(err => console.log(err))

async function run() {

  /*await connect('mongodb+srv://alu0101101507:a99r23018d@cluster0.cpnwvsh.mongodb.net/test');*/

  /*const { id_user, username, password, email, first_name, last_name, phone_number, profile_picture, role} =  req.body;*/
  const new_user = new User({id_user: 1, username: 'manolo', password: 'pito123', email: 'sibueno@gmail.com', first_name: 'manolo', last_name: 'manolo', phone_number: '123456789', profile_picture: 'https://i.imgur.com/dM7Thhn.png', role: 'entrenador'});

  const result = await new_user.save();

  console.log(result);

};

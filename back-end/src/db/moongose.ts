import { connect } from 'mongoose';

const mongoose_url = process.env.MONGODB_URL || 'mongodb+srv://alu0101101507:prueba12345@cluster0.yeffxqw.mongodb.net/test';

connect(mongoose_url).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unnable to connect to MongoDB server');
});
import { Schema, model } from 'mongoose';
import { UserModel} from '../Interface/userInterface'

export const userSchema = new Schema<UserModel>({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  profile_picture: {
    type: String,
  },
  role: {
    type: String,
    required: true
  },
})

export const User = model<UserModel>('User', userSchema);
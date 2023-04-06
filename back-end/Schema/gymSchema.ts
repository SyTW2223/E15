import { Schema, model } from 'mongoose';
import { GymModel} from '../Interface/gymInterface'
import { userSchema } from './userSchema'
import { commentsSchema } from './commentsSchema'
import { scheduledSchema } from './scheduledSchema'



export const gymSchema = new Schema<GymModel>({
  id:{
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  owner: {
    type: userSchema,
    required: true
  },
  latitude:{
    type: Number,
    required: true
  },
  longitude:{
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  likes:{
    type: Number,
    required: true
  }, 
  comments: {
    type: [commentsSchema],
    required: true
  },
  picture: {
    type: String,
    required: true
  }, 
  schedule: {
    type: scheduledSchema,
    required: true
  }
})

export const Gym = model<GymModel>('Gym', gymSchema);
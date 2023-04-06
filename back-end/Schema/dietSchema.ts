import { Schema, model } from 'mongoose';
import { DietModel} from '../Interface/dietInterface'
import { commentsSchema } from './commentsSchema';
import { userSchema } from './userSchema'

export const dietSchema = new Schema<DietModel>({
  id: {
    type: Number,
    required: true
  }, 
  name:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }, 
  category: {
    type: String,
    required: true
  },
  author: {
    type: userSchema,
    required: true
  },
  breakfast: {
    type: String,
    required: true
  },
  lunch: {
    type: String,
    required: true
  },
  snacks: {
    tyep: String,
    required: true
  },
  dinner: {
    type: String,
    required: true
  },
  short_description:  {
    type: String,
    required: true
  }, 
  long_description: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  comments: {
    type: [commentsSchema],
    required: true
  }
})

export const Diet = model<DietModel>('Diet', dietSchema);
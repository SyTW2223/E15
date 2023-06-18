import { Schema, model } from 'mongoose';
import { ExerciseModel } from '../Interface/exerciseInterface'
import { userSchema } from './userSchema'
import { commentsSchema } from './commentsSchema'

export const exerciseSchema = new Schema<ExerciseModel>({
  id: {
    type: Number,
    required: true
  }, 
  name:{
    type: String,
    required: true
  },
  author: {
    type: userSchema,
    required: true
  }, 
  short_description: {
    type: String,
    required: true
  },
  long_description: {
    type: String,
    required: true
  },
  initial_position: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  equipment_needed: {
    type: Boolean,
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

export const Exercise = model<ExerciseModel>('Exercise', exerciseSchema);
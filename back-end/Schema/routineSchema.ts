import { Schema, model } from 'mongoose';
import { RoutineModel} from '../Interface/routineInterface';
import { commentsSchema } from './commentsSchema';
import { userSchema } from './userSchema';
import { exerciseSchema } from './exerciseSchema';

export const routineSchema = new Schema<RoutineModel>({
  id: {
    type: Number,
    required: true
  }, 
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  author: {
    type: userSchema,
    required: true
  }, 
  exercises: {
    type: [exerciseSchema],
    required: true
  },
  equipment_needed: {
    type: Boolean,
    required: true
  },
  avg_duration: {
    type: Number,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  // TODO: revisar
  reps: {
    type: Number,
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

export const Routine = model<RoutineModel>('Routine', routineSchema);
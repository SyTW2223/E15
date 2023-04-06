import { Schema, model } from 'mongoose';
import { RoutineModel} from '../Interface/routineInterface'
import { commentsSchema } from './commentsSchema';
import { exerciseSchema } from './exerciseSchema'

export const routineSchema = new Schema<RoutineModel>({
  id: {
    type: Number,
    required: true
  }, 
  category:{
    type: String,
    required: true
  },
  author: {
    type: String,
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
  reps: {
    tyep: Number,
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
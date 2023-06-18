import { UserModel} from './userInterface'
import { CommentsModel} from './commentsInterface'
import { ExerciseModel} from './exerciseInterface'

export interface RoutineModel{
  id: number, 
  name: string,
  description: string,
  category: string,
  author: UserModel,
  exercises: ExerciseModel[],
  equipment_needed: boolean,
  avg_duration: number,
  sets: number, 
  reps: number,
  picture: string,
  likes: number,
  comments: CommentsModel[]
}
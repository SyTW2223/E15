import { UserModel} from './userInterface'
import { CommentsModel} from './commentsInterface'

export interface ExerciseModel{
  id: number, 
  name: string,
  author: UserModel, 
  short_description: string,
  long_description: string,
  initial_position: string,
  category: string,
  equipment_needed: boolean,
  picture: string,
  likes: number,
  comments: CommentsModel[]
}
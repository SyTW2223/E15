import { UserModel} from './userInterface'
import { CommentsModel} from './commentsInterface'

export interface DietModel{
  id: number, 
  name: string,
  category: string,
  author: UserModel,
  breakfast: string,
  lunch: string,
  snacks: string,
  dinner: string,
  short_description: string, 
  long_description: string,
  picture: string,
  likes: number,
  comments: CommentsModel[]
}
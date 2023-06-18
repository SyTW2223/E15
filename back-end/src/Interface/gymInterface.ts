import { UserModel} from './userInterface'
import { CommentsModel} from './commentsInterface'
import { ScheduleModel} from './scheduleInterface'

export interface GymModel{
  id: number, 
  name: string, 
  owner: UserModel,
  latitude: number,
  longitude: number,
  address: string,
  phone_number: string,
  website: string,
  likes: number,
  comments: CommentsModel[],
  picture: string, 
  schedule: ScheduleModel,
}
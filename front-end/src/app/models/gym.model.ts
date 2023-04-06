import {Deserializable} from './deserializable.model';
import { UserModel } from './user.model';
import { CommentsModel } from './comments.model';
import { ScheduleModel } from './schedule.model';

export class GymModel {
  constructor (
    public id: number, 
    public name: string, 
    public owner: UserModel,
    public latitude: number,
    public longitude: number,
    public adress: string,
    public phone_number: string,
    public website: string,
    public likes: number,
    public comments: CommentsModel[],
    public picture: string, 
    public schedule: ScheduleModel,
  ) {}
  
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
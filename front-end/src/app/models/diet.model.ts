import {Deserializable} from './deserializable.model';
import { UserModel } from './user.model';
import { CommentsModel } from './comments.model';

export class DietModel {
  constructor (
    public id: number,
    public name: string,
    public author: UserModel,
    public breakfast: string,
    public lunch: string,
    public snacks: string,
    public dinner: string, 
    public short_description: string,
    public long_description: string,
    public picture: string,
    public likes: number,
    public comments: CommentsModel[]
  ){}
  
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
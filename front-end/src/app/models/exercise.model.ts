import { Deserializable } from './deserializable.model';
import { CommentsModel } from "./comments.model";
import { UserModel } from './user.model';

export class ExerciseModel {
  constructor ( 
    public id: number, 
    public name: string,
    public author: UserModel, 
    public short_description: string,
    public long_description: string,
    public initial_position: string,
    public category: string,
    public equipment_needed: boolean,
    public picture: string,
    public likes: number,
    public comments: CommentsModel[]
  ){}

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
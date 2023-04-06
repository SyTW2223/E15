import {Deserializable} from './deserializable.model';

export class CommentsModel {
  constructor (
    public username: string,
    public comment: string,
  ){}
  
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
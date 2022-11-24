import {Deserializable} from './deserializable.model';
import { UserModel } from './user.model';

export class GymModel {
  constructor (
    public id: number, 
    public name: string, 
    public owner: UserModel,
    public address: string,
    public phone_number: string
  ) {}
  
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
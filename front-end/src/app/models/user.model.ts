import {Deserializable} from './deserializable.model';

export class UserModel {
  constructor (
    public id_user: number,
    public username: string,
    public password: string,
    public email: string,
    public first_name: string,
    public last_name: string,
    public phone_number: string,
    public profile_picture: string,
    public role: string,
  ){}
  
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
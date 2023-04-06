import {Deserializable} from './deserializable.model';

export class UserModel {
  constructor (
    public id: number,
    public first_name: string,
    public last_name: string,
    public username: string,
    public phone_number: string,
    public email: string,
    public password: string,
    public gender: string,
    public role: string,
    public birthdate: string,
    public picture: string,
  ){}
  
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
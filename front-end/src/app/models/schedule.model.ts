import {Deserializable} from './deserializable.model';

export class ScheduleModel {
  constructor (
    public monday : string,
    public tuesday :string,
    public wednesday : string,
    public thursday : string,
    public friday : string,
    public saturday: string,
    public sunday: string,
  ){}
  
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
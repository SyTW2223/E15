import {Deserializable} from './deserializable.model';
import { UserModel } from './user.model';
import {ExerciseModel} from "./exercise.model";

export class RoutineModel {
  constructor ( 
    public id: number, 
    public category: string,
    public exercises: ExerciseModel[],
    public equipment_needed: boolean,
    public avg_duration: number,
    public trainer: UserModel
  ){}

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
import {Deserializable} from './deserializable.model';
import { UserModel } from './user.model';
import {ExerciseModel} from "./exercise.model";

export class RoutineModel {
  constructor ( 
    public id_routine: number, 
    public exercises: ExerciseModel[],
    public need_equipment: boolean,
    public avg_duration: number,
    public trainer: UserModel
  ){}

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
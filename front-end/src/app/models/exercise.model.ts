import {Deserializable} from './deserializable.model';

export class ExerciseModel {
  constructor ( 
    public id_exercise: number, 
    public name: string, 
    public description: string,
    public muscle_zone: string[],
    public need_equipment: boolean
  ){}

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
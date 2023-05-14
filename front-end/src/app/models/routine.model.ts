import { Deserializable } from './deserializable.model';
import { UserModel } from './user.model';
import { ExerciseModel } from './exercise.model';
import { CommentsModel } from "./comments.model";

export class RoutineModel {
  constructor ( 
    public id: number, 
    public name: string,
    public description: string,
    public category: string,
    public author: UserModel,
    public exercises: ExerciseModel[],
    public equipment_needed: boolean,
    public avg_duration: number,
    public sets: number, 
    public reps: number,
    public picture: string,
    public likes: number,
    public comments: CommentsModel[]
  ){}

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
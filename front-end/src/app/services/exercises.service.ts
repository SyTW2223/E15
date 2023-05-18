import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private exercisesURL = 'http://localhost:3002/exercise'

  constructor(private http: HttpClient) { }

  getExercises() {
    return this.http.get<any>(this.exercisesURL);
  }

  getExercise(id: String) {
    return this.http.get<any>(`${this.exercisesURL}/${id}`);
  }

  postExercise(data: any) {
    return this.http.post<any>(this.exercisesURL, data);
  }

  deleteExercise(id: string) {
    return this.http.delete<any>(`${this.exercisesURL}/${id}`);
  }

  patchExercise(id: string, data: any) {
    return this.http.patch<any>(`${this.exercisesURL}/${id}`, data);
  }
}

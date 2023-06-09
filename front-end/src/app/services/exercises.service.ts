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

  postExercise(formData: FormData) {
    return this.http.post<any>(this.exercisesURL, formData);
  }

  deleteExercise(id: string) {
    return this.http.delete<any>(`${this.exercisesURL}/${id}`);
  }

  patchExercise(id: string, formData: FormData) {
    return this.http.patch<any>(`${this.exercisesURL}/${id}`, formData);
  }
}

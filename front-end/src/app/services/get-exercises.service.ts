import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetExercisesService {
  private exercisesURL = 'http://localhost:3002/exercise'

  constructor(private http: HttpClient) { }

  getExercises() {
    return this.http.get<any>(this.exercisesURL);
  }
}

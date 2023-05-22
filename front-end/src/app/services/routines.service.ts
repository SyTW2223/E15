import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {
  private routinesURL = 'http://localhost:3002/routine'

  constructor(private http: HttpClient) { }

  getRoutines() {
    return this.http.get<any>(this.routinesURL);
  }

  getRoutineByID(id: String) {
    return this.http.get<any>(`${this.routinesURL}/${id}`);
  }

  postRoutine(data: any) {
    return this.http.post<any>(this.routinesURL, data);
  }

  deleteRoutine(id: string) {
    return this.http.delete<any>(`${this.routinesURL}/${id}`);
  }

  patchRoutine(id: string, data: any) {
    return this.http.patch<any>(`${this.routinesURL}/${id}`, data);
  }
}

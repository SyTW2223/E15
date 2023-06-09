import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/utils/constants';


@Injectable({
  providedIn: 'root'
})
export class RoutinesService {
  private routinesURL = SERVER_URL + '/routine'

  constructor(private http: HttpClient) { }

  getRoutines() {
    return this.http.get<any>(this.routinesURL);
  }

  getRoutineByID(id: String) {
    return this.http.get<any>(`${this.routinesURL}/${id}`);
  }

  postRoutine(formData: FormData) {
    return this.http.post<any>(this.routinesURL, formData);
  }

  deleteRoutine(id: string) {
    return this.http.delete<any>(`${this.routinesURL}/${id}`);
  }

  patchRoutine(id: string, formData: FormData) {
    return this.http.patch<any>(`${this.routinesURL}/${id}`, formData);
  }
}

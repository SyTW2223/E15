import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetRoutinesService {
  private routinesURL = 'http://localhost:3002/routine'

  constructor(private http: HttpClient) { }

  getRoutines() {
    return this.http.get<any>(this.routinesURL);
  }
}

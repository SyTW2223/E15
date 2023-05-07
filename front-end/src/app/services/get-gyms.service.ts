import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetGymsService {
  private gymsURL = 'http://localhost:3002/gym'

  constructor(private http: HttpClient) {}

  getGyms() {
    return this.http.get<any>(this.gymsURL);
  }
}

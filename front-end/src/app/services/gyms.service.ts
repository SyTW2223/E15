import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GymsService {
  private gymsURL = 'http://localhost:3002/gym'

  constructor(private http: HttpClient) {}

  getGyms() {
    return this.http.get<any>(this.gymsURL);
  }

  postGym(data: any) {
    return this.http.post<any>(this.gymsURL, data);
  }

  deleteGym(id: string) {
    return this.http.delete<any>(`${this.gymsURL}/${id}`);
  }

  patchGym(id: string, data: any) {
    return this.http.patch<any>(`${this.gymsURL}/${id}`, data);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class GymsService {
  private gymsURL = SERVER_URL + '/gym'

  constructor(private http: HttpClient) {}

  getGyms() {
    return this.http.get<any>(this.gymsURL);
  }

  getGym(id: String) {
    return this.http.get<any>(`${this.gymsURL}/${id}`);
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

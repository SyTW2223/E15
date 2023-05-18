import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userURL = 'http://localhost:3002/user'

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.userURL);
  }

  getUser(id: String) {
    return this.http.get<any>(`${this.userURL}/${id}`);
  }

  deleteUser(id: string) {
    return this.http.delete<any>(`${this.userURL}/${id}`);
  }

  getUserId(id: string) {
    return this.http.get<any>(`${this.userURL}/${id}`);
  }

  patchUserId(id: string, data: any) {
    return this.http.patch<any>(`${this.userURL}/${id}`, data);
  }
}

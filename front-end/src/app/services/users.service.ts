import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userURL = SERVER_URL + '/user'

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

  patchUserId(id: string, formData: FormData) {
    return this.http.patch<any>(`${this.userURL}/${id}`, formData);
  }
}

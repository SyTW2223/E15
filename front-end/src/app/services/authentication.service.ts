import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private singUpURL = 'http://localhost:3000/api/user'
  private singInURL = 'http://localhost:3000/api/auth'

  constructor(private http: HttpClient) {

   }

  signUpUser(user: any) {
    console.log('ha llegado hasta aqui')
    console.log(user)
    return this.http.post<any>(this.singUpURL, user)
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private signUpURL = 'http://localhost:3002/signUp'
  private signInURL = 'http://localhost:3002/signIn'

  constructor(private http: HttpClient) {}

  signUpUser(user: any) {
    console.log('ha llegado hasta aqui')
    console.log(user)
    return this.http.post<any>(this.signUpURL, user);
  }


  signInUser(user: any) {
    console.log('ha llegado hasta aqui')
    console.log(user)
    return this.http.post<any>(this.signInURL, user);
  }
}
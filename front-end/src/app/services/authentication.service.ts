import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private signUpURL = 'http://localhost:3002/signUp'
  private signInURL = 'http://localhost:3002/signIn'

  constructor(private http: HttpClient,
    private router: Router) {}

  signUpUser(user: any) {
    return this.http.post<any>(this.signUpURL, user);
  }


  signInUser(user: any) {
    return this.http.post<any>(this.signInURL, user);
  }

  userLogged() {
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
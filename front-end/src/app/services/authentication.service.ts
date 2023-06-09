import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SERVER_URL } from 'src/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private signUpURL = SERVER_URL + '/signUp'
  private signInURL = SERVER_URL + '/signIn'

  constructor(private http: HttpClient,
    private router: Router) {}

  signUpUser(formData: FormData) {
    return this.http.post<any>(this.signUpURL, formData);
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
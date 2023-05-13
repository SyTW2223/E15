import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  token: any;
  user: any;

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'Email no valido' : '';
  }

  hide = true;

  constructor(private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.token = this.auth.getToken();
    this.token = jwt_decode(this.token);
    this.user = this.token.user;
  }

  signUp(){
    this.auth.signUpUser(this.user)
    .subscribe(
      res =>  {
        console.log(res)
        localStorage.setItem('token', res.token)

        this.router.navigate(['/home'])
      },  
      err => console.log(err)
    )
  };
}

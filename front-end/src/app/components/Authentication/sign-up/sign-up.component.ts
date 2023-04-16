import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  // TODO: sustituir por el modelo de usuario
  signUpUser={
    first_name: '',
    last_name: '',
    username: '',
    phone_number: '',
    email: '',
    password: '',
    gender: '',
    role: '',
    birthdate: '',
    picture: 'foto',
  }

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

  ngOnInit(): void {}

  signUp(){
    this.auth.signUpUser(this.signUpUser)
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
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../services/authentication.service';

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

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {}

  signUp(){
    this.auth.signUpUser(this.signUpUser)
    .subscribe(
      res =>  {
        console.log(res)
      },  
      err => console.log(err)
    )
  };

}
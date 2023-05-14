import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent {
  token: any;
  user: any = {};
  
  previous_first_name: String = '';
  previous_last_name: String = '';
  previous_username: String = '';
  previous_phone_number: String = '';
  previous_gender: String = '';
  previous_birthdate: String = '';
  previous_password: String = '';
  previous_email: String = '';

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'Email no valido' : '';
  }

  hide = true;

  constructor(private auth: AuthenticationService,
    private router: Router,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.token = this.auth.getToken();
    this.token = jwt_decode(this.token);
    this.user = this.token.user;

    this.previous_first_name = this.token.user.first_name;
    this.previous_last_name = this.token.user.last_name;
    this.previous_username = this.token.user.username;
    this.previous_phone_number = this.token.user.phone_number;
    this.previous_gender = this.token.user.gender;
    this.previous_birthdate = this.token.user.birthdate;
    this.previous_email = this.token.user.email;
    this.previous_password = this.token.user.password;
  }

  updateUser(){
    this.userService.patchUserId(this.user._id, this.user)
    .subscribe(
      res =>  {
        console.log(res);
        this.router.navigate(['/profile']);
      },  
      err => console.log(err)
    )
  };
}

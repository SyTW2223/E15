import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent {
  constructor(private auth: AuthenticationService) { }
  singUpUser = {
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    profile_picture: '',
    role: '',
  }
  ngOnInit() {

  }

  singUp() {
    this.auth.signUpUser(this.singUpUser)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log(err)          
      )
  }
}

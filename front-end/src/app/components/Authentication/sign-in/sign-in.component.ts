import { Component } from '@angular/core';

import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInUser={
    email: '',
    password: '',
  }

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {}

  signIn(){
    this.auth.signInUser(this.signInUser)
    .subscribe(
      res =>  {
        console.log(res)
      },  
      err => console.log(err)
    )
  };

}

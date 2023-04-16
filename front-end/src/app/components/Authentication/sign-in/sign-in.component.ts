import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

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

  constructor(private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {}

  signIn(){
    this.auth.signInUser(this.signInUser)
    //TODO revisar que esto de abajo no se pueda hacer de otra forma
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

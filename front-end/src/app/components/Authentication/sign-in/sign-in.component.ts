import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInUserForm: FormGroup;
  errorMessage: string = '';

  constructor(private auth: AuthenticationService,
    private router: Router, 
    private formBuilder: FormBuilder) { 
      this.signInUserForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  signIn(){
    if (this.signInUserForm.invalid) {
      this.errorMessage = 'El Correo electronico o la contraseña no son correctos.';
      return;
    }

    const signInUser = this.signInUserForm.value;

    this.auth.signInUser(signInUser)
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

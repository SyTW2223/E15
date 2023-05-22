import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  hide = true;
  termsAccepted = false;
  signUpUserForm: FormGroup;
  // TODO: sustituir por el modelo de usuario

  email = new FormControl('', [Validators.required, Validators.email]);
 
  constructor(private auth: AuthenticationService,
    private router: Router, private formBuilder: FormBuilder) {
      this.signUpUserForm = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        username: ['', Validators.required],
        phone_number: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        gender: ['', Validators.required],
        role: ['', Validators.required],
        birthdate: ['', Validators.required],
        picture: 'foto'
      }, { validator: this.passwordsMatchValidator });
    }
    
    ngOnInit(): void {}
    
    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'Debes ingresar un valor';
      }
  
      return this.email.hasError('email') ? 'Email no valido' : '';
    }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup?.get('password')?.value;
    const confirmPassword = formGroup?.get('confirmPassword')?.value;
      
    if (password !== confirmPassword) {
      formGroup?.get('confirmPassword')?.setErrors({ passwordsNotMatch: true });
    } else {
      formGroup?.get('confirmPassword')?.setErrors(null);
    }
  }

  signUp(){
    if (this.signUpUserForm.invalid ||  !this.signUpUserForm.get('acceptTerms')?.value) {
      console.log('Error: El formulario es inválido o los términos y condiciones no han sido aceptados');
      return;
    }

    const signUpUser = this.signUpUserForm.value;

    this.auth.signUpUser(signUpUser)
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
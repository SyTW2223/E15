import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DietsService } from 'src/app/services/diets.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-create-diet',
  templateUrl: './create-diet.component.html',
  styleUrls: ['./create-diet.component.css']
})
export class CreateDietComponent implements OnInit {
  token: any;
  diet: any = {};

  constructor(private dietService: DietsService,
    public authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
  }

  createDiet() {
    this.diet.author = this.token.user._id;
    this.diet.picture = "Imagen";
    this.diet.likes = 0;
    this.diet.comments = [];
    this.dietService.postDiet(this.diet)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/profile']);          
        },
        err => console.log(err)
      ) 
  }

  cancel() {
    this.router.navigate(['/profile']);
  }
}

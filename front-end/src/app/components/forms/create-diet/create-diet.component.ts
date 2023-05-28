import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DietsService } from 'src/app/services/diets.service';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-create-diet',
  templateUrl: './create-diet.component.html',
  styleUrls: ['./create-diet.component.css'],
  animations: [
    trigger('detailExpand', [ 
      state('collapsed', style({height: '0px', minHeight: '0'})), 
      state('expanded', style({height: '*'})), 
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')), 
    ]),
  ],
})
export class CreateDietComponent implements OnInit {
  token: any;
  diet: any = {};

  constructor(private dietService: DietsService,
    public authService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
  }

  out() {
    this.router.navigate(['/profile']);
  }
  openSnackBar() {
    this._snackBar.open('Dieta creada','', {
      duration: 1000
    });
  }
  handleButtomClick(){
    this.openSnackBar();
    this.out();
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
          this.handleButtomClick();       
        },
        err => console.log(err)
      ) 
  }
}

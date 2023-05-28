import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DietsService } from 'src/app/services/diets.service';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-update-diet',
  templateUrl: './update-diet.component.html',
  styleUrls: ['./update-diet.component.css']
})
export class UpdateDietComponent implements OnInit {
  token: any;
  diet: any = {};
  diets: any = [];
  diets_filtered: any = [];

  constructor(private dietService: DietsService,
    public authService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    this.dietService.getDiets()
    .subscribe(
      res => {
        this.diets = res;
        for (let i = 0; i < this.diets.length; i++) {
          if (this.diets[i].author._id === this.token.user._id) {
            this.diets_filtered.push(this.diets[i]);
          }
        }
      },
      err => console.log(err)
    )
  }
  
  out() {
    this.router.navigate(['/profile']);
  }
  openSnackBar() {
    this._snackBar.open('Dieta actualizada','', {
      duration: 1000
    });
  }
  handleButtomClick(){
    this.openSnackBar();
    this.out();
  }
  updateDiet() {
    let id = this.diet._id;
    this.dietService.patchDiet(id, this.diet)
      .subscribe(
        res => {
          console.log(res);
          this.handleButtomClick();
        },
        err => console.log(err)
      )
  }

}

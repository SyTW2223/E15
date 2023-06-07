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
  selectedFile: any = null;

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
    let id = this.diet.name;

    const formData = new FormData();
    formData.append('name', this.diet.name);
    formData.append('breakfast', this.diet.breakfast);
    formData.append('category', this.diet.category);
    formData.append('lunch', this.diet.lunch);
    formData.append('snacks', this.diet.snacks);
    formData.append('dinner', this.diet.dinner);
    formData.append('short_description', this.diet.short_description);
    formData.append('long_description', this.diet.long_description);
    formData.append('picture', this.selectedFile);

    this.dietService.patchDiet(id, formData)
      .subscribe(
        res => {
          console.log(res);
          this.handleButtomClick();
        },
        err => console.log(err)
      )
  }

  onFile(event: any) {
    this.selectedFile = event.target.files[0];
  }
}

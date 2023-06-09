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
  selectedFile: any = null;

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
    this.diet.likes = 0;
    this.diet.comments = [];

    const formData = new FormData();
    formData.append('name', this.diet.name);
    formData.append('author', this.diet.author);
    formData.append('breakfast', this.diet.breakfast);
    formData.append('category', this.diet.category);
    formData.append('lunch', this.diet.lunch);
    formData.append('snacks', this.diet.snacks);
    formData.append('dinner', this.diet.dinner);
    formData.append('short_description', this.diet.short_description);
    formData.append('long_description', this.diet.long_description);
    formData.append('picture', this.selectedFile);
    formData.append('likes', this.diet.likes);
    formData.append('comments', this.diet.comments);


    this.dietService.postDiet(formData)
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

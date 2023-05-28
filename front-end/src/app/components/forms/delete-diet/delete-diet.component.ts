import { Component } from '@angular/core';
import { DietsService } from 'src/app/services/diets.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-delete-diet',
  templateUrl: './delete-diet.component.html',
  styleUrls: ['./delete-diet.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DeleteDietComponent {
  token: any;
  diets: any = [];
  diets_filtered: any = [];
  diet: any = {};
  dietForm: FormGroup;

  constructor(private dietsService: DietsService,
    public authService: AuthenticationService,
    private router: Router, private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {
      this.dietForm = this.formBuilder.group({
        diet: ['', Validators.required]
      })
    }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    this.dietsService.getDiets()
      .subscribe(
        res => {
          this.diets = res;
          for (let i = 0; i < this.diets.length; i++) {
            if (this.diets[i].author._id == this.token.user._id) {
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
    this._snackBar.open('Dieta eliminada','', {
      duration: 1000
    });
  }
  handleButtomClick(){
    this.openSnackBar();
    this.out();
  }
  deleteDiet() {
    if(this.dietForm.valid){
      let id = this.dietForm.get('diet')?.value._id;
      this.dietsService.deleteDiet(id)
        .subscribe(
          res => {
            console.log(res);
            this.handleButtomClick();
          },
          err => console.log(err)
        )
    }
  }
}

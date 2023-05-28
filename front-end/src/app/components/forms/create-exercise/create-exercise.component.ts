import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExercisesService } from 'src/app/services/exercises.service';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CreateExerciseComponent implements OnInit {
  token: any;
  exercise: any = {};

  constructor(private exerciseService: ExercisesService,
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
    this._snackBar.open('Ejercicio creado','', {
      duration: 1000
    });
  }
  handleButtomClick(){
    this.openSnackBar();
    this.out();
  }

  createExercise() {
    this.exercise.author = this.token.user._id;
    this.exercise.picture = "Imagen";
    this.exercise.likes = 0;
    this.exercise.comments = [];
    if (this.exercise.equipment_needed == "Si") {
      this.exercise.equipment_needed = true;
    } else {
      this.exercise.equipment_needed = false;
    }
    this.exerciseService.postExercise(this.exercise)
      .subscribe(
        res => {
          console.log(res);
          this.handleButtomClick();          
        },
        err => console.log(err)
      ) 
  }
}

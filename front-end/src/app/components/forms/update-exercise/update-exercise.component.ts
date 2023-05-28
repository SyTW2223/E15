import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExercisesService } from 'src/app/services/exercises.service';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-update-exercise',
  templateUrl: './update-exercise.component.html',
  styleUrls: ['./update-exercise.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UpdateExerciseComponent implements OnInit {
  token: any;
  exercise: any = {};
  exercises: any = [];
  exercises_filtered: any = [];  

  constructor(private authService: AuthenticationService,
    public exerciseService: ExercisesService,
    private router: Router,
    private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    this.exerciseService.getExercises()
      .subscribe(
        res => {
          this.exercises = res;
          for (let i = 0; i < this.exercises.length; i++) {
            if (this.exercises[i].author._id == this.token.user._id) {
              this.exercises_filtered.push(this.exercises[i]);
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
    this._snackBar.open('Ejercicio actualizado','', {
      duration: 1000
    });
  }
  handleButtomClick(){
    this.openSnackBar();
    this.out();
  }

  updateExercise() {
    let id = this.exercise._id;
    if (this.exercise.equipment_needed == "Si") {
      this.exercise.equipment_needed = true;
    } else {
      this.exercise.equipment_needed = false;
    }
    this.exerciseService.patchExercise(id, this.exercise)
      .subscribe(
        res => {
          console.log(res);
          this.handleButtomClick();
        },
        err => console.log(err)
      )
  }
}

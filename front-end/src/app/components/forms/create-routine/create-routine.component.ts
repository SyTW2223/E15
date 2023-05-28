import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutinesService } from 'src/app/services/routines.service';
import { ExercisesService } from 'src/app/services/exercises.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CreateRoutineComponent implements OnInit{
  token: any;
  routine: any = {};
  exercise: any = "";
  exercises: any = [];

  constructor(private routineService: RoutinesService,
    private exerciseService: ExercisesService,
    public authService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    this.routine.exercises = [];
    this.exerciseService.getExercises()
      .subscribe(
        res => {
          this.exercises = res;
        },
        err => console.log(err)
      )
  }

  addExercise() {
    console.log(this.exercise);
    if (this.exercise == "") {
      alert("Selecciona un ejercicio");
      return;
    }
    this.routine.exercises.push(this.exercise);
    console.log(this.routine.exercises);
    this.exercise = "";
  }
  
  deleteExercise(exercise: any) {
    let index = this.routine.exercises.indexOf(exercise);
    this.routine.exercises.splice(index, 1);
  }
  
  out() {
    this.router.navigate(['/profile']);
  }

  openSnackBar() {
    this._snackBar.open('Rutina creada','', {
      duration: 1000
    });
  }
  handleButtomClick(){
    this.openSnackBar();
    this.out();
  }

  createRoutine() {
    this.routine.author = this.token.user._id;
    this.routine.picture = "Imagen";
    this.routine.likes = 0;
    this.routine.comments = [];    
    if (this.routine.equipment_needed == "Si") {
      this.routine.equipment_needed = true;
    } else {
      this.routine.equipment_needed = false;
    }
    this.routineService.postRoutine(this.routine)
      .subscribe(
        res => {
          console.log(res);
          this.handleButtomClick();
        },
        err => console.log(err)
      )
  }

}

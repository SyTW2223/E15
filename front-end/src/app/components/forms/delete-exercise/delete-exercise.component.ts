import { Component, OnInit } from '@angular/core';
import { ExercisesService } from 'src/app/services/exercises.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-delete-exercise',
  templateUrl: './delete-exercise.component.html',
  styleUrls: ['./delete-exercise.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DeleteExerciseComponent implements OnInit {
  token: any;
  exercises: any = [];
  exercise_filtered: any = [];
  exercise: any = {};
  exerciseForm: FormGroup;

  constructor(private exercisesService: ExercisesService,
    public authService: AuthenticationService,
    private router: Router, private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {
      this.exerciseForm = this.formBuilder.group({
        exercise: ['', Validators.required]
      })
    }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    this.exercisesService.getExercises()
      .subscribe(
        res => {
          this.exercises = res;
          for (let i = 0; i < this.exercises.length; i++) {
            if (this.exercises[i].author._id == this.token.user._id) {
              this.exercise_filtered.push(this.exercises[i]);
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
    this._snackBar.open('Ejercicio eliminado','', {
      duration: 1000
    });
  }
  handleButtomClick(){
    this.openSnackBar();
    this.out();
  }

  deleteExercise() {
    if(this.exerciseForm.valid){
      let id = this.exerciseForm.get('exercise')?.value._id;
      this.exercisesService.deleteExercise(id)
        .subscribe(
          res => {
            console.log(res);
            this.handleButtomClick()
          },
          err => console.log(err)
        )
    }
  }

}

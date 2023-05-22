import { Component, OnInit } from '@angular/core';
import { ExercisesService } from 'src/app/services/exercises.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-delete-exercise',
  templateUrl: './delete-exercise.component.html',
  styleUrls: ['./delete-exercise.component.css']
})
export class DeleteExerciseComponent implements OnInit {
  token: any;
  exercises: any = [];
  exercise_filtered: any = [];
  exercise: any = {};

  constructor(private exercisesService: ExercisesService,
    public authService: AuthenticationService,
    private router: Router) {}

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

  deleteExercise() {
    let id = this.exercise._id;
    this.exercisesService.deleteExercise(id)
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

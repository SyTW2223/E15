import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExercisesService } from 'src/app/services/exercises.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-update-exercise',
  templateUrl: './update-exercise.component.html',
  styleUrls: ['./update-exercise.component.css']
})
export class UpdateExerciseComponent implements OnInit {
  token: any;
  exercise: any = {};
  exercises: any = [];  
  constructor(private authService: AuthenticationService,
    public exerciseService: ExercisesService,
    private router: Router) { }
  
  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    this.exerciseService.getExercises()
      .subscribe(
        res => {
          this.exercises = res;
          console.log(this.exercises);
        },
        err => console.log(err)
      )
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
          this.router.navigate(['/profile']);
        },
        err => console.log(err)
      )
  }

}

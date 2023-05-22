import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExercisesService } from 'src/app/services/exercises.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.css']
})
export class CreateExerciseComponent implements OnInit {
  token: any;
  exercise: any = {};

  constructor(private exerciseService: ExercisesService,
    public authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
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
          this.router.navigate(['/profile']);          
        },
        err => console.log(err)
      ) 
  }

  cancel() {
    this.router.navigate(['/profile']);
  }
}

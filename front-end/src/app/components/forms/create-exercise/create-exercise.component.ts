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
  selectedFile: any = null;

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
    this.exercise.likes = 0;
    this.exercise.comments = [];
    if (this.exercise.equipment_needed == "Si") {
      this.exercise.equipment_needed = true;
    } else {
      this.exercise.equipment_needed = false;
    }
    
    const formData = new FormData();
    formData.append('name', this.exercise.name);
    formData.append('author', this.exercise.author);
    formData.append('short_description', this.exercise.short_description);
    formData.append('long_description', this.exercise.long_description);
    formData.append('initial_position', this.exercise.initial_position);
    formData.append('category', this.exercise.category); 
    formData.append('equipment_needed', this.exercise.equipment_needed);
    formData.append('picture', this.selectedFile);
    formData.append('likes', this.exercise.likes);
    formData.append('comments', this.exercise.comments);

    console.log(this.exercise);
    this.exerciseService.postExercise(formData)
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

import { Component, OnInit, Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExercisesService } from 'src/app/services/exercises.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  exercise: any = {};
  comments: any = [];
  new_comments: any = [];
  comment_error: boolean = false;
  token: any;
  id: any;
  comment: any = {};
  mpty = new FormControl('', [Validators.required]);

  constructor(private exercisesService: ExercisesService, private route: ActivatedRoute,
              private router: Router, public authService: AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.id = this.data.id;
              }

  ngOnInit(): void {
    console.log("AQUI BRUNO ---> ", this.id);
    this.exercisesService.getExercise(this.id).subscribe(
      (res) => {
        this.exercise = res;
        for (let comment of this.exercise.comments) {
          this.comments.push(comment);
        }
      },
      (err) => console.log(err)
    );
  }

  getErrorMessage() {
    if (this.mpty.hasError('required')) {
      return 'El comentario no puede estar vacío';
    }
    return 'Error desconocido';
  }

  sendComment(): void {
    if (this.mpty.invalid || this.mpty.value?.trim() == '') {
      this.comment_error = true;
      return;
    }
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    this.comment.username = this.token.user.username;
    this.exercise.comments.push(this.comment)
    this.exercisesService.patchExercise(this.id, this.exercise)
      .subscribe(
        res => {
          console.log(res);
          this.reloadComponentData();
        },
        err => console.log(err)
        )
    this.comment_error = false;
  }

  isUserComments(comment: any) : boolean {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    return comment.username === this.token.user.username;
  }

  deleteComments(comment: any) {
    for (let com of this.exercise.comments) {
      if (com != comment) {
        this.new_comments.push(com);
      }
    }
    this.exercise.comments = this.new_comments;
    this.exercisesService.patchExercise(this.id, this.exercise)
      .subscribe(
        res => {
          console.log(res);
          this.reloadComponentData();
        },
        err => console.log(err)
      )
  }
  
  reloadComponentData() {
    this.exercisesService.getExercise(this.id).subscribe(
      (res) => {
        this.exercise = res;
        this.comments = this.exercise.comments;
      },
      (err) => console.log(err)
    );
  }  
}

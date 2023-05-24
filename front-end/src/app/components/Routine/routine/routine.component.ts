import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutinesService } from 'src/app/services/routines.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent implements OnInit {
  routine: any = {};
  exercises: any = []; 
  comments: any = [];
  new_comments: any = [];
  comment_error: boolean = false;
  token: any;
  id: any;
  comment: any = {};
  mpty = new FormControl('', [Validators.required]);

  constructor(private routineService: RoutinesService, private route: ActivatedRoute,
              private router: Router, public authService: AuthenticationService) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.routineService.getRoutineByID(this.id)
        .subscribe(
          res => {
            this.routine = res;
            for (let exercise of this.routine.exercises) {
              this.exercises.push(exercise);
            }
            for (let comment of this.routine.comments) {
              this.comments.push(comment);
            }
          },
          err => console.log(err)
        );
    });
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
    this.routine.comments.push(this.comment)
    this.routineService.patchRoutine(this.id, this.routine)
      .subscribe(
        res => {
          console.log(res);
          window.location.reload();
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
    for (let com of this.routine.comments) {
      if (com != comment) {
        this.new_comments.push(com);
      }
    }
    this.routine.comments = this.new_comments;
    this.routineService.patchRoutine(this.id, this.routine)
      .subscribe(
        res => {
          console.log(res);
          window.location.reload();
        },
        err => console.log(err)
      )
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DietsService } from 'src/app/services/diets.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent implements OnInit {
  diet: any = {};
  comments: any = [];
  new_comments: any = [];
  comment_error: boolean = false;
  token: any;
  id: any;
  comment: any = {};
  mpty = new FormControl('', [Validators.required]);

  constructor(private dietService: DietsService, private route: ActivatedRoute,
              private router: Router, public authService: AuthenticationService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.dietService.getDiet(this.id)
        .subscribe(
          res => {
            this.diet = res;
            for (let comment of this.diet.comments) {
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
    this.diet.comments.push(this.comment)
    this.dietService.patchDiet(this.id, this.diet)
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
    for (let com of this.diet.comments) {
      if (com != comment) {
        this.new_comments.push(com);
      }
    }
    this.diet.comments = this.new_comments;
    this.dietService.patchDiet(this.id, this.diet)
      .subscribe(
        res => {
          console.log(res);
          window.location.reload();
        },
        err => console.log(err)
      )
  }
}

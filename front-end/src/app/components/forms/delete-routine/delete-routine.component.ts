import { Component, OnInit } from '@angular/core';
import { RoutinesService } from 'src/app/services/routines.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-delete-routine',
  templateUrl: './delete-routine.component.html',
  styleUrls: ['./delete-routine.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DeleteRoutineComponent implements OnInit {
  token: any;
  routines: any = [];
  routines_filtered: any = [];
  routine: any = {};
  routineForm: FormGroup;

  constructor(private routineService: RoutinesService,
    public authService: AuthenticationService,
    private router: Router, private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar ) {
      this.routineForm = this.formBuilder.group({
      routine: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    this.routineService.getRoutines()
      .subscribe(
        res => {
          this.routines = res;
          for (let i = 0; i < this.routines.length; i++) {
            if (this.routines[i].author._id == this.token.user._id) {
              this.routines_filtered.push(this.routines[i]);
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
    this._snackBar.open('Rutina eliminada','', {
      duration: 1000
    });
  }
  handleButtomClick(){
    this.openSnackBar();
    this.out();
  }
  deleteRoutine() {
    if (this.routineForm.valid) {
      const id = this.routineForm.get('routine')?.value.name;
      this.routineService.deleteRoutine(id)
        .subscribe(
          res => {
            console.log(res);
            this.handleButtomClick();
          },
          err => console.log(err)
        );
    }
  }
}

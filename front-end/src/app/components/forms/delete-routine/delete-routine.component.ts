import { Component, OnInit } from '@angular/core';
import { RoutinesService } from 'src/app/services/routines.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-delete-routine',
  templateUrl: './delete-routine.component.html',
  styleUrls: ['./delete-routine.component.css']
})
export class DeleteRoutineComponent implements OnInit {
  token: any;
  routines: any = [];
  routines_filtered: any = [];
  routine: any = {};
  routineForm: FormGroup;
  routineValue: any;

  constructor(private routineService: RoutinesService,
    public authService: AuthenticationService,
    private router: Router, private formBuilder: FormBuilder ) {
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

  updateRoutineValue(value: any) {
    this.routineValue = value;
    this.routineForm.get('routine')?.setValue(value);
  }
  deleteRoutine() {
    if (this.routineForm.valid) {
      const id = this.routineForm.get('routine')?.value._id;
      this.routineService.deleteRoutine(id)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/profile']);
          },
          err => console.log(err)
        );
    }
  }

  cancel() {
    this.router.navigate(['/profile']);
  }
}

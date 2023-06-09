import { Component, OnInit} from '@angular/core';
import { GymsService } from 'src/app/services/gyms.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-delete-gym',
  templateUrl: './delete-gym.component.html',
  styleUrls: ['./delete-gym.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DeleteGymComponent implements OnInit {
  token: any;
  gyms: any = [];
  gyms_filtered: any = [];
  gym: any = {}
  gymForm: FormGroup;
  gymValue: any;

  constructor(private gymService: GymsService,
    public authService: AuthenticationService,
    private router: Router,  private formBuilder: FormBuilder, 
    private _snackBar: MatSnackBar) {
      this.gymForm = this.formBuilder.group({
        gym: ['', Validators.required]
      });

    }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    this.gymService.getGyms()
      .subscribe(
        res => {
          this.gyms = res;
          for (let i = 0; i < this.gyms.length; i++) {
            if (this.gyms[i].owner._id == this.token.user._id) {
              this.gyms_filtered.push(this.gyms[i]);
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
    this._snackBar.open('Gimnasio eliminado','', {
      duration: 1000
    });
  }
  handleButtomClick(){
    this.openSnackBar();
    this.out();
  }

  deleteGym() {
    if (this.gymForm.valid){
      let id = this.gymForm.get('gym')?.value.name;
      this.gymService.deleteGym(id)
        .subscribe(
          res => {
            console.log(res);
            this.handleButtomClick();
          },
          err => console.log(err)
        )
    }
  }
}


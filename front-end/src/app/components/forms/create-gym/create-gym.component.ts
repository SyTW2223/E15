import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GymsService } from 'src/app/services/gyms.service';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-create-gym',
  templateUrl: './create-gym.component.html',
  styleUrls: ['./create-gym.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CreateGymComponent implements OnInit {
  token: any;
  gym: any = {};
  schedule: any = {};

  constructor(private gymService: GymsService, 
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
    this._snackBar.open('Gimnasio creado','', {
      duration: 1000
    });
  }
  handleButtomClick(){
    this.openSnackBar();
    this.out();
  }
  createGym() {
    this.gym.owner = this.token.user._id;
    this.gym.schedule = this.schedule;
    this.gym.picture = "";
    this.gym.likes = 0;
    this.gym.comments = [];
    this.gymService.postGym(this.gym)
      .subscribe(
        res => {
          console.log(res);
          this.handleButtomClick();       
        },
        err => console.log(err)
      ) 
  }

}

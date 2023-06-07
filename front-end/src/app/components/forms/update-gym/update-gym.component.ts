import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GymsService } from 'src/app/services/gyms.service';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-update-gym',
  templateUrl: './update-gym.component.html',
  styleUrls: ['./update-gym.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UpdateGymComponent implements OnInit {
  token: any;
  gyms: any = [];
  gyms_filtered: any = [];
  gym: any = {};

  constructor(private gymService: GymsService,
    public authService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

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
    this._snackBar.open('Gimnasio actualizado','', {
      duration: 1000
    });
  }
  handleButtomClick(){
    this.openSnackBar();
    this.out();
  }
  updateGym() {
    let name = this.gym.name;
    this.gymService.patchGym(name, this.gym)
      .subscribe(
        res => {
          console.log(res);
          this.handleButtomClick();
        },
        err => console.log(err)
      )
  }

}

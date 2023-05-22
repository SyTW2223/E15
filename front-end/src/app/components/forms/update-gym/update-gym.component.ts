import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GymsService } from 'src/app/services/gyms.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-update-gym',
  templateUrl: './update-gym.component.html',
  styleUrls: ['./update-gym.component.css']
})
export class UpdateGymComponent implements OnInit {
  token: any;
  gyms: any = [];
  gyms_filtered: any = [];
  gym: any = {};

  constructor(private gymService: GymsService,
    public authService: AuthenticationService,
    private router: Router) { }

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

  updateGym() {
    let id = this.gym._id;
    this.gymService.patchGym(id, this.gym)
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

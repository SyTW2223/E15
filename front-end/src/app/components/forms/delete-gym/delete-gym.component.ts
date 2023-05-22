import { Component, OnInit} from '@angular/core';
import { GymsService } from 'src/app/services/gyms.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-delete-gym',
  templateUrl: './delete-gym.component.html',
  styleUrls: ['./delete-gym.component.css']
})
export class DeleteGymComponent implements OnInit {
  token: any;
  gyms: any = [];
  gyms_filtered: any = [];
  gym: any = {};

  constructor(private gymService: GymsService,
    public authService: AuthenticationService,
    private router: Router) {}

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

  deleteGym() {
    let id = this.gym._id;
    this.gymService.deleteGym(id)
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

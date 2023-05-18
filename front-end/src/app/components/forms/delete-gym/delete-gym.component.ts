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
}

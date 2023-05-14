import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GymsService } from 'src/app/services/gyms.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-create-gym',
  templateUrl: './create-gym.component.html',
  styleUrls: ['./create-gym.component.css']
})
export class CreateGymComponent implements OnInit {
  token: any;
  gym: any = {};
  schedule: any = {};



  constructor(private gymService: GymsService, 
    public authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
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
          this.router.navigate(['/profile']);          
        },
        err => console.log(err)
      ) 
  }
}

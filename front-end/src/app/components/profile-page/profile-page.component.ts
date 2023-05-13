import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  token: any;
  user: any;
  
  constructor(public authService: AuthenticationService) { }
  ngOnInit() {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    this.user = this.token.user;
    console.log(this.user);
  }

  public isSportMan(): boolean {
    return this.user.role === 'Deportista';
  }

  public isGymOwner(): boolean {
    //return this.user.role === 'Dueño de gimnasio';
    return false;
  }

  public isCoach(): boolean {
    //return this.user.role === 'Entrenador';
    return true;
  }
}

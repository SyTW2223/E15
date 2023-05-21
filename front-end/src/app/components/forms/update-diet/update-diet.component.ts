import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DietsService } from 'src/app/services/diets.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-update-diet',
  templateUrl: './update-diet.component.html',
  styleUrls: ['./update-diet.component.css']
})
export class UpdateDietComponent implements OnInit {
  token: any;
  diet: any = {};
  diets: any = [];

  constructor(private dietService: DietsService,
    public authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    this.dietService.getDiets()
    .subscribe(
      res => {
        this.diets = res;
        console.log(this.diets);
      },
      err => console.log(err)
    )
  }

  updateDiet() {
    let id = this.diet._id;
    this.dietService.patchDiet(id, this.diet)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/profile']);
        },
        err => console.log(err)
      )
  }

}

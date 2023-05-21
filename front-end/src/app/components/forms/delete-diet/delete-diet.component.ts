import { Component } from '@angular/core';
import { DietsService } from 'src/app/services/diets.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-delete-diet',
  templateUrl: './delete-diet.component.html',
  styleUrls: ['./delete-diet.component.css']
})
export class DeleteDietComponent {
  token: any;
  diets: any = [];
  diet: any = {};

  constructor(private dietsService: DietsService,
    public authService: AuthenticationService,
    private router: Router) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    this.dietsService.getDiets()
      .subscribe(
        res => {
          this.diets = res;
          console.log("hola");
          console.log(this.token.user._id);
          console.log("hola");
          console.log(this.diets);
          this.diets = this.diets.filter((diet: any) => diet.user_id === this.token.user._id);
          console.log(this.diets);
        },
        err => console.log(err)
      )
  }

  deleteDiet() {
    let id = this.diet._id;
    this.dietsService.deleteDiet(id)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/profile']);
        },
        err => console.log(err)
      )
  }
}

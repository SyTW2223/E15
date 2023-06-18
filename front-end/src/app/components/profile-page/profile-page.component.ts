import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DietsService } from 'src/app/services/diets.service';
import { RoutinesService } from 'src/app/services/routines.service';
import { ExercisesService } from 'src/app/services/exercises.service';
import { GymsService } from 'src/app/services/gyms.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  token: any;
  user: any;
  diets: any = [];
  routines: any = [];
  exercises: any = [];
  gyms: any = [];
  diets_filtered: any = [];
  routines_filtered: any = [];
  exercises_filtered: any = [];
  gyms_filtered: any = [];
  diets_lentgh: number = 0;
  routines_lentgh: number = 0;
  exercises_lentgh: number = 0;
  gyms_lentgh: number = 0;

  
  constructor(public authService: AuthenticationService,
    private routineService: RoutinesService,
    private exerciseService: ExercisesService,
    private dietsService: DietsService,
    private gymsService: GymsService) { }
  ngOnInit() {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    this.user = this.token.user;

    let fechaObj = new Date(this.user.birthdate);

    const dia = fechaObj.getUTCDate();
    const mes = fechaObj.getUTCMonth() + 1;
    const anio = fechaObj.getUTCFullYear();

    this.user.birthdate = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;

    this.routineService.getRoutines()
    .subscribe(
      res => {
        this.routines = res;
        for (let i = 0; i < this.routines.length; i++) {
          if (this.routines[i].author._id == this.token.user._id) {
            this.routines_filtered.push(this.routines[i]);
          }
        }
        this.routines_lentgh = this.routines_filtered.length;
      },
      err => console.log(err)
    )

    if (this.isGymOwner()) {
      this.gymsService.getGyms()
        .subscribe(
          res => {
            this.gyms = res;
            for (let i = 0; i < this.gyms.length; i++) {
              if (this.gyms[i].owner._id == this.token.user._id) {
                this.gyms_filtered.push(this.gyms[i]);
              }
            }
            this.gyms_lentgh = this.gyms_filtered.length;
          },
          err => console.log(err)
        )
    }

    if (this.isCoach()) {
      this.exerciseService.getExercises()
        .subscribe(
          res => {
            this.exercises = res;
            for (let i = 0; i < this.exercises.length; i++) {
              if (this.exercises[i].author._id == this.token.user._id) {
                this.exercises_filtered.push(this.exercises[i]);
              }
            }
            this.exercises_lentgh = this.exercises_filtered.length;
          },
          err => console.log(err)
        )
      this.dietsService.getDiets()
        .subscribe(
          res => {
            this.diets = res;
            for (let i = 0; i < this.diets.length; i++) {
              if (this.diets[i].author._id == this.token.user._id) {
                this.diets_filtered.push(this.diets[i]);
              }
            }
            this.diets_lentgh = this.diets_filtered.length;
          },
          err => console.log(err)
        )
    }
  }

  public isSportMan(): boolean {
    return this.user.role === 'Deportista';
  }

  public isGymOwner(): boolean {
    return this.user.role === 'Dueño de gimnasio';
  }

  public isCoach(): boolean {
    return this.user.role === 'Entrenador';
  }
}

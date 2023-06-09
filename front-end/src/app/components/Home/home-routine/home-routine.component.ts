import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { RoutinesService } from 'src/app/services/routines.service';
import { UsersService } from 'src/app/services/users.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-home-routine',
  templateUrl: './home-routine.component.html',
  styleUrls: ['./home-routine.component.css']
})
export class HomeRoutineComponent implements OnInit {
  routines: any = [];
  show_routines: any = [];
  trainers: any = [];
  users: any = [];
  show_trainers: any = [];
  random: any;

  constructor(private getRoutines: RoutinesService, private getUsers: UsersService,
              private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getRoutines.getRoutines()
    .subscribe(
      res =>  {
        this.routines = res;

        for (let i = 0; i < 3; i++) {
          this.random = Math.floor(Math.random() * this.routines.length);
          while(this.searchRoutine(this.routines[this.random])) {
            this.random = Math.floor(Math.random() * this.routines.length);
          }
          this.show_routines.push(this.routines[this.random]);
        } 
      }
    )

    this.getUsers.getUsers()
    .subscribe(
      res => {
        this.users = res;
        for (let usu of this.users) {
          if(this.isTrainer(usu)) {
            this.trainers.push(usu);
          }
        }

        for (let i = 0; i < 3; i++) {
          this.random = Math.floor(Math.random() * this.trainers.length);
          while(this.searchTrainer(this.trainers[this.random])) {
            this.random = Math.floor(Math.random() * this.trainers.length);
          }
          this.show_trainers.push(this.trainers[this.random]);
        }
      }
    )
  }

  searchRoutine(routine: any): boolean{
    for (let rou of this.show_routines) {
      if (rou === routine) {
        return true;
      }
    }
    return false;
  }

  isTrainer(user: any): boolean {
    if (user.role == 'Entrenador') {
      return true;
    }
    return false;
  }

  searchTrainer(user: any): boolean {
    for (let trainer of this.show_trainers) {
      if (trainer == user) {
        return true;
      }
    }
    return false;
  }

  openSnackBar() {
    this._snackBar.open("Asesor contactado, pronto recibirá su respuesta", "", {
      duration: 1000
    });
  }
}

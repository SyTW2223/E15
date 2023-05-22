import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutinesService } from 'src/app/services/routines.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent implements OnInit {
  routine: any = {};
  exercises: any = []; 
  comments: any = [];

  constructor(private routineService: RoutinesService, private route: ActivatedRoute,
              private router: Router) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.routine = this.routineService.getRoutineByID(id)
      .subscribe(
        res => {
          this.routine = res;
          for (let exercise of this.routine.exercises) {
            this.exercises.push(exercise);
          }
          for (let comment of this.routine.comments) {
            this.comments.push(comment);
          }
        },
        err => console.log(err)
      );
    });
  }
}
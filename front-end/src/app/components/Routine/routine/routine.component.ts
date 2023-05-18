import { Component, OnInit } from '@angular/core';
import { RoutinesService } from 'src/app/services/routines.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent implements OnInit {
  routine_id: String = "";
  routine: any = {}; 


  constructor(private routineService: RoutinesService) { }
  
  ngOnInit(): void {
    this.routine_id = "" //get routine id from url
    this.routine = this.routineService.getRoutine(this.routine_id)
  }
}
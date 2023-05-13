import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { GetExercisesService } from 'src/app/services/get-exercises.service';

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.css']
})
export class ExercisePageComponent {
  displayedColumns: string[] = ['name', 'author', 'category', 'short-description', 'equipment'];
  dataSource: any;
  categories: any = [];
  exercises: any = [];
  equipment: string[] = [];
  categoryTerm: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private getExercises: GetExercisesService) {}

  ngOnInit() {
    this.getExercises.getExercises()
    .subscribe(
      res =>  {
        this.exercises = res
        this.dataSource = new MatTableDataSource(this.exercises);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        for (let exercise of res) {
          //TODO: cuando esté el enum iterar sobre el enum, y comprobar que la categoria ya está insertada
          this.categories.push(exercise.category);
        }
      }
    )
  }

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyCategoryFilter() {
    this.dataSource.filter = this.categoryTerm.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

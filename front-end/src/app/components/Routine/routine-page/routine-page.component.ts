import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { GetRoutinesService } from 'src/app/services/get-routines.service';

@Component({
  selector: 'app-routine-page',
  templateUrl: './routine-page.component.html',
  styleUrls: ['./routine-page.component.css']
})
export class RoutinePageComponent {
  displayedColumns: string[] = ['name', 'author', 'category', 'description'];
  dataSource: any;
  categories: any = [];
  routines: any = [];
  categoryTerm: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private getRoutines: GetRoutinesService) {}

  ngOnInit() {
    this.getRoutines.getRoutines()
    .subscribe(
      res =>  {
        this.routines = res
        this.dataSource = new MatTableDataSource(this.routines);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        for (let routine of res) {
          //TODO: cuando esté el enum iterar sobre el enum, y comprobar que la categoria ya está insertada
          this.categories.push(routine.category);
        }
        // routine/row._id
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

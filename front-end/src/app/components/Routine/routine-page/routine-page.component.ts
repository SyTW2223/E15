import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RoutinesService } from 'src/app/services/routines.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routine-page',
  templateUrl: './routine-page.component.html',
  styleUrls: ['./routine-page.component.css']
})
export class RoutinePageComponent {
  displayedColumns: string[] = ['name', 'author', 'category', 'description', 'equipment'];
  dataSource: any;
  categories: any = [];
  routines: any = [];
  categoryTerm: string = '';
  textFilter: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private getRoutines: RoutinesService, private router: Router) {}

  ngOnInit() {
    this.getRoutines.getRoutines()
    .subscribe(
      res =>  {
        this.routines = res
        this.dataSource = new MatTableDataSource(this.routines);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        for (let routine of res) {
          if (!this.categories.includes(routine.category)) {
            this.categories.push(routine.category);
          }
        }
      }
    )
  }

  applyFilter() {
    const textFilterValue = this.textFilter.trim().toLowerCase();
    const categoryFilterValue = this.categoryTerm.trim().toLowerCase();
  
    this.dataSource.filterPredicate = (data: any) => {
      const categoryMatches = categoryFilterValue === '' || (data.category && data.category.toLowerCase().includes(categoryFilterValue));
      const textMatches =
        (data.name && data.name.toLowerCase().includes(textFilterValue)) ||
        (data.author && typeof data.author === 'string' && data.author.toLowerCase().includes(textFilterValue)) ||
        (data['short-description'] && data['short-description'].toLowerCase().includes(textFilterValue));
  
      return categoryMatches && textMatches;
    };
  
    // Verificar si this.dataSource tiene datos antes de aplicar el filtro
    if (this.dataSource) {
      this.dataSource.filter = {text: textFilterValue, category: categoryFilterValue};
    }
  }  

  navigateToRoutine(id: string) {
    this.router.navigate(['routines', id]);
  }

  onCategoryChange() {
    if (this.categoryTerm === null) {
      this.categoryTerm = '';
    }
    this.applyFilter();
  }  
}

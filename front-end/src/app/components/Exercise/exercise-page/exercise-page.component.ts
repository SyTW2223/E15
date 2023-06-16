import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ExercisesService } from 'src/app/services/exercises.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ExerciseComponent } from 'src/app/components/Exercise/exercise/exercise.component'
import { AuthenticationService } from 'src/app/services/authentication.service';
import jwt_decode from 'jwt-decode';

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
  textFilter: string = '';
  token: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private getExercises: ExercisesService, private router: Router,
              private dialog: MatDialog, public authService: AuthenticationService) {}

  ngOnInit() {
    this.getExercises.getExercises()
    .subscribe(
      res =>  {
        this.exercises = res
        this.dataSource = new MatTableDataSource(this.exercises);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        for (let exercise of res) {
          if (!this.categories.includes(exercise.category)) {
            this.categories.push(exercise.category);
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

  openExerciseDialog(id: any): void {
    const dialogRef = this.dialog.open(ExerciseComponent, {
      width: '80%',
      height: '70%',
      data: { id: id } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  isCoach(): boolean {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    return this.token.user.role === 'Entrenador';
  }

  onCategoryChange() {
    if (this.categoryTerm === null) {
      this.categoryTerm = '';
    }
    this.applyFilter();
  }
}

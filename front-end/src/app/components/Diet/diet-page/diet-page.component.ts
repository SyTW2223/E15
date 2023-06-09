import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DietsService } from 'src/app/services/diets.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-diet-page',
  templateUrl: './diet-page.component.html',
  styleUrls: ['./diet-page.component.css'],
})
export class DietPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'author', 'category', 'short-description'];
  dataSource: any;
  categories: any = [];
  diets: any = [];
  categoryTerm: string = '';
  token: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private getDiets: DietsService, private router: Router,
              public authService: AuthenticationService) {}

  ngOnInit() {
    this.getDiets.getDiets()
    .subscribe(
      res =>  {
        this.diets = res
        this.dataSource = new MatTableDataSource(this.diets);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        for (let diet of res) {
          if (!this.categories.includes(diet.category)) {
            this.categories.push(diet.category);
          }
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

  navigateToDiet(id: string) {
    this.router.navigate(['diets_list', id]);
  }

  isCoach(): boolean {
    this.token = this.authService.getToken();
    this.token = jwt_decode(this.token);
    return this.token.user.role === 'Entrenador';
  }
}
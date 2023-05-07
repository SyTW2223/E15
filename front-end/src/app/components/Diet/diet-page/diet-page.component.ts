import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { GetDietsService } from 'src/app/services/get-diets.service';

@Component({
  selector: 'app-diet-page',
  templateUrl: './diet-page.component.html',
  styleUrls: ['./diet-page.component.css'],
})
export class DietPageComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'author', 'short-description'];
  dataSource: any;
  diets: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private getDiets: GetDietsService) {}

  ngOnInit() {
    this.getDiets.getDiets()
    .subscribe(
      res =>  {
        console.log(res)
        this.diets = res
        this.dataSource = new MatTableDataSource(this.diets);
      }
    )
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersService } from 'src/app/services/users.service';
//import { User } from './back-end/Schema/userSchema';

@Component({
  selector: 'app-adviser-list',
  templateUrl: './adviser-list.component.html',
  styleUrls: ['./adviser-list.component.css']
})
export class AdviserListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'phone_number'];
  dataSource: any;
  categories: any = [];
  users: any = [];
  emailTerm: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private getUsers: UsersService) {}

  ngOnInit() {
    this.getUsers.getUser()
    .subscribe(
      res =>  {
        this.users = res.filter((user: any) => user.role === 'Entrenador')
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        for (let user of res) {
          //TODO: cuando esté el enum iterar sobre el enum, y comprobar que la categoria ya está insertada
          this.categories.push(user.first_name);
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
    this.dataSource.filter = this.emailTerm.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

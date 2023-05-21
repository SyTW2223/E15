import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersService } from 'src/app/services/users.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
//import { User } from './back-end/Schema/userSchema';

const descriptions: string[] =[
  'Entrenador de carrera: Te ayudará a mejorar tu técnica de carrera, aumentar tu resistencia y alcanzar tus metas en carreras y maratones',

  'Especialista en pérdida de peso: Te guiará en un programa de entrenamiento y nutrición diseñado para perder peso de manera saludable y sostenible',
  
  'Entrenador de rehabilitación: Te proporcionará ejercicios y técnicas de recuperación para superar lesiones y mejorar tu estado físico después de una rehabilitación',
  
  'Entrenador de boxeo: Te enseñará las habilidades y técnicas de boxeo para mejorar tu resistencia, fuerza y coordinación',
  
  'Especialista en entrenamiento de velocidad: Te ayudará a desarrollar velocidad y explosividad a través de entrenamientos específicos y ejercicios de sprint',
  
  'Entrenador de Pilates: Te guiará en ejercicios de Pilates para mejorar la flexibilidad, la postura y fortalecer tu núcleo',
  
  'Especialista en entrenamiento de flexibilidad: Te ayudará a aumentar tu rango de movimiento y flexibilidad a través de estiramientos y ejercicios específicos',
  
  'Entrenador de natación: Te enseñará técnicas de natación eficientes y te ayudará a mejorar tu resistencia y habilidades en el agua',
  
  'Especialista en entrenamiento de HIIT: Te proporcionará entrenamientos de alta intensidad intervalos para mejorar la quema de calorías, la resistencia cardiovascular y el tono muscular',
  
  'Entrenador de levantamiento olímpico: Te guiará en los movimientos y técnicas de levantamiento olímpico, como el arranque y el envión, para mejorar la fuerza y potencia',
  
  'Especialista en entrenamiento funcional: Te proporcionará ejercicios y movimientos basados en actividades cotidianas para mejorar tu fuerza, equilibrio y movilidad funcional',
  
  'Entrenador de artes marciales: Te enseñará técnicas de artes marciales como karate, judo o taekwondo para mejorar la autodefensa y la disciplina',
  
  'Especialista en entrenamiento de core: Te ayudará a fortalecer y estabilizar tu zona abdominal y lumbar para mejorar el equilibrio y prevenir lesiones',
  
  'Entrenador de entrenamiento a intervalos: Te proporcionará un programa de entrenamiento que alterna períodos de alta intensidad con períodos de descanso para mejorar la resistencia y quemar calorías',
  
  'Especialista en entrenamiento de deportes acuáticos: Te ayudará a mejorar tus habilidades en deportes acuáticos como surf, remo o kayak a través de entrenamientos específicos',
  
  'Entrenador de ejercicios en grupo: Te guiará a través de clases de ejercicio en grupo, como aeróbicos, zumba o spinning, para mejorar tu condición física y disfrutar de un ambiente motivador',
  
  'Especialista en entrenamiento postnatal: Te proporcionará ejercicios seguros y efectivos para ayudarte a recuperarte después del embarazo y fortalecer tu cuerpo',
  
  'Entrenador de equilibrio y coordinación: Te ayudará a mejorar tu equilibrio y coordinación a través de ejercicios y desafíos específicos'
];

@Component({
  selector: 'app-adviser-list',
  templateUrl: './adviser-list.component.html',
  styleUrls: ['./adviser-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AdviserListComponent implements OnInit {
  displayedColumns: string[] = ['first_name', 'email', 'role', 'phone_number'];
  dataSource: any;
  categories: any = [];
  users: any = [];
  emailTerm: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: any | null;
  
  constructor(private getUsers: UsersService,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.getUsers.getUsers()
    .subscribe(
      res =>  {
        this.users = res.filter((user: any) => user.role === 'Entrenador')
        for(let user of this.users){
          const randomDescrip = Math.floor(Math.random() * descriptions.length);
          user.descriptions = descriptions[randomDescrip];
        }
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

  columnNames: { [key: string]: string } = {
    first_name: 'Nombre ',
    email: 'Correo Electrónico',
    role: 'Rol',
    phone_number: 'Número de Teléfono'
  };

  openPopup(): void {
    const dialogRef = this.dialog.open(AdviserListComponent, {
      width: '400px', 
      data: {} 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
}
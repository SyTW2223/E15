import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-diet-info',
  templateUrl: './diet-info.component.html',
  styleUrls: ['./diet-info.component.css'],

})
export class DietInfoComponent {

 

  // activeDetailIndex = -1;
  // details = [
  //   { summary: 'Granos', description: 'La base de la pirámide alimenticia son los granos, que incluyen panes, cereales, arroz y pasta. Se recomienda consumir entre 6 y 11 porciones diarias, dependiendo de la edad, sexo y nivel de actividad física.' },
  //   { summary: 'Vegetales', description: 'En el segundo nivel se encuentran las verduras y hortalizas, que se recomienda consumir entre 3 y 5 porciones diarias. Estos alimentos son ricos en vitaminas, minerales y fibra, y pueden ser consumidos crudos, cocidos o en forma de jugos.' },
  //   { summary: 'Frutas', description: 'En el tercer nivel se encuentran las frutas, que también se recomienda consumir entre 2 y 4 porciones diarias. Las frutas son una excelente fuente de vitaminas, minerales y fibra, y pueden ser consumidas frescas, congeladas, enlatadas o secas.' },
  //   { summary: 'Lacteos', description: 'En el cuarto nivel se encuentran los productos lácteos, como la leche, el yogur y el queso. Se recomienda consumir entre 2 y 3 porciones diarias. Estos alimentos son una excelente fuente de calcio y otros nutrientes importantes para la salud ósea.' },
  //   { summary: 'Proteinas', description: 'En el quinto nivel se encuentran las proteínas, que incluyen carnes, pescados, aves, huevos, frijoles, nueces y semillas. Se recomienda consumir entre 2 y 3 porciones diarias, preferiblemente carnes magras y pescados.' },
  //   { summary: 'Grasas y aceites', description: 'En el último nivel se encuentran las grasas y aceites, que incluyen mantequilla, margarina, aceites de cocina y aderezos para ensaladas. Estos alimentos deben ser consumidos con moderación, ya que son ricos en calorías y grasas saturadas.' },
  // ];

  // toggleDetails(index: number) {
  //   console.log('Hola')
  //   console.log(this.activeDetailIndex);
  //   if (this.activeDetailIndex === index) {
  //     this.activeDetailIndex = -1; // Cerrar el detalle si se hace clic en el mismo índice
  //   } else {
  //     this.activeDetailIndex = index; // Abrir el detalle correspondiente
  //   }
  // }
}

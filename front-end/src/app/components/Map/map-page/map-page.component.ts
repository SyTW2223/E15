import { Component, OnInit } from '@angular/core';
import { GymsService } from 'src/app/services/gyms.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  gyms: any = [];
  filteredGyms: any = [];
  nameTerm: string = '';
  locationTerm: string = '';
  map: any;
  marks: any = [];

  constructor(private getGym: GymsService) { }

  ngOnInit() {
    this.map = L.map('map').setView([28.4682400, -16.2546200], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(this.map);
    
    this.getGym.getGyms()
    .subscribe(
      res =>  {
        this.gyms = res
        this.addMarker(this.gyms);     
      }
    )
  }

  // Función para filtrar los gimnasios
  filterGyms() {
    this.filteredGyms = this.gyms.filter((gym: { name: string; }) => gym.name.toLowerCase().includes(this.nameTerm.toLowerCase()));
    this.filteredGyms = this.filteredGyms.filter((gym: { address: string; }) => gym.address.toLowerCase().includes(this.locationTerm.toLowerCase()));
    this.marks.forEach((mark: { remove: () => void; }) => {
      mark.remove();
    });
    this.marks = [];
    this.addMarker(this.filteredGyms);
  }

  addMarker(gyms: any) {
    for (let gym of gyms) {
      this.marks.push(L.marker([gym.latitude, gym.longitude]).addTo(this.map)
      .bindPopup('<b>' + gym.name + '</b><br>' +
      '<i class="fa fa-heart" style="color: #E53935;"></i> ' + gym.likes + ' Me Gusta' +  '<br><hr>' +
      '<i class="fa fa-map-pin" style="color: #1f3b6b;"></i>  <b>Dirección:</b><br>' +
      gym.address + '<br><br>' +
      '<i class="fa fa-phone" style="color: #1f3b6b;"></i>  <b>Telefono:</b><br>' +
      gym.phone_number + '<br><br>' +   
      '<i class="fa fa-calendar-times-o" style="color: #1f3b6b;"></i>  <b>Horarios:</b><br>' +
      'Lunes: ' + gym.schedule.monday + '<br>' +
      'Martes: ' + gym.schedule.tuesday + '<br>' +
      'Miércoles: ' + gym.schedule.wednesday + '<br>' +
      'Jueves: ' + gym.schedule.thursday + '<br>' +
      'Viernes: ' + gym.schedule.friday + '<br>' +
      'Sábado: ' + gym.schedule.saturday + '<br>' +
      'Domingo: ' + gym.schedule.sunday + '<br><br>' +
      '<i class="fa fa-globe" style="color: #1f3b6b;"></i>  <b>Web:</b><br>' +
      gym.website + '<br><hr>' + 
      '<i class="fa fa-comments" style="color: #1f3b6b;"></i>  <b>Comentarios:</b><br>' +
      gym.comments[0].username + '<br>' +
      gym.comments[0].comment + '<br><br>' +
      gym.comments[1].username + '<br>' +
      gym.comments[1].comment + '<br><br>') 
    )}    
  }
}

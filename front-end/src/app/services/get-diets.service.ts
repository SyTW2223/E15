import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDietsService {
  private dietsURL = 'http://localhost:3002/diet'

  constructor(private http: HttpClient) { }


  getDiets() {
    return this.http.get<any>(this.dietsURL);
  }
}

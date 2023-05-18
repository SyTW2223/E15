import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DietsService {
  private dietsURL = 'http://localhost:3002/diet'

  constructor(private http: HttpClient) { }

  getDiets() {
    return this.http.get<any>(this.dietsURL);
  }

  getDiet(id: String) {
    return this.http.get<any>(`${this.dietsURL}/${id}`);
  }

  postDiet(data: any) {
    return this.http.post<any>(this.dietsURL, data);
  }

  deleteDiet(id: string) {
    return this.http.delete<any>(`${this.dietsURL}/${id}`);
  }

  patchDiet(id: string, data: any) {
    return this.http.patch<any>(`${this.dietsURL}/${id}`, data);
  }
}

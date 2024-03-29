import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class DietsService {
  private dietsURL =  SERVER_URL + '/diet'

  constructor(private http: HttpClient) { }

  getDiets() {
    return this.http.get<any>(this.dietsURL);
  }

  getDiet(id: String) {
    return this.http.get<any>(`${this.dietsURL}/${id}`);
  }

  postDiet(formData: FormData) {
    return this.http.post<any>(this.dietsURL, formData);
  }

  deleteDiet(id: string) {
    return this.http.delete<any>(`${this.dietsURL}/${id}`);
  }

  patchDiet(id: string, formData: FormData) {
    return this.http.patch<any>(`${this.dietsURL}/${id}`, formData);
  }
}

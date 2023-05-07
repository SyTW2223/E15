import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetGymService {
  private gymURL = 'http://localhost:3002/gym'

  constructor() { }
}

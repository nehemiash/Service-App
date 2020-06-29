import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpcionesMenu } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMenuOpts() {
    return this.http.get<OpcionesMenu[]>('/assets/data/menu.json');
  }
}

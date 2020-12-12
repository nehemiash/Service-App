import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpcionesMenu, Paises } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMenuOpts() {
    return this.http.get<OpcionesMenu[]>('/assets/data/menu.json');
  }

  getIcons() {
    return this.http.get('/assets/data/icons.json');
  }

  getPaises() {
    return this.http.get<Paises[]>('/assets/data/paises.json');
  }




}

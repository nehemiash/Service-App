import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { RepuestosDetalle, Repuestos, Repuesto, RepuestoDetalle, Marcas } from '../interfaces/repuestoInterface';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class RepuestosService {

  token: string = null;
  paginaProd = 0;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  getRepuestos(pull: boolean = false) {

    if (pull) {
      this.paginaCero();
    }

    this.paginaProd++;

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<Repuestos>(`${URL}/repuesto?pagina=${this.paginaProd}`, { headers });

  }

  getRepuestoDetalle(id: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<RepuestosDetalle>(`${URL}/repuesto/${id}`, { headers });

  }

  paginaCero() {
    this.paginaProd = 0;
  }

  buscarRepuesto(texto: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<Repuestos>(`${URL}/repuesto/buscar/${texto}`, { headers });
  }


  nuevoRepuesto(repuesto: RepuestoDetalle) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return new Promise(resolve => {

      this.http.post<RepuestosDetalle>(`${URL}/repuesto`, repuesto, { headers })
        .subscribe(async resp => {

          // tslint:disable-next-line:no-string-literal
          if (resp['err']) {
            resolve(false);
          } else {
            resolve(true);
          }
        });


    });
  }


  actualizaRepuesto(repuesto: RepuestoDetalle, id: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return new Promise(resolve => {

      this.http.put<RepuestosDetalle>(`${URL}/repuesto/${id}`, repuesto, { headers })
        .subscribe(async resp => {

          // tslint:disable-next-line:no-string-literal
          if (resp['err']) {
            resolve(false);
          } else {
            resolve(true);
          }
        });


    });
  }

  getMarcas() {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<Marcas>(`${URL}/repuesto/marcas`, { headers });

  }

}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { Ordenes, Orden, OrdenDetalleResp } from '../interfaces/ordenInterfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  token: string = null;
  paginaOrd = 0;

  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) { }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  getOrdenes() {

    this.paginaOrd = 1;

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<Ordenes>(`${URL}/orden?pagina=${this.paginaOrd}`, { headers });

  }


  nuevaOrden(orden: Orden) {

    console.log('Orden creada');
    const headers = new HttpHeaders({
      token: this.token
    });

    return new Promise(resolve => {

      this.http.post<Orden>(`${URL}/orden`, orden, { headers })
        .subscribe(async resp => {
          // tslint:disable-next-line:no-string-literal
          const id = resp['orden']._id;
          // tslint:disable-next-line:no-string-literal
          if (resp['err']) {

            resolve(false);
          } else {
            resolve(id);
          }
        });


    });

  }

  getOrdenDetalle(id: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<OrdenDetalleResp>(`${URL}/orden/${id}`, { headers });

  }


}

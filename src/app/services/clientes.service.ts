import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { ClientesDetalle, Clientes, Cliente, ClienteDetalle } from '../interfaces/clienteInterface';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  token: string = null;
  paginaCli = 0;

  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) { }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  getClientes(pull: boolean = false, direccion: string, limite: number, sort: string) {

    if (this.paginaCli <= 1) {
      this.paginaCli = 1;
    }

    switch (direccion) {
      case 'atras':
        this.paginaCli--;
        break;

      case 'siguiente':
        this.paginaCli++;
        break;

      case 'ninguna':
        break;

      case 'inicio':
        this.paginaCli = 1;
        break;
    }


    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<Clientes>(`${URL}/cliente?pagina=${this.paginaCli}&limite=${limite}&sort=${sort}`, { headers });

  }



  getClienteDetalle(id: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<ClientesDetalle>(`${URL}/cliente/mostrar/${id}`, { headers });

  }

  getClienteDoc(doc: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<ClientesDetalle>(`${URL}/cliente/mostrardoc/${doc}`, { headers });

  }

  paginaCero() {
    this.paginaCli = 0;
  }

  buscarCliente(texto: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<Clientes>(`${URL}/cliente/buscar/${texto}`, { headers });
  }


  nuevoCliente(cliente: ClienteDetalle) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return new Promise(resolve => {

      this.http.post<ClientesDetalle>(`${URL}/cliente`, cliente, { headers })
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


  actualizaCliente(cliente: ClienteDetalle, id: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return new Promise(resolve => {

      this.http.put<ClientesDetalle>(`${URL}/cliente/${id}`, cliente, { headers })
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

}

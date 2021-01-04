import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categorias, NuevaCategoriaResp, CategoriasDetalle, Notas } from '../interfaces/microInterfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class MicroService {

  token: string = null;
  constructor(
    private storage: Storage,
    private http: HttpClient

  ) { }


  // CATEGORIAS
  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }


  getCategorias(tipo: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<Categorias>(`${URL}/categoria/sort/${tipo}`, { headers });

  }

  getCatSort(tipo: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<Categorias>(`${URL}/categoria/sort/${tipo}`, { headers });

  }

  getCatByID(id: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<CategoriasDetalle>(`${URL}/categoria/${id}`, { headers });

  }

  nuevCat(cat) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.post<NuevaCategoriaResp>(`${URL}/categoria`, cat, { headers });

  }

  nuevaCategoria(cat: any) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/categoria`, cat, { headers })
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

  editaCategoria(cat: any, id: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return new Promise(resolve => {

      this.http.put(`${URL}/categoria/${id}`, cat, { headers })
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

  borrarCategoria(id: string) {
    const headers = new HttpHeaders({
      token: this.token
    });

    return new Promise(resolve => {

      this.http.delete(`${URL}/categoria/${id}`, { headers })
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

  nuevaNota(nota: any) {

    console.log(nota);

    const headers = new HttpHeaders({
      token: this.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/nota`, nota, { headers })
        .subscribe(async resp => {
          console.log(resp);
          // tslint:disable-next-line:no-string-literal
          if (resp['err']) {
            resolve(false);
          } else {
            resolve([true, resp]);
          }
        });


    });
  }

  getNotaByID(id: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<Notas>(`${URL}/nota/${id}`, { headers });

  }

}

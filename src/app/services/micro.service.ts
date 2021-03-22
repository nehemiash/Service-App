import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categorias, NuevaCategoriaResp, CategoriasDetalle, Notas, ProblemasResp, NuevoProblemaResp, ProblemaAgrup } from '../interfaces/microInterfaces';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/ordenInterfaces';
import { Usuarios } from '../interfaces/interfaces';

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

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  /*=============================================
  =            CATEGORIAS            =
  =============================================*/


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





  /*=============================================
  =            NOTAS            =
  =============================================*/

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


  /*=============================================
  =            PROBLEMAS            =
  =============================================*/

  getProblemas() {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<ProblemasResp>(`${URL}/problemacat/`, { headers });

  }

  nuevoProblema(problema: any) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.post<NuevoProblemaResp>(`${URL}/problema`, problema, { headers });

  }

  getProblemasAgrup(cat: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<ProblemaAgrup>(`${URL}/problemacat/listar/?categoria=${cat}`, { headers });

  }

}

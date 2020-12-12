import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { ProductosDetalle, Productos, Producto, ProductoDetalle, Marcas } from '../interfaces/productoInterface';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  token: string = null;
  paginaProd = 0;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  getProductos(pull: boolean = false) {

    if (pull) {
      this.paginaCero();
    }

    this.paginaProd++;

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<Productos>(`${URL}/producto?pagina=${this.paginaProd}`, { headers });

  }

  getProductoDetalle(id: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<ProductosDetalle>(`${URL}/producto/${id}`, { headers });

  }

  paginaCero() {
    this.paginaProd = 0;
  }

  buscarProducto(texto: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get<Productos>(`${URL}/producto/buscar/${texto}`, { headers });
  }


  nuevoProducto(producto: ProductoDetalle) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return new Promise(resolve => {

      this.http.post<ProductosDetalle>(`${URL}/producto`, producto, { headers })
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


  actualizaProducto(producto: ProductoDetalle, id: string) {

    const headers = new HttpHeaders({
      token: this.token
    });

    return new Promise(resolve => {

      this.http.put<ProductosDetalle>(`${URL}/producto/${id}`, producto, { headers })
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

    return this.http.get<Marcas>(`${URL}/producto/marcas`, { headers });

  }

}

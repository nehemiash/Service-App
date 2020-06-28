import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario, RespUser } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  usuario: Usuario = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  login(email: string, password: string) {

    const data = { email, password };

    return new Promise(resolve => {

      this.http.post(`${URL}/login`, data)
        .subscribe(resp => {

          if (resp['ok']) {
            this.guardarToken(resp['token']);
            resolve(true);
            let tok = resp['token'];
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }

        });
    });

  }

  registro(usuario: Usuario) {

    return new Promise(resolve => {

      this.http.post(`${URL}/usuario`, usuario)
        .subscribe(resp => {

          if (resp['err']) {
            this.token = null;
            this.storage.clear();
            resolve(false);
          } else {
            this.guardarToken(resp['token']);
            resolve(true);
          }
        });


    });
  }

  async guardarToken(token: string) {

    this.token = token;
    await this.storage.set('token', token);

  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {

      const headers = new HttpHeaders({
        'token': this.token
      });

      this.http.get(`${URL}/usuario/update/`, { headers })
        .subscribe(resp => {
          if (resp['ok']) {
            this.usuario = resp['usuario'];
            resolve(true);

          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });

    });
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;

  }

}

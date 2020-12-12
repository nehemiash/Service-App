import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Usuario, OpcionesMenu } from './interfaces/interfaces';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';
import { UsuarioService } from './services/usuario.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  usuario: Usuario = {};
  date: string;

  menuOpts: Observable<OpcionesMenu[]>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    private usuarioService: UsuarioService,
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.menuOpts = this.dataService.getMenuOpts();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.date = Date.now().toString();
      this.reloj();
    });
  }

  onLoad() {
    this.usuario = this.usuarioService.getUsuario();
  }

  reloj() {

    setInterval(() => {
      this.date = Date.now().toString();
    }, 1000);

  }
}

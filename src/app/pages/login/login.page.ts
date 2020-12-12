import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonRouterOutlet, IonSlides, MenuController, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  public alias = '';

  loginUser = {
    email: 'nehemiashp@gmail.com',
    password: '1234'

  };

  registerUser: Usuario = {
    email: 'test@test.com',
    password: '1234',
    nombre: 'test',
    telefono: '0994123123',
    funcion: 'Tecnico de Apple',

  };

  splitPaneState: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService,
    public menu: MenuController,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
    this.menu.enable(false);
    this.menu.swipeGesture(false);
  }

  ionViewWillLeave() {

    this.menu.enable(true);
    this.menu.swipeGesture(true);
    this.routerOutlet.swipeGesture = true;
  }


  async login(fLogin: NgForm) {

    if (fLogin.invalid) { return; }

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    if (valido) {
      this.navCtrl.navigateRoot('main', { animated: true });

    } else {
      this.uiService.mostrarAlerta('Error', 'El usuario o contraseña no son correctos.');
    }

  }

  async registro(fRegistro: NgForm) {

    if (fRegistro.invalid) { return; }

    const valido = await this.usuarioService.registro(this.registerUser);

    if (valido) {
      this.navCtrl.navigateRoot('main', { animated: true });
    } else {
      this.uiService.mostrarAlerta('error', 'El correo electronico ya existe');
    }

  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }


}

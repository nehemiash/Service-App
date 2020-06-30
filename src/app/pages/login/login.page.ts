import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
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

  loginUser = {
    email: 'nehemiashp@gmail.com',
    password: 'anacleto'

  };

  registerUser: Usuario = {
    email: 'test@test.com',
    password: '123456',
    nombre: 'test',
    telefono: '0994123123'
  };

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService
  ) { }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {

    if (fLogin.invalid) { return; }

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    if (valido) {
      this.navCtrl.navigateRoot('main', { animated: true });

    } else {
      this.uiService.mostrarAlerta('El usuario o contraseña no son correctos.');
    }

  }

  async registro(fRegistro: NgForm) {

    if (fRegistro.invalid) { return; }

    const valido = await this.usuarioService.registro(this.registerUser);

    if (valido) {
      this.navCtrl.navigateRoot('main', { animated: true });
    } else {
      this.uiService.mostrarAlerta('El correo electronico ya existe');
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

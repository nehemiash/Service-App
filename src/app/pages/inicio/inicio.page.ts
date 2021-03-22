import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { ProblemasComponent } from '../../components/problemas/problemas.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario: Usuario = {};

  constructor(
    private usuarioService: UsuarioService,
    private modalCtrl: ModalController,
  ) { }



  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
  }

  async abrirProblemas() {
    const modal = await this.modalCtrl.create({
      component: ProblemasComponent
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
  }


}

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public userPerfil: Usuario = {};
  rol = '';

  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiServiceService
  ) { }

  ngOnInit() {
    this.userPerfil = this.usuarioService.getUsuario();
    this.getRole();
  }


  logout() {
    this.usuarioService.logout();
  }

  getRole() {
    switch (this.userPerfil.role) {
      case 'USER_ROLE':
        this.rol = 'Usuario estandar';
        break;
      case 'ADMIN_ROLE':
        this.rol = 'Administrador';
    }

  }

  async actualizar(fActualizar: NgForm) {
    if (fActualizar.invalid) { return; }

    const actualizado = await this.usuarioService.actualizarUsuario(this.userPerfil);

    if (actualizado) {
      this.uiService.mostrarToast('Se han guardado los cambios', 'success');
    } else {
      this.uiService.mostrarToast('El email ya existe', 'danger');
    }

  }




}

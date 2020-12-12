import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario: Usuario = {};

  constructor(
    private usuarioService: UsuarioService
  ) { }



  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
  }


}

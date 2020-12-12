import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string;

  usuario: Usuario = {};

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {

    this.usuario = this.usuarioService.getUsuario();
  }

}

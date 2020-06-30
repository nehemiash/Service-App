import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { OpcionesMenu, Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  usuario: Usuario = {};

  menuOpts: Observable<OpcionesMenu[]>;

  constructor(
    private dataService: DataService,
    private usuarioService: UsuarioService

  ) { }

  ngOnInit() {
    this.menuOpts = this.dataService.getMenuOpts();
  }

  onLoad() {
    this.usuario = this.usuarioService.getUsuario();
  }

}

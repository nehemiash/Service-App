import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { OpcionesMenu, Usuario } from '../../interfaces/interfaces';
// import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  // usuario: Usuario = {};
  menuOpts: Observable<OpcionesMenu[]>;
  usuario: Usuario = {};
  date: string;

  constructor(
    private dataService: DataService,
    // private usuarioService: UsuarioService,

  ) {
  }


  async ngOnInit() {
    this.menuOpts = this.dataService.getMenuOpts();
    this.date = Date.now().toString();
    this.reloj();

    // this.usuario = this.usuarioService.getUsuario();
  }

  reloj() {

    setInterval(() => {
      this.date = Date.now().toString();
    }, 1000);


  }


  // async onLoad() {
  //   this.usuario = this.usuarioService.getUsuario();
  // }


}

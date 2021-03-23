import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { ModalController } from '@ionic/angular';
import { ClienteDetalleComponent } from '../../components/cliente-detalle/cliente-detalle.component';
import { Cliente } from '../../interfaces/clienteInterface';
import { NuevoClienteComponent } from '../../components/nuevo-cliente/nuevo-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: Cliente[] = [];
  limite = 10;
  textoBuscar = '';
  buscaClientes: Cliente[] = [];
  bandera = 0;
  buscando = false;
  nada = false;
  habilitado = true;
  edit = false;
  pagina = 1;
  total_pag;
  sort = 'nombre';


  constructor(
    private clienteService: ClientesService,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    this.clienteService.paginaCero();
    this.buscaClientes = [];
    await this.clienteService.cargarToken();

    this.siguientes();
  }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: ClienteDetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
    modal.onDidDismiss().then(() => {
      this.recargar(null);
    });
  }

  recargar(event?) {
    this.siguientes('ninguna', event, true);

  }

  cambioFiltro(event?) {
    this.limite = event.detail.value;
    this.siguientes('inicio');
  }

  ordenarPor(event?) {
    this.sort = event.detail.value;
    this.recargar();
  }

  siguientes(direccion?: string, event?, pull: boolean = false) {

    if (pull) {
      this.habilitado = true;
      this.clientes = [];
    }

    this.clientes = [];
    this.clienteService.getClientes(pull, direccion, this.limite, this.sort)
      .subscribe(resp => {
        this.clientes.push(...resp.clientes);

        this.pagina = resp.pagina;
        this.total_pag = resp.total_paginas;

        if (event) {
          event.target.complete();
          if (resp.clientes.length === 0) {
            this.habilitado = false;
          }
        }
      });
  }

  buscar(event) {

    const valor = event.detail.value;

    this.buscando = true;
    this.nada = false;

    if (valor.trim() === '') {
      this.bandera = 0;
      this.buscando = false;
      return;
    }

    this.clienteService.buscarCliente(valor)
      .subscribe(resp => {

        if (resp.ok === false) {
          this.nada = true;

        }

        this.bandera = 1;
        this.buscaClientes = resp.clientes;
        this.buscando = false;

      });

  }

  editSwitch() {

    this.edit = !this.edit;
  }

  async onClick() {
    const modal = await this.modalCtrl.create({
      component: NuevoClienteComponent,
    });

    modal.present();
    modal.onDidDismiss().then(() => {
      this.siguientes();
    });
  }

  onClick2() {
    console.log(window.innerWidth);
  }




}



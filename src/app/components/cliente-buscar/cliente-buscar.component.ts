import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClientesService } from '../../services/clientes.service';
import { Cliente, ClienteDetalle } from '../../interfaces/clienteInterface';
import { MicroService } from '../../services/micro.service';

@Component({
  selector: 'app-cliente-buscar',
  templateUrl: './cliente-buscar.component.html',
  styleUrls: ['./cliente-buscar.component.scss'],
})
export class ClienteBuscarComponent implements OnInit {

  clientes: Cliente[] = [];
  textoBuscar = '';
  buscaClientes: Cliente[] = [];
  bandera = 0;
  buscando = false;
  nada = false;
  habilitado = true;

  clienteSel: ClienteDetalle;

  constructor(
    private clienteService: ClientesService,
    private modalCtrl: ModalController,
    private microService: MicroService,
  ) { }

  async ngOnInit() {
    await this.clienteService.cargarToken();
    this.clienteService.paginaCero();
    this.buscaClientes = [];

  }

  async verDetalle(id: string) {
    this.clienteService.getClienteDetalle(id)
      .subscribe(resp => {

        this.clienteSel = resp.cliente;

        this.modalCtrl.dismiss({
          _id: this.clienteSel._id,
          nombre: this.clienteSel.nombre,
          codigo: this.clienteSel.codigo,
          telefono: this.clienteSel.telefono,
          celular: this.clienteSel.celular,
          direccion: this.clienteSel.direccion,
          email: this.clienteSel.email,
          documento: this.clienteSel.documento,
        });

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
          this.bandera = 0;
          this.nada = true;
        } else {
          this.bandera = 1;
          this.buscaClientes = resp.clientes;
        }

        this.buscando = false;

      });

  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

}

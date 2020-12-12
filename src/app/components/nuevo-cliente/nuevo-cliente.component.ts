import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { ClienteDetalle } from '../../interfaces/clienteInterface';
import { UiServiceService } from '../../services/ui-service.service';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Paises } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.scss'],
})
export class NuevoClienteComponent implements OnInit {

  paises: Observable<Paises[]>;

  nuevoCli: ClienteDetalle = {
    nombre: 'Aspirino Bayer',
    documento: '23451234',
    contacto: 'Fulano',
    empresa: false,
    ruc: '23451234-1',
    telefono: '021291304',
    email: 'aspirinabayer@gmail.com',
    direccion: 'Cacique Lambare y Feliz Bogado',
    ciudad: 'Lamber City',
    pais: 'Paraguay',
    celular: '0986223340',
  };



  constructor(
    private modalCtrl: ModalController,
    private clientesService: ClientesService,
    private uiService: UiServiceService,
    private dataService: DataService

  ) { }

  async ngOnInit() {
    this.paises = this.dataService.getPaises();
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  limpiar() {
    this.nuevoCli = {};
    this.nuevoCli.empresa = false;
    this.nuevoCli.pais = 'Paraguay';
  }

  async nuevoCliente(fCliente: NgForm) {

    if (fCliente.invalid) { return; }

    this.nuevoCli.email = this.nuevoCli.email.toLocaleLowerCase();
    this.nuevoCli.nombre = this.nuevoCli.nombre.toLocaleLowerCase();

    const valido = await this.clientesService.nuevoCliente(this.nuevoCli);

    if (valido) {
      this.uiService.mostrarToast(`Se ha agregado "${this.nuevoCli.nombre}" a los  clientes`, 'success');
      this.modalCtrl.dismiss();
    } else {
      this.uiService.mostrarToast(`El documento "${this.nuevoCli.documento}" ya ha sido registrado, prueba con otro`, 'danger');
    }

  }

  truefalse() {
    this.nuevoCli.empresa = !this.nuevoCli.empresa;
  }

  copiarDoc() {
    this.nuevoCli.ruc = this.nuevoCli.documento;
  }

  copiarTel() {
    this.nuevoCli.celular = this.nuevoCli.telefono;
  }

}


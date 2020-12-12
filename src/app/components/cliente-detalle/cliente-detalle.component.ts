import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { ClienteDetalle } from '../../interfaces/clienteInterface';
import { ModalController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Paises } from '../../interfaces/interfaces';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.scss'],
})
export class ClienteDetalleComponent implements OnInit {

  @Input() id;

  cliente: ClienteDetalle = {};
  editState = true;
  paises: Observable<Paises[]>;

  constructor(
    private clienteService: ClientesService,
    private modalCtrl: ModalController,
    private uiService: UiServiceService,
    private dataService: DataService
  ) { }



  async ngOnInit() {



    this.clienteService.getClienteDetalle(this.id)
      .subscribe(resp => {
        this.cliente = resp.cliente;
      });
    this.paises = this.dataService.getPaises();
  }



  actualizar() {

    this.cliente.email = this.cliente.email.toLocaleLowerCase();
    this.cliente.nombre = this.cliente.nombre.toLocaleLowerCase();

    const valido = this.clienteService.actualizaCliente(this.cliente, this.id);

    if (valido) {
      this.uiService.mostrarToast(`El cliente "${this.cliente.nombre}" ha sido actualizado`, 'success');
      this.modalCtrl.dismiss();
    } else {
      this.uiService.mostrarToast('Ocurrió un problema intenta nuevamente', 'danger');
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  editar() {
    this.editState = false;
  }

  cancelar() {
    this.editState = true;
  }

}

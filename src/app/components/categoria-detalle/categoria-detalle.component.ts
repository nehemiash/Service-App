import { Component, OnInit, Input } from '@angular/core';
import { MicroService } from '../../services/micro.service';
import { ModalController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';
import { CategoriaDetalle } from '../../interfaces/microInterfaces';

@Component({
  selector: 'app-categoria-detalle',
  templateUrl: './categoria-detalle.component.html',
  styleUrls: ['./categoria-detalle.component.scss'],
})
export class CategoriaDetalleComponent implements OnInit {

  @Input() id: string;

  categoria: CategoriaDetalle = {};

  editState = true;

  constructor(
    private microService: MicroService,
    private modalCtrl: ModalController,
    private uiService: UiServiceService,
  ) { }



  async ngOnInit() {
    await this.microService.cargarToken();
    this.microService.getCatByID(this.id)
      .subscribe(resp => {
        this.categoria = resp.categoria;
      });
  }

  actualizar() {

    this.categoria.descripcion = this.categoria.descripcion.toLocaleLowerCase();

    const valido = this.microService.editaCategoria(this.categoria, this.id);

    if (valido) {
      this.uiService.mostrarToast(`La categoria "${this.categoria.descripcion}"  ha sido actualizada`, 'success');
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

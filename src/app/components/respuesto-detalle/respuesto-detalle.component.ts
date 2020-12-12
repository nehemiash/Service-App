import { Component, OnInit, Input } from '@angular/core';
import { RepuestosService } from '../../services/repuestos.service';
import { ModalController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';
import { RepuestoDetalle, CategoriaRepuesto, Categoria } from '../../interfaces/repuestoInterface';
import { MicroService } from '../../services/micro.service';

@Component({
  selector: 'app-respuesto-detalle',
  templateUrl: './respuesto-detalle.component.html',
  styleUrls: ['./respuesto-detalle.component.scss'],
})
export class RespuestoDetalleComponent implements OnInit {

  @Input() id: string;

  categ: Categoria[] = [];

  repuesto: RepuestoDetalle = {
    descripcion: '',
    numParte: '',
    marca: '',
    precioCosto: 0,
    precioVenta: 0,
    categoria: {
      _id: '',
      descripcion: '',
    } as CategoriaRepuesto,

  };

  editState = true;

  constructor(
    private microService: MicroService,
    private repuestoService: RepuestosService,
    private modalCtrl: ModalController,
    private uiService: UiServiceService,
  ) { }



  async ngOnInit() {
    await this.microService.cargarToken();
    this.repuestoService.getRepuestoDetalle(this.id)
      .subscribe(resp => {
        this.repuesto = resp.repuestoDB;
      });
    this.obtenerCategorias();
  }


  obtenerCategorias() {

    this.categ = [];
    this.microService.getCategorias('repuesto')
      .subscribe(resp => {
        this.categ.push(...resp.categorias);
      });

  }

  actualizar() {

    this.repuesto.descripcion = this.repuesto.descripcion.toLocaleLowerCase();
    this.repuesto.marca = this.repuesto.marca.toLocaleLowerCase();

    const valido = this.repuestoService.actualizaRepuesto(this.repuesto, this.id);

    if (valido) {
      this.uiService.mostrarToast('El repuesto ha sido actualizado', 'success');
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
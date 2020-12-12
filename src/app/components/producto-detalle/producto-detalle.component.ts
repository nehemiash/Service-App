import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ModalController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';
import { ProductoDetalle, CategoriaProducto, Categoria } from '../../interfaces/productoInterface';
import { MicroService } from '../../services/micro.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.scss'],
})
export class ProductoDetalleComponent implements OnInit {

  @Input() id: string;

  categ: Categoria[] = [];

  producto: ProductoDetalle = {
    descripcion: '',
    codigo: '',
    numParte: '',
    marca: '',
    modelo: '',
    color: '',
    categoria: {
      _id: '',
      descripcion: '',
    } as CategoriaProducto,

  };

  editState = true;

  constructor(
    private microService: MicroService,
    private productoService: ProductosService,
    private modalCtrl: ModalController,
    private uiService: UiServiceService,
  ) { }



  async ngOnInit() {
    await this.microService.cargarToken();
    this.productoService.getProductoDetalle(this.id)
      .subscribe(resp => {
        this.producto = resp.productoDB;
      });
    this.obtenerCategorias();
  }


  obtenerCategorias() {

    this.categ = [];
    this.microService.getCategorias('producto')
      .subscribe(resp => {
        this.categ.push(...resp.categorias);
      });

  }

  actualizar() {

    this.producto.descripcion = this.producto.descripcion.toLocaleLowerCase();
    this.producto.marca = this.producto.marca.toLocaleLowerCase();

    const valido = this.productoService.actualizaProducto(this.producto, this.id);

    if (valido) {
      this.uiService.mostrarToast('El producto ha sido actualizado', 'success');
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

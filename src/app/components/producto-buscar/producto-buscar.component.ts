import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Categoria } from '../../interfaces/microInterfaces';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../interfaces/ordenInterfaces';
import { ProductoDetalle } from '../../interfaces/productoInterface';

@Component({
  selector: 'app-producto-buscar',
  templateUrl: './producto-buscar.component.html',
  styleUrls: ['./producto-buscar.component.scss'],
})
export class ProductoBuscarComponent implements OnInit {

  textoBuscar = '';
  buscaProductos: Producto[] = [];
  bandera = false;
  buscando = false;
  nada = false;

  categ: Categoria[] = [];

  productoSel: ProductoDetalle;

  constructor(
    private productoService: ProductosService,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    this.productoService.paginaCero();
    this.buscaProductos = [];
    await this.productoService.cargarToken();
  }

  async verDetalle(id: string) {

    this.productoService.getProductoDetalle(id)
      .subscribe(resp => {

        this.productoSel = resp.productoDB;

        this.modalCtrl.dismiss({
          _id: resp.productoDB._id,
          descripcion: resp.productoDB.descripcion,
          codigo: resp.productoDB.codigo,
          categoria: resp.productoDB.categoria,
          marca: resp.productoDB.marca,
        });

      });
  }

  buscar(event) {
    const valor = event.detail.value;

    this.buscando = true;
    this.nada = false;

    if (valor.trim() === '') {
      this.bandera = false;
      this.buscando = false;
      return;
    }

    this.productoService.buscarProducto(valor)
      .subscribe(resp => {

        if (resp.ok === false) {
          this.nada = true;
          this.bandera = false;
        } else {

          this.bandera = true;
          this.buscaProductos = resp.productos;

        }
        this.buscando = false;


      });

  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }


}

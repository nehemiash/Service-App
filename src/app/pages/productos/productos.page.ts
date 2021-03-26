import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ModalController } from '@ionic/angular';
import { ProductoDetalleComponent } from '../../components/producto-detalle/producto-detalle.component';
import { Producto } from '../../interfaces/productoInterface';
import { NuevoProductoComponent } from '../../components/nuevo-producto/nuevo-producto.component';
import { Categoria } from '../../interfaces/microInterfaces';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos: Producto[] = [];
  textoBuscar = '';
  buscaProductos: Producto[] = [];
  bandera = 0;
  buscando = false;
  nada = false;
  habilitado = true;
  edit = false;
  limite = 20;
  pagina = 1;
  totalpag;
  sort = '_id';


  categ: Categoria[] = [];

  constructor(
    private productoService: ProductosService,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    this.productoService.paginaCero();
    this.buscaProductos = [];
    await this.productoService.cargarToken();
    this.siguientes();
  }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: ProductoDetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
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
      this.productos = [];
    }

    this.productos = [];
    this.productoService.getProductos(pull, direccion, this.limite, this.sort)
      .subscribe(resp => {
        this.productos.push(...resp.productos);

        this.pagina = resp.pagina;
        this.totalpag = resp.total_paginas;

        if (event) {
          event.target.complete();
          if (resp.productos.length === 0) {
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

    this.productoService.buscarProducto(valor)
      .subscribe(resp => {

        if (resp.ok === false) {
          this.nada = true;

        }

        this.bandera = 1;
        this.buscaProductos = resp.productos;
        this.buscando = false;

      });

  }

  editSwitch() {

    this.edit = !this.edit;
  }

  async onClick() {
    const modal = await this.modalCtrl.create({
      component: NuevoProductoComponent,
    });

    modal.present();
  }


}



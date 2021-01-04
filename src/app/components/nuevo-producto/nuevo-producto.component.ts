import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, IonContent } from '@ionic/angular';
import { ProductosService } from '../../services/productos.service';
import { UiServiceService } from '../../services/ui-service.service';
import { ProductoDetalle, Marca } from '../../interfaces/productoInterface';
import { MicroService } from '../../services/micro.service';
import { Categoria, NuevaCategoria } from '../../interfaces/microInterfaces';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.scss'],
})
export class NuevoProductoComponent implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  categ: Categoria[] = [];
  marcas: Marca[] = [];
  nuevaMarca = false;
  nuevaCat = false;

  nuevoProd: ProductoDetalle = {
    descripcion: '',
    numParte: '',
    marca: '',
    modelo: '',
    categoria: {
      _id: '',
      descripcion: '',
    }
  };

  boton = true;
  boton2 = true;

  categNueva: NuevaCategoria = {
    descripcion: '',
    tipo: 'producto'
  };

  constructor(
    private microService: MicroService,
    private modalCtrl: ModalController,
    private productosService: ProductosService,
    private uiService: UiServiceService,
  ) { }

  async ngOnInit() {
    await this.microService.cargarToken();
    await this.productosService.cargarToken();
    this.obtenerCategorias();
    this.obtenerMarcas();
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  obtenerCategorias() {

    this.categ = [];
    this.microService.getCategorias('producto')
      .subscribe(resp => {
        this.categ.push(...resp.categorias);
      });

  }

  obtenerMarcas() {
    this.marcas = [];
    this.productosService.getMarcas()
      .subscribe(resp => {
        this.marcas.push(...resp.marcas);
      });

  }

  agregarMarca() {
    this.nuevoProd.marca = '';
    this.nuevaMarca = !this.nuevaMarca;
  }

  agregarCat() {
    this.nuevoProd.categoria._id = '';
    this.nuevaCat = !this.nuevaCat;
  }

  limpiar() {
    this.nuevoProd = {
      descripcion: '',
      numParte: '',
      marca: '',
      modelo: '',
      categoria: {
        _id: ''
      }
    };
    this.boton = true;
    this.boton2 = true;
    this.nuevaMarca = false;
    this.nuevaCat = false;
  }

  async nuevoProducto(fProducto: NgForm) {
    this.nuevoProd.descripcion = this.nuevoProd.descripcion.toLocaleLowerCase();
    this.nuevoProd.marca = this.nuevoProd.marca.toLocaleLowerCase();
    this.nuevoProd.modelo = this.nuevoProd.modelo.toLocaleLowerCase();

    if (fProducto.invalid) {
      this.uiService.mostrarToast('Falta completar algunos campos', 'danger');
      return;
    }

    const valido = await this.productosService.nuevoProducto(this.nuevoProd);

    if (valido) {
      this.uiService.mostrarToast('Se ha creado un nuevo producto', 'success');

      this.productosService.getProductoDetalle(valido['1']).subscribe(resp => {

        this.modalCtrl.dismiss({
          _id: resp.productoDB._id,
          descripcion: resp.productoDB.descripcion,
          codigo: resp.productoDB.codigo,
          marca: resp.productoDB.marca,
          categoria: resp.productoDB.categoria,
        });
      });


    } else {
      this.uiService.mostrarToast('Hubo un problema, intenta nuevamente', 'danger');
    }

  }

  crearCat() {

    this.categNueva.descripcion = this.nuevoProd.categoria.descripcion;
    this.microService.nuevCat(this.categNueva)
      .subscribe((resp) => {
        this.nuevoProd.categoria._id = resp.categorias._id;
        this.uiService.mostrarToast(`Se ha agregado "${resp.categorias.descripcion}" a las Categorias`, 'success');
      });

    this.boton = false;

  }
  boton2off() {
    this.boton2 = false;
    this.uiService.mostrarToast(`Se ha agregado "${this.nuevoProd.marca}" a las Marcas`, 'success');
  }

}


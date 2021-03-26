import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, IonContent } from '@ionic/angular';
import { RepuestosService } from '../../services/repuestos.service';
import { UiServiceService } from '../../services/ui-service.service';
import { RepuestoDetalle, Marca, CategoriaRepuesto } from '../../interfaces/repuestoInterface';
import { MicroService } from '../../services/micro.service';
import { Categoria, NuevaCategoria } from '../../interfaces/microInterfaces';

@Component({
  selector: 'app-nuevo-repuesto',
  templateUrl: './nuevo-repuesto.component.html',
  styleUrls: ['./nuevo-repuesto.component.scss'],
})
export class NuevoRepuestoComponent implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  categ: Categoria[] = [];
  marcas: Marca[] = [];
  nuevaMarca = false;
  nuevaCat = false;

  nuevoRep: RepuestoDetalle = {
    descripcion: '',
    numParte: '',
    marca: '',
    categoria: {
      _id: '',
      descripcion: '',
    } as CategoriaRepuesto
  };

  boton = true;
  boton2 = true;

  categNueva: NuevaCategoria = {
    descripcion: '',
    tipo: 'repuesto'
  };

  constructor(
    private microService: MicroService,
    private modalCtrl: ModalController,
    private repuestosService: RepuestosService,
    private uiService: UiServiceService,
  ) { }

  async ngOnInit() {
    await this.microService.cargarToken();
    this.obtenerCategorias();
    this.obtenerMarcas();
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  obtenerCategorias() {

    this.categ = [];
    this.microService.getCategorias('repuesto')
      .subscribe(resp => {
        this.categ.push(...resp.categorias);
      });

  }

  obtenerMarcas() {
    this.marcas = [];
    this.repuestosService.getMarcas()
      .subscribe(resp => {
        this.marcas.push(...resp.marcas);
      });

  }

  agregarMarca() {
    this.nuevoRep.marca = '';
    this.nuevaMarca = !this.nuevaMarca;
  }

  agregarCat() {
    this.nuevoRep.categoria._id = '';
    this.nuevaCat = !this.nuevaCat;
  }

  limpiar() {
    this.nuevoRep = {
      descripcion: '',
      numParte: '',
      marca: '',
      categoria: {
        _id: ''
      }
    };
    this.boton = true;
    this.boton2 = true;
    this.nuevaMarca = false;
    this.nuevaCat = false;
  }

  async nuevoRepuesto(fRepuesto: NgForm) {

    if (fRepuesto.invalid) {
      this.uiService.mostrarToast('Falta completar algunos campos', 'danger');
      return;
    }

    this.nuevoRep.descripcion = this.nuevoRep.descripcion.toLocaleLowerCase();
    this.nuevoRep.marca = this.nuevoRep.marca.toLocaleLowerCase();

    const valido = await this.repuestosService.nuevoRepuesto(this.nuevoRep);

    if (valido) {
      this.uiService.mostrarToast('Se ha creado un nuevo repuesto', 'success');
      this.modalCtrl.dismiss();
    } else {
      this.uiService.mostrarToast('Hubo un problema, intenta nuevamente', 'danger');
    }

  }

  crearCat() {

    if (this.categNueva.descripcion === '') { return; }

    this.categNueva.descripcion = this.nuevoRep.categoria.descripcion;
    this.microService.nuevCat(this.categNueva)
      .subscribe((resp) => {
        this.nuevoRep.categoria._id = resp.categorias._id;
        this.uiService.mostrarToast(`Se ha agregado "${resp.categorias.descripcion}" a las Categorias`, 'success');
      });

    this.boton = false;

  }

  boton2off() {
    this.boton2 = false;
    this.uiService.mostrarToast(`Se ha agregado "${this.nuevoRep.marca}" a las Marcas`, 'success');
  }
}

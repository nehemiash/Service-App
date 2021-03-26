import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { MicroService } from '../../services/micro.service';
import { Categoria } from '../../interfaces/microInterfaces';
import { UiServiceService } from '../../services/ui-service.service';
import { IonContent, ModalController } from '@ionic/angular';
import { CategoriaDetalleComponent } from '../../components/categoria-detalle/categoria-detalle.component';
import { NuevaCategoriaComponent } from '../../components/nueva-categoria/nueva-categoria.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  width = 0;
  categ: Categoria[] = [];
  categ2: Categoria[] = [];
  vistaCat = true;
  eliminar = false;
  eliminar2 = false;

  constructor(
    private microService: MicroService,
    private uiService: UiServiceService,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {

    await this.microService.cargarToken();
    this.obtenerCategorias();
    this.obtenerCategorias2();
  }

  recargarPagina() {
    this.eliminar = false;
    this.eliminar2 = false;
    this.categ = [];
    this.categ2 = [];
    this.obtenerCategorias();
    this.obtenerCategorias2();
  }

  cambio(event) {
    const vista = event.detail.value;

    switch (vista) {
      case 'productos':
        this.vistaCat = true;
        break;
      case 'repuestos':
        this.vistaCat = false;
        break;
    }

  }

  obtenerCategorias() {
    this.categ = [];
    this.microService.getCatSort('producto')
      .subscribe(resp => {
        this.categ.push(...resp.categorias);
      });
  }

  obtenerCategorias2() {
    this.categ2 = [];
    this.microService.getCatSort('repuesto')
      .subscribe(resp => {
        this.categ2.push(...resp.categorias);
      });
  }


  async onClick() {
    const modal = await this.modalCtrl.create({
      component: NuevaCategoriaComponent,
    });

    modal.present();
    modal.onDidDismiss().then(() => {
      this.recargarPagina();
    });
  }

  async editarCat(id: string) {

    const modal = await this.modalCtrl.create({
      component: CategoriaDetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
    modal.onDidDismiss().then(() => {
      this.recargarPagina();
    });
  }

  async borrarCat(id: string, nombre: string, item?: any) {

    nombre = nombre.toLocaleUpperCase();

    const resp = await this.uiService.mostrarAlerta('Borrar Categoria', `Esta seguro que quiere borrar la Categoria: "${nombre}"?`);
    if (!resp) {
      return;
    } else {
      const valido = await this.microService.borrarCategoria(id);
      if (valido) {
        this.uiService.mostrarToast(`Se borrado la Categoria: ${nombre}`, 'danger');
      } else {
        this.uiService.mostrarToast('Hubo un problema, intenta nuevamente', 'warning');
      }
    }
    this.recargarPagina();
  }

  recargar(event) {
    this.categ = [];
    this.categ2 = [];
    this.obtenerCategorias();
    this.obtenerCategorias2();

    event.target.complete();
  }

  borrarCate() {
    this.eliminar2 = false;
    this.eliminar = !this.eliminar;
  }

  borrarCate2() {
    this.eliminar = false;
    this.eliminar2 = !this.eliminar2;
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { MicroService } from '../../services/micro.service';
import { CategoriaDetalle } from '../../interfaces/microInterfaces';
import { UiServiceService } from '../../services/ui-service.service';


@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.scss'],
})
export class NuevaCategoriaComponent implements OnInit {

  nuevaCat: CategoriaDetalle = {
    descripcion: '',
    tipo: '',
  };

  constructor(
    private modalCtrl: ModalController,
    private categoriasService: MicroService,
    private uiService: UiServiceService,

  ) { }

  async ngOnInit() {
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  limpiar() {
    this.nuevaCat = {};
  }

  async nuevaCategoria(fCategoria: NgForm) {

    this.nuevaCat.descripcion = this.nuevaCat.descripcion.toLocaleLowerCase();

    if (fCategoria.invalid) { return; }

    const valido = await this.categoriasService.nuevaCategoria(this.nuevaCat);

    if (valido) {
      this.uiService.mostrarToast(`Se ha agregado "${this.nuevaCat.descripcion}" a las  categorias`, 'success');
      this.modalCtrl.dismiss();
    } else {
      this.uiService.mostrarToast(`Ha ocurrido un error, intenta de nuevo`, 'danger');
    }

  }
}



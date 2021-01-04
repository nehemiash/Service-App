import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Nota } from '../../interfaces/microInterfaces';
import { MicroService } from '../../services/micro.service';
import { UiServiceService } from '../../services/ui-service.service';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-nueva-nota',
  templateUrl: './nueva-nota.component.html',
  styleUrls: ['./nueva-nota.component.scss'],
})
export class NuevaNotaComponent implements OnInit {

  @Input() type: string;

  nuevaNot: Nota = {};

  constructor(
    private modalCtrl: ModalController,
    private microService: MicroService,
    private uiService: UiServiceService,

  ) { }

  async ngOnInit() {
    this.microService.cargarToken();
    this.nuevaNot.tipo = this.type;
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  limpiar() {
    this.nuevaNot = {};
  }

  async nuevaNota(fNota: NgForm) {

    this.nuevaNot.descripcion = this.nuevaNot.descripcion.toLocaleLowerCase();

    if (fNota.invalid) { return; }

    const valido = await this.microService.nuevaNota(this.nuevaNot);

    if (valido['0']) {
      this.uiService.mostrarToast(`Se ha agregado "${this.nuevaNot.descripcion}" a las  notas`, 'success');
      this.microService.cargarToken();
      this.microService.getNotaByID(valido['1'].nota._id)
        .subscribe(resp => {
          console.log(resp);
          this.modalCtrl.dismiss({
            _id: resp.nota._id,
            descripcion: resp.nota.descripcion,
            creada: resp.nota.creada,
            usuario: resp.nota.usuario,
            tipo: resp.nota.tipo,
          });
        });

    } else {
      this.uiService.mostrarToast(`Ha ocurrido un error, intenta de nuevo`, 'danger');
    }

  }

  verOBJ() {
    console.log(this.nuevaNot);
  }

}

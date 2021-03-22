import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../../services/ordenes.service';
import { Orden } from '../../interfaces/ordenInterfaces';
import { OrdenDetalleComponent } from '../../components/orden-detalle/orden-detalle.component';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
})

export class OrdenesPage implements OnInit {

  habilitado = true;
  ordenes: Orden[] = [];
  bandera = 0;
  textoBuscar = '';

  constructor(
    private ordenesService: OrdenesService,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {

  }

  async ngOnInit() {
    await this.ordenesService.cargarToken();
    this.siguientes();
  }

  siguientes() {
    this.ordenesService.getOrdenes()
      .subscribe(resp => {
        this.ordenes.push(...resp.ordenes);
      });
  }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: OrdenDetalleComponent,
      cssClass: 'fullscreen',
      componentProps: {
        id
      }
    });

    await modal.present();
  }

  buscar(event: any) {
    console.log('buscando...', event);
  }
}

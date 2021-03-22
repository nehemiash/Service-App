import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { OrdenDetalle } from 'src/app/interfaces/ordenInterfaces';
import { OrdenesService } from '../../services/ordenes.service';
import { Orden } from '../../interfaces/ordenInterfaces';


@Component({
  selector: 'app-orden-detalle',
  templateUrl: './orden-detalle.component.html',
  styleUrls: ['./orden-detalle.component.scss'],
})
export class OrdenDetalleComponent implements OnInit {

  @Input() id;

  orden: OrdenDetalle = {
    cliente: {}
  };

  constructor(
    private modalCtrl: ModalController,
    private ordenService: OrdenesService,
    private navCtrl: NavController,
  ) { }

  async ngOnInit() {
    this.ordenService.getOrdenDetalle(this.id)
      .subscribe(async resp => {
        this.orden = resp.orden;
        console.log(this.orden);
      });
  }

  cerrarModal() {
    this.navCtrl.navigateRoot('/ordenes');
    setTimeout(this.refresh);
    this.modalCtrl.dismiss();
  }

  refresh() {
    window.location.reload();
  }

}

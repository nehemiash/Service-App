import { Component, OnInit } from '@angular/core';
import { RepuestosService } from '../../services/repuestos.service';
import { ModalController } from '@ionic/angular';
import { RespuestoDetalleComponent } from '../../components/respuesto-detalle/respuesto-detalle.component';
import { Repuesto } from '../../interfaces/repuestoInterface';
import { NuevoRepuestoComponent } from '../../components/nuevo-repuesto/nuevo-repuesto.component';
import { Categoria } from '../../interfaces/microInterfaces';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.page.html',
  styleUrls: ['./repuestos.page.scss'],
})
export class RepuestosPage implements OnInit {

  repuestos: Repuesto[] = [];
  textoBuscar = '';
  buscaRepuestos: Repuesto[] = [];
  bandera = 0;
  buscando = false;
  nada = false;
  habilitado = true;
  edit = false;

  categ: Categoria[] = [];

  constructor(
    private repuestoService: RepuestosService,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    this.repuestoService.paginaCero();
    this.buscaRepuestos = [];
    await this.repuestoService.cargarToken();
    this.siguientes();
  }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: RespuestoDetalleComponent,
      cssClass: 'smallscreen',
      componentProps: {
        id
      }
    });

    modal.present();
  }

  recargar(event) {

    this.siguientes(event, true);

  }

  siguientes(event?, pull: boolean = false) {

    if (pull) {
      this.habilitado = true;
      this.repuestos = [];
    }

    this.repuestoService.getRepuestos(pull)
      .subscribe(resp => {
        this.repuestos.push(...resp.repuestos);
        if (event) {
          event.target.complete();
          if (resp.repuestos.length === 0) {
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

    this.repuestoService.buscarRepuesto(valor)
      .subscribe(resp => {

        if (resp.ok === false) {
          this.nada = true;

        }

        this.bandera = 1;
        this.buscaRepuestos = resp.repuestos;
        this.buscando = false;

      });

  }

  editSwitch() {

    this.edit = !this.edit;
  }

  async onClick() {
    const modal = await this.modalCtrl.create({
      component: NuevoRepuestoComponent,
      cssClass: 'smallscreen',
    });

    modal.present();
  }

  onClick2() {
    console.log(window.innerWidth);
  }


}
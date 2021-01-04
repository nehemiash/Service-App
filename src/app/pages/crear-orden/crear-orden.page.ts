import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { NgForm } from '@angular/forms';
import { NuevoClienteComponent } from '../../components/nuevo-cliente/nuevo-cliente.component';
import { ClienteBuscarComponent } from '../../components/cliente-buscar/cliente-buscar.component';
import { Orden } from '../../interfaces/ordenInterfaces';
import { ProductoBuscarComponent } from '../../components/producto-buscar/producto-buscar.component';
import { NuevoProductoComponent } from '../../components/nuevo-producto/nuevo-producto.component';
import { NuevaNotaComponent } from '../../components/nueva-nota/nueva-nota.component';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.page.html',
  styleUrls: ['./crear-orden.page.scss'],
})
export class CrearOrdenPage implements OnInit {

  fechaActual;

  botDesc = false;
  botFlete = false;

  orden: Orden = {
    problema1: [{
      _id: '5fa86fe32a465c60eddf4c9b'
    }, {
      _id: '5fa86fe32a465c60eddf4c9b'
    }
    ],
    problema2: [{
      _id: '5fa86fe32a465c60eddf4c9b'
    }, {
      _id: '5fa86fe32a465c60eddf4c9b'
    }
    ],
    notas: [],
    obs: '',
    serie1: '123456789',
    serie2: '987654321',
    producto: {
      _id: '5fab23a4dd4be51b7def4ce2',
      descripcion: 'Iphone 12 pro max',
      codigo: '2',
      marca: 'Apple',
      categoria: {
        _id: '5fab1e2a5b438b193c725208',
        descripcion: 'celulares',
      }
    },
    fechaCompra: '2020-07-30T04:00:00.000Z',
    cobertura: 'Fuera de Garantia',
    cliente: {},
    ubicacion: 'Recepcion',
    accesorios: 'Solo Aparato',
    notaCliente: 'El equipo tiene una mancha en la pantalla',
    aspecto: 'Tiene algunos golpes en los bordes de la carcasa, no se observan liquidos.',
    reporte: 'Se le cambio la pantalla y el equipo ha respondido bien luego del cambio se ha solucionado el problema.',
    tecnico: '5fa9ba49ebe0d66a4039439f',
    usuario: {},
    situacion: 'En Recepción',
    valorpcs: 0,
    valorMo: 0,
    descuento: 0,
    costoFlete: 0,
    valorPreapro: 30,

  };

  customPickerOptions = {
    buttons: [{
      text: 'Aceptar',
    }]
  };

  usuarioc: Usuario = {};
  constructor(

    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService,
    public menu: MenuController,
    private modalCtrl: ModalController,

  ) {
  }

  ngOnInit() {
    this.fechaActual = new Date().toString();
    this.usuarioc = this.usuarioService.getUsuario();
    this.orden.usuario._id = this.usuarioc._id;
  }


  login(fLogin: NgForm) {

    console.log('enviado');


  }

  fakeClick(nombre?: string) {
    console.log(`Se hizo clic en: ${nombre}`);
  }

  nuevaOrden() {
    console.log('formulario enviado...');
  }

  async agregarNota() {
    const modal = await this.modalCtrl.create({
      component: NuevaNotaComponent,
      componentProps: {
        type: 'nota'
      }
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    if (!data) {
      return;
    }

    this.orden.notas.push({ ...data });


  }

  updatePrice(event: any, field: string) {

    const value = event.target.value;
    const value2 = value.replace(/,/g, '.');

    const formattedValue = parseFloat(value2.replace(/\$|/g, ''));

    this.updatePriceTotal();

    switch (field) {
      case ('preapro'):
        this.orden.valorPreapro = formattedValue;
        this.updatePriceTotal();
        break;
      case ('repuestos'):
        this.orden.valorpcs = formattedValue;
        this.updatePriceTotal();
        break;
      case 'mo':
        this.orden.valorMo = formattedValue;
        this.updatePriceTotal();
        break;
      case 'flete':
        this.orden.costoFlete = formattedValue;
        this.updatePriceTotal();
        break;
      case 'descuento':
        this.orden.descuento = formattedValue;
        this.orden.descuento = (this.orden.descuento * -1);
        this.updatePriceTotal();
        break;
    }

  }

  updatePriceTotal() {

    const value = (this.orden.valorMo + this.orden.costoFlete + this.orden.valorpcs + this.orden.descuento).toString();

    const value2 = value.replace(/,/g, '.');

    const formattedValue = parseFloat(value2.replace(/\$|/g, ''));
    this.orden.valorTotal = formattedValue;

  }

  async nuevoCli() {
    const modal = await this.modalCtrl.create({
      component: NuevoClienteComponent,
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (!data) {
      return;
    }

    this.orden.cliente = data;

  }

  async nuevoPro() {
    const modal = await this.modalCtrl.create({
      component: NuevoProductoComponent,
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (!data) {
      return;
    }
    this.orden.producto = data;

  }

  async buscarCli() {
    const modal = await this.modalCtrl.create({
      component: ClienteBuscarComponent,
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (!data) {
      return;
    }
    this.orden.cliente = data;

  }


  async buscarPro() {
    const modal = await this.modalCtrl.create({
      component: ProductoBuscarComponent,
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (!data) {
      return;
    }
    this.orden.producto = data;

  }

  aprobadoSw(value: string) {
    if (value) {
      this.orden.fechaAprob = new Date();
    }
    if (!value) {
      this.orden.fechaAprob = null;
    }
  }

  verObjeto() {
    console.log(this.orden);
  }

  descuentoON() {
    this.botDesc = !this.botDesc;
    if (!this.botDesc) {
      this.orden.descuento = 0;
      this.updatePriceTotal();
    }
  }
  fleteON() {
    this.botFlete = !this.botFlete;
    if (!this.botFlete) {
      this.orden.costoFlete = 0;
      this.updatePriceTotal();
    }
  }



}




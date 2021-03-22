import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MenuController, NavController, ModalController, IonSlides } from '@ionic/angular';
import { Usuario } from '../../interfaces/interfaces';
import { UiServiceService } from '../../services/ui-service.service';
import { NgForm } from '@angular/forms';
import { NuevoClienteComponent } from '../../components/nuevo-cliente/nuevo-cliente.component';
import { ClienteBuscarComponent } from '../../components/cliente-buscar/cliente-buscar.component';
import { Orden, OrdenDetalle } from '../../interfaces/ordenInterfaces';
import { ProductoBuscarComponent } from '../../components/producto-buscar/producto-buscar.component';
import { NuevoProductoComponent } from '../../components/nuevo-producto/nuevo-producto.component';
import { NuevaNotaComponent } from '../../components/nueva-nota/nueva-nota.component';
import { OrdenesService } from '../../services/ordenes.service';
import { UsuarioService } from '../../services/usuario.service';
import { ProblemasComponent } from '../../components/problemas/problemas.component';
import { OrdenDetalleComponent } from '../../components/orden-detalle/orden-detalle.component';

@Component({
  selector: 'app-crear-orden-paso',
  templateUrl: './crear-orden-paso.page.html',
  styleUrls: ['./crear-orden-paso.page.scss'],
})

export class CrearOrdenPasoPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  barraProgreso = 0.25;
  indiceProg = 0.25;
  splitPaneState: boolean;
  slide = 0;
  fechaActual;
  prob2switch = false;
  tecnicos: Usuario[];

  botDesc = false;
  botFlete = false;

  orden: Orden = {};

  customPickerOptions = {
    buttons: [{
      text: 'Aceptar',
    }]
  };

  usuarioc: Usuario = {};

  constructor(
    private ordenesService: OrdenesService,
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService,
    public menu: MenuController,
    private modalCtrl: ModalController,

  ) { }

  async ngOnInit() {
    this.limpiarForm();
    this.asignarUsuario();
    this.fechaActual = new Date().toString();
    await this.ordenesService.cargarToken();
    await this.usuarioService.cargarToken();
    this.listarTecnicos();
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }


  login(fLogin: NgForm) {
    console.log('enviado');
  }

  fakeClick(nombre?: string) {
    console.log(`Se hizo clic en: ${nombre}`);
  }

  async nuevaOrden(fOrden: NgForm) {

    // if (fOrden.invalid) { return; }

    const valido = await this.ordenesService.nuevaOrden(this.orden);

    if (!valido) {
      this.uiService.mostrarToast('Error', 'danger');
    } else {

      this.uiService.mostrarToast('Se ha creado una nueva ORDEN DE SERVICIO', 'success');

      const ordenid = valido.toString();
      this.verDetalle(ordenid);
    }


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
        this.orden.valorPcs = formattedValue;
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

    const value = (this.orden.valorMo + this.orden.costoFlete + this.orden.valorPcs + this.orden.descuento).toString();

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

  aprobadoSw(value: boolean) {
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

  mover(direccion: string) {
    this.slides.lockSwipes(false);
    if (direccion === 'atras') {
      this.slide = this.slide - 1;
      this.barraProgreso -= this.indiceProg;
    }
    if (direccion === 'siguiente') {
      this.slide = this.slide + 1;
      this.barraProgreso += this.indiceProg;
    }
    if (this.slide <= 0) {
      this.slide = 0;
      this.barraProgreso = this.indiceProg;
    }
    if (this.slide >= 3) {
      this.slide = 3;
      this.barraProgreso = 1;
    }
    this.slides.slideTo(this.slide);
    this.slides.lockSwipes(true);
    this.asignarUsuario();
  }

  asignarUsuario() {
    this.usuarioc = this.usuarioService.getUsuario();
    this.orden.usuario._id = this.usuarioc._id;
  }

  async abrirProblemas() {
    const modal = await this.modalCtrl.create({
      component: ProblemasComponent
    });
    modal.present();

    const { data } = await modal.onWillDismiss();

    if (!data) {
      return;
    }
    if (data.data) {
      this.orden.problema1 = [];
      this.orden.problema1.push(data);
      console.log(this.orden);
    }
  }

  listarTecnicos() {
    this.tecnicos = [];
    this.usuarioService.listaTecnicos()
      .subscribe(resp => {
        // tslint:disable-next-line:no-string-literal
        this.tecnicos.push(...resp['tecnicos']);
        console.log(this.tecnicos);
      });
  }

  limpiarForm() {
    this.orden = {
      serie1: '',
      problema1: [{
        categoria: '',
        descripcion: '',
        _id: ''
      }
      ],
      producto: {
        _id: '',
        descripcion: '',
        codigo: '',
        marca: '',
        categoria: {
          _id: '',
          descripcion: '',
        }
      },
      fechaCompra: '',
      cobertura: '',
      cliente: {
        celular: '',
        direccion: '',
        documento: '',
        email: '',
        nombre: '',
        telefono: '',
        _id: '',
      },
      ubicacion: '',
      usuario: {},
      situacion: '',
      aspecto: '',
      valorPreapro: 0,
      valorPcs: 0,
      valorMo: 0,
      costoFlete: 0,
      descuento: 0,
      notaCliente: '',
      obs: '',
      accesorios: '',
      tecnico: '',

    }


  }

  rellenar() {
    this.orden = {
      serie1: 'prueba1234',
      problema1: [{
        categoria: 'alimentacion',
        descripcion: 'duracion de la bateri',
        _id: '60317247d14e37710878bad5'
      }
      ],
      producto: {
        _id: '5fbab8535868be20bf29449a',
        descripcion: 'Iphone 12 Pro Max 256gb Space Gray',
        codigo: '10',
        marca: 'Apple',
        categoria: {
          _id: '5fab1e2a5b438b193c725208',
          descripcion: 'celulares',
        }
      },
      fechaCompra: '2020-07-30T04:00:00.000Z',
      cobertura: 'Fuera de Garantia',
      cliente: {
        celular: '0993977201',
        codigo: 1,
        direccion: 'Barrio La pradera km17',
        documento: '8235557',
        email: 'mmpcasu@hotmail.com',
        nombre: 'monica polanco',
        telefono: '0993977201',
        _id: '5fa84f42eda5075482b8402c',
      },
      ubicacion: 'recepcion',
      usuario: {},
      situacion: 'en recepcion',
      aspecto: 'prueba',
      valorPreapro: 15,
      valorPcs: 0,
      valorMo: 0,
      costoFlete: 0,
      descuento: 0,
      notaCliente: 'prueba',
      obs: 'prueba',
      accesorios: 'prueba',
      tecnico: '5fa9ba49ebe0d66a4039439f',

    }
  }

}

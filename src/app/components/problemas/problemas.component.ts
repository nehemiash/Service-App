import { Component, OnInit } from '@angular/core';
import { MicroService } from '../../services/micro.service';
import { Problema, NuevoProblema, ProblemaDetalle } from '../../interfaces/microInterfaces';
import { UiServiceService } from '../../services/ui-service.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-problemas',
  templateUrl: './problemas.component.html',
  styleUrls: ['./problemas.component.scss'],
})
export class ProblemasComponent implements OnInit {

  catProblemas: Problema[] = [];
  problemas: ProblemaDetalle[] = [];
  nuevoProbBan = false;
  nuevoProblema: NuevoProblema = {};
  boton = false;
  switchProb = false;
  probTitulo = '';
  problemaSelec = {};

  constructor(
    private microServiceCtrl: MicroService,
    private uiService: UiServiceService,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    await this.microServiceCtrl.cargarToken();
    this.obtenerCategorias();
  }

  abrirProb(categ: string) {
    this.probTitulo = categ;
    this.obtenerProblemas(categ);
  }

  obtenerCategorias() {
    this.catProblemas = [];
    this.microServiceCtrl.getProblemas()
      .subscribe(resp => {
        this.catProblemas.push(...resp.categorias);
        this.probTitulo = resp.categorias[0]._id;
        this.obtenerProblemas(this.probTitulo);
      });
  }

  obtenerProblemas(cat: string) {
    this.problemas = [];
    this.microServiceCtrl.getProblemasAgrup(cat)
      .subscribe(resp => {
        this.problemas.push(...resp.problema);
      });
  }

  // tslint:disable-next-line:variable-name
  problemaSel(_id: string, descripcion: string, categoria: string) {
    this.modalCtrl.dismiss({
      _id,
      descripcion,
      categoria,
      data: true,
    });
  }

  crearCat() {
    this.nuevoProblema.categoria = this.nuevoProblema.categoria.toLocaleLowerCase();
    this.microServiceCtrl.nuevoProblema(this.nuevoProblema)
      .subscribe((resp) => {
        console.log(resp);
        this.uiService.mostrarToast(`Se ha agregado "${resp.problema.descripcion}" a la categoria "${resp.problema.categoria}" de lista de Problemas`, 'success');
      });
    this.switchNuevoProb();
    this.cerrarModal();
  }

  botonNuevo() {
    this.nuevoProblema.categoria = '';
    this.nuevoProblema.descripcion = '';
    this.boton = !this.boton;
  }

  switchNuevoProb() {
    this.nuevoProblema = {};
    this.switchProb = !this.switchProb;
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

}

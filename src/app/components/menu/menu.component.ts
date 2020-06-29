import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { OpcionesMenu } from '../../interfaces/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menuOpts: Observable<OpcionesMenu[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.menuOpts = this.dataService.getMenuOpts();
  }


}

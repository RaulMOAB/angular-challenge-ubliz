import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './app.main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMainComponent {

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/home']
      },
      {
        label: 'Componente 1',
        icon:'pi pi-fw pi-pencil',
        routerLink: ['/demo/com1']
      },
      {
        label: 'Componente 2',
        icon:'pi pi-fw pi-pencil',
        routerLink: ['/demo/com2']
      }
    ];
  }
}

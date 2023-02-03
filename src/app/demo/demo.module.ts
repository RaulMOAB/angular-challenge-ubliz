import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { DemoState } from './demo.state';
import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';
import { Com1Component } from './com1/com1.component';
import { DemoService } from './demo.service';

import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { FieldsetModule } from 'primeng/fieldset';
import { Com2Component } from './com2/com2.component';
import { BookState } from './book.state';
import { BookService } from './book.service';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    NgxsModule.forFeature([
      DemoState,
      BookState
    ]),
    DemoRoutingModule,
    MessageModule,
    MessagesModule,
    CheckboxModule,
    ButtonModule,
    BadgeModule,
    FieldsetModule
  ],

  declarations: [
    DemoComponent,
    Com1Component,
    Com2Component
  ],

  providers: [
    DemoService,
    BookService
  ]

})
export class DemoModule { }

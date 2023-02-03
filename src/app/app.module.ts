import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponent } from './main/app.main.component';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AppMainModule } from './main/app.main.module';
import { DemoModule } from './demo/demo.module';
import { HomeModule } from './home/home.module';

registerLocaleData(en);

@NgModule({

  declarations: [
    AppComponent
  ],

  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    NgxsDispatchPluginModule.forRoot(),
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
      compatibility: {
        strictContentSecurityPolicy: true
      }
    }),
    NgxsFormPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({}),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    AppRoutingModule,

    AppMainModule,
    HomeModule,
    DemoModule,

    MenubarModule,
    InputTextModule,
    ButtonModule

  ],

  bootstrap: [
    AppComponent
  ]

})
export class AppModule { }

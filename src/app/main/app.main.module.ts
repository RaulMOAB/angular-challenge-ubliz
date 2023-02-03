import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { NgModule } from "@angular/core";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";

import { MenubarModule } from "primeng/menubar";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { AppMainComponent } from "./app.main.component";

registerLocaleData(en);

@NgModule({
  declarations: [AppMainComponent],

  imports: [NgxsFormPluginModule, MenubarModule, InputTextModule, ButtonModule],

  exports: [AppMainComponent],
})
export class AppMainModule {}

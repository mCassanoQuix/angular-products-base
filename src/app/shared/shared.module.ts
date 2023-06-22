import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar/navbar.component";
import { MaterialComponentsModule } from "./material-components/material-components.module";

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MaterialComponentsModule],
  exports: [NavbarComponent, MaterialComponentsModule],
})
export class SharedModule {}

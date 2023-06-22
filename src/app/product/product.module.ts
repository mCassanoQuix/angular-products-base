import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialComponentsModule } from "../shared/material-components/material-components.module";

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { ProductDeleteDialogComponent } from "./product-delete-dialog/product-delete-dialog.component";
import { ProductDetailDialogComponent } from "./product-detail-dialog/product-detail-dialog.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductEffects, productsFeature } from "./store";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailDialogComponent,
    ProductDeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(productsFeature),
    EffectsModule.forFeature(ProductEffects),
  ],
})
export class ProductModule {}

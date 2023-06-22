import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { Store } from "@ngrx/store";

import Product from "../../models/product";
import ToBePersisted from "../../models/to-be-persisted.mixin";

import { ProductActions, selectProducts } from "../store";

import { ProductDeleteDialogComponent } from "../product-delete-dialog/product-delete-dialog.component";
import { ProductDetailDialogComponent } from "../product-detail-dialog/product-detail-dialog.component";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  title? = "";

  tableColumns = ["id", "name", "price", "actions"];
  products$ = this.store.select(selectProducts);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.title;
    this.getProducts();
  }

  getProducts() {
    this.store.dispatch(ProductActions.loadProducts());
  }

  onAdd() {
    const addDialog = this.dialog.open(ProductDetailDialogComponent);
    addDialog
      .afterClosed()
      .subscribe((productToCreate: ToBePersisted<Product> | undefined) => {
        if (!productToCreate) return;
        this.store.dispatch(
          ProductActions.createProduct({ product: productToCreate })
        );
      });
  }

  onEdit(product: Product) {
    const editDialog = this.dialog.open(ProductDetailDialogComponent, {
      data: { product },
    });
    editDialog
      .afterClosed()
      .subscribe((productToUpdate: Product | undefined) => {
        if (!productToUpdate) return;
        this.store.dispatch(
          ProductActions.updateProduct({ product: productToUpdate })
        );
      });
  }

  onDelete(product: Product) {
    const deleteDialog = this.dialog.open(ProductDeleteDialogComponent, {
      data: { product },
    });
    deleteDialog.afterClosed().subscribe((confirm: boolean | undefined) => {
      if (!confirm) return;
      this.store.dispatch(ProductActions.deleteProduct({ id: product.id }));
    });
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

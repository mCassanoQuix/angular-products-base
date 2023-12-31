import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import Product from "../models/product";
import ToBePersisted from "../models/to-be-persisted.mixin";
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
  products: Product[] = [];

  constructor(
    private readonly httpClient: HttpClient,
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.title;
    this.getProducts();
  }

  getProducts() {
    this.httpClient
      .get<Product[]>("http://localhost:3000/products")
      .subscribe((res) => {
        this.products = res;
      });
  }

  onAdd() {
    const addDialog = this.dialog.open(ProductDetailDialogComponent);
    addDialog
      .afterClosed()
      .subscribe((productToCreate: ToBePersisted<Product> | undefined) => {
        if (!productToCreate) return;
        this.httpClient
          .post("http://localhost:3000/products", {
            ...productToCreate,
            id: undefined,
          })
          .subscribe({ complete: () => this.getProducts() });
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
        this.httpClient
          .patch(`http://localhost:3000/products/${productToUpdate.id}`, productToUpdate)
          .subscribe({ complete: () => this.getProducts() });
      });
  }

  onDelete(product: Product) {
    const deleteDialog = this.dialog.open(ProductDeleteDialogComponent, {
      data: { product },
    });
    deleteDialog.afterClosed().subscribe((confirm: boolean | undefined) => {
      if (!confirm) return;
      this.httpClient
        .delete(`http://localhost:3000/products/${product.id}`)
        .subscribe({ complete: () => this.getProducts() });
    });
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

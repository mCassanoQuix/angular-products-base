import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import Product from "../models/product";
import { ProductDeleteDialogComponent } from "../product-delete-dialog/product-delete-dialog.component";
import { ProductDetailDialogComponent } from "../product-detail-dialog/product-detail-dialog.component";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  title? = "";

  tableColumns = ["id", "name", "price", "actions"];
  products$: Observable<Product[]>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly productService: ProductService
  ) {
    this.products$ = productService.entities$;
  }

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.title;
    this.getProducts();
  }

  getProducts() {
    this.productService.getAll();
  }

  onAdd() {
    const addDialog = this.dialog.open(ProductDetailDialogComponent);
    addDialog
      .afterClosed()
      .subscribe((productToCreate: Product | undefined) => {
        if (!productToCreate) return;
        this.productService.add(productToCreate);
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
        this.productService.update(productToUpdate);
      });
  }

  onDelete(product: Product) {
    const deleteDialog = this.dialog.open(ProductDeleteDialogComponent, {
      data: { product },
    });
    deleteDialog.afterClosed().subscribe((confirm: boolean | undefined) => {
      if (!confirm) return;
      this.productService.delete(product.id);
    });
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

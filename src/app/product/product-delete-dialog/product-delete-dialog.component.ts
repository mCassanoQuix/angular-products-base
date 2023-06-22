import { Component, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import Product from "../../models/product";

@Component({
  selector: "app-product-delete-dialog",
  templateUrl: "./product-delete-dialog.component.html",
  styleUrls: ["./product-delete-dialog.component.css"],
})
export class ProductDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { product: Product }) {}
}

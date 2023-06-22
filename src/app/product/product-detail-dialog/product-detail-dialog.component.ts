import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import Product from "../../models/product";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-product-detail-dialog",
  templateUrl: "./product-detail-dialog.component.html",
  styleUrls: ["./product-detail-dialog.component.css"],
})
export class ProductDetailDialogComponent implements OnInit {
  productForm = this.formBuilder.group({
    id: 0,
    name: "",
    price: 0,
    description: "",
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product?: Product },
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data?.product) this.productForm.patchValue(this.data.product);
    this.productForm.controls.id.disable();
  }
}

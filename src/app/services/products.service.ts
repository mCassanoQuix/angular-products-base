import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Product from "../models/product";
import ToBePersisted from "../models/to-be-persisted.mixin";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Product[]>("http://localhost:3000/products");
  }
  createOne(productToCreate: ToBePersisted<Product>) {
    return this.httpClient.post(
      "http://localhost:3000/products",
      productToCreate
    );
  }
  updateOne(productToUpdate: Product) {
    return this.httpClient.patch(
      `http://localhost:3000/products/${productToUpdate.id}`,
      productToUpdate
    );
  }
  deleteOne(id: number) {
    return this.httpClient.delete(`http://localhost:3000/products/${id}`);
  }
}

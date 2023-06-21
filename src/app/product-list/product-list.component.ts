import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Product from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get<Product[]>('http://localhost:3000/products')
      .subscribe((res) => {
        this.products = res;
      });
  }

  share() {
    window.alert('The product has been shared!');
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

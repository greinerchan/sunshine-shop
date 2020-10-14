import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-recommends',
  templateUrl: './recommends.component.html',
  styleUrls: ['./recommends.component.css']
})
export class RecommendsComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductService) { }

  //constructor() { }

  ngOnInit() {
    this.listProducts();;
  }
  
  listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }
}

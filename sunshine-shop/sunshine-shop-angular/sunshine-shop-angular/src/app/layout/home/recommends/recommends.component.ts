import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  currentCategoryId:number;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  //constructor() { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }
  
  listProducts() {
    const hasCategotyId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategotyId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }
    this.productService.getSubProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-recommends',
  templateUrl: './recommends.component.html',
  styleUrls: ['./recommends.component.css']
})
export class RecommendsComponent implements OnInit {

  products: Product[];
  currentCategoryId:number;
  bestSellproducts: Product[];
  recommendProducts: Product[];
  constructor(private productService: ProductService, 
              private route: ActivatedRoute,
              private cartService:CartService
              ) { }

  //constructor() { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listBestSellProducts();
      this.listRecommendProducts();
    })
  }
  
  listRecommendProducts() {
    this.productService.getRecommendProducts().subscribe(
      data => {
        this.recommendProducts = data;
      }
    )
  }

  listBestSellProducts() {
    this.productService.getBestSellProducts().subscribe(
      data => {
        this.bestSellproducts = data;
      }
    )
  }

  addToCart(addProduct: Product) {
    const cartItem = new CartItem(addProduct);

    this.cartService.addToCart(cartItem);
  }

}

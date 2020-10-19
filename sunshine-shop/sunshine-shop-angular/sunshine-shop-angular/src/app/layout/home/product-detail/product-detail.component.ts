import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService, 
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    const productId:number = +this.route.snapshot.paramMap.get("id");

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart(addProduct: Product) {
    const cartItem = new CartItem(addProduct);
    this.cartService.addToCart(cartItem);
  }

}

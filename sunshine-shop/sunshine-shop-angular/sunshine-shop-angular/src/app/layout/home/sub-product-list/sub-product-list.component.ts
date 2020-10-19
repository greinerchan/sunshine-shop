import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sub-product-list',
  templateUrl: './sub-product-list.component.html',
  styleUrls: ['./sub-product-list.component.css']
})
export class SubProductListComponent implements OnInit {
  subCategoryTitle: string;
  subCategoryProducts: Product[];

  // for pagination
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1; 
  pageNumber: number = 1;
  pageSize: number = 6;
  totalElements: number = 0;

  // for cart function

  constructor(private productService: ProductService,
                      private route: ActivatedRoute,
                      private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listSubProducts();
    })
    this.subCategoryTitle;
  }

  listSubProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }


    // this.productService.getProductCategoryList(this.currentCategoryId).subscribe(

    //   data => {
    //     this.subCategoryProducts = data;
    //   }
    // )

    this.productService.getSubCategoryItem(this.currentCategoryId).subscribe(
      data => {
        this.subCategoryTitle = data[0].subCategoryName;
      }
    )

    // this.productService.getProductList(this.currentCategoryId).subscribe(
    //   data => {
    //     this.products = data;
    //   }
    // );

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }



    this.previousCategoryId = this.currentCategoryId;
    this.productService.getProductCategoryListPaginate(this.pageNumber - 1, 
                                               this.pageSize, 
                                               this.currentCategoryId)
                                               .subscribe(this.processResult());
  }

  processResult() {
    return data => { 
      this.subCategoryProducts = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize:number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listSubProducts();
  } 

  addToCart(addProduct: Product) {
    const cartItem = new CartItem(addProduct);

    this.cartService.addToCart(cartItem);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId:number;
  categoryTitle:string;
  categoryItem:ProductCategory;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
    this.categoryTitle;
  }

  listProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    // console.log(this.currentCategoryId);

    this.productService.getSubProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )

    this.productService.getCategoryItem(this.currentCategoryId).subscribe(
      data => {
        this.categoryTitle = data[0].category_name;
      }
    )

  }


}

import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductSubCategory } from 'src/app/common/product-sub-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-brand',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  productCategory: ProductCategory[];
  productSubCategory: ProductSubCategory[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategory();
    this.listProductSubCategory();
  }
  listProductCategory() {
    this.productService.getProductCategory().subscribe(
      data => {
        this.productCategory = data;
      }
    );
  }

  listProductSubCategory() {
    this.productService.getProductSubCategory().subscribe(
      data => {
        this.productSubCategory = data;
      }
    );
  }


}

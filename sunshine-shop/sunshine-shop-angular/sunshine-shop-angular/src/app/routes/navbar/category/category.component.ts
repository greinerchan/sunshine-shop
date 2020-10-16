import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { Product } from 'src/app/common/product';
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
  products: Product[];
  currentCategoryId:number;


  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listProductCategory();
    this.listProductSubCategory();
    this.listProduct();
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

  listProduct() {
    this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }


}

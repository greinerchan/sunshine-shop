import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-brand',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  productCategory: ProductCategory[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategory();
  }
  listProductCategory() {
    this.productService.getProductCategory().subscribe(
      data => {
        this.productCategory = data;
      }
    );
  }


}

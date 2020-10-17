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

  subProducts: Product[];
  products: Product[];
  currentCategoryId:number;
  categoryTitle:string;
  categoryItem:ProductCategory;
  searchMode:boolean;
  keyword: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listSubProducts();
      this.listProduct();
    })
    this.categoryTitle;
    this.keyword;
  }

  listSubProducts() {
    this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    this.productService.getCategoryItem(this.currentCategoryId).subscribe(
      data => {
        this.categoryTitle = data[0].categoryName;
      }
    )
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
      this.categoryTitle = "";
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword:string = this.route.snapshot.paramMap.get('keyword');
    this.keyword = keyword;
    this.productService.searchProducts(keyword).subscribe(
      data => {
        this.products = data;
      }
    )

  }

  listProduct() {
    this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  handleListProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    // console.log(this.currentCategoryId);


    this.productService.getSubProductList(this.currentCategoryId).subscribe(
      data => {
        this.subProducts = data;
      }
    )
  }
}

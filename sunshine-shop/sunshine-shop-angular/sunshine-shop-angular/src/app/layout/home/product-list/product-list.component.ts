import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // subProducts: Product[];
  products: Product[] = [];
  categoryTitle: string = "";
  categoryItem: ProductCategory = new ProductCategory();
  searchMode: boolean = false;
  keyword: string = "";

  // for pagination
  currentCategoryId: number = 1;
  previousCategoryId: number = 1; 
  pageNumber: number = 1;
  pageSize: number = 6;
  totalElements: number = 0;



  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listSubProducts();
    })
    this.categoryTitle;
    this.keyword;
  }

  listSubProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.categoryTitle = "Search Results:";
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');
    this.keyword = keyword;
    this.productService.searchProducts(keyword).subscribe(
      data => {
        this.products = data;
      }
    )

  }



  handleListProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`);

    //
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }
    
    this.previousCategoryId = this.currentCategoryId;
    this.productService.getProductListPaginate(this.pageNumber - 1, 
                                               this.pageSize, 
                                               this.currentCategoryId)
                                               .subscribe(this.processResult());

    // console.log(this.currentCategoryId);
    this.productService.getCategoryItem(this.currentCategoryId).subscribe(
      data => {
        this.categoryTitle = data[0].categoryName;
      }
    )

    // for all product
    // this.productService.getProductList(this.currentCategoryId).subscribe(
    //   data => {
    //     this.products = data;
    //   }
    // );

  }
  
  processResult() {
    return data => { 
      this.products = data._embedded.products;
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
}

    // this.productService.getSubProductList(this.currentCategoryId).subscribe(
    //   data => {
    //     this.subProducts = data;
    //   }
    // )
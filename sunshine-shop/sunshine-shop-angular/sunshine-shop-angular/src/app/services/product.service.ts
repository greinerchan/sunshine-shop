import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { CategoryComponent } from '../routes/navbar/category/category.component';
import { ProductCategory } from '../common/product-category';
import { ProductSubCategory } from '../common/product-sub-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = "http://localhost:8080/api/products";
  private categorySubUrl = "http://localhost:8080/api/productSubCategories"
  private categoryUrl = "http://localhost:8080/api/product-category"


  constructor(private httpClient: HttpClient) { }

  getProductCategoryList(theCategoryId: number): Observable<Product[]> {
    const searchCategoryUrl = `${this.productUrl}/search/findByProductSubCategoryId?id=${theCategoryId}`;
 
    return this.httpClient.get<GetResponseProduct>(searchCategoryUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  getSubProductList(theSubId: number): Observable<Product[]> {

    const searchCategoryUrl = `${this.productUrl}/search/findByProductSubCategoryId?id=${theSubId}`;
 

    return this.httpClient.get<GetResponseProduct>(searchCategoryUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getCategorySubList(theCategoryId: number): Observable<ProductSubCategory[]> {
    const searchSubCategoryUrl = `${this.categorySubUrl}/search/findByProductCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponseProductSubCategory>(searchSubCategoryUrl).pipe(
      map(response => response._embedded.productSubCategories)
    );
  }

  getProductCategory() {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProductSubCategory() {

    return this.httpClient.get<GetResponseProductSubCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productSubCategories)
    );
  }

  getCategoryItem(theCategoryId: number) {
    const searchSubCategoryUrl = `${this.categoryUrl}/search/findById?id=${theCategoryId}`;
    return this.httpClient.get<GetResponseCategoryItem>(searchSubCategoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}


interface GetResponseProductSubCategory {
  _embedded: {
    productSubCategories: ProductSubCategory[];
  }
}

interface GetResponseCategoryItem {
  _embedded: {
    productCategory:ProductCategory;
  }
}
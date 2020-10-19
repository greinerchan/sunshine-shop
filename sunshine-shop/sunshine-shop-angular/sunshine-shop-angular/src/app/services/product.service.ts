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

  getProductListPaginate(page: number, pageSize: number, categoryId: number): Observable<GetResponseProduct> {
    const searchCategoryUrl = `${this.productUrl}/search/FindAllWithDescriptionQuery?id=${categoryId}` + `&page=${page}&size=${pageSize}`;
 
    console.log(searchCategoryUrl);
    return this.httpClient.get<GetResponseProduct>(searchCategoryUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchCategoryUrl = `${this.productUrl}/search/FindAllWithDescriptionQuery?id=${theCategoryId}`;
 
    return this.httpClient.get<GetResponseProduct>(searchCategoryUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategoryList(theCategoryId: number): Observable<Product[]> {
    const searchCategoryUrl = `${this.productUrl}/search/findByProductSubCategoryId?id=${theCategoryId}`;
 
    return this.httpClient.get<GetResponseProduct>(searchCategoryUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategoryListPaginate(page: number, pageSize: number, categoryId: number): Observable<GetResponseProduct> {
    const searchCategoryUrl = `${this.productUrl}/search/findByProductSubCategoryId?id=${categoryId}` + `&page=${page}&size=${pageSize}`;
 
    return this.httpClient.get<GetResponseProduct>(searchCategoryUrl);
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

  getSubCategoryItem(theSubCategoryId: number) {
    const searchSubCategoryUrl2 = `${this.categorySubUrl}/search/findById?id=${theSubCategoryId}`;
    return this.httpClient.get<GetResponseSubCategoryItem>(searchSubCategoryUrl2).pipe(
      map(response => response._embedded.productSubCategories)
    );
  }

  getRecommendProducts() {
    const searchRecommendCategoryUrl = `${this.productUrl}/search/findByProductRecommend?isRecommend=1`;
    
    return this.getProducts(searchRecommendCategoryUrl);
  }

  getBestSellProducts() {
    const searchRecommendCategoryUrl = `${this.productUrl}/search/findByProductBestSell?isBestSell=1`;

    return this.getProducts(searchRecommendCategoryUrl);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchRecommendCategoryUrl = `${this.productUrl}/search/findByProductNameContaining?keyword=${keyword}`;
    return this.getProducts(searchRecommendCategoryUrl);
  }

  private getProducts(searchRecommendCategoryUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchRecommendCategoryUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.productUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  }, 
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
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

interface GetResponseSubCategoryItem {
  _embedded: {
    productSubCategories:ProductSubCategory;
  }
}
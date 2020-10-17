import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sub-product-list',
  templateUrl: './sub-product-list.component.html',
  styleUrls: ['./sub-product-list.component.css']
})
export class SubProductListComponent implements OnInit {
  subCategoryTitle: string;
  currentCategoryId: number;
  subCategoryProducts: Product[];

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

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


    this.productService.getProductCategoryList(this.currentCategoryId).subscribe(

      data => {
        this.subCategoryProducts = data;
      }
    )

    this.productService.getSubCategoryItem(this.currentCategoryId).subscribe(
      data => {
        this.subCategoryTitle = data[0].subCategoryName;
      }
    )
  }

}

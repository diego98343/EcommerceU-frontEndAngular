import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-medu2',
  templateUrl: './product-category-medu2.component.html',
  styleUrls: ['./product-category-medu2.component.css']
})
export class ProductCategoryMedu2Component implements OnInit {

  productCategories: ProductCategory[]=[];


 
  
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
    
  }

  listProductCategories(){

    this.productService.getProductCategories().subscribe(
      data =>{
        console.log('productCateogory2 = '+JSON.stringify(data))
        this.productCategories=data
      }
    );
  }


  
  
}

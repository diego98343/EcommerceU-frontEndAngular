import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/productCategory/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  constructor(private productService:ProductService) { }

   productCategory: ProductCategory[]=[];
 

  ngOnInit(): void {
    this.listProductCategories()
  }

  listProductCategories(){

    this.productService.getProductCategory().subscribe(
      data =>{
        console.log()
        this.productCategory=data
      }
    );
  }
  

}

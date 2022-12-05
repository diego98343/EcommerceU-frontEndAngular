import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isEmpty } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product: Product[]=[];
  currentCategoryId: number=1;
  searchMode: boolean=false; 

 

  constructor(private productService: ProductService,
              private route: ActivatedRoute 
                      ) { }

  ngOnInit(): void {
    //this.route.paramMap is used to select a category 
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })


  }


  listProducts(){

    this.searchMode=this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){

     this.handleSearchProducts()

    }else{
      
      this.handleListProducts();
    }
  }



  handleListProducts(){
    // check if id paramete is available                   
                                //activated route 
    const hasCategoryId: boolean= this.route.snapshot.paramMap.has('id')
                                                  //paramMap all the route parameters
                              
if(hasCategoryId){
  //get the "id" param string. convert string to a number using the + symbol
  this.currentCategoryId = +this.route.snapshot.paramMap.get('id')! 
}else{
  //not category id available...default to category id 0
  this.currentCategoryId=100;

}

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data=> {
        // console.log('products= '+JSON.stringify(data))
        this.product= data
      }
    )

  }

  
  handleSearchProducts(){

    const theKeyword: string= this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(theKeyword).subscribe(
      data=>{
        this.product=data;
      }
    )
  }

}
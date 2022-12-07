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
  previousCategoryId: number=1;

 // new properties for pagination 
 thePageNumber: number=1;
 thePageSize: number= 5;
 theTotalElements:number=0;

 previousKeyWord:string="";

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
//
//
// check if we have a different category than previous
// Note: Angular will reuse a component if it is currently being viewed


   //if we have different category id then previous
   // then ser the ThepageNumber back to 1


   if(this.previousCategoryId !=this.currentCategoryId){
    this.thePageNumber=1;
   }

   this.previousCategoryId=this.currentCategoryId;
  

    this.productService.getProductListPaginate(this.thePageNumber-1,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(
      data=> {

        this.product= data._embedded.products;
        this.thePageNumber=data.page.number +1;
        this.thePageSize= data.page.size
        this.theTotalElements= data.page.totalElements;
      }
    )
  }

  
  handleSearchProducts(){

    const theKeyword: string= this.route.snapshot.paramMap.get('keyword')!;
  
    //if we had a differet keyword than previous
    // then set thePageNumber to 1


    if(this.previousKeyWord!= theKeyword){
      this.thePageNumber=1;
    }

    this.previousKeyWord=theKeyword;

    this.productService.searchProductPaginate(this.thePageNumber-1,
                                              this.thePageSize,
                                              theKeyword)
                                              .subscribe(this.processResult());
  }

  processResult(){
    return (data:any)=>{
      this.product= data._embedded.products;
      this.thePageNumber=data.page.number +1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements
    }
  }


  updatePageSize(pageSize:string){

    this.thePageSize=+pageSize;
    this.thePageNumber=1;
    this.listProducts();
  }


  

}

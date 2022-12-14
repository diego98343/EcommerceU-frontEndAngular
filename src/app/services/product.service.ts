import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { response } from 'express';
import { ProductCategory } from '../models/product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
 



  private  categoryurl='http://localhost:8080/api/product-category'

  private baseURl= 'http://localhost:8080/api/products'

  private allProductsURL= 'http://localhost:8080/api/products?size=100'


  constructor(private _httpClient: HttpClient) { }


  getProductList(theCategoryId:number): Observable<Product[]>{   
 //@TODO: need to build a URL base on the category id;
    const searchURl= `${this.baseURl}/search/findByCategoryId?id=${theCategoryId}`

      if(theCategoryId===100){
        return this._httpClient.get<getResponseProduct>(this.allProductsURL).pipe(
          map(response=>response._embedded.products)
        ) 
      }else{

        return this._httpClient.get<getResponseProduct>(searchURl).pipe(
          map(response=>response._embedded.products)
        ) 
      }
  }


  getProductListPaginate(thePage:number,
                         thePageSize:number,
                         theCategoryId:number): Observable<getResponseProduct>{   

    //@TODO: need to build a URL base on the category id, page and size;
       const searchURl= `${this.baseURl}/search/findByCategoryId?id=${theCategoryId}`
                          +`&page=${thePage}&size=${thePageSize}`;


          
         
         return this._httpClient.get<getResponseProduct>(searchURl);               

     }

     searchProductPaginate(thePage:number,
                           thePageSize:number,
                           theKeyWord:string): Observable<getResponseProduct>{   

//@TODO: need to build a URL base on the category id, page and size;
       const searchURl= `${this.baseURl}/search/findByNameContaining?name=${theKeyWord}`
                         +`&page=${thePage}&size=${thePageSize}`;




       return this._httpClient.get<getResponseProduct>(searchURl);               

  }



  getProduct(theProductId: number):Observable<Product>{
    
    //need to build url based on produt id

    const productUrl=`${this.baseURl}/${theProductId}`

    return this._httpClient.get<Product>(productUrl);


  }


  getProductCategories(): Observable<ProductCategory[]> {

    return this._httpClient.get<getResponseProductCategory>(this.categoryurl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
  

  searchProducts(theKeyword:String):Observable<Product[]>{
    
    //build Url based on keyword
    const searchURl= `${this.baseURl}/search/findByNameContaining?name=${theKeyword}`

    return this._httpClient.get<getResponseProduct>(searchURl).pipe(
      map(response=>response._embedded.products)
    ) 

  }

}


interface getResponseProduct{
  _embedded:{
    products: Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

interface getResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
  }
}

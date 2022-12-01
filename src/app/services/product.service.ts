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


  getpp():Observable<Product[]>{

    return this._httpClient.get<getResponseProduct>(this.baseURl).pipe(
      map(response=>response._embedded.products)
    ) 
      
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this._httpClient.get<getResponseProductCategory>(this.categoryurl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}
  



interface getResponseProduct{
  _embedded:{
    products: Product[];
  }
}

interface getResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
  }
}

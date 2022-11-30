import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private allProductsURL='http://localhost:8080/api/products?size=100'

  private baseURl= 'http://localhost:8080/api/products'


  constructor(private _httpClient: HttpClient) { }


  getProductList(theCategoryId:number): Observable<Product[]>{
    
 //@TODO: need to build a URL base on the category id;
    const searchURl= `${this.baseURl}/search/findByCategoryId?id=${theCategoryId}`

    if(theCategoryId===1000){

      return this._httpClient.get<getResponse>(this.allProductsURL).pipe(
        map(response=>response._embedded.products)
      )
      
    }else{

      return this._httpClient.get<getResponse>(searchURl).pipe(
        map(response=>response._embedded.products)
      )
      
    } 
  }


}

interface getResponse{
  _embedded:{
    products: Product[]
  }
}

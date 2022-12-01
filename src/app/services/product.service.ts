import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { response } from 'express';
import { ProductCategory } from '../models/productCategory/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private  productCategory='http://localhost:8080/api/product-category'

  private baseURl= 'http://localhost:8080/api/products'


  constructor(private _httpClient: HttpClient) { }


  getProductList(theCategoryId:number): Observable<Product[]>{
    
 //@TODO: need to build a URL base on the category id;
    const searchURl= `${this.baseURl}/search/findByCategoryId?id=${theCategoryId}`

      return this._httpClient.get<getResponseProduct>(searchURl).pipe(
        map(response=>response._embedded.products)
      ) 

  }


  getProductCategory():Observable<ProductCategory[]>{
     
    return this._httpClient.get<getResponseProductCategory>(this.productCategory).pipe(
      map(response=> response._embedded.productCategorty)
    )

  }

}

interface getResponseProduct{
  _embedded:{
    products: Product[];
  }
}

interface getResponseProductCategory{
  _embedded:{
    productCategorty: ProductCategory[];
  }
}

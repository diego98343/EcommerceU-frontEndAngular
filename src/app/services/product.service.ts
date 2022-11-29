import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURl= 'http://localhost:8080/api/products?size=100'

  constructor(private _httpClient: HttpClient) { }


  getProductList(): Observable<Product[]>{
    return this._httpClient.get<getResponse>(this.baseURl).pipe(
      map(response=>response._embedded.products)
    )
  }


}

interface getResponse{
  _embedded:{
    products: Product[]
  }
}

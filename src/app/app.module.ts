import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductListComponent } from './productComponents/product-list/product-list.component';
import {HttpClientModule} from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';

import { ProductCategoryMedu2Component } from './productComponents/product-category-medu2/product-category-medu2.component';
import { SearchComponent } from './productComponents/search/search.component';
import { ProductDetailsComponent } from './productComponents/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routers: Routes=[
  {path:'search/:keyword',component:ProductListComponent},
  {path:'products/:id',component:ProductDetailsComponent},
  {path:'category/:id',component: ProductListComponent},
  {path:'category',component: ProductListComponent},
  {path:'',component: ProductListComponent},
  {path:'',redirectTo:'category/1',pathMatch:'full'},
  {path:'**',redirectTo:'category/1',pathMatch:'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
  
    ProductCategoryMedu2Component,
       SearchComponent,
       ProductDetailsComponent,

  ],
  imports: [
    RouterModule.forRoot(routers),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

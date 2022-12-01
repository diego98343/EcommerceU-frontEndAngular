import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';

import { ProductCategoryMedu2Component } from './components/product-category-medu2/product-category-medu2.component';




const routers: Routes=[
  {path:'category/:id',component: ProductListComponent},
  {path:'category',component: ProductListComponent},
  {path:'',component: ProductListComponent},
  {path:'',redirectTo:'/products',pathMatch:'full'},
  {path:'**',redirectTo:'',pathMatch:'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
  
    ProductCategoryMedu2Component,

  ],
  imports: [
    RouterModule.forRoot(routers),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

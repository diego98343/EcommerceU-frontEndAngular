import { Component, OnInit } from '@angular/core';
// import { Route } from '@angular/router';
// import { Router } from 'express';
import {Router} from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  doSearch(value: string){
    console.log()
    this.router.navigateByUrl(`search/${value}`)
  }

}

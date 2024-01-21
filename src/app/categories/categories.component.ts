import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
constructor(private _ProductsService:ProductsService){
}
categories:any;
ngOnInit(): void {
  this._ProductsService.getCategories().subscribe({
    next:(response)=>{
      this.categories=response.data;
    }
  })
}
}

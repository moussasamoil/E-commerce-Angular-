import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products:any[]=[];
  searchTerm: string = '';

constructor(private _ProductsService:ProductsService,private _CartService:CartService,private _ToastrService:ToastrService){

}
ngOnInit(): void {
  this._ProductsService.getProducts().subscribe({
    next:(response)=>{
      this.products=response.data;
    },
    error:(err)=>console.log(err),
  })
}
addTocCart(productId: string) {
  this._CartService.addToCart(productId).subscribe({
    next: (response) => {
      this._ToastrService.success(response.message);
      this._CartService.numOfCartItems.next(response.numOfCartItems);
    },
    error: (err) => {
      console.log(err)
      this._ToastrService.error(err.message);
    },
  })
}
}

import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  productData: any[] = [];
  searchTerm: string = '';

  constructor(private _ProductsService: ProductsService, private _CartService: CartService, private _ToastrService: ToastrService) {
  }

  userId: any;

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
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.productData = response.data;
      }
    })
    this._CartService.getAddCartItems().subscribe({
      next: (response) => {
        this._CartService.userId.next(response.data.cartOwner)
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        console.log(response);
      },
      error: (err) => {
        const message = err.error.message;
        const colonIndex = message.indexOf(':');
        const userId = message.substring(colonIndex + 2);
        this._CartService.userId.next(userId);
        console.log(err)
      },
    })
  }
}

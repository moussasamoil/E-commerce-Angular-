import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService, private _Router: Router, private _ToastrService: ToastrService) { }

  cartProducts: any = null;
  isClear: boolean = false;
  numOfCartItem: any;

  ngOnInit(): void {
  
      this._CartService.getAddCartItems().subscribe({
        next: (response) => {
          this.isClear = false;
          this.numOfCartItem = response.numOfCartItems;
          this._CartService.numOfCartItems.next(this.numOfCartItem);
          this.cartProducts = response.data;
          console.log(response);
        },
        error: (err) => {
          if (err.error.statusMsg == 'fail') {
            this.isClear = true;
          }
        },
      })
    
    

  }




  removeProduct(productId: string) {
    this._CartService.removeSpecificCartItem(productId).subscribe({
      next: (respone) => {
        this.cartProducts = respone.data;
        this._ToastrService.success(`item has been removed ${respone.status}`);
        this._CartService.numOfCartItems.next(respone.numOfCartItems);
      },
      error: (err) => {
        console.log(err)
        this._ToastrService.success(`item has not been removed ${err.status}`)
      },
    })
  }
  UpdateCartProductQuantity(productId: string, count: number) {
    this._CartService.UpdateCartProductQuantity(productId, count).subscribe({
      next: (response) => {
        this.cartProducts = response.data;
        this._ToastrService.success(` ${response.status} `)

      },
      error: (err) => {
        console.log(err)
        this._ToastrService.error(` ${err.status}`)

      },
    })
  }


  clearCart(): void {
    this._CartService.clearCart().subscribe({
      next: (respone) => {
        this.isClear = true;
        if (respone.message == "success") {
          this.cartProducts = null;
        }
        this._CartService.numOfCartItems.next(0);
      },
      error: (err) => console.log(err),
    });
  }



  checkOut(): void {
    this._Router.navigate(['/checkout'])
  }

} 

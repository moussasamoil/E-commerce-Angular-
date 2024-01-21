import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-checkoutform',
  templateUrl: './checkoutform.component.html',
  styleUrl: './checkoutform.component.css'
})
export class CheckoutformComponent implements OnInit {

  constructor(private _OrderService: OrderService, private _CartService: CartService, private _Router: Router) {
  }
  cartId: string = '';
  ngOnInit(): void {
    this._CartService.getAddCartItems().subscribe({
      next: (response) => {
        this.cartId = response.data._id;
      },
      error: (err) => console.log(err),
    })
  }
  userFrom: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, Validators.required)
  })

  navegateToPage(url: string) {
    window.location.href = url;
  }

  onlinePayment(userFrom: FormGroup) {
    this._OrderService.checkOutSession(userFrom.value, this.cartId).subscribe({
      next: (response) => {
        this.navegateToPage(response.session.url);
      },
      error: (err) => { console.log(err) },
    })
  }
  cashPayment(userFrom: FormGroup) {
    this._OrderService.CreateCashOrder(userFrom.value, this.cartId).subscribe({
      next: (response) => {
        this._Router.navigate(['/allorders']);
      },
      error: (err) => console.log(err),
    })
  }



}

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { CartService } from '../cart.service';
import { response } from 'express';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  userId: any;

  constructor(private _OrderService: OrderService, private _CartService: CartService) {
    
  }

  ngOnInit(): void {
    this._CartService.userId.subscribe((value) => {
      this.userId = value;
    })

    this._OrderService.getUserOrders(this.userId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => console.log(err),
    })
  }
}



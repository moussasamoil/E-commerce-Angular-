import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  header: any = {
    token: localStorage.getItem('userToken')
  };

  constructor(private _HttpClient: HttpClient ,private _CartService:CartService) { 
  }


  CreateCashOrder(shippingAddress: any, id: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`, {
      shippingAddress: shippingAddress,
    },
      {
        headers: this.header,
      });
  }
  checkOutSession(ShippingAddress: any, id: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`, {
      shippingAddress: ShippingAddress,
    },
      {
        headers: this.header,
      })
  }

  getUserOrders(id:any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }
}

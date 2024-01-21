import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userId = new BehaviorSubject('');

  numOfCartItems = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient, private _AuthService: AuthService) {
  }



  //     token: this._AuthService.userToken,
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODhhMWQ4MTEzZTNiOWMzMWI5OTE5YyIsIm5hbWUiOiJtb3Vzc2EiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwNDkwNTgwNSwiZXhwIjoxNzEyNjgxODA1fQ.4Kcx2L3MyrXfySDeXr2xii3zy6qohCEkN2c9q2Oyz24

  addToCart(pId: string): Observable<any> {
   
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: pId })
  }

  getAddCartItems(): Observable<any> {
   
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`);
  }
  removeSpecificCartItem(productId: string): Observable<any> {
   
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`);
  }
  UpdateCartProductQuantity(productId: string, count: number): Observable<any> {
   
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count: count,
      });
  }
  clearCart(): Observable<any> {
  
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)

  }
}

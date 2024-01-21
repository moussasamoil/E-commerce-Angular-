import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userData = new BehaviorSubject(null);
  userToken: any;

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      this.getDecodedData();
    }
  }
  getDecodedData(): void {
    if (localStorage.getItem('userToken') !== null) {
      let encodedData = JSON.stringify(localStorage.getItem('userToken'));
      let decodedData: any = jwtDecode(encodedData);
      this.userData.next(decodedData);
      this.userToken = localStorage.getItem('userToken');
    }
  }

  signOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }

  register(userData: object): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData);
  }
  login(userData: object): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData)
  }

}
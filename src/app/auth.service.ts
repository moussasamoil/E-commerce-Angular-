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
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      this.getDecodedData();
    }
  }

  getDecodedData(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      let decodedData: any = jwtDecode(token);
      this.userData.next(decodedData);
      this.userToken = token;
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
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData);
  }
}

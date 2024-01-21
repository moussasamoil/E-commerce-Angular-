import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements 
HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> 
  {
    if (localStorage.getItem('userToken') !== null) {
      const token: any = localStorage.getItem('userToken');
      req = req.clone({
        setHeaders: {
          token: `${token}`,
        },
      });
    }

    return next.handle(req);
  }
}
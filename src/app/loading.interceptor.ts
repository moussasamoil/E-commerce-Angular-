import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class loadingInterceptor implements HttpInterceptor {

  constructor(private _NgxSpinnerService: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._NgxSpinnerService.show();


    return next.handle(req).pipe(finalize(()=>{
      this._NgxSpinnerService.hide();
    }));
  }
}
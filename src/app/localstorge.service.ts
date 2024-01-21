import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorgeService {

  constructor(private _HttpClient: HttpClient) {
  }

}

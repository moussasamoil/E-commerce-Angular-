import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent implements OnInit {

  constructor(private _CartService: CartService, private _ActivatedRoute: ActivatedRoute, private _ProductsService: ProductsService ,private _ToastrService:ToastrService) { }
  productDetails: any;
  productId: any;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (parms) => {
        this.productId = parms.get('id');
      }
    });
    this._ProductsService.getProductDetails(this.productId).subscribe({
      next: (response) => {
        this.productDetails = response.data;
      },
    })
  }

  addTocCart(productId: string) {
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);

      },
      error: (err) => {
        console.log(err)
        this._ToastrService.error(err.message);
      },
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

}

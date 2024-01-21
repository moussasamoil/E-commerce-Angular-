import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private _AuthService: AuthService, private _CartService: CartService) {
  }

  catNumber: any;


  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next: (response) => {
        if (response !== null) {
          this.isLogin = true;
        }
        else {
          this.isLogin = false;
        }
      },
      error: (err) => console.log(err),
    })
    this._CartService.numOfCartItems.subscribe((value)=>{
    this.catNumber=value;
    })


  }


  logout() {
    this._AuthService.signOut();
  }
}

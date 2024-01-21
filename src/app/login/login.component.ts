import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _AuthService: AuthService, private _Router: Router) {
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,10}$/)]),
  })


  isLoading: boolean = false;
  apiErorr: string = '';

  handleLogin(loginForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.login(loginForm.value).subscribe({
      next: (respone) => {
        if (respone.message === 'success') {
          localStorage.setItem('userToken', respone.token);
          this._AuthService.getDecodedData();
          this.isLoading = false;
          this._Router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.apiErorr = err.error.message;
      },
    })
  }


}

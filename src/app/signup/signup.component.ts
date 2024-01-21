import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private _AuthService: AuthService, private _Router:Router) { }
  formRegister: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,10}$/)]),
    rePassword: new FormControl(),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{
    validators: [this.confirmPass] 
  } as FormControlOptions );

  confirmPass(formGroup: FormGroup): void {
    const password = formGroup.get('password');
    const repassword = formGroup.get('rePassword');
  
    if (password?.value !== repassword?.value) {
      repassword?.setErrors({ mismatch: true });
    } else if (repassword?.value === '') {
      repassword?.setErrors({ required: true });
    } else {
      repassword?.setErrors(null);
    }
  }

  isLoading:boolean=false;
  apiError:string='';

  registeration(formRegister: FormGroup) {
    this.isLoading=true;
    this._AuthService.register(formRegister.value).subscribe({
      next: (response) => {
        if (response.message === "success"){
          this.isLoading=false;
          this._Router.navigate(['/login']);
          
        }
      },
      
      error: (err) => {
        this.isLoading=false;
        this.apiError=err.error.message;
      },
    })
  }

}

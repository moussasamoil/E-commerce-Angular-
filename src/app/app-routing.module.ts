import { CheckoutformComponent } from './checkoutform/checkoutform.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './auth.guard';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'about',component:AboutComponent,canActivate:[AuthGuard]},
  {path:'sinUp',component:SignupComponent},
  {path:'product',component:ProductsComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'Productdetails/:id',component:ProductdetailsComponent,canActivate:[AuthGuard]},
  {path:'brand',component:BrandsComponent,canActivate:[AuthGuard]},
  {path:'allorders',component:OrdersComponent,canActivate:[AuthGuard]},
  {path:'checkout',component:CheckoutformComponent,canActivate:[AuthGuard]},
  {path:'setting',canActivate:[AuthGuard],loadChildren:()=>import('./setting/setting.module').then((x)=>x.SettingModule)},
  {path:'categories',component:CategoriesComponent,canActivate:[AuthGuard]},
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
  
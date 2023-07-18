import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/client/auth/auth.component';
import { HomeComponent } from './components/client/home/home.component';
import { adminGuard } from './shared/guard/admin-guard/admin.guard';
import { authGuard } from './shared/guard/auth-guard/auth.guard';
import { clientGuard } from './shared/guard/client-guard/client.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ProfileComponent } from './components/client/profile/profile.component';
import { CreateColorComponent } from './components/dashboard/color/create-color/create-color.component';
import { CalculatorComponent } from './components/client/calculator/calculator.component';
import { CartComponent } from './components/client/cart/cart.component';
import { CheckoutComponent } from './components/client/checkout/checkout.component';

const routes: Routes = [
  //client
  {path:"",component:HomeComponent},
  {path:"auth",component:AuthComponent},
  {path:"profile",canActivate:[authGuard,clientGuard],component:ProfileComponent},
  {path:"calculator",component:CalculatorComponent},
  {path:"edit-product/:id",canActivate:[authGuard,clientGuard],component:CalculatorComponent},
  {path:"cart",component:CartComponent},
  {path:"checkout",component:CheckoutComponent},

  //dashboard
  {path:"dashboard/create-color",canActivate:[authGuard,adminGuard],component:CreateColorComponent},

  //messages
  {path:"unauthorized",component:UnauthorizedComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
